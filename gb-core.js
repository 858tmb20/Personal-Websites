/*
 * gb-core.js — a Game Boy / Game Boy Color emulator core written from scratch.
 * No DOM dependencies: the page (gameboy.html) owns the canvas, input and audio.
 *
 * Supports: SM83 CPU (full instruction set), PPU (BG / window / sprites, DMG + CGB),
 * timer, joypad, serial stub, APU (4 channels), MBC1 / MBC2 / MBC3 (+RTC) / MBC5,
 * CGB double speed, VRAM/WRAM banking, HDMA, battery saves and save states.
 */
(function (root) {
  'use strict';

  const FZ = 0x80, FN = 0x40, FH = 0x20, FC = 0x10;
  const CLOCK = 4194304;
  const FRAME_CYCLES = 70224;

  // ------------------------------------------------------------------ helpers
  function b64encode(u8) {
    let s = '';
    for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
    return typeof btoa === 'function' ? btoa(s) : Buffer.from(s, 'binary').toString('base64');
  }
  function b64decode(str) {
    const s = typeof atob === 'function' ? atob(str) : Buffer.from(str, 'base64').toString('binary');
    const u8 = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
    return u8;
  }
  const TYPED = { Uint8Array, Uint16Array, Uint32Array, Int32Array, Float32Array, Int8Array };
  // Generic snapshot of a component: numbers, booleans, typed arrays, nested plain state.
  function snap(obj, skip) {
    const o = {};
    for (const k of Object.keys(obj)) {
      if (k === 'gb' || (skip && skip.indexOf(k) >= 0)) continue;
      const v = obj[k];
      if (typeof v === 'number' || typeof v === 'boolean') o[k] = v;
      else if (ArrayBuffer.isView(v)) o[k] = { $t: v.constructor.name, $d: b64encode(new Uint8Array(v.buffer, v.byteOffset, v.byteLength)) };
      else if (Array.isArray(v)) o[k] = v.map(x => (x && typeof x === 'object') ? snap(x) : x);
      else if (v && typeof v === 'object') o[k] = snap(v);
    }
    return o;
  }
  function restore(obj, data) {
    for (const k of Object.keys(data)) {
      if (!(k in obj)) continue;
      const v = data[k], cur = obj[k];
      if (v && v.$t) {
        const bytes = b64decode(v.$d);
        const T = TYPED[v.$t];
        const arr = new T(bytes.buffer, 0, bytes.byteLength / T.BYTES_PER_ELEMENT);
        if (cur && cur.length === arr.length) cur.set(arr); else obj[k] = arr;
      } else if (Array.isArray(v)) {
        if (Array.isArray(cur) && cur.length && typeof cur[0] === 'object') v.forEach((x, i) => restore(cur[i], x));
        else obj[k] = v.slice();
      } else if (v && typeof v === 'object') { if (cur && typeof cur === 'object') restore(cur, v); }
      else obj[k] = v;
    }
  }

  // ------------------------------------------------------------------ cartridge
  class Cartridge {
    constructor(rom) {
      this.rom = rom;
      const h = rom;
      let title = '';
      for (let i = 0x134; i < 0x143; i++) { if (!h[i]) break; title += String.fromCharCode(h[i]); }
      this.title = title.replace(/[^\x20-\x7e]/g, '').trim() || 'UNTITLED';
      this.cgbFlag = h[0x143];
      this.type = h[0x147];
      this.romBanks = Math.max(2, rom.length >> 14);
      const ramSizes = [0, 0x800, 0x2000, 0x8000, 0x20000, 0x10000];
      let ramSize = ramSizes[h[0x149]] || 0;
      const t = this.type;
      if (t === 0x01 || t === 0x02 || t === 0x03) this.mbc = 1;
      else if (t === 0x05 || t === 0x06) { this.mbc = 2; ramSize = 512; }
      else if (t >= 0x0f && t <= 0x13) this.mbc = 3;
      else if (t >= 0x19 && t <= 0x1e) this.mbc = 5;
      else this.mbc = 0;
      this.hasBattery = [0x03, 0x06, 0x09, 0x0d, 0x0f, 0x10, 0x13, 0x1b, 0x1e, 0x22, 0xff].indexOf(t) >= 0;
      this.hasRtc = t === 0x0f || t === 0x10;
      this.ram = new Uint8Array(Math.max(ramSize, 0));
      this.ramEnabled = false;
      this.romBank = 1;
      this.ramBank = 0;
      this.mode = 0;   // MBC1 banking mode
      this.bank2 = 0;  // MBC1 upper bits
      this.ramDirty = false;
      // MBC3 RTC
      this.rtc = new Uint8Array(5);       // s, m, h, dl, dh
      this.rtcLatched = new Uint8Array(5);
      this.rtcLatchReg = 0xff;
      this.rtcLast = Date.now();
      this.romMask = this.romBanks - 1;
      // header checksum based id, for save keys
      let sum = 0; for (let i = 0x134; i < 0x14e; i++) sum = (sum + h[i]) & 0xffff;
      this.id = this.title + '-' + sum.toString(16) + '-' + h[0x14e].toString(16) + h[0x14f].toString(16);
    }
    rtcUpdate() {
      const now = Date.now();
      let elapsed = Math.floor((now - this.rtcLast) / 1000);
      if (elapsed <= 0) return;
      this.rtcLast += elapsed * 1000;
      if (this.rtc[4] & 0x40) return; // halted
      const r = this.rtc;
      let s = r[0] + elapsed;
      let m = r[1] + Math.floor(s / 60); s %= 60;
      let hh = r[2] + Math.floor(m / 60); m %= 60;
      let d = ((r[4] & 1) << 8 | r[3]) + Math.floor(hh / 24); hh %= 24;
      if (d > 511) { r[4] |= 0x80; d &= 511; }
      r[0] = s; r[1] = m; r[2] = hh; r[3] = d & 0xff; r[4] = (r[4] & 0xfe) | (d >> 8);
    }
    readRom(a) {
      if (a < 0x4000) {
        if (this.mbc === 1 && this.mode === 1) return this.rom[(((this.bank2 << 5) & this.romMask) << 14 | a) % this.rom.length];
        return this.rom[a];
      }
      let bank = this.romBank;
      if (this.mbc === 1) bank = (this.bank2 << 5) | this.romBank;
      bank &= this.romMask;
      return this.rom[((bank << 14) | (a & 0x3fff)) % this.rom.length];
    }
    writeRom(a, v) {
      switch (this.mbc) {
        case 0: return;
        case 1:
          if (a < 0x2000) this.ramEnabled = (v & 0x0f) === 0x0a;
          else if (a < 0x4000) { this.romBank = v & 0x1f; if (!this.romBank) this.romBank = 1; }
          else if (a < 0x6000) this.bank2 = v & 3;
          else this.mode = v & 1;
          return;
        case 2:
          if (a < 0x4000) {
            if (a & 0x100) { this.romBank = v & 0x0f; if (!this.romBank) this.romBank = 1; }
            else this.ramEnabled = (v & 0x0f) === 0x0a;
          }
          return;
        case 3:
          if (a < 0x2000) this.ramEnabled = (v & 0x0f) === 0x0a;
          else if (a < 0x4000) { this.romBank = v & 0x7f; if (!this.romBank) this.romBank = 1; }
          else if (a < 0x6000) this.ramBank = v;
          else {
            if (this.rtcLatchReg === 0 && v === 1) { this.rtcUpdate(); this.rtcLatched.set(this.rtc); }
            this.rtcLatchReg = v;
          }
          return;
        case 5:
          if (a < 0x2000) this.ramEnabled = (v & 0x0f) === 0x0a;
          else if (a < 0x3000) this.romBank = (this.romBank & 0x100) | v;
          else if (a < 0x4000) this.romBank = (this.romBank & 0xff) | ((v & 1) << 8);
          else if (a < 0x6000) this.ramBank = v & 0x0f;
          return;
      }
    }
    ramOffset(a) {
      let bank = 0;
      if (this.mbc === 1) bank = this.mode === 1 ? this.bank2 : 0;
      else if (this.mbc === 3 || this.mbc === 5) bank = this.ramBank;
      return ((bank << 13) | (a & 0x1fff)) % (this.ram.length || 1);
    }
    readRam(a) {
      if (!this.ramEnabled) return 0xff;
      if (this.mbc === 3 && this.ramBank >= 0x08 && this.ramBank <= 0x0c) {
        return this.hasRtc ? this.rtcLatched[this.ramBank - 8] : 0xff;
      }
      if (!this.ram.length) return 0xff;
      if (this.mbc === 2) return this.ram[a & 0x1ff] | 0xf0;
      return this.ram[this.ramOffset(a)];
    }
    writeRam(a, v) {
      if (!this.ramEnabled) return;
      if (this.mbc === 3 && this.ramBank >= 0x08 && this.ramBank <= 0x0c) {
        if (!this.hasRtc) return;
        this.rtcUpdate();
        const masks = [0x3f, 0x3f, 0x1f, 0xff, 0xc1];
        this.rtc[this.ramBank - 8] = v & masks[this.ramBank - 8];
        this.rtcLast = Date.now();
        this.ramDirty = true;
        return;
      }
      if (!this.ram.length) return;
      if (this.mbc === 2) this.ram[a & 0x1ff] = v & 0x0f;
      else this.ram[this.ramOffset(a)] = v;
      this.ramDirty = true;
    }
    // Battery save: RAM followed by a 48-byte RTC footer (VBA/mGBA-compatible layout).
    exportSave() {
      if (!this.hasRtc) return this.ram.slice();
      this.rtcUpdate();
      const out = new Uint8Array(this.ram.length + 48);
      out.set(this.ram);
      const dv = new DataView(out.buffer, this.ram.length);
      for (let i = 0; i < 5; i++) { dv.setUint32(i * 4, this.rtc[i], true); dv.setUint32(20 + i * 4, this.rtcLatched[i], true); }
      const secs = Math.floor(this.rtcLast / 1000);
      dv.setUint32(40, secs >>> 0, true);
      dv.setUint32(44, Math.floor(secs / 4294967296), true);
      return out;
    }
    importSave(data) {
      this.ram.set(data.subarray(0, Math.min(data.length, this.ram.length)));
      if (this.hasRtc && data.length >= this.ram.length + 44) {
        const dv = new DataView(data.buffer, data.byteOffset + this.ram.length);
        for (let i = 0; i < 5; i++) { this.rtc[i] = dv.getUint32(i * 4, true); this.rtcLatched[i] = dv.getUint32(20 + i * 4, true); }
        let secs = dv.getUint32(40, true);
        if (data.length >= this.ram.length + 48) secs += dv.getUint32(44, true) * 4294967296;
        this.rtcLast = secs * 1000;
        this.rtcUpdate();
      }
    }
  }

  // ------------------------------------------------------------------ APU
  const DUTY = [
    [0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0]];
  const READ_MASK = [0x80, 0x3f, 0x00, 0xff, 0xbf, 0xff, 0x3f, 0x00, 0xff, 0xbf, 0x7f, 0xff, 0x9f, 0xff, 0xbf, 0xff, 0xff, 0x00, 0x00, 0xbf, 0x00, 0x00, 0x70];
  const NOISE_DIV = [8, 16, 32, 48, 64, 80, 96, 112];

  function mkChannel() {
    return { on: false, dac: false, len: 0, lenOn: false, timer: 0, pos: 0, freq: 0, vol: 0, envDir: 0, envPer: 0, envTimer: 0,
      sweepPer: 0, sweepTimer: 0, sweepShift: 0, sweepNeg: false, sweepOn: false, shadow: 0, lfsr: 0x7fff, out: 0 };
  }

  class APU {
    constructor(gb) {
      this.gb = gb;
      this.regs = new Uint8Array(0x30);
      this.ch = [mkChannel(), mkChannel(), mkChannel(), mkChannel()];
      this.power = true;
      this.seqTimer = 8192;
      this.seqStep = 0;
      this.sampleRate = 44100;
      this.sampleTimer = 0;
      this.capL = 0; this.capR = 0;
      this.enabled = true;
      this.sink = null; // function(l, r)
    }
    setSampleRate(r) { this.sampleRate = r; }
    read(a) {
      const i = a - 0xff10;
      if (a >= 0xff30) {
        return this.regs[i];
      }
      if (a === 0xff26) {
        return (this.power ? 0x80 : 0) | 0x70 | (this.ch[0].on ? 1 : 0) | (this.ch[1].on ? 2 : 0) | (this.ch[2].on ? 4 : 0) | (this.ch[3].on ? 8 : 0);
      }
      if (i >= READ_MASK.length) return 0xff;
      return this.regs[i] | READ_MASK[i];
    }
    write(a, v) {
      const i = a - 0xff10;
      if (a >= 0xff30) { this.regs[i] = v; return; }
      if (a === 0xff26) {
        const p = !!(v & 0x80);
        if (!p && this.power) { for (let k = 0; k < 0x16; k++) this.regs[k] = 0; this.ch.forEach(c => { c.on = false; c.dac = false; }); }
        if (p && !this.power) { this.seqStep = 0; }
        this.power = p;
        return;
      }
      if (!this.power) return;
      if (i >= 0x17) return;
      this.regs[i] = v;
      const ch = this.ch;
      switch (a) {
        case 0xff10: ch[0].sweepPer = (v >> 4) & 7; ch[0].sweepNeg = !!(v & 8); ch[0].sweepShift = v & 7; break;
        case 0xff11: ch[0].len = 64 - (v & 63); break;
        case 0xff12: this.envReg(ch[0], v); break;
        case 0xff13: ch[0].freq = (ch[0].freq & 0x700) | v; break;
        case 0xff14: ch[0].freq = (ch[0].freq & 0xff) | ((v & 7) << 8); ch[0].lenOn = !!(v & 0x40); if (v & 0x80) this.trigger(0); break;
        case 0xff16: ch[1].len = 64 - (v & 63); break;
        case 0xff17: this.envReg(ch[1], v); break;
        case 0xff18: ch[1].freq = (ch[1].freq & 0x700) | v; break;
        case 0xff19: ch[1].freq = (ch[1].freq & 0xff) | ((v & 7) << 8); ch[1].lenOn = !!(v & 0x40); if (v & 0x80) this.trigger(1); break;
        case 0xff1a: ch[2].dac = !!(v & 0x80); if (!ch[2].dac) ch[2].on = false; break;
        case 0xff1b: ch[2].len = 256 - v; break;
        case 0xff1d: ch[2].freq = (ch[2].freq & 0x700) | v; break;
        case 0xff1e: ch[2].freq = (ch[2].freq & 0xff) | ((v & 7) << 8); ch[2].lenOn = !!(v & 0x40); if (v & 0x80) this.trigger(2); break;
        case 0xff20: ch[3].len = 64 - (v & 63); break;
        case 0xff21: this.envReg(ch[3], v); break;
        case 0xff23: ch[3].lenOn = !!(v & 0x40); if (v & 0x80) this.trigger(3); break;
      }
    }
    envReg(c, v) {
      c.dac = (v & 0xf8) !== 0;
      if (!c.dac) c.on = false;
    }
    trigger(n) {
      const c = this.ch[n], r = this.regs;
      if (n !== 2) {
        const env = r[n === 0 ? 2 : n === 1 ? 7 : 0x11];
        c.vol = env >> 4; c.envDir = env & 8 ? 1 : -1; c.envPer = env & 7; c.envTimer = c.envPer || 8;
      }
      if (c.len === 0) c.len = n === 2 ? 256 : 64;
      c.on = c.dac;
      if (n === 0 || n === 1) c.timer = (2048 - c.freq) * 4;
      else if (n === 2) { c.timer = (2048 - c.freq) * 2; c.pos = 0; }
      else { c.lfsr = 0x7fff; c.timer = this.noisePeriod(); }
      if (n === 0) {
        c.shadow = c.freq;
        c.sweepTimer = c.sweepPer || 8;
        c.sweepOn = c.sweepPer > 0 || c.sweepShift > 0;
        if (c.sweepShift) this.sweepCalc();
      }
    }
    sweepCalc() {
      const c = this.ch[0];
      let f = c.shadow >> c.sweepShift;
      f = c.sweepNeg ? c.shadow - f : c.shadow + f;
      if (f > 2047) c.on = false;
      return f;
    }
    noisePeriod() {
      const r = this.regs[0x12];
      return NOISE_DIV[r & 7] << (r >> 4);
    }
    clockLength() {
      for (const c of this.ch) if (c.lenOn && c.len > 0) { c.len--; if (c.len === 0) c.on = false; }
    }
    clockEnvelope() {
      for (let n of [0, 1, 3]) {
        const c = this.ch[n];
        if (!c.envPer) continue;
        if (--c.envTimer <= 0) {
          c.envTimer = c.envPer || 8;
          const nv = c.vol + c.envDir;
          if (nv >= 0 && nv <= 15) c.vol = nv;
        }
      }
    }
    clockSweep() {
      const c = this.ch[0];
      if (--c.sweepTimer <= 0) {
        c.sweepTimer = c.sweepPer || 8;
        if (c.sweepOn && c.sweepPer) {
          const f = this.sweepCalc();
          if (f <= 2047 && c.sweepShift) {
            c.shadow = f; c.freq = f;
            this.regs[3] = f & 0xff; this.regs[4] = (this.regs[4] & 0xf8) | (f >> 8);
            this.sweepCalc();
          }
        }
      }
    }
    tick(cycles) {
      if (!this.power) { this.emit(cycles); return; }
      // frame sequencer
      this.seqTimer -= cycles;
      while (this.seqTimer <= 0) {
        this.seqTimer += 8192;
        const s = this.seqStep;
        if ((s & 1) === 0) this.clockLength();
        if (s === 2 || s === 6) this.clockSweep();
        if (s === 7) this.clockEnvelope();
        this.seqStep = (s + 1) & 7;
      }
      const ch = this.ch;
      for (let n = 0; n < 2; n++) {
        const c = ch[n];
        c.timer -= cycles;
        while (c.timer <= 0) { c.timer += (2048 - c.freq) * 4; c.pos = (c.pos + 1) & 7; }
      }
      const w = ch[2];
      w.timer -= cycles;
      while (w.timer <= 0) { w.timer += (2048 - w.freq) * 2; w.pos = (w.pos + 1) & 31; }
      const nz = ch[3];
      nz.timer -= cycles;
      while (nz.timer <= 0) {
        nz.timer += this.noisePeriod();
        const x = (nz.lfsr & 1) ^ ((nz.lfsr >> 1) & 1);
        nz.lfsr = (nz.lfsr >> 1) | (x << 14);
        if (this.regs[0x12] & 8) nz.lfsr = (nz.lfsr & ~0x40) | (x << 6);
      }
      this.emit(cycles);
    }
    emit(cycles) {
      if (!this.sink || !this.enabled) return;
      this.sampleTimer += cycles * this.sampleRate;
      if (this.sampleTimer < CLOCK) return;
      const ch = this.ch, r = this.regs;
      let o = [0, 0, 0, 0];
      if (this.power) {
        const duty0 = r[1] >> 6, duty1 = r[6] >> 6;
        o[0] = ch[0].on ? DUTY[duty0][ch[0].pos] * ch[0].vol : 0;
        o[1] = ch[1].on ? DUTY[duty1][ch[1].pos] * ch[1].vol : 0;
        if (ch[2].on) {
          const b = r[0x20 + (ch[2].pos >> 1)];
          let s = (ch[2].pos & 1) ? b & 15 : b >> 4;
          const vc = (r[0x0c] >> 5) & 3;
          o[2] = vc === 0 ? 0 : s >> (vc - 1);
        }
        o[3] = ch[3].on ? ((~ch[3].lfsr) & 1) * ch[3].vol : 0;
      }
      const nr51 = r[0x15], nr50 = r[0x14];
      let L = 0, R = 0;
      for (let n = 0; n < 4; n++) {
        const dac = n === 2 ? ch[2].dac : ch[n].dac;
        const a = dac ? (o[n] / 7.5 - 1) : 0;
        if (nr51 & (0x10 << n)) L += a;
        if (nr51 & (1 << n)) R += a;
      }
      L *= (((nr50 >> 4) & 7) + 1) / 32;
      R *= ((nr50 & 7) + 1) / 32;
      while (this.sampleTimer >= CLOCK) {
        this.sampleTimer -= CLOCK;
        const oL = L - this.capL; this.capL = L - oL * 0.996;
        const oR = R - this.capR; this.capR = R - oR * 0.996;
        this.sink(oL, oR);
      }
    }
  }

  // ------------------------------------------------------------------ PPU
  const DMG_PALETTES = {
    classic: [0xe0f8d0, 0x88c070, 0x346856, 0x081820],
    gray: [0xffffff, 0xaaaaaa, 0x555555, 0x000000],
    pocket: [0xc4cfa1, 0x8b956d, 0x4d533c, 0x1f1f1f],
    warm: [0xfff6d3, 0xf9a875, 0xeb6b6f, 0x7c3f58]
  };

  class PPU {
    constructor(gb) {
      this.gb = gb;
      this.vram = new Uint8Array(0x4000);
      this.oam = new Uint8Array(0xa0);
      this.lcdc = 0x91; this.stat = 0x00; this.scy = 0; this.scx = 0; this.ly = 0; this.lyc = 0;
      this.bgp = 0xfc; this.obp0 = 0xff; this.obp1 = 0xff; this.wy = 0; this.wx = 0;
      this.mode = 2; this.cycles = 0; this.winLine = 0; this.statLine = false;
      this.vbk = 0;
      this.bgPal = new Uint8Array(64).fill(0xff);
      this.objPal = new Uint8Array(64).fill(0xff);
      this.bcps = 0; this.ocps = 0;
      this.fb = new Uint32Array(160 * 144);
      this.frameReady = false;
      this.lineBg = new Uint8Array(160);   // bg color index
      this.linePri = new Uint8Array(160);  // cgb bg priority attr
      this.lineObj = new Uint8Array(160);
      this.setDmgPalette('classic');
    }
    setDmgPalette(name) {
      const p = DMG_PALETTES[name] || DMG_PALETTES.classic;
      this.shades = p.map(rgb => 0xff000000 | ((rgb & 0xff) << 16) | (rgb & 0xff00) | ((rgb >> 16) & 0xff));
    }
    readStat() {
      return 0x80 | (this.stat & 0x78) | (this.ly === this.lyc ? 4 : 0) | ((this.lcdc & 0x80) ? this.mode : 0);
    }
    updateStat() {
      const s = this.stat;
      const line = ((s & 0x40) && this.ly === this.lyc) || ((s & 0x08) && this.mode === 0) ||
        ((s & 0x10) && this.mode === 1) || ((s & 0x20) && this.mode === 2);
      if (line && !this.statLine) this.gb.requestIrq(1);
      this.statLine = !!line;
    }
    writeLcdc(v) {
      const was = this.lcdc & 0x80;
      this.lcdc = v;
      if (was && !(v & 0x80)) { this.ly = 0; this.mode = 0; this.cycles = 0; this.winLine = 0; this.statLine = false; }
      else if (!was && (v & 0x80)) { this.ly = 0; this.mode = 2; this.cycles = 0; this.winLine = 0; this.updateStat(); }
    }
    tick(c) {
      if (!(this.lcdc & 0x80)) return;
      this.cycles += c;
      for (;;) {
        if (this.mode === 2) {
          if (this.cycles < 80) break;
          this.cycles -= 80; this.mode = 3;
        } else if (this.mode === 3) {
          if (this.cycles < 172) break;
          this.cycles -= 172; this.renderLine(); this.mode = 0; this.updateStat();
          if (this.gb.cgb) this.gb.mmu.hdmaHblank();
        } else if (this.mode === 0) {
          if (this.cycles < 204) break;
          this.cycles -= 204; this.ly++;
          if (this.ly === 144) { this.mode = 1; this.gb.requestIrq(0); this.frameReady = true; }
          else this.mode = 2;
          this.updateStat();
        } else {
          if (this.cycles < 456) break;
          this.cycles -= 456; this.ly++;
          if (this.ly > 153) { this.ly = 0; this.winLine = 0; this.mode = 2; }
          this.updateStat();
        }
      }
    }
    cgbColor(pal, idx) {
      const lo = pal[idx * 2], hi = pal[idx * 2 + 1];
      const c = lo | (hi << 8);
      const r = c & 31, g = (c >> 5) & 31, b = (c >> 10) & 31;
      // mild colour correction toward the real LCD
      const R = Math.min(255, (r * 26 + g * 4 + b * 2) >> 2);
      const G = Math.min(255, (g * 24 + b * 8) >> 2);
      const B = Math.min(255, (r * 6 + g * 4 + b * 22) >> 2);
      return 0xff000000 | (B << 16) | (G << 8) | R;
    }
    renderLine() {
      const ly = this.ly, lcdc = this.lcdc, vram = this.vram, cgb = this.gb.cgb;
      const fb = this.fb, base = ly * 160;
      const lineBg = this.lineBg, linePri = this.linePri;
      const shades = this.shades;
      const bgEnabled = cgb || (lcdc & 1);
      const signed = !(lcdc & 0x10);
      if (bgEnabled) {
        const winOn = (lcdc & 0x20) && this.wy <= ly && this.wx <= 166;
        const wx = this.wx - 7;
        let usedWin = false;
        for (let x = 0; x < 160; x++) {
          let mapBase, px, py;
          if (winOn && x >= wx) {
            mapBase = (lcdc & 0x40) ? 0x1c00 : 0x1800;
            px = x - wx; py = this.winLine; usedWin = true;
          } else {
            mapBase = (lcdc & 0x08) ? 0x1c00 : 0x1800;
            px = (x + this.scx) & 255; py = (ly + this.scy) & 255;
          }
          const mapAddr = mapBase + ((py >> 3) << 5) + (px >> 3);
          let tile = vram[mapAddr];
          let attr = cgb ? vram[0x2000 + mapAddr] : 0;
          let tileAddr = signed ? 0x1000 + ((tile << 24) >> 24) * 16 : tile * 16;
          let row = py & 7, col = px & 7;
          if (attr & 0x40) row = 7 - row;
          if (attr & 0x20) col = 7 - col;
          if (attr & 0x08) tileAddr += 0x2000;
          const lo = vram[tileAddr + row * 2], hi = vram[tileAddr + row * 2 + 1];
          const bit = 7 - col;
          const ci = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
          lineBg[x] = ci;
          linePri[x] = attr & 0x80;
          fb[base + x] = cgb ? this.cgbColor(this.bgPal, (attr & 7) * 4 + ci) : shades[(this.bgp >> (ci * 2)) & 3];
        }
        if (usedWin) this.winLine++;
      } else {
        for (let x = 0; x < 160; x++) { lineBg[x] = 0; linePri[x] = 0; fb[base + x] = shades[0]; }
      }
      if (!(lcdc & 2)) return;
      // sprites
      const tall = lcdc & 4, h = tall ? 16 : 8;
      const oam = this.oam;
      const list = [];
      for (let i = 0; i < 40 && list.length < 10; i++) {
        const y = oam[i * 4] - 16;
        if (ly >= y && ly < y + h) list.push(i);
      }
      if (!cgb) list.sort((a, b) => (oam[a * 4 + 1] - oam[b * 4 + 1]) || (a - b));
      const drawn = this.lineObj; drawn.fill(0);
      const masterPri = !cgb || (lcdc & 1);
      for (const i of list) {
        const sy = oam[i * 4] - 16, sx = oam[i * 4 + 1] - 8, attr = oam[i * 4 + 3];
        let tile = oam[i * 4 + 2];
        let row = ly - sy;
        if (attr & 0x40) row = h - 1 - row;
        if (tall) { tile &= 0xfe; if (row >= 8) { tile++; row -= 8; } }
        let addr = tile * 16 + row * 2;
        if (cgb && (attr & 8)) addr += 0x2000;
        const lo = vram[addr], hi = vram[addr + 1];
        for (let c = 0; c < 8; c++) {
          const x = sx + c;
          if (x < 0 || x >= 160 || drawn[x]) continue;
          const bit = (attr & 0x20) ? c : 7 - c;
          const ci = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
          if (!ci) continue;
          drawn[x] = 1;
          if (masterPri && lineBg[x] && ((attr & 0x80) || linePri[x])) continue;
          if (cgb) fb[base + x] = this.cgbColor(this.objPal, (attr & 7) * 4 + ci);
          else {
            const pal = (attr & 0x10) ? this.obp1 : this.obp0;
            fb[base + x] = shades[(pal >> (ci * 2)) & 3];
          }
        }
      }
    }
  }

  // ------------------------------------------------------------------ MMU
  class MMU {
    constructor(gb, cart) {
      this.gb = gb;
      this.cart = cart;
      this.wram = new Uint8Array(0x8000);
      this.hram = new Uint8Array(0x7f);
      this.io = new Uint8Array(0x80);
      this.ie = 0; this.if = 0xe1;
      this.svbk = 1;
      this.key1 = 0;
      this.hdmaSrc = 0; this.hdmaDst = 0; this.hdmaLen = 0; this.hdmaActive = false;
      this.joyp = 0x30;
      this.buttons = 0xff;  // low nibble: right left up down (active low); high nibble: a b select start
      this.sb = 0; this.sc = 0;
      this.serialOut = '';
    }
    read(a) {
      if (a < 0x8000) return this.cart.readRom(a);
      if (a < 0xa000) return this.gb.ppu.vram[(this.gb.ppu.vbk << 13) | (a & 0x1fff)];
      if (a < 0xc000) return this.cart.readRam(a);
      if (a < 0xd000) return this.wram[a & 0xfff];
      if (a < 0xe000) return this.wram[(this.svbk << 12) | (a & 0xfff)];
      if (a < 0xf000) return this.wram[a & 0xfff];
      if (a < 0xfe00) return this.wram[(this.svbk << 12) | (a & 0xfff)];
      if (a < 0xfea0) return this.gb.ppu.oam[a - 0xfe00];
      if (a < 0xff00) return 0xff;
      if (a < 0xff80) return this.readIO(a);
      if (a < 0xffff) return this.hram[a - 0xff80];
      return this.ie;
    }
    write(a, v) {
      if (a < 0x8000) { this.cart.writeRom(a, v); return; }
      if (a < 0xa000) { this.gb.ppu.vram[(this.gb.ppu.vbk << 13) | (a & 0x1fff)] = v; return; }
      if (a < 0xc000) { this.cart.writeRam(a, v); return; }
      if (a < 0xd000) { this.wram[a & 0xfff] = v; return; }
      if (a < 0xe000) { this.wram[(this.svbk << 12) | (a & 0xfff)] = v; return; }
      if (a < 0xf000) { this.wram[a & 0xfff] = v; return; }
      if (a < 0xfe00) { this.wram[(this.svbk << 12) | (a & 0xfff)] = v; return; }
      if (a < 0xfea0) { this.gb.ppu.oam[a - 0xfe00] = v; return; }
      if (a < 0xff00) return;
      if (a < 0xff80) { this.writeIO(a, v); return; }
      if (a < 0xffff) { this.hram[a - 0xff80] = v; return; }
      this.ie = v;
    }
    joypadValue() {
      let r = 0xcf | (this.joyp & 0x30);
      if (!(this.joyp & 0x10)) r &= 0xf0 | (this.buttons & 0x0f);
      if (!(this.joyp & 0x20)) r &= 0xf0 | (this.buttons >> 4);
      return r;
    }
    readIO(a) {
      const gb = this.gb, ppu = gb.ppu, t = gb.timer;
      switch (a) {
        case 0xff00: return this.joypadValue();
        case 0xff01: return this.sb;
        case 0xff02: return this.sc | 0x7e;
        case 0xff04: return (t.div >> 8) & 0xff;
        case 0xff05: return t.tima;
        case 0xff06: return t.tma;
        case 0xff07: return t.tac | 0xf8;
        case 0xff0f: return this.if | 0xe0;
        case 0xff40: return ppu.lcdc;
        case 0xff41: return ppu.readStat();
        case 0xff42: return ppu.scy;
        case 0xff43: return ppu.scx;
        case 0xff44: return ppu.ly;
        case 0xff45: return ppu.lyc;
        case 0xff46: return this.io[0x46];
        case 0xff47: return ppu.bgp;
        case 0xff48: return ppu.obp0;
        case 0xff49: return ppu.obp1;
        case 0xff4a: return ppu.wy;
        case 0xff4b: return ppu.wx;
      }
      if (a >= 0xff10 && a < 0xff40) return gb.apu.read(a);
      if (gb.cgb) {
        switch (a) {
          case 0xff4d: return this.key1 | 0x7e;
          case 0xff4f: return ppu.vbk | 0xfe;
          case 0xff55: return this.hdmaActive ? ((this.hdmaLen - 1) & 0x7f) : 0xff;
          case 0xff68: return ppu.bcps | 0x40;
          case 0xff69: return ppu.bgPal[ppu.bcps & 0x3f];
          case 0xff6a: return ppu.ocps | 0x40;
          case 0xff6b: return ppu.objPal[ppu.ocps & 0x3f];
          case 0xff70: return this.svbk | 0xf8;
        }
      }
      return 0xff;
    }
    writeIO(a, v) {
      const gb = this.gb, ppu = gb.ppu, t = gb.timer;
      switch (a) {
        case 0xff00: this.joyp = v & 0x30; return;
        case 0xff01: this.sb = v; return;
        case 0xff02:
          this.sc = v;
          if ((v & 0x81) === 0x81) {
            // No link partner: transfer completes immediately, receiving 0xFF.
            this.serialOut += String.fromCharCode(this.sb);
            if (this.serialOut.length > 4096) this.serialOut = this.serialOut.slice(-2048);
            this.sb = 0xff; this.sc &= 0x7f; gb.requestIrq(3);
          }
          return;
        case 0xff04: t.writeDiv(); return;
        case 0xff05: t.tima = v; return;
        case 0xff06: t.tma = v; return;
        case 0xff07: t.writeTac(v); return;
        case 0xff0f: this.if = v & 0x1f; return;
        case 0xff40: ppu.writeLcdc(v); return;
        case 0xff41: ppu.stat = v & 0x78; ppu.updateStat(); return;
        case 0xff42: ppu.scy = v; return;
        case 0xff43: ppu.scx = v; return;
        case 0xff44: return;
        case 0xff45: ppu.lyc = v; ppu.updateStat(); return;
        case 0xff46: {
          this.io[0x46] = v;
          const src = v << 8;
          for (let i = 0; i < 0xa0; i++) ppu.oam[i] = this.read(src + i);
          return;
        }
        case 0xff47: ppu.bgp = v; return;
        case 0xff48: ppu.obp0 = v; return;
        case 0xff49: ppu.obp1 = v; return;
        case 0xff4a: ppu.wy = v; return;
        case 0xff4b: ppu.wx = v; return;
      }
      if (a >= 0xff10 && a < 0xff40) { gb.apu.write(a, v); return; }
      if (gb.cgb) {
        switch (a) {
          case 0xff4d: this.key1 = (this.key1 & 0x80) | (v & 1); return;
          case 0xff4f: ppu.vbk = v & 1; return;
          case 0xff51: this.hdmaSrc = (this.hdmaSrc & 0x00ff) | (v << 8); return;
          case 0xff52: this.hdmaSrc = (this.hdmaSrc & 0xff00) | (v & 0xf0); return;
          case 0xff53: this.hdmaDst = (this.hdmaDst & 0x00ff) | ((v & 0x1f) << 8); return;
          case 0xff54: this.hdmaDst = (this.hdmaDst & 0xff00) | (v & 0xf0); return;
          case 0xff55:
            if (this.hdmaActive && !(v & 0x80)) { this.hdmaActive = false; return; }
            this.hdmaLen = (v & 0x7f) + 1;
            if (v & 0x80) { this.hdmaActive = true; }
            else { while (this.hdmaLen > 0) this.hdmaBlock(); gb.cpu.extraCycles += ((v & 0x7f) + 1) * 32; }
            return;
          case 0xff68: ppu.bcps = v & 0xbf; return;
          case 0xff69: ppu.bgPal[ppu.bcps & 0x3f] = v; if (ppu.bcps & 0x80) ppu.bcps = 0x80 | ((ppu.bcps + 1) & 0x3f); return;
          case 0xff6a: ppu.ocps = v & 0xbf; return;
          case 0xff6b: ppu.objPal[ppu.ocps & 0x3f] = v; if (ppu.ocps & 0x80) ppu.ocps = 0x80 | ((ppu.ocps + 1) & 0x3f); return;
          case 0xff70: this.svbk = (v & 7) || 1; return;
        }
      }
      this.io[a & 0x7f] = v;
    }
    hdmaBlock() {
      const ppu = this.gb.ppu;
      for (let i = 0; i < 16; i++) {
        ppu.vram[(ppu.vbk << 13) | ((this.hdmaDst + i) & 0x1fff)] = this.read((this.hdmaSrc + i) & 0xffff);
      }
      this.hdmaSrc = (this.hdmaSrc + 16) & 0xffff;
      this.hdmaDst = (this.hdmaDst + 16) & 0x1fff;
      this.hdmaLen--;
    }
    hdmaHblank() {
      if (!this.hdmaActive || this.gb.ppu.ly >= 144) return;
      this.hdmaBlock();
      this.gb.cpu.extraCycles += 32;
      if (this.hdmaLen <= 0) this.hdmaActive = false;
    }
  }

  // ------------------------------------------------------------------ Timer
  class Timer {
    constructor(gb) { this.gb = gb; this.div = 0xabcc; this.tima = 0; this.tma = 0; this.tac = 0xf8; }
    bit() { return [512, 8, 32, 128][this.tac & 3]; }
    tick(c) {
      const old = this.div;
      this.div = (this.div + c) & 0xffff;
      if (!(this.tac & 4)) return;
      const b = this.bit() * 2; // period
      // number of falling edges of the selected bit between old and new
      let n = Math.floor((old + c) / b) - Math.floor(old / b);
      while (n-- > 0) this.inc();
    }
    inc() {
      this.tima++;
      if (this.tima > 0xff) { this.tima = this.tma; this.gb.requestIrq(2); }
    }
    writeDiv() {
      if ((this.tac & 4) && (this.div & this.bit())) this.inc();
      this.div = 0;
    }
    writeTac(v) {
      const oldOn = (this.tac & 4) && (this.div & this.bit());
      this.tac = v & 7;
      const newOn = (this.tac & 4) && (this.div & this.bit());
      if (oldOn && !newOn) this.inc();
    }
  }

  // ------------------------------------------------------------------ CPU
  class CPU {
    constructor(gb) {
      this.gb = gb;
      this.a = 0; this.f = 0; this.b = 0; this.c = 0; this.d = 0; this.e = 0; this.h = 0; this.l = 0;
      this.sp = 0xfffe; this.pc = 0x100;
      this.ime = false; this.eiDelay = 0; this.halted = false; this.haltBug = false;
      this.extraCycles = 0;
      this.doubleSpeed = false;
    }
    rb(a) { return this.gb.mmu.read(a & 0xffff); }
    wb(a, v) { this.gb.mmu.write(a & 0xffff, v & 0xff); }
    fetch() {
      const v = this.gb.mmu.read(this.pc);
      if (this.haltBug) this.haltBug = false; else this.pc = (this.pc + 1) & 0xffff;
      return v;
    }
    fetch16() { const lo = this.fetch(); return lo | (this.fetch() << 8); }
    push(v) { this.sp = (this.sp - 1) & 0xffff; this.wb(this.sp, v >> 8); this.sp = (this.sp - 1) & 0xffff; this.wb(this.sp, v); }
    pop() { const lo = this.rb(this.sp); this.sp = (this.sp + 1) & 0xffff; const hi = this.rb(this.sp); this.sp = (this.sp + 1) & 0xffff; return lo | (hi << 8); }
    get hl() { return (this.h << 8) | this.l; }
    set hl(v) { this.h = (v >> 8) & 0xff; this.l = v & 0xff; }
    getR(i) {
      switch (i) { case 0: return this.b; case 1: return this.c; case 2: return this.d; case 3: return this.e;
        case 4: return this.h; case 5: return this.l; case 6: return this.rb(this.hl); default: return this.a; }
    }
    setR(i, v) {
      v &= 0xff;
      switch (i) { case 0: this.b = v; break; case 1: this.c = v; break; case 2: this.d = v; break; case 3: this.e = v; break;
        case 4: this.h = v; break; case 5: this.l = v; break; case 6: this.wb(this.hl, v); break; default: this.a = v; }
    }
    getRR(i) { // BC DE HL SP
      switch (i) { case 0: return (this.b << 8) | this.c; case 1: return (this.d << 8) | this.e; case 2: return this.hl; default: return this.sp; }
    }
    setRR(i, v) {
      v &= 0xffff;
      switch (i) { case 0: this.b = v >> 8; this.c = v & 0xff; break; case 1: this.d = v >> 8; this.e = v & 0xff; break;
        case 2: this.hl = v; break; default: this.sp = v; }
    }
    cond(i) {
      switch (i) { case 0: return !(this.f & FZ); case 1: return !!(this.f & FZ); case 2: return !(this.f & FC); default: return !!(this.f & FC); }
    }
    alu(op, v) {
      const a = this.a;
      let r, f = 0;
      switch (op) {
        case 0: r = a + v; f = ((a & 15) + (v & 15) > 15 ? FH : 0) | (r > 255 ? FC : 0); this.a = r & 255; break;
        case 1: { const cy = (this.f & FC) ? 1 : 0; r = a + v + cy; f = ((a & 15) + (v & 15) + cy > 15 ? FH : 0) | (r > 255 ? FC : 0); this.a = r & 255; break; }
        case 2: r = a - v; f = FN | ((a & 15) < (v & 15) ? FH : 0) | (r < 0 ? FC : 0); this.a = r & 255; break;
        case 3: { const cy = (this.f & FC) ? 1 : 0; r = a - v - cy; f = FN | ((a & 15) - (v & 15) - cy < 0 ? FH : 0) | (r < 0 ? FC : 0); this.a = r & 255; break; }
        case 4: this.a = a & v; f = FH; break;
        case 5: this.a = a ^ v; break;
        case 6: this.a = a | v; break;
        case 7: r = a - v; f = FN | ((a & 15) < (v & 15) ? FH : 0) | (r < 0 ? FC : 0); this.f = f | ((r & 255) ? 0 : FZ); return;
      }
      this.f = f | (this.a ? 0 : FZ);
    }
    cb(op) {
      const r = op & 7, x = op >> 6, y = (op >> 3) & 7;
      let v = this.getR(r);
      if (x === 1) { // BIT
        this.f = (this.f & FC) | FH | ((v >> y) & 1 ? 0 : FZ);
        return r === 6 ? 12 : 8;
      }
      if (x === 2) { this.setR(r, v & ~(1 << y)); return r === 6 ? 16 : 8; }
      if (x === 3) { this.setR(r, v | (1 << y)); return r === 6 ? 16 : 8; }
      let c, res;
      switch (y) {
        case 0: c = v >> 7; res = (v << 1) | c; break;                          // RLC
        case 1: c = v & 1; res = (v >> 1) | (c << 7); break;                    // RRC
        case 2: c = v >> 7; res = (v << 1) | ((this.f & FC) ? 1 : 0); break;    // RL
        case 3: c = v & 1; res = (v >> 1) | ((this.f & FC) ? 0x80 : 0); break;  // RR
        case 4: c = v >> 7; res = v << 1; break;                                // SLA
        case 5: c = v & 1; res = (v >> 1) | (v & 0x80); break;                  // SRA
        case 6: c = 0; res = ((v & 15) << 4) | (v >> 4); break;                 // SWAP
        default: c = v & 1; res = v >> 1; break;                                // SRL
      }
      res &= 0xff;
      this.setR(r, res);
      this.f = (res ? 0 : FZ) | (c ? FC : 0);
      return r === 6 ? 16 : 8;
    }
    addSpE() {
      const e = (this.fetch() << 24) >> 24;
      const sp = this.sp;
      this.f = (((sp & 15) + (e & 15)) > 15 ? FH : 0) | (((sp & 255) + (e & 255)) > 255 ? FC : 0);
      return (sp + e) & 0xffff;
    }
    step() {
      const mmu = this.gb.mmu;
      const pending = mmu.ie & mmu.if & 0x1f;
      if (this.halted) {
        if (!pending) return 4;
        this.halted = false;
      }
      if (this.ime && pending) {
        this.ime = false;
        let n = 0; while (!(pending & (1 << n))) n++;
        mmu.if &= ~(1 << n);
        this.push(this.pc);
        this.pc = 0x40 + n * 8;
        return 20;
      }
      const cyc = this.exec(this.fetch());
      if (this.eiDelay) { if (--this.eiDelay === 0) this.ime = true; }
      const extra = this.extraCycles; this.extraCycles = 0;
      return cyc + extra;
    }
    exec(op) {
      // regular blocks first
      if (op >= 0x40 && op < 0x80) {
        if (op === 0x76) { // HALT
          const mmu = this.gb.mmu;
          if (!this.ime && (mmu.ie & mmu.if & 0x1f)) this.haltBug = true; else this.halted = true;
          return 4;
        }
        const d = (op >> 3) & 7, s = op & 7;
        this.setR(d, this.getR(s));
        return (d === 6 || s === 6) ? 8 : 4;
      }
      if (op >= 0x80 && op < 0xc0) { const s = op & 7; this.alu((op >> 3) & 7, this.getR(s)); return s === 6 ? 8 : 4; }
      if (op < 0x40) {
        const lo = op & 7, y = (op >> 3) & 7;
        if (lo === 4) { const v = this.getR(y), r = (v + 1) & 255; this.setR(y, r); this.f = (this.f & FC) | (r ? 0 : FZ) | ((v & 15) === 15 ? FH : 0); return y === 6 ? 12 : 4; }
        if (lo === 5) { const v = this.getR(y), r = (v - 1) & 255; this.setR(y, r); this.f = (this.f & FC) | FN | (r ? 0 : FZ) | ((v & 15) === 0 ? FH : 0); return y === 6 ? 12 : 4; }
        if (lo === 6) { this.setR(y, this.fetch()); return y === 6 ? 12 : 8; }
        switch (op) {
          case 0x00: return 4;
          case 0x01: case 0x11: case 0x21: case 0x31: this.setRR(op >> 4, this.fetch16()); return 12;
          case 0x02: this.wb((this.b << 8) | this.c, this.a); return 8;
          case 0x12: this.wb((this.d << 8) | this.e, this.a); return 8;
          case 0x22: { const hl = this.hl; this.wb(hl, this.a); this.hl = hl + 1; return 8; }
          case 0x32: { const hl = this.hl; this.wb(hl, this.a); this.hl = hl - 1; return 8; }
          case 0x0a: this.a = this.rb((this.b << 8) | this.c); return 8;
          case 0x1a: this.a = this.rb((this.d << 8) | this.e); return 8;
          case 0x2a: { const hl = this.hl; this.a = this.rb(hl); this.hl = hl + 1; return 8; }
          case 0x3a: { const hl = this.hl; this.a = this.rb(hl); this.hl = hl - 1; return 8; }
          case 0x03: case 0x13: case 0x23: case 0x33: this.setRR(op >> 4, this.getRR(op >> 4) + 1); return 8;
          case 0x0b: case 0x1b: case 0x2b: case 0x3b: this.setRR(op >> 4, this.getRR(op >> 4) - 1); return 8;
          case 0x09: case 0x19: case 0x29: case 0x39: {
            const hl = this.hl, v = this.getRR(op >> 4), r = hl + v;
            this.f = (this.f & FZ) | ((hl & 0xfff) + (v & 0xfff) > 0xfff ? FH : 0) | (r > 0xffff ? FC : 0);
            this.hl = r & 0xffff; return 8;
          }
          case 0x07: { const c = this.a >> 7; this.a = ((this.a << 1) | c) & 255; this.f = c ? FC : 0; return 4; }
          case 0x0f: { const c = this.a & 1; this.a = (this.a >> 1) | (c << 7); this.f = c ? FC : 0; return 4; }
          case 0x17: { const c = this.a >> 7; this.a = ((this.a << 1) | ((this.f & FC) ? 1 : 0)) & 255; this.f = c ? FC : 0; return 4; }
          case 0x1f: { const c = this.a & 1; this.a = (this.a >> 1) | ((this.f & FC) ? 0x80 : 0); this.f = c ? FC : 0; return 4; }
          case 0x08: { const a = this.fetch16(); this.wb(a, this.sp & 255); this.wb(a + 1, this.sp >> 8); return 20; }
          case 0x10: { // STOP
            this.fetch();
            const mmu = this.gb.mmu;
            if (this.gb.cgb && (mmu.key1 & 1)) {
              this.doubleSpeed = !this.doubleSpeed;
              mmu.key1 = this.doubleSpeed ? 0x80 : 0;
            }
            return 4;
          }
          case 0x18: { const e = (this.fetch() << 24) >> 24; this.pc = (this.pc + e) & 0xffff; return 12; }
          case 0x20: case 0x28: case 0x30: case 0x38: {
            const e = (this.fetch() << 24) >> 24;
            if (this.cond((op >> 3) & 3)) { this.pc = (this.pc + e) & 0xffff; return 12; }
            return 8;
          }
          case 0x27: {
            let a = this.a, cf = this.f & FC;
            if (!(this.f & FN)) {
              if (cf || a > 0x99) { a += 0x60; cf = FC; }
              if ((this.f & FH) || (a & 15) > 9) a += 6;
            } else {
              if (cf) a -= 0x60;
              if (this.f & FH) a -= 6;
            }
            a &= 255;
            this.a = a; this.f = (a ? 0 : FZ) | (this.f & FN) | cf; return 4;
          }
          case 0x2f: this.a ^= 0xff; this.f |= FN | FH; return 4;
          case 0x37: this.f = (this.f & FZ) | FC; return 4;
          case 0x3f: this.f = (this.f & FZ) | ((this.f & FC) ? 0 : FC); return 4;
        }
        return 4;
      }
      // 0xC0 - 0xFF
      const lo = op & 7;
      if (lo === 7) { this.push(this.pc); this.pc = op & 0x38; return 16; }
      if (lo === 6) { this.alu((op >> 3) & 7, this.fetch()); return 8; }
      switch (op) {
        case 0xc0: case 0xc8: case 0xd0: case 0xd8:
          if (this.cond((op >> 3) & 3)) { this.pc = this.pop(); return 20; }
          return 8;
        case 0xc9: this.pc = this.pop(); return 16;
        case 0xd9: this.pc = this.pop(); this.ime = true; return 16;
        case 0xc1: { const v = this.pop(); this.b = v >> 8; this.c = v & 255; return 12; }
        case 0xd1: { const v = this.pop(); this.d = v >> 8; this.e = v & 255; return 12; }
        case 0xe1: this.hl = this.pop(); return 12;
        case 0xf1: { const v = this.pop(); this.a = v >> 8; this.f = v & 0xf0; return 12; }
        case 0xc5: this.push((this.b << 8) | this.c); return 16;
        case 0xd5: this.push((this.d << 8) | this.e); return 16;
        case 0xe5: this.push(this.hl); return 16;
        case 0xf5: this.push((this.a << 8) | this.f); return 16;
        case 0xc2: case 0xca: case 0xd2: case 0xda: {
          const a = this.fetch16();
          if (this.cond((op >> 3) & 3)) { this.pc = a; return 16; }
          return 12;
        }
        case 0xc3: this.pc = this.fetch16(); return 16;
        case 0xe9: this.pc = this.hl; return 4;
        case 0xc4: case 0xcc: case 0xd4: case 0xdc: {
          const a = this.fetch16();
          if (this.cond((op >> 3) & 3)) { this.push(this.pc); this.pc = a; return 24; }
          return 12;
        }
        case 0xcd: { const a = this.fetch16(); this.push(this.pc); this.pc = a; return 24; }
        case 0xcb: return this.cb(this.fetch());
        case 0xe0: this.wb(0xff00 | this.fetch(), this.a); return 12;
        case 0xf0: this.a = this.rb(0xff00 | this.fetch()); return 12;
        case 0xe2: this.wb(0xff00 | this.c, this.a); return 8;
        case 0xf2: this.a = this.rb(0xff00 | this.c); return 8;
        case 0xea: this.wb(this.fetch16(), this.a); return 16;
        case 0xfa: this.a = this.rb(this.fetch16()); return 16;
        case 0xe8: this.sp = this.addSpE(); return 16;
        case 0xf8: this.hl = this.addSpE(); return 12;
        case 0xf9: this.sp = this.hl; return 8;
        case 0xf3: this.ime = false; this.eiDelay = 0; return 4;
        case 0xfb: if (!this.ime && !this.eiDelay) this.eiDelay = 2; return 4;
      }
      // illegal opcode: the real CPU locks up; treat as a hang
      this.pc = (this.pc - 1) & 0xffff;
      return 4;
    }
  }

  // ------------------------------------------------------------------ System
  class GameBoy {
    constructor(romBytes, opts) {
      opts = opts || {};
      this.cart = new Cartridge(romBytes);
      const flag = this.cart.cgbFlag;
      this.cgb = opts.forceDmg ? false : (flag === 0x80 || flag === 0xc0);
      this.cpu = new CPU(this);
      this.ppu = new PPU(this);
      this.apu = new APU(this);
      this.timer = new Timer(this);
      this.mmu = new MMU(this, this.cart);
      if (opts.palette) this.ppu.setDmgPalette(opts.palette);
      this.reset();
    }
    reset() {
      const c = this.cpu;
      if (this.cgb) { c.a = 0x11; c.f = 0x80; c.b = 0x00; c.c = 0x00; c.d = 0xff; c.e = 0x56; c.h = 0x00; c.l = 0x0d; }
      else { c.a = 0x01; c.f = 0xb0; c.b = 0x00; c.c = 0x13; c.d = 0x00; c.e = 0xd8; c.h = 0x01; c.l = 0x4d; }
      c.sp = 0xfffe; c.pc = 0x100;
      const w = (a, v) => this.mmu.write(a, v);
      w(0xff26, 0xf1); w(0xff10, 0x80); w(0xff11, 0xbf); w(0xff12, 0xf3); w(0xff14, 0xbf);
      w(0xff16, 0x3f); w(0xff19, 0xbf); w(0xff1a, 0x7f); w(0xff1b, 0xff); w(0xff1c, 0x9f);
      w(0xff1e, 0xbf); w(0xff20, 0xff); w(0xff23, 0xbf); w(0xff24, 0x77); w(0xff25, 0xf3);
      this.apu.ch.forEach(ch => { ch.on = false; });
      this.ppu.lcdc = 0x91; this.ppu.bgp = 0xfc;
      this.mmu.if = 0xe1 & 0x1f;
    }
    requestIrq(n) { this.mmu.if |= 1 << n; }
    setButtons(mask) {
      // mask bits: 0 right 1 left 2 up 3 down 4 a 5 b 6 select 7 start (1 = pressed)
      const prev = this.mmu.buttons;
      this.mmu.buttons = (~mask) & 0xff;
      if (prev & ~this.mmu.buttons & 0xff) this.requestIrq(4);
    }
    runFrame() {
      const cpu = this.cpu, ppu = this.ppu, apu = this.apu, timer = this.timer;
      ppu.frameReady = false;
      let budget = FRAME_CYCLES * (cpu.doubleSpeed ? 2 : 1) * 1.05;
      let total = 0;
      while (!ppu.frameReady && total < budget) {
        const c = cpu.step();
        total += c;
        timer.tick(c);
        const pc = cpu.doubleSpeed ? c >> 1 : c;
        ppu.tick(pc);
        apu.tick(pc);
      }
      if (!ppu.frameReady && !(ppu.lcdc & 0x80)) ppu.fb.fill(this.cgb ? 0xffffffff : ppu.shades[0]);
    }
    // ---- saves
    saveState() {
      const s = {
        v: 1, id: this.cart.id, cgb: this.cgb,
        cpu: snap(this.cpu), ppu: snap(this.ppu, ['fb', 'shades', 'lineBg', 'linePri', 'lineObj']),
        apu: snap(this.apu, ['sink', 'sampleRate', 'enabled']), timer: snap(this.timer),
        mmu: snap(this.mmu, ['cart', 'serialOut']), cart: snap(this.cart, ['rom', 'title', 'id', 'type', 'cgbFlag', 'romBanks', 'romMask', 'mbc', 'hasBattery', 'hasRtc'])
      };
      return JSON.stringify(s);
    }
    loadState(json) {
      const s = JSON.parse(json);
      if (s.id !== this.cart.id) throw new Error('This save state belongs to a different game.');
      if (!!s.cgb !== !!this.cgb) throw new Error('Save state was made in a different colour mode.');
      restore(this.cpu, s.cpu); restore(this.ppu, s.ppu); restore(this.apu, s.apu);
      restore(this.timer, s.timer); restore(this.mmu, s.mmu); restore(this.cart, s.cart);
    }
  }

  GameBoy.Cartridge = Cartridge;
  GameBoy.DMG_PALETTES = DMG_PALETTES;
  GameBoy.b64encode = b64encode;
  GameBoy.b64decode = b64decode;
  GameBoy.FRAME_MS = 1000 * FRAME_CYCLES / CLOCK;
  root.GameBoy = GameBoy;
  if (typeof module !== 'undefined') module.exports = GameBoy;
})(typeof window !== 'undefined' ? window : globalThis);

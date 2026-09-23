// Syllabus data for learning-plan.html (Today tab + Full syllabus tab).
// v = YouTube video id, s = start second, from/to = timestamps shown to the reader.
var CWTF = "Coding With The Force";
var WW = "Warren Walters";

var LP_VIDEOS = {
  trig:  { id: "ebbj8RG5_bk", ch: CWTF, title: "The Complete Guide To Apex Triggers", len: 130 },
  soql:  { id: "WtY6zUe5Uok", ch: CWTF, title: "The Complete Guide to SOQL and SOSL", len: 178 },
  exc:   { id: "Q9hxSqlIaUY", ch: CWTF, title: "A Complete Guide to Exception Handling in Apex and LWC", len: 61 },
  dbg:   { id: "D5Mytww1nj8", ch: CWTF, title: "Apex and LWC Debugging Techniques", len: 52 },
  dml1:  { id: "MtUDsC7NulA", ch: WW,   title: "Insert Parent & Child Records At Same Time | Single DML", len: 11 },
  gptdbg:{ id: "OVQyW9pwRjQ", ch: WW,   title: "Can ChatGPT Debug Salesforce Apex Common Errors", len: 9 },
  test:  { id: "zmO8TBMhb5M", ch: CWTF, title: "The Complete Guide to Apex Tests", len: 106 },
  gpttest:{ id: "XErznVQd0e0", ch: WW,  title: "Can ChatGPT Write Apex Triggers + Test Classes", len: 24 },
  async: { id: "MDPE24fv8aI", ch: CWTF, title: "A Complete Guide To Asynchronous Apex", len: 85 },
  share: { id: "dXeTHfJVngU", ch: CWTF, title: "How and When to use Apex Managed Sharing", len: 32 },
  iface: { id: "d3xOEg1Rs88", ch: CWTF, title: "How and When to use Interfaces In Apex", len: 54 },
  solid: { id: "KPGrIh5OrkE", ch: CWTF, title: "SOLID Design Principles in Salesforce", len: 29 },
  lwc:   { id: "cMhWf7EwSSg", ch: CWTF, title: "The Beginner's Guide to Lightning Web Components", len: 128 },
  hooks: { id: "Kc4xtTKbLMM", ch: CWTF, title: "The Complete Guide to LWC Lifecycle Hooks", len: 46 },
  covid: { id: "na-o1TxqEic", ch: WW,   title: "Salesforce COVID-19 Tracker: Object Creation & API Callout", len: 63 },
  post:  { id: "MYk0ir_tIDA", ch: CWTF, title: "How to Send POST Requests In Apex", len: 34 },
  named: { id: "hIOvZZfbrto", ch: CWTF, title: "How to use Named Credentials in Apex Integrations", len: 32 },
  auth:  { id: "wOkvqAobA1M", ch: CWTF, title: "Custom Authentications for Integrations in Apex", len: 26 },
  gptint:{ id: "bZ8r26rqYuk", ch: WW,   title: "Can ChatGPT Write Apex Integrations and LWCs", len: 19 },
  mock:  { id: "Vo760HFQDFk", ch: WW,   title: "Developer Mock Interview: Governor Limits & Triggers", len: 7 },
  mockjr:{ id: "aVlIacrBCZA", ch: WW,   title: "Developer Mock Interview: Jr/Mid Questions and Answers", len: 32 },
  mocksr:{ id: "wWowOCIqkOI", ch: WW,   title: "Advanced Developer Mock Interview: Senior-Level Questions", len: 54 },
  jest:  { id: "e3LWCIUBf2Q", ch: CWTF, title: "The Complete Guide to LWC Jest Tests", len: 136 },
  dmlmock:{ id: "-esf8Q_Vp7U", ch: CWTF, title: "How to use DML Mocking in your Apex Tests", len: 32 },
  common:{ id: "HQrVEX4oE3A", ch: CWTF, title: "The Complete Guide To The Apex Common Library", len: 454 },
  cta:   { id: "y5d8BVuXg2s", ch: CWTF, title: "An Overview of the Salesforce CTA Review Board", len: 41 },
  scan:  { id: "jiY_kgs6oAo", ch: CWTF, title: "How to Automatically Scan your Code for Problems in VS Code", len: 18 },
  wwsetup:{ id: "BT4IRLrsBlg", ch: WW, title: "Install VS Code, Salesforce CLI/SFDX, and Connect to an Org", len: 10 },
  devorg:{ id: "5nzX_Vlpi3k", ch: CWTF, title: "Apex Master Class Ep. 2: Set Up a Free Developer Org", len: 7 },
  expect:{ id: "zKidSyBn-3Q", ch: CWTF, title: "Apex Master Class Ep. 1: What to Expect as a Salesforce Developer", len: 21 },
  whatapex:{ id: "iWkCmAf-Ksg", ch: CWTF, title: "Apex Master Class Ep. 3: What is Apex?", len: 14 },
  ide:   { id: "CviswPJ08PQ", ch: CWTF, title: "Apex Master Class Ep. 4: What Is An IDE?", len: 12 },
  vscode:{ id: "uhuGpLWXdE8", ch: CWTF, title: "Apex Master Class Ep. 5: Set Up VS Code for Salesforce", len: 29 },
  vars:  { id: "r4eqAZgTQqE", ch: CWTF, title: "Apex Master Class Ep. 8: What are Variables?", len: 10 },
  complex:{ id: "TKLDPaBEMuQ", ch: CWTF, title: "Apex Master Class Ep. 10: Non-Primitive / Complex Data Types", len: 25 },
  scope: { id: "SuulwoT5dZA", ch: CWTF, title: "Apex Master Class Ep. 11: Variable Scope", len: 9 },
  inst:  { id: "o2_FKE-GdIM", ch: CWTF, title: "Apex Master Class Ep. 14: How to Instantiate a Class", len: 10 },
  colls: { id: "vkBjNVZnXtA", ch: CWTF, title: "Apex Master Class Ep. 16: What are Collections?", len: 7 },
  stat2: { id: "ozMKmnHydyI", ch: CWTF, title: "Apex Master Class Ep. 21: When to use Static", len: 13 },
  glob:  { id: "eIkXfpoGI70", ch: CWTF, title: "Apex Master Class Ep. 22: The Global Keyword", len: 9 },
  pub:   { id: "O62z0MdAHdg", ch: CWTF, title: "Apex Master Class Ep. 23: The Public Keyword", len: 7 },
  prot:  { id: "JIEdZKq1HG4", ch: CWTF, title: "Apex Master Class Ep. 24: The Protected Keyword", len: 11 },
  priv:  { id: "1AiyjRto_14", ch: CWTF, title: "Apex Master Class Ep. 25: The Private Keyword", len: 11 },
  sw:    { id: "4WRbd8Si6f4", ch: CWTF, title: "Apex Master Class Ep. 27: Switch Statements", len: 10 },
  swvif: { id: "iDXBAJanvPg", ch: CWTF, title: "Apex Master Class Ep. 28: Switch vs. If/Else", len: 13 },
  safenav:{ id: "wpJsi3d6QHI", ch: CWTF, title: "The Apex Safe Navigation Operator", len: 19 },
  strdoc:{ id: "", ch: "Salesforce docs", title: "Apex Reference: String Class", len: 20, url: "https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_string.htm" },
  git:   { id: "SHGf_9NN4Sg", ch: WW, title: "Sync a GitHub Repo to a Local Salesforce SFDX Project & Org", len: 9 },
  cicd:  { id: "qegFqum-M9o", ch: CWTF, title: "Salesforce DevOps: Build a CI/CD Pipeline with GitHub", len: 65 },
  dload: { id: "P7I_IS-qXAY", ch: WW, title: "Install Salesforce Data Loader and Insert Accounts", len: 7 },
  replay:{ id: "iWXvnylWuR8", ch: CWTF, title: "Use the Apex Replay Debugger in VS Code", len: 26 },
  lwc1:  { id: "7hbaoMtp4pU", ch: CWTF, title: "LWC Master Class Ep. 1: What are LWCs and When to use them", len: 35 },
  dom:   { id: "S9rwvfQzDVw", ch: CWTF, title: "LWC Master Class Ep. 2: What is the DOM?", len: 38 },
  html:  { id: "ZRq6ioymFlA", ch: CWTF, title: "LWC Master Class Ep. 3: What is HTML?", len: 32 },
  css:   { id: "rMRk3KqjHJ8", ch: CWTF, title: "LWC Master Class Ep. 4: What is CSS?", len: 30 },
  thAgentApex:{ id: "", ch: "Trailhead (official)", title: "Agent Customization with Apex", len: 45, url: "https://trailhead.salesforce.com/content/learn/modules/agent-customization-with-apex" },
  thAfd: { id: "", ch: "Trailhead (official)", title: "Agentforce for Developers", len: 30, url: "https://trailhead.salesforce.com/content/learn/modules/einstein-for-developers" },
  thForm:{ id: "", ch: "Trailhead (official)", title: "Formulas and Validation", len: 60, url: "https://trailhead.salesforce.com/content/learn/modules/point_click_business_logic" },
  thAura:{ id: "", ch: "Trailhead (official)", title: "Quick Start: Aura Components", len: 30, url: "https://trailhead.salesforce.com/content/learn/projects/quickstart-lightning-components" },
  thDevCon:{ id: "", ch: "Trailhead (official)", title: "Org Development Model (sandboxes, scratch orgs, deployment)", len: 60, url: "https://trailhead.salesforce.com/content/learn/modules/org-development-model" },
  prims: { id: "AlU7ITcqXwA", ch: CWTF, title: "Apex Master Class Ep. 9: Primitive Data Types in Apex", len: 25 },
  ops:   { id: "DCVgtNPZSqw", ch: CWTF, title: "Apex Master Class Ep. 15: Operators in Apex", len: 16 },
  ifelse:{ id: "Mr-03GLeZk0", ch: CWTF, title: "Apex Master Class Ep. 26: Conditional Statements (If/Else)", len: 15 },
  cls:   { id: "l-iaT8mwL1Q", ch: CWTF, title: "Apex Master Class Ep. 7: What is an Apex Class?", len: 13 },
  meth:  { id: "uxJCDArPhNg", ch: CWTF, title: "Apex Master Class Ep. 12: What is a Method?", len: 11 },
  ctor:  { id: "15igov8fRkM", ch: CWTF, title: "Apex Master Class Ep. 13: What is a Constructor?", len: 13 },
  stat:  { id: "WZ1SYQrABSQ", ch: CWTF, title: "Apex Master Class Ep. 20: The Static Keyword", len: 20 },
  maps:  { id: "hs9xKfsHp5M", ch: CWTF, title: "Apex Master Class Ep. 19: What are Maps in Apex?", len: 15 },
  lists: { id: "pABf4BpQfwo", ch: CWTF, title: "Apex Master Class Ep. 17: What are Lists in Apex?", len: 17 },
  sets:  { id: "ZA7JMAQqLwU", ch: CWTF, title: "Apex Master Class Ep. 18: What are Sets in Apex?", len: 13 },
  loops: { id: "0apfPdZd2fM", ch: CWTF, title: "Apex Master Class Ep. 29: How to Write For Loops", len: 22 },
  loopbp:{ id: "540ZObWR2to", ch: CWTF, title: "Apex Master Class Ep. 30: Collection Iteration Best Practices", len: 16 },
  aireview: { id: "HD-t58qtTIs", ch: WW, title: "He gave AI a 40-hour Salesforce code review", len: 64 }
};

function lpSecs(t) { var s = 0; (t || "0:00").split(":").map(Number).forEach(function(n) { s = s * 60 + n; }); return s; }
function lpClip(key, from, to) {
  var v = LP_VIDEOS[key];
  var s = lpSecs(from);
  var mins = Math.round(((to ? lpSecs(to) : v.len * 60) - s) / 60);
  return { key: key, id: v.id, ch: v.ch, title: v.title, from: from || "", to: to || "", mins: mins, doc: !!v.url,
    url: v.url || ("https://www.youtube.com/watch?v=" + v.id + (s ? "&t=" + s + "s" : "")) };
}

// Week order follows Warren's Developer Kickstart Program:
// Setup + foundations (Getting Started, M1-3) -> data model + DML (M4) -> SOQL (M5) -> Debugging (M6) -> Triggers (M7-8) -> Async (M9) -> Integrations (M10) -> Tests (M11) -> LWC (M12).
var LP_PHASES = [
  { name: "Apex fluency", weeks: [1, 2, 3, 4, 5, 6, 7, 8] },
  { name: "LWC fluency", weeks: [9, 10] },
  { name: "Security", weeks: [11] },
  { name: "Pass PD1", weeks: [12, 13] }
];

var LP_WEEKS = [
  { n: 1, title: "Apex foundations: setup and data", lang: "Apex",
    goal: "Get your tools set up, then learn how Apex stores data: variables, types, sObjects, and collections.",
    program: "Warren Kickstart Getting Started + Modules 1\u20132 \u00b7 Igor Learn Apex: Syntax and Basics (Variables, sObjects, If/Else/Switch, Lists, Maps)",
    days: [
      { title: "Setup: dev org, VS Code, Salesforce CLI and Anonymous Apex", v: lpClip("wwsetup"), also: [lpClip("devorg"), lpClip("vscode"), lpClip("expect"), lpClip("whatapex"), lpClip("ide")], prog: "Warren Getting Started: What are Salesforce and Salesforce Development? \u00b7 VS Code and Salesforce DX \u00b7 Homework Help 1.2: Troubleshooting VS Code \u00b7 Homework Help 2.1: Using Apex Anonymous",
        focus: "an Anonymous Apex script that inserts a record, with a typo in a field API name, a missing semicolon and a debug statement that prints the wrong variable", arch: "Why do developers work in a sandbox or scratch org instead of production? What could go wrong otherwise?" },
      { title: "Variables and primitive data types", v: lpClip("prims"), also: [lpClip("vars"), lpClip("scope")], prog: "Warren Module 1: Variables, Integers, and Strings \u00b7 Apex Data Types: Comments, Compatibility, Null Values, and Dates \u00b7 Homework Help 1.1: Scoping and Current Date",
        focus: "Apex with a null pointer on an uninitialized variable, integer division that loses decimals, and a variable used outside its scope", arch: "Why does Apex treat an uninitialized Integer as null instead of 0, and where does that bite you in a trigger?" },
      { title: "Complex data types, sObjects and casting", v: lpClip("complex"), prog: "Warren Module 4: Instantiating Salesforce Objects \u00b7 Homework Help 3.2: Apex Casting \u00b7 Igor Learn Apex: sObjects",
        focus: "Apex that builds sObjects with wrong field types, casts a generic sObject to the wrong type, and reads a field that was never queried", arch: "When would you use the generic sObject type instead of Account or Contact?" },
      { title: "Operators, if/else, switch and safe navigation", v: lpClip("ifelse"), also: [lpClip("ops"), lpClip("sw"), lpClip("swvif"), lpClip("safenav")], prog: "Warren Module 1: Operators \u00b7 Order of Operations \u00b7 Module 2: Flow Control (If Statements) \u00b7 Igor Learn Apex: If / Else / Switch",
        focus: "Apex with an if/else chain that should be a switch, a String compared with == on the wrong case, and a null check that the safe navigation operator would replace", arch: "When is a switch statement clearer than if/else? Give one real example." },
      { title: "Collections: List, Set and Map", v: lpClip("maps"), also: [lpClip("colls"), lpClip("lists"), lpClip("sets")], prog: "Warren Module 2: Introduction to Collections and Lists \u00b7 Sets \u00b7 Maps",
        focus: "Apex that uses a List where it needs a Set (duplicates) and loops a List to find records instead of using a Map", arch: "You have 10,000 Contacts and need each one's Account fast. Which collection, keyed by what, and why?" }
    ] },
  { n: 2, title: "Apex foundations: loops, classes and tools", lang: "Apex",
    goal: "Write loops and classes cleanly, use Apex's built-in classes, and save your work in Git.",
    program: "Warren Kickstart Modules 2, 3 and 6 (Git) \u00b7 Igor Learn Apex: Syntax and Basics (Classes, Methods, Loops, For Each)",
    days: [
      { title: "Loops: for, for-each, while and SOQL for-loops", v: lpClip("loops"), also: [lpClip("loopbp")], prog: "Warren Module 2: Loops (Traditional For Loop) \u00b7 Jump Statements and Return (break, continue)",
        focus: "Apex loops with an off-by-one error, a list modified while looping over it, and a query inside the loop", arch: "When would you use a SOQL for-loop instead of querying into a List first?" },
      { title: "Classes, objects, methods and constructors", v: lpClip("cls"), also: [lpClip("meth"), lpClip("ctor"), lpClip("inst")], prog: "Warren Module 3: Objects and Classes \u00b7 Methods Parts 1\u20132 \u00b7 Constructors \u00b7 Homework Help 3.1: Constructors and This \u00b7 Igor Learn Apex: Classes, Methods",
        focus: "an Apex class with a constructor that never sets its fields, a method that should return a value but doesn't, and `this` missing where a parameter shadows a field", arch: "What belongs in a constructor, and what doesn't?" },
      { title: "Static and access modifiers", v: lpClip("stat"), also: [lpClip("stat2"), lpClip("priv"), lpClip("pub"), lpClip("prot"), lpClip("glob")], prog: "Warren Module 3: Access Modifiers \u00b7 Homework Help 1.3: Writing Clean Code",
        focus: "an Apex class with a static variable used where each instance needs its own value, a private method called from outside, and a class marked global for no reason", arch: "Why does a recursion guard in a trigger have to be static? And why should everything be as private as possible?" },
      { title: "Interfaces", v: lpClip("iface", "2:45", "27:38"), prog: "Warren Module 3 (review: Objects and Classes) \u00b7 on the PD1 outline under Basic Apex",
        focus: "a class full of if/else on a type string that should be an interface, and a class that claims to implement an interface but misses a method", arch: "Where would an interface make code easier to change? Name one real place (hint: trigger handlers, Batchable, Queueable are all interfaces)." },
      { title: "Math, String and Date classes", v: lpClip("strdoc"), prog: "Warren Module 3: The Math, String, and Date Classes (main lesson; no YouTube version) \u00b7 Quiz on the Math, String, and Date Classes",
        focus: "Apex that formats a name with the wrong String methods, adds days to a Date incorrectly, and rounds money with the wrong Math method", arch: "Why store dates as Date/Datetime instead of Strings? What breaks if you don't?" },
      { title: "Git and GitHub for Salesforce", v: lpClip("git"), also: [lpClip("cicd")], prog: "Warren Module 2: Version Control and GitHub \u00b7 Git Commands \u00b7 Module 6: Git Branching and Merging \u00b7 Module 7: DevOps and CI/CD",
        focus: null, arch: "Why does every change go through a branch and a pull request instead of straight to main?", quiz: "Git practice: in your practice project, make a branch, commit a small class, push it, and open a pull request." }
    ] },
  { n: 3, title: "Data, DML, exceptions & debugging", lang: "Apex",
    goal: "Understand the data model, save data safely, handle failures on purpose, and find bugs fast.",
    program: "Warren Kickstart Module 4 (DML) + Module 6 (Debugging) · Igor Learn Apex: Syntax and Basics",
    days: [
      { title: "Data model and loading data", v: lpClip("dload"), prog: "Warren PD1 Certification Training 2: Mastering Data Models and Handling Data Import/Export \u00b7 Homework Help 5.2: Deploying Fields, Downloading Metadata \u00b7 Homework Help 10.1: External Ids",
        focus: "Apex that sets a lookup with a Name instead of an Id and inserts children whose master-detail parent doesn't exist", arch: "Lookup or master-detail? What changes for sharing, deletes and roll-ups?", quiz: "5 Focus on Force questions on data modeling and data import (Data Loader vs. Data Import Wizard)." },
      { title: "DML: insert, update, upsert, parent + child in one save", v: lpClip("dml1"), prog: "Warren Module 4: Intro to DML · Homework Help 4.2: How Upserts Work",
        focus: "DML that inserts children before parents and upserts on the wrong key", arch: "Upsert on an External Id vs. query-then-update: when is each the right call?" },
      { title: "Try / catch / finally and exception types", v: lpClip("exc", "1:27", "21:50"), prog: "Warren PD1 Certification Training 6: Exception Handling",
        focus: "Apex that catches generic Exception everywhere and swallows errors", arch: "When should a save stop completely, and when should it save what it can?" },
      { title: "Custom exceptions and errors you can't catch", v: lpClip("exc", "21:50", "48:39"), prog: "Warren Module 6: Troubleshooting and Debugging",
        focus: "a service class that returns error strings instead of throwing custom exceptions", arch: "Why throw a custom exception instead of returning an error string? Who benefits?" },
      { title: "How to debug: System.debug, logs, finding bottlenecks", v: lpClip("dbg", "2:21", "35:54"), also: [lpClip("replay")], prog: "Warren Module 6: Getting Started with Debugging Apex",
        focus: "slow Apex with a hidden query-in-loop and a null pointer", arch: "A user says “it's slow sometimes.” What's your first step, and what log would you pull?" },
      { title: "Build day: have AI write Apex, then review it", v: lpClip("gptdbg"), prog: "Warren Module 6: Debugging Q&A Live Session",
        focus: "Apex with a MIXED_DML_OPERATION error and a null pointer exception", arch: "What's the one thing you now check first in any AI-written Apex?" }
    ] },
  { n: 4, title: "SOQL & SOSL", lang: "Apex",
    goal: "Query parent and child data in Apex, with bind variables, without a query in a loop.",
    program: "Warren Kickstart Module 5 (SOQL Parts 1–3) · Igor Learn Apex: SOQL",
    days: [
      { title: "SELECT, FROM, WHERE and operators", v: lpClip("soql", "4:52", "42:00"), prog: "Warren Module 5: Introduction to SOQL Part 1 · The WHERE Clause",
        focus: "SOQL queries with wrong WHERE logic (AND/OR precedence, LIKE, IN)", arch: "Why does filtering in the query beat filtering in an Apex loop?" },
      { title: "ORDER BY, LIMIT, and parent/child queries", v: lpClip("soql", "42:00", "1:10:34"), prog: "Warren Module 5: Relationship Queries · Limiting and Ordering",
        focus: "parent-to-child and child-to-parent queries with wrong relationship names", arch: "You need Accounts and all their Contacts. One query with a subquery, or two queries and a Map? Why?" },
      { title: "Aggregates, SOQL in Apex, bind variables", v: lpClip("soql", "1:20:16", "1:44:39"), prog: "Warren Module 5: Introduction to SOQL Part 3 · Homework Help 5.3",
        focus: "GROUP BY / COUNT() queries and bind variables used wrong in Apex", arch: "When would you count with an aggregate query instead of loading records and counting in Apex?" },
      { title: "Dynamic SOQL, query speed, the Query Plan tool", v: lpClip("soql", "1:44:39", "2:09:50"), prog: "Warren Module 5: Homework Help 5.2: Query Binding",
        focus: "dynamic SOQL built by string concatenation with a non-selective filter", arch: "A query on 5 million rows times out. What makes a query selective, and what would you index?" },
      { title: "SOSL and SOQL injection", v: lpClip("soql", "2:15:58", "2:57:03"), prog: "Igor Learn Apex: SOQL module (finish it)",
        focus: "a search feature using SOSL and dynamic SOQL that is open to injection", arch: "Search box across Accounts, Contacts and Leads: SOQL or SOSL? Why?" }
    ] },
  { n: 5, title: "Triggers & bulkification", lang: "Apex",
    goal: "Write a trigger + handler that survives 200 records without hitting a limit.",
    program: "Warren Kickstart Module 7 (Trigger Basics) + Module 8 (Trigger Best Practices) · Igor Learn Apex: Triggers in Apex",
    days: [
      { title: "What triggers are, and before vs. after", v: lpClip("trig", "2:26", "14:40"), prog: "Warren Module 7: Salesforce Trigger Basics",
        focus: "an Account trigger that uses before vs. after contexts wrong", arch: "A new field must be set on save. Trigger or Flow? What would make you switch your answer?" },
      { title: "Build a trigger + context variables", v: lpClip("trig", "14:40", "44:54"), prog: "Warren Module 7: Salesforce Trigger Basics",
        focus: "a Contact trigger that misuses Trigger.new, Trigger.old and Trigger.oldMap", arch: "Why can't you edit Trigger.new records in an after trigger? What would you do instead?" },
      { title: "addError, one trigger per object, when to go async", v: lpClip("trig", "44:54", "55:27"), prog: "Warren Module 8: Best Practices with Salesforce Triggers",
        focus: "two triggers on Opportunity plus an addError validation that fires at the wrong time", arch: "Two teams each want their own Opportunity trigger. What do you tell them, and why?" },
      { title: "Bulkification and staying under limits", v: lpClip("trig", "55:27", "1:20:37"), prog: "Warren Module 8: Trigger Bulkification · Homework Help 8.2: Using Maps and Optimizing Child Queries",
        focus: "a trigger with SOQL and DML inside a for loop and no Map", arch: "Data Loader pushes 10,000 records through this. Which limit breaks first, and how would you catch it before prod?" },
      { title: "Trigger handlers and frameworks", v: lpClip("trig", "1:20:37", "1:35:22"), prog: "Warren Module 8: Recursion and Cascading · Cohort 13 recording: Trigger Frameworks",
        focus: "a trigger with all its logic in the trigger body and a recursion loop", arch: "What does a trigger handler buy you when there are 5 developers on one org?" }
    ] },
  { n: 6, title: "Asynchronous Apex", lang: "Apex",
    goal: "Pick the right async tool (future, queueable, batch, schedule) and explain why.",
    program: "Warren Kickstart Module 9 (Asynchronous Apex) · Igor Learn Apex: Asynchronous Apex · Igor Integration Mastery Bonus #5",
    days: [
      { title: "What async is and when to use each type", v: lpClip("async", "2:16", "15:26"), prog: "Warren Module 9: Getting Started with Asynchronous Apex",
        focus: "a trigger doing heavy work synchronously that should be async", arch: "Callout after save, nightly cleanup of 2M records, chaining 3 steps: which async tool for each?" },
      { title: "Queueable Apex", v: lpClip("async", "15:26", "37:58"), prog: "Warren Module 9: Queueable Apex",
        focus: "a Queueable enqueued inside a loop that chains without a stop condition", arch: "Why is Queueable usually better than @future now?" },
      { title: "Future methods and record locking", v: lpClip("async", "37:58", "47:34"), prog: "Warren Module 9: Future Methods",
        focus: "a @future method that takes sObjects as parameters and updates a locked parent", arch: "Two jobs update the same Account at once. What happens, and how do you design around it?" },
      { title: "Scheduled Apex", v: lpClip("async", "47:34", "1:03:24"), prog: "Warren Module 9: Scheduled Apex",
        focus: "a Schedulable that does all its work inside execute() instead of starting a batch", arch: "What happens to scheduled jobs when you deploy a change to the class they use?" },
      { title: "Batch Apex, plus events and CDC", v: lpClip("async", "1:03:24", "1:25:04"), prog: "Warren Module 9: Batch Apex",
        focus: "a Batch class with a query inside execute() and no Database.Stateful for a running total", arch: "Batch or Platform Event for syncing changed Accounts to another team? Why?" }
    ] },
  { n: 7, title: "Apex integrations", lang: "Apex",
    goal: "Call an outside API from Apex safely, and test it without hitting the real API.",
    program: "Warren Kickstart Module 10 (Integrations) · Igor Integration Mastery Weeks 1–2 (finish them) + Week 5 (Auth)",
    days: [
      { title: "Your first GET callout", v: lpClip("covid"), prog: "Igor Integration Mastery Week #1: First Callout · Warren Module 10: The Integration GET Method",
        focus: "a GET callout with a hardcoded URL and no status-code check", arch: "What should happen when the outside API is down for an hour?" },
      { title: "POST requests and JSON wrapper classes", v: lpClip("post"), prog: "Igor Integration Mastery Week #2: Post Requests · Warren Module 10: The Integration POST Method",
        focus: "a POST callout that builds JSON by string concatenation and deserializes into the wrong type", arch: "Why use a wrapper class instead of Map<String, Object> for JSON?" },
      { title: "Callouts from triggers", v: lpClip("async", "37:58", "47:34"), prog: "Igor Integration Mastery Week #3: Requests from Triggers \u00b7 Warren Module 9: Future Methods",
        focus: "a trigger that makes an HTTP callout directly instead of handing it to @future(callout=true) or a Queueable", arch: "Why can't a trigger make a callout directly, and which async tool would you hand it to?" },
      { title: "Named Credentials", v: lpClip("named"), prog: "Igor Integration Mastery Week #5: Authentication",
        focus: "a callout with the API key hardcoded in Apex", arch: "Why do Named Credentials matter for security and for deployments between sandboxes?" },
      { title: "Custom authentication", v: lpClip("auth"), prog: "Igor Integration Mastery Week #5: Authentication",
        focus: "an OAuth token callout that requests a new token on every call and never handles expiry", arch: "Where should a token live, and who should be able to see it?" },
      { title: "Build day: have AI write an integration, then review it", v: lpClip("gptint"), prog: "Warren Module 10: JSON and Sending/Parsing Data · Homework Help 10.1",
        focus: "an AI-written callout made after DML in the same transaction", arch: "Sending new Leads to an outside system: callout from the trigger, async, or Platform Event?" }
    ] },
  { n: 8, title: "Testing", lang: "Apex",
    goal: "Write tests that prove behavior (not just coverage), including 200-record and negative cases.",
    program: "Warren Kickstart Module 11 (Test Classes) · Igor Integration Mastery Week 4: Logging & Tests",
    days: [
      { title: "Your first test and assertions", v: lpClip("test", "0:00", "23:06"), also: [lpClip("gpttest")], prog: "Warren Module 11: Getting Started with Apex Testing · Apex Unit Tests",
        focus: "a test class with no real asserts that still gets 100% coverage", arch: "Coverage is 95% and prod still broke. What does coverage not tell you?" },
      { title: "@TestSetup and a test data factory", v: lpClip("test", "23:06", "47:18"), prog: "Warren Module 11: Creating Test Data and using TestSetup",
        focus: "tests that copy-paste record setup and depend on org data", arch: "Why should a team share one test data factory? What goes wrong without it?" },
      { title: "SeeAllData, private methods, best practices", v: lpClip("test", "47:18", "1:02:32"), prog: "Warren Module 11: Test Class Annotation and Decorators · Positive and Negative Testing",
        focus: "a test using SeeAllData=true and Test.isRunningTest() in production code", arch: "Why is SeeAllData=true dangerous during a deployment?" },
      { title: "Testing callouts with mocks", v: lpClip("test", "1:02:32", "1:20:46"), prog: "Warren Module 11: Testing Callouts and Mocking",
        focus: "a callout test with no HttpCalloutMock and no status-code check", arch: "What should a callout test prove besides “it didn't crash”?" },
      { title: "Developer tools and deploying code", v: lpClip("replay"), prog: "Warren PD1 Certification Training 7: Leveraging Salesforce Developer Tools \u00b7 Training 10: Workbench Overview \u00b7 Training 11: Code Deployment \u00b7 Module 7: DevOps and CI/CD",
        focus: "a deployment package missing a test class and a field the Apex depends on", arch: "Change sets, the Salesforce CLI, or a pipeline like Copado: what's each one good for?", quiz: "5 Focus on Force questions on developer tools (Dev Console, Workbench, CLI) and deployment." }
    ] },
  { n: 9, title: "Web basics and LWC", lang: "LWC",
    goal: "Build a component that shows record data with @api, @wire, and an Apex call.",
    program: "Warren Kickstart Module 12 (LWCs Part 1 & 2) · Igor Learn LWC · Warren JavaScript Developer 101",
    days: [
      { title: "Web basics: HTML, CSS and the DOM", v: lpClip("html"), also: [lpClip("dom"), lpClip("css")], prog: "Warren Getting Started (optional): HTML and JavaScript",
        focus: "an HTML template with unclosed tags, a CSS class that never applies, and an element the JavaScript can't find", arch: "What is the DOM, and why does LWC's shadow DOM stop you reaching into another component?" },
      { title: "JavaScript for LWC", v: lpClip("lwc", "31:52", "41:00"), prog: "Warren JavaScript Developer 101 (main lesson: it teaches the JavaScript LWC actually uses)",
        focus: "JavaScript with var instead of let/const, == instead of ===, and an async call without await or .then", arch: "Why does LWC use modern JavaScript (let/const, arrow functions, promises) instead of old-style JS?" },
      { title: "What LWCs are, the four files, putting one on a page", v: lpClip("lwc", "2:09", "20:19"), also: [lpClip("lwc1")], prog: "Warren Module 12: LWCs Part 1",
        focus: "an LWC whose meta.xml is missing the target for a record page", arch: "LWC or Screen Flow for a simple form? When does code win?" },
      { title: "Templates, base components, data binding", v: lpClip("lwc", "22:15", "41:00"), prog: "Warren Module 12: LWC Reference Components",
        focus: "an LWC with wrong template bindings and an object property that never re-renders", arch: "Why use lightning-* base components instead of plain HTML?" },
      { title: "The @api and @track decorators", v: lpClip("lwc", "41:00", "53:30"), prog: "Warren Module 12: LWCs Part 2",
        focus: "an LWC that reads recordId without @api and mutates an @api property", arch: "Why can't a child change an @api property it received?" },
      { title: "@wire and Lightning Data Service", v: lpClip("lwc", "53:30", "1:14:11"), prog: "Igor Learn LWC: wire and LDS",
        focus: "an LWC @wire call with recordId not passed reactively with $ and data/error read wrong", arch: "When is LDS enough, and when do you need Apex?" },
      { title: "Calling Apex imperatively", v: lpClip("lwc", "1:14:11", "1:31:23"), prog: "Igor Learn LWC: calling Apex",
        focus: "an LWC calling a non-cacheable Apex method with @wire and no error handling", arch: "@wire or an imperative call: when would you pick each?" }
    ] },
  { n: 10, title: "LWC communication & debugging", lang: "LWC",
    goal: "Make components talk to each other, and debug them in the browser.",
    program: "Warren Kickstart Module 12 (Conditional Rendering, Parent-Child Communication) · Igor Learn LWC",
    days: [
      { title: "Debugging LWCs in the browser", v: lpClip("lwc", "1:31:23", "1:39:58"), prog: "Warren Module 12: Conditional Rendering and Lists",
        focus: "an LWC list that renders nothing because of a wrong key and a bad if:true", arch: "An LWC works for you but not for a user. What do you check first?" },
      { title: "Lifecycle hooks", v: lpClip("hooks", "0:33", "30:42"), prog: "Igor Learn LWC: lifecycle",
        focus: "an LWC that fetches data in constructor() and sets state in renderedCallback() in a loop", arch: "Why is renderedCallback() a common source of infinite loops?" },
      { title: "Child-to-parent events", v: lpClip("lwc", "1:45:28", "1:57:23"), prog: "Warren Module 12: Parent-Child and Child-Parent Communication",
        focus: "a child LWC firing an event with the wrong name casing and the parent reading detail wrong", arch: "Why do events go up and properties go down?" },
      { title: "Parent-to-child communication", v: lpClip("lwc", "1:57:23", "2:05:14"), prog: "Warren Module 12: Parent-Child and Child-Parent Communication",
        focus: "a parent calling a child method that isn't @api", arch: "Two components that aren't parent and child need to talk. What are your options?" },
      { title: "Error handling in LWC and JavaScript", v: lpClip("exc", "25:14", "36:27"), prog: "Warren Module 12: Quiz on Lightning Web Components",
        focus: "an LWC that shows a blank screen when Apex throws", arch: "What should a user see when your component's Apex call fails?" }
    ] },
  { n: 11, title: "Security", lang: "Apex",
    goal: "Write Apex that respects who can see what.",
    program: "Warren PD1 Certification Training 8: Securing User Interface and Data Access",
    days: [
      { title: "WITH SECURITY_ENFORCED and USING SCOPE", v: lpClip("soql", "1:10:34", "1:20:16"), prog: "Warren PD1 Certification Training 8 (data access part)",
        focus: "a class with no sharing keyword whose query ignores field-level security", arch: "Where should access be enforced: profile, sharing rules, or code? Why is \u2018without sharing\u2019 risky?" },
      { title: "Apex managed sharing", v: lpClip("share"), prog: "Warren PD1 Certification Training 8",
        focus: "Apex sharing code that grants access but never removes it", arch: "When do you need Apex sharing instead of a sharing rule?" },
      { title: "Agentforce and Apex for Flows and agents (@InvocableMethod)", v: lpClip("thAgentApex"), also: [lpClip("thAfd"), lpClip("scan")], prog: "Not in Warren's or Igor's programs: this is new on the PD1 exam (Salesforce's official exam topics). Build-with-AI day: use Agentforce for Developers in VS Code to help write it, then review what it wrote.",
        focus: "an @InvocableMethod for a Flow or agent action that takes one record instead of a List, isn't bulk-safe, and has no label or description", arch: "When should a Flow or an agent call Apex instead of doing the work declaratively?", quiz: "5 Focus on Force questions on Agentforce for Developers (use cases and limits) and invocable Apex." }
    ] },
  { n: 12, title: "PD1 review by exam section", lang: "PD1",
    goal: "Take a practice exam to see where you stand, then review every PD1 section.",
    program: "Warren PD1 Certification Training 1\u201312 \u00b7 Focus on Force PD1",
    days: [
      { title: "Practice exam #1", v: lpClip("mock"), prog: "Warren Modules 13\u201316: Structuring PD1 Study and How To Know When You're Ready",
        focus: "the topic you missed most on today's exam", arch: "Which section cost you the most points? That tells you where to spend the next four lessons.", quiz: "Focus on Force: full PD1 practice exam #1. Under 68%? That's when Igor's PD1 prep course is worth it." },
      { title: "Developer Fundamentals", v: lpClip("trig", "8:10", "12:59"), also: [lpClip("thForm")], prog: "Warren PD1 Certification Training 1 & 2 (multi-tenancy, data models)",
        focus: "Apex doing work a Flow or validation rule should do", arch: "Why does multi-tenancy force governor limits to exist?", quiz: "Trailhead official Cert Prep: Developer Fundamentals (practice questions + flashcards; this section is 27% of the exam). Know formula fields vs. roll-up summaries, external IDs, MVC, and Agentforce for Developers. Then: Focus on Force: Developer Fundamentals quiz" },
      { title: "Process Automation & Logic", v: lpClip("trig", "5:03", "8:10"), also: [lpClip("thForm")], prog: "Warren PD1 Certification Training 3\u20136",
        focus: "a trigger that fights with a Flow on the same field", arch: "Walk the order of execution for one Opportunity save, out loud.", quiz: "Trailhead official Cert Prep: Automation and Logic (28% of the exam). Know record-triggered flows and approval processes vs. Apex. Then: Focus on Force: Process Automation & Logic quiz" },
      { title: "User Interface: LWC recap + Visualforce basics", v: lpClip("lwc", "41:00", "53:30"), also: [lpClip("thAura")], prog: "Warren PD Certification Training 12: Visualforce and Lightning Web Components (covers the Visualforce part the video skips)",
        focus: "a Visualforce page with a custom controller that runs SOQL in a getter, plus an LWC with a caching mistake", arch: "LWC, Aura or Visualforce: why does LWC win for new work, and when would you still touch Visualforce?", quiz: "Trailhead official Cert Prep: User Interface (25%). Know Aura basics, launching a Flow from Apex, and LWCs in Flow screens (lightning__FlowScreen). Then: Focus on Force: User Interface quiz. Visualforce is still on the exam: know standard vs. custom controllers and extensions." },
      { title: "Testing, Debugging & Deployment", v: lpClip("test", "56:27", "1:02:32"), also: [lpClip("thDevCon")], prog: "Warren PD1 Certification Training 7, 9, 10, 11",
        focus: "a deployment that fails because of test data and coverage", arch: "What's the safest way to get a change from sandbox to prod? Name each step.", quiz: "Trailhead official Cert Prep: Testing, Debugging, and Deployment (20%). Know sandbox types, scratch orgs, Salesforce DX and the CLI, monitoring flows and async jobs, and how to test a Flow. Then: Focus on Force: Testing, Debugging & Deployment quiz" }
    ] },
  { n: 13, title: "Final prep and the exam", lang: "PD1",
    goal: "Two more practice exams, one light review, then pass PD1.",
    program: "Warren Modules 13\u201316: Taking the Platform Developer I Certification Exam \u00b7 Focus on Force",
    days: [
      { title: "Practice exam #2", v: lpClip("mocksr", "0:00", "25:00"), prog: "Warren: Platform Developer 1 Practice Exams/Resources",
        focus: "the topic you missed most on today's exam", arch: "Did your score move? What changed?", quiz: "Focus on Force: full PD1 practice exam #2" },
      { title: "Practice exam #3", v: lpClip("mockjr"), prog: "Warren: Platform Developer 1 Practice Exams/Resources",
        focus: "anything you missed today", arch: "Scoring 75%+ on both? You're ready.", quiz: "Focus on Force: full PD1 practice exam #3" },
      { title: "Light review of your misses", v: lpClip("trig", "1:15:35", "1:20:37"), pin: "2026-11-29", prog: "Warren: Cloud Code PD1 Slides \u00b7 Concepts/Topics that might be on the Exam",
        focus: "your weakest topic across all three practice exams", arch: "Skim your miss list once, then stop. No new material the night before.", quiz: "Focus on Force: redo only the questions you missed. 45 minutes, then rest." },
      { title: "Take PD1", v: lpClip("mock"), prog: "Warren: What To Do When You Pass / If You Fail", exam: true,
        focus: null, arch: "You're done with phase one. Next up: PD2.", quiz: "Take the Platform Developer I exam." }
    ] }
];

var LP_LATER = [
  { name: "PD2", intro: "After PD1. Same daily loop; these become the weeks.",
    items: [
      { t: "SOLID design principles", v: lpClip("solid") },
      { t: "Apex design patterns and separation of concerns", v: lpClip("common") },
      { t: "Advanced testing: DML mocking and the Stub API", v: lpClip("dmlmock") },
      { t: "Query performance and large data volumes", v: lpClip("soql", "1:59:42", "2:09:50") },
      { t: "Integrations: Igor Integration Mastery Weeks 3–8 (triggers, logging, auth, webhooks, events)" },
      { t: "LWC Jest tests", v: lpClip("jest") },
      { t: "Platform Events and Change Data Capture", v: lpClip("async", "1:16:40", "1:25:04") }
    ] },
  { name: "Architect", intro: "After PD2. Start with integration, since Igor's cohort already covers it.",
    items: [
      { t: "Integration Architect: Igor Integration Mastery Week #8" },
      { t: "Sharing & Visibility: Apex managed sharing, then sharing architecture", v: lpClip("share") },
      { t: "Data architecture and large data volumes", v: lpClip("soql", "1:50:10", "2:15:58") },
      { t: "What a CTA review board expects", v: lpClip("cta") }
    ] }
];

// Bigger hands-on projects from the three programs. Too long for a 45-minute day; do them on Sundays or after PD1.
var LP_PROJECTS = [
  { t: "Camp Apex (campapex.org): short Apex coding drills", when: "Any time, alongside weeks 1\u20132" },
  { t: "Lightning Challenges (lightningchallenges.com): Apex practice problems", when: "Any time, alongside weeks 1\u20135" },
  { t: "Igor Learn Apex project: Bank Account Management", when: "After week 2" },
  { t: "Warren Kickstart Capstone Project (Weeks 1\u20133 + final review)", when: "After week 8, or after PD1" },
  { t: "Apex Specialist Superbadge (Trailhead)", when: "After week 8 (needs triggers, async, callouts and tests)" }
];
// What was checked against, and what was left out on purpose.
var LP_COVERAGE = {
  checked: "Every lesson in Warren's Developer Kickstart Program (Getting Started, Modules 1\u201316), all 30 episodes of Coding With The Force's Apex Master Class plus their Beginner Apex Tutorials playlist, every topic in Igor's Learn Apex (Syntax and Basics, SOQL, Triggers, Async, Integrations), Salesforce's official PD1 exam topics (the four Trailhead Cert Prep modules), and Focus on Force's PD1 study guide outline. The official topics added Agentforce for Developers, invocable Apex, formula fields vs. roll-ups, Aura basics and deployment environments, which none of the three programs teach.",
  left: [
    "Warren's career lessons (LinkedIn, resumes, job search, interviews, portfolio, Scrum, career paths): career skills, not Apex, and you already have the job.",
    "Coding With The Force Ep. 6 (IntelliJ + IC2 setup): old tooling; VS Code replaced it.",
    "Harvard CS50 (Warren's optional prework): a full intro-to-CS course, far bigger than this plan.",
    "Webhooks, events & signing, logging, and the Integration Architect prep: in the PD2 and Architect phases below, not skipped."
  ]
};

// Flatten to one list of days, in order.
var LP_DAYS = [];
LP_WEEKS.forEach(function(w) {
  w.days.forEach(function(d, i) { LP_DAYS.push({ week: w, dayNum: i + 1, d: d }); });
});

function lpDebugPrompt(d, week) {
  var lang = week.lang === "LWC" ? "Lightning Web Component (HTML + JS) and any Apex it needs" : "Salesforce Apex";
  return "Write " + lang + " for this: " + d.focus + ". Hide 3 realistic bugs a code reviewer should catch. " +
    "Don't tell me where they are. When I reply with what I found, grade me and show anything I missed.";
}

// Schedule: one lesson Mon\u2013Fri, two on Saturdays, Sundays off, skipping LP_SKIP. The exam lesson is pinned to LP_EXAM; a lesson with `pin` gets that date.
var LP_START = "2026-09-24", LP_EXAM = "2026-11-30", LP_SKIP = ["2026-11-26"];
function lpYmd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function lpDate(ymd) { var p = ymd.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
var LP_DATES = (function() {
  var out = [], d = lpDate(LP_START), used = 0;
  LP_DAYS.forEach(function(item) {
    if (item.d.exam) { out.push(lpDate(LP_EXAM)); return; }
    if (item.d.pin) { out.push(lpDate(item.d.pin)); return; }
    while (d.getDay() === 0 || LP_SKIP.indexOf(lpYmd(d)) !== -1 || used >= (d.getDay() === 6 ? 2 : 1)) { d.setDate(d.getDate() + 1); used = 0; }
    out.push(new Date(d));
    used++;
  });
  return out;
})();
function lpFmt(d) { return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); }
// Index of the lesson you should be on today (-1 before the start date).
function lpDueIndex() {
  var today = lpYmd(new Date()), idx = -1;
  LP_DATES.forEach(function(d, i) { if (lpYmd(d) <= today) idx = i; });
  return idx;
}

var LP_KEY = "learning-plan-v2";
function lpLoad() {
  var st = { day: 0, checks: {} };
  try { var raw = localStorage.getItem(LP_KEY); if (raw) st = Object.assign(st, JSON.parse(raw)); } catch (e) {}
  st.day = Math.min(Math.max(st.day | 0, 0), LP_DAYS.length - 1);
  return st;
}
function lpSave(st) { try { localStorage.setItem(LP_KEY, JSON.stringify(st)); } catch (e) {} }

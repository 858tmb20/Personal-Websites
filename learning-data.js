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
  return { key: key, id: v.id, ch: v.ch, title: v.title, from: from || "", to: to || "", mins: mins,
    url: "https://www.youtube.com/watch?v=" + v.id + (s ? "&t=" + s + "s" : "") };
}

// Week order follows Warren's Developer Kickstart Program:
// Foundations (M1-3) -> DML (M4) -> SOQL (M5) -> Debugging (M6) -> Triggers (M7-8) -> Async (M9) -> Integrations (M10) -> Tests (M11) -> LWC (M12).
var LP_PHASES = [
  { name: "Apex fluency", weeks: [1, 2, 3, 4, 5, 6, 7] },
  { name: "LWC fluency", weeks: [8, 9] },
  { name: "Security", weeks: [10] },
  { name: "Pass PD1", weeks: [11, 12] }
];

var LP_WEEKS = [
  { n: 1, title: "Apex foundations", lang: "Apex",
    goal: "Solid basics: data types, collections, loops, and classes. The stuff every other week is built on.",
    program: "Warren Kickstart Modules 1\u20133 (Variables, Collections, Loops, Classes) \u00b7 Igor Learn Apex: Syntax and Basics",
    days: [
      { title: "Variables, data types, operators and if/else", v: lpClip("prims"), also: [lpClip("ops"), lpClip("ifelse")], prog: "Warren Module 1: Variables, Data Types, and Operators \u00b7 Module 2: Flow Control (If statements)",
        focus: "Apex with a null pointer on an uninitialized variable, integer division that loses decimals, and a String compared with == on the wrong case", arch: "Why does Apex treat an uninitialized Integer as null instead of 0, and where does that bite you in a trigger?" },
      { title: "Collections: List, Set and Map", v: lpClip("maps"), also: [lpClip("lists"), lpClip("sets")], prog: "Warren Module 2: Introduction to Collections and Lists \u00b7 Sets \u00b7 Maps",
        focus: "Apex that uses a List where it needs a Set (duplicates) and loops a List to find records instead of using a Map", arch: "You have 10,000 Contacts and need each one's Account fast. Which collection, keyed by what, and why?" },
      { title: "Loops: for, for-each, while and SOQL for-loops", v: lpClip("loops"), also: [lpClip("loopbp")], prog: "Warren Module 2: Loops (Traditional For Loop) \u00b7 Jump Statements and Return",
        focus: "Apex loops with an off-by-one error, a list modified while looping over it, and a query inside the loop", arch: "When would you use a SOQL for-loop instead of querying into a List first?" },
      { title: "Classes, methods, constructors and static", v: lpClip("cls"), also: [lpClip("meth"), lpClip("ctor"), lpClip("stat")], prog: "Warren Module 3: Objects and Classes \u00b7 Methods Parts 1\u20132 \u00b7 Constructors \u00b7 Access Modifiers \u00b7 The Math, String, and Date Classes",
        focus: "an Apex class with a constructor that never sets its fields, a static variable used where each instance needs its own value, and a private method called from outside", arch: "Why does a recursion guard in a trigger have to be static? What would break if it weren't?" }
    ] },
  { n: 2, title: "DML, exceptions & debugging", lang: "Apex",
    goal: "Save data safely, handle failures on purpose, and find bugs fast.",
    program: "Warren Kickstart Module 4 (DML) + Module 6 (Debugging) · Igor Learn Apex: Syntax and Basics",
    days: [
      { title: "DML: insert, update, upsert, parent + child in one save", v: lpClip("dml1"), prog: "Warren Module 4: Intro to DML · Homework Help 4.2: How Upserts Work",
        focus: "DML that inserts children before parents and upserts on the wrong key", arch: "Upsert on an External Id vs. query-then-update: when is each the right call?" },
      { title: "Try / catch / finally and exception types", v: lpClip("exc", "1:27", "21:50"), prog: "Warren PD1 Certification Training 6: Exception Handling",
        focus: "Apex that catches generic Exception everywhere and swallows errors", arch: "When should a save stop completely, and when should it save what it can?" },
      { title: "Custom exceptions and errors you can't catch", v: lpClip("exc", "21:50", "48:39"), prog: "Warren Module 6: Troubleshooting and Debugging",
        focus: "a service class that returns error strings instead of throwing custom exceptions", arch: "Why throw a custom exception instead of returning an error string? Who benefits?" },
      { title: "How to debug: System.debug, logs, finding bottlenecks", v: lpClip("dbg", "2:21", "35:54"), prog: "Warren Module 6: Getting Started with Debugging Apex",
        focus: "slow Apex with a hidden query-in-loop and a null pointer", arch: "A user says “it's slow sometimes.” What's your first step, and what log would you pull?" },
      { title: "Build day: have AI write Apex, then review it", v: lpClip("gptdbg"), prog: "Warren Module 6: Debugging Q&A Live Session",
        focus: "Apex with a MIXED_DML_OPERATION error and a null pointer exception", arch: "What's the one thing you now check first in any AI-written Apex?" }
    ] },
  { n: 3, title: "SOQL & SOSL", lang: "Apex",
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
  { n: 4, title: "Triggers & bulkification", lang: "Apex",
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
  { n: 5, title: "Asynchronous Apex", lang: "Apex",
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
  { n: 6, title: "Apex integrations", lang: "Apex",
    goal: "Call an outside API from Apex safely, and test it without hitting the real API.",
    program: "Warren Kickstart Module 10 (Integrations) · Igor Integration Mastery Weeks 1–2 (finish them) + Week 5 (Auth)",
    days: [
      { title: "Your first GET callout", v: lpClip("covid"), prog: "Igor Integration Mastery Week #1: First Callout · Warren Module 10: The Integration GET Method",
        focus: "a GET callout with a hardcoded URL and no status-code check", arch: "What should happen when the outside API is down for an hour?" },
      { title: "POST requests and JSON wrapper classes", v: lpClip("post"), prog: "Igor Integration Mastery Week #2: Post Requests · Warren Module 10: The Integration POST Method",
        focus: "a POST callout that builds JSON by string concatenation and deserializes into the wrong type", arch: "Why use a wrapper class instead of Map<String, Object> for JSON?" },
      { title: "Named Credentials", v: lpClip("named"), prog: "Igor Integration Mastery Week #5: Authentication",
        focus: "a callout with the API key hardcoded in Apex", arch: "Why do Named Credentials matter for security and for deployments between sandboxes?" },
      { title: "Custom authentication", v: lpClip("auth"), prog: "Igor Integration Mastery Week #5: Authentication",
        focus: "an OAuth token callout that requests a new token on every call and never handles expiry", arch: "Where should a token live, and who should be able to see it?" },
      { title: "Build day: have AI write an integration, then review it", v: lpClip("gptint"), prog: "Warren Module 10: JSON and Sending/Parsing Data · Homework Help 10.1",
        focus: "an AI-written callout made after DML in the same transaction", arch: "Sending new Leads to an outside system: callout from the trigger, async, or Platform Event?" }
    ] },
  { n: 7, title: "Testing", lang: "Apex",
    goal: "Write tests that prove behavior (not just coverage), including 200-record and negative cases.",
    program: "Warren Kickstart Module 11 (Test Classes) · Igor Integration Mastery Week 4: Logging & Tests",
    days: [
      { title: "Your first test and assertions", v: lpClip("test", "0:00", "23:06"), prog: "Warren Module 11: Getting Started with Apex Testing · Apex Unit Tests",
        focus: "a test class with no real asserts that still gets 100% coverage", arch: "Coverage is 95% and prod still broke. What does coverage not tell you?" },
      { title: "@TestSetup and a test data factory", v: lpClip("test", "23:06", "47:18"), prog: "Warren Module 11: Creating Test Data and using TestSetup",
        focus: "tests that copy-paste record setup and depend on org data", arch: "Why should a team share one test data factory? What goes wrong without it?" },
      { title: "SeeAllData, private methods, best practices", v: lpClip("test", "47:18", "1:02:32"), prog: "Warren Module 11: Test Class Annotation and Decorators · Positive and Negative Testing",
        focus: "a test using SeeAllData=true and Test.isRunningTest() in production code", arch: "Why is SeeAllData=true dangerous during a deployment?" },
      { title: "Testing callouts with mocks", v: lpClip("test", "1:02:32", "1:20:46"), prog: "Warren Module 11: Testing Callouts and Mocking",
        focus: "a callout test with no HttpCalloutMock and no status-code check", arch: "What should a callout test prove besides “it didn't crash”?" },
      { title: "Build day: have AI write tests, then review them", v: lpClip("gpttest"), prog: "Warren Module 11: Testing Triggers · Homework Help 11.1",
        focus: "an AI-written trigger test that inserts 1 record and asserts nothing useful", arch: "Write the one test you'd demand in a code review before approving a trigger." }
    ] },
  { n: 8, title: "LWC basics", lang: "LWC",
    goal: "Build a component that shows record data with @api, @wire, and an Apex call.",
    program: "Warren Kickstart Module 12 (LWCs Part 1 & 2) · Igor Learn LWC · Warren JavaScript Developer 101",
    days: [
      { title: "What LWCs are, the four files, putting one on a page", v: lpClip("lwc", "2:09", "20:19"), prog: "Warren Module 12: LWCs Part 1",
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
  { n: 9, title: "LWC communication & debugging", lang: "LWC",
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
  { n: 10, title: "Security", lang: "Apex",
    goal: "Write Apex that respects who can see what.",
    program: "Warren PD1 Certification Training 8: Securing User Interface and Data Access",
    days: [
      { title: "WITH SECURITY_ENFORCED and USING SCOPE", v: lpClip("soql", "1:10:34", "1:20:16"), prog: "Warren PD1 Certification Training 8 (data access part)",
        focus: "a class with no sharing keyword whose query ignores field-level security", arch: "Where should access be enforced: profile, sharing rules, or code? Why is \u2018without sharing\u2019 risky?" },
      { title: "Apex managed sharing", v: lpClip("share"), prog: "Warren PD1 Certification Training 8",
        focus: "Apex sharing code that grants access but never removes it", arch: "When do you need Apex sharing instead of a sharing rule?" },
      { title: "Build day: have AI scan and review code", v: lpClip("scan"), prog: "Warren: \u201cHe gave AI a 40-hour code review\u201d (YouTube)",
        focus: "an Apex controller with a SOQL injection, no CRUD check and a hardcoded Id", arch: "What would you put on a code-review checklist for your team? Top 5." }
    ] },
  { n: 11, title: "PD1 review by exam section", lang: "PD1",
    goal: "Go through every PD1 exam section once, then take your first full practice exam.",
    program: "Warren PD1 Certification Training 1\u201312 \u00b7 Focus on Force PD1",
    days: [
      { title: "Developer Fundamentals", v: lpClip("trig", "8:10", "12:59"), prog: "Warren PD1 Certification Training 1 & 2 (multi-tenancy, data models)",
        focus: "Apex doing work a Flow or validation rule should do", arch: "Why does multi-tenancy force governor limits to exist?", quiz: "Focus on Force: Developer Fundamentals quiz" },
      { title: "Process Automation & Logic", v: lpClip("trig", "5:03", "8:10"), prog: "Warren PD1 Certification Training 3\u20136",
        focus: "a trigger that fights with a Flow on the same field", arch: "Walk the order of execution for one Opportunity save, out loud.", quiz: "Focus on Force: Process Automation & Logic quiz" },
      { title: "User Interface: LWC recap + Visualforce basics", v: lpClip("lwc", "41:00", "53:30"), prog: "Warren PD Certification Training 12: Visualforce and Lightning Web Components (covers the Visualforce part the video skips)",
        focus: "a Visualforce page with a custom controller that runs SOQL in a getter, plus an LWC with a caching mistake", arch: "LWC, Aura or Visualforce: why does LWC win for new work, and when would you still touch Visualforce?", quiz: "Focus on Force: User Interface quiz. Visualforce is still on the exam: know standard vs. custom controllers and extensions." },
      { title: "Testing, Debugging & Deployment", v: lpClip("test", "56:27", "1:02:32"), prog: "Warren PD1 Certification Training 7, 9, 10, 11",
        focus: "a deployment that fails because of test data and coverage", arch: "What's the safest way to get a change from sandbox to prod? Name each step.", quiz: "Focus on Force: Testing, Debugging & Deployment quiz" },
      { title: "Practice exam #1", v: lpClip("mock"), prog: "Warren Modules 13\u201316: Structuring PD1 Study and How To Know When You're Ready",
        focus: "the topic you missed most on today's exam", arch: "Which section cost you the most points, and why?", quiz: "Focus on Force: full PD1 practice exam #1. Under 68%? That's when Igor's PD1 prep course is worth it." }
    ] },
  { n: 12, title: "Final prep and the exam", lang: "PD1",
    goal: "Fix your weak spots, prove you're ready on two more practice exams, then pass PD1.",
    program: "Warren Modules 13\u201316: Taking the Platform Developer I Certification Exam \u00b7 Focus on Force",
    days: [
      { title: "Weak spots from practice exam #1", v: lpClip("trig", "1:04:36", "1:20:37"), prog: "Rewatch the syllabus lesson for your weakest topic \u00b7 Warren: Concepts/Topics that might be on the Exam",
        focus: "your two weakest topics from practice exam #1", arch: "Explain your weakest topic like you're teaching it to a new admin.", quiz: "Focus on Force: quizzes on your two weakest topics" },
      { title: "Practice exam #2", v: lpClip("mocksr", "0:00", "25:00"), prog: "Warren: Platform Developer 1 Practice Exams/Resources",
        focus: "the topic you missed most on today's exam", arch: "Did your score move? What changed?", quiz: "Focus on Force: full PD1 practice exam #2" },
      { title: "Practice exam #3", v: lpClip("mockjr"), prog: "Warren: Platform Developer 1 Practice Exams/Resources",
        focus: "anything you missed today", arch: "Scoring 75%+ on both? You're ready.", quiz: "Focus on Force: full PD1 practice exam #3" },
      { title: "Take PD1", v: lpClip("mock"), prog: "Warren: What To Do When You Pass / If You Fail", exam: true,
        focus: null, arch: "You're done with phase one. Next up: PD2.", quiz: "Take the Platform Developer I exam. Sunday (Nov 29): skim your miss list once and rest, no new material." }
    ] }
];

var LP_LATER = [
  { name: "PD2", intro: "After PD1. Same daily loop; these become the weeks.",
    items: [
      { t: "Interfaces in Apex", v: lpClip("iface") },
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

// Schedule: one lesson a day Mon\u2013Sat from LP_START, skipping LP_SKIP. The exam lesson is pinned to LP_EXAM.
var LP_START = "2026-09-24", LP_EXAM = "2026-11-30", LP_SKIP = ["2026-11-26", "2026-11-27"];
function lpYmd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function lpDate(ymd) { var p = ymd.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2]); }
var LP_DATES = (function() {
  var out = [], d = lpDate(LP_START);
  LP_DAYS.forEach(function(item) {
    if (item.d.exam) { out.push(lpDate(LP_EXAM)); return; }
    while (d.getDay() === 0 || LP_SKIP.indexOf(lpYmd(d)) !== -1) d.setDate(d.getDate() + 1);
    out.push(new Date(d));
    d.setDate(d.getDate() + 1);
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

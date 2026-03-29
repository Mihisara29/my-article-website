export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage?: string;
  featured?: boolean;
  content: string;
}


// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE 1 — Java Memory & OOP
// ─────────────────────────────────────────────────────────────────────────────
const javaMemoryArticle: Article = {
  id: "java-memory-oop",
  title: "What Really Happens in Memory When You Write a Java Class?",
  subtitle:
    "A journey from variables and types all the way down to RAM, the Heap, and the Method Area",
  category: "Java · Deep Dive",
  date: "March 15, 2026",
  readTime: "12 min read",
  excerpt:
    "Most people learn OOP the textbook way — memorizing that 'a class is a blueprint.' But what is actually happening inside your computer's memory when you hit run?",
  featured: true,
  content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>What Really Happens in Memory When You Write a Java Class?</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<style>
  :root {
    --ink: #1a1814;
    --ink-mid: #3d3830;
    --ink-soft: #6b6358;
    --ink-faint: #9c9489;
    --paper: #faf8f4;
    --paper-warm: #f3efe8;
    --paper-card: #ffffff;
    --accent: #c0392b;
    --accent-warm: #e67e22;
    --accent-cool: #2980b9;
    --accent-teal: #16a085;
    --accent-purple: #8e44ad;
    --rule: #e2ddd6;
    --code-bg: #f0ece4;
    --shadow: 0 2px 24px rgba(26,24,20,0.08);
    --shadow-lg: 0 8px 48px rgba(26,24,20,0.12);
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }

  /* ── Base typography: fluid font size ── */
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: clamp(16px, 2.5vw, 19px);
    line-height: 1.85;
    font-weight: 300;
  }

  #progress {
    position: fixed; top: 0; left: 0; height: 3px;
    background: var(--accent);
    width: 0%; z-index: 100;
    transition: width 0.1s linear;
  }

  .drop-cap::first-letter {
    font-family: 'Playfair Display', serif;
    font-size: 4.8em;
    font-weight: 700;
    float: left;
    line-height: 0.78;
    margin: 0.06em 0.1em 0 0;
    color: var(--accent);
  }

  p { margin-bottom: 1.6em; color: var(--ink-mid); }

  /* ── Headings: clamp prevents overflow on narrow screens ── */
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(21px, 4vw, 30px);
    font-weight: 700;
    color: var(--ink);
    margin: clamp(36px, 6vw, 64px) 0 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--rule);
    line-height: 1.3;
    scroll-margin-top: 160px;
  }
  h2 .num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--accent);
    display: block;
    margin-bottom: 4px;
    letter-spacing: 0.1em;
  }
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 3vw, 22px);
    font-weight: 400;
    font-style: italic;
    color: var(--ink);
    margin: 28px 0 12px;
  }

  /* ── Blockquote: tighter padding on mobile ── */
  blockquote {
    border-left: 4px solid var(--accent);
    margin: 32px 0;
    padding: 16px clamp(16px, 4vw, 32px);
    background: var(--paper-warm);
    border-radius: 0 8px 8px 0;
  }
  blockquote p {
    font-family: 'Playfair Display', serif;
    font-size: clamp(17px, 3vw, 22px);
    font-style: italic;
    color: var(--ink);
    margin: 0;
    line-height: 1.5;
  }

  /* ── Code blocks: horizontal scroll with momentum on iOS ── */
  pre {
    background: #1e1e2e !important;
    border-radius: 10px;
    padding: clamp(16px, 3vw, 28px) clamp(16px, 4vw, 32px);
    margin: 24px 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: var(--shadow);
    position: relative;
    opacity: 1 !important;
  }
  pre::before {
    content: attr(data-lang);
    position: absolute; top: 10px; right: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(250,248,244,0.4);
  }
  pre code {
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(12px, 2vw, 14.5px);
    line-height: 1.75;
    color: #cdd6f4 !important;
    opacity: 1 !important;
    background: none !important;
    border: none !important;
    padding: 0 !important;
    white-space: pre; /* keep indentation; scroll instead of wrap */
  }
  .kw   { color: #f38ba8 !important; opacity: 1 !important; }
  .ty   { color: #f9e2af !important; opacity: 1 !important; }
  .str  { color: #a6e3a1 !important; opacity: 1 !important; }
  .cm   { color: #6c7086 !important; font-style: italic; opacity: 1 !important; }
  .fn   { color: #89b4fa !important; opacity: 1 !important; }
  .num-c { color: #fab387 !important; opacity: 1 !important; }

  /* ── Inline code ── */
  p code, li code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    background: var(--code-bg);
    padding: 2px 7px;
    border-radius: 4px;
    color: var(--accent);
    opacity: 1 !important;
    word-break: break-word; /* prevent long tokens overflowing on mobile */
  }

  /* ── Diagram cards: SVGs scale with container ── */
  .diagram-card {
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: 16px;
    padding: clamp(16px, 4vw, 32px) clamp(12px, 3vw, 28px) clamp(14px, 3vw, 24px);
    margin: 32px 0;
    box-shadow: var(--shadow);
    overflow: hidden; /* belt-and-braces clip */
  }
  .diagram-card .caption {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-faint);
    text-align: center;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--rule);
  }
  /* Make SVGs fluid — viewBox keeps them proportional */
  .diagram-card svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .diagram-card svg text { font-family: 'Source Serif 4', serif; }

  /* ── Info boxes ── */
  .info-box {
    border: 1px solid;
    border-radius: 10px;
    padding: clamp(14px, 3vw, 20px) clamp(14px, 3vw, 24px);
    margin: 24px 0;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .info-box.tip  { border-color: rgba(22,160,133,0.3); background: rgba(22,160,133,0.05); }
  .info-box.warn { border-color: rgba(192,57,43,0.25); background: rgba(192,57,43,0.04); }
  .info-box .icon { flex-shrink: 0; margin-top: 2px; font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 500; }
  .info-box.tip  .icon { color: var(--accent-teal); }
  .info-box.warn .icon { color: var(--accent); }
  .info-box p { margin: 0; font-size: clamp(14px, 2vw, 16px); color: var(--ink-mid); }

  /* ── Table: scrollable on narrow screens ── */
  .table-wrap {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 24px 0;
    border-radius: 10px;
    border: 1px solid var(--rule);
  }
  table { width: 100%; border-collapse: collapse; font-size: clamp(12px, 2vw, 16px); min-width: 420px; }
  th {
    background: var(--ink);
    color: var(--paper);
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(10px, 1.5vw, 12px);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 14px;
    text-align: left;
    white-space: nowrap;
  }
  td { padding: 10px 14px; border-bottom: 1px solid var(--rule); color: var(--ink-mid); }
  tr:last-child td { border-bottom: none; }
  tr:nth-child(even) td { background: var(--paper-warm); }

  /* ── Stepper ── */
  .stepper {
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: 16px;
    overflow: hidden;
    margin: 32px 0;
    box-shadow: var(--shadow);
  }
  .stepper-header {
    background: var(--ink);
    color: var(--paper);
    padding: 14px clamp(14px, 3vw, 28px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    flex-wrap: wrap;
    gap: 8px;
  }
  .step-dots { display: flex; gap: 8px; }
  .step-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(250,248,244,0.2); cursor: pointer; transition: background 0.2s; }
  .step-dot.active { background: var(--accent-warm); }
  .stepper-body { padding: clamp(18px, 4vw, 32px) clamp(14px, 4vw, 28px); }
  .step-panel { display: none; animation: fadeIn 0.3s ease; }
  .step-panel.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .step-title { font-family: 'Playfair Display', serif; font-size: clamp(16px, 3vw, 20px); font-weight: 700; color: var(--ink); margin-bottom: 10px; }
  .step-title .step-num { display: inline-block; background: var(--accent); color: white; font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 2px 8px; border-radius: 3px; margin-right: 8px; vertical-align: middle; }
  .stepper-nav { padding: 12px clamp(14px, 3vw, 28px); border-top: 1px solid var(--rule); display: flex; gap: 10px; }
  .stepper-nav button { padding: 8px 18px; border-radius: 6px; border: 1px solid var(--rule); background: var(--paper-warm); color: var(--ink); font-family: 'JetBrains Mono', monospace; font-size: 12px; cursor: pointer; transition: all 0.15s; }
  .stepper-nav button:hover { background: var(--ink); color: var(--paper); }
  .stepper-nav button:disabled { opacity: 0.35; cursor: default; }
  .stepper-nav button:disabled:hover { background: var(--paper-warm); color: var(--ink); }

  /* ── Takeaways block ── */
  .takeaways { background: var(--ink); color: var(--paper); border-radius: 16px; padding: clamp(24px, 5vw, 40px); margin: clamp(36px, 6vw, 56px) 0; }
  .takeaways h2 { color: var(--paper); border-bottom-color: rgba(250,248,244,0.15); margin-top: 0; font-size: clamp(18px, 4vw, 26px); }
  .takeaways ul { list-style: none; padding: 0; }
  .takeaways li { padding: 10px 0 10px 26px; position: relative; border-bottom: 1px solid rgba(250,248,244,0.08); font-size: clamp(14px, 2.2vw, 17px); color: rgba(250,248,244,0.8); line-height: 1.65; }
  .takeaways li::before { content: '\\2192'; position: absolute; left: 0; color: var(--accent-warm); font-family: 'JetBrains Mono', monospace; }
  .takeaways li:last-child { border-bottom: none; }

  .divider { text-align: center; margin: 40px 0; color: var(--ink-faint); letter-spacing: 0.3em; font-size: 13px; }

  /* ── Constructor visualiser ── */
  .constructor-viz { padding: clamp(14px, 3vw, 24px); background: var(--paper-warm); border-radius: 12px; margin-top: 12px; }
  .field-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    margin: 6px 0;
    border: 1px solid transparent;
    transition: all 0.4s ease;
    font-family: 'JetBrains Mono', monospace;
    font-size: clamp(11px, 1.8vw, 14px);
    flex-wrap: wrap; /* let it reflow on tiny screens */
  }
  .field-row.blueprint  { background: #edf4fb; border-color: #b3cfe8; color: #1a5276; }
  .field-row.overwritten { background: #fdf0ec; border-color: #f0a898; color: #922b21; }
  .field-label { font-weight: 500; min-width: 50px; }
  .field-source { font-size: 10px; padding: 2px 7px; border-radius: 3px; margin-left: auto; white-space: nowrap; }
  .blueprint .field-source  { background: #b3cfe8; color: #1a5276; }
  .overwritten .field-source { background: #f0a898; color: #922b21; }

  /* ── Ordered list ── */
  ol { margin: 0 0 1.6em 1.4em; color: var(--ink-mid); }
  ol li { margin-bottom: 10px; font-size: clamp(15px, 2.2vw, 18px); }
</style>
</head>
<body>

<div id="progress"></div>

<div style="max-width:740px;margin:0 auto;padding:0 0 100px;">

  <p class="drop-cap">Most people learn Object-Oriented Programming the textbook way — memorizing lines like "a class is a blueprint" and "an object is an instance of a class." These definitions are correct. But they hide something far more interesting: what is <em>actually happening inside your computer's memory</em> when you type those words and hit run?</p>

  <p>In this article, we are going to pull back the curtain completely. We will connect OOP to RAM, trace every field and value to its exact memory region, and expose the one special case where the most intuitive analogy in programming completely breaks down. By the end, you will never look at a class definition the same way again.</p>

  <blockquote>
    <p>Understanding memory does not make you a slower programmer. It makes you a precise one — someone who knows <em>why</em> things work, not just that they do.</p>
  </blockquote>

  <h2 id="s1"><span class="num">01 &mdash;</span> The Analogy That Changes Everything</h2>

  <p>Before we touch memory regions, let us build the mental model with something you already know: basic variables.</p>

  <p>When you write <code>int x = 5;</code> you are doing three distinct things at once. <code>int</code> is the <strong>type</strong> — it tells the compiler what kind of thing this is. <code>x</code> is the <strong>variable name</strong> — it is a label that secretly holds a RAM address. And <code>5</code> is the <strong>value</strong> — the actual data living at that address.</p>

  <p>Now hold that structure in your head and look at this:</p>

  <pre data-lang="Java"><code><span class="ty">Car</span> myCar = <span class="kw">new</span> <span class="ty">Car</span>();</code></pre>

  <p>The mapping is exact. <code>Car</code> is the <strong>class</strong> (type). <code>myCar</code> is the <strong>object variable</strong> (name that holds an address). <code>new Car()</code> creates the <strong>object</strong> (the actual value living in memory).</p>

  <div class="diagram-card">
    <svg viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-linecap="round"/>
        </marker>
      </defs>
      <text x="185" y="26" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#9c9489" letter-spacing="2">VARIABLES</text>
      <text x="495" y="26" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#9c9489" letter-spacing="2">OOP</text>
      <text x="340" y="26" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="14" fill="#c0392b">&#8801;</text>
      <rect x="42" y="42" width="286" height="62" rx="10" fill="#edf7f4" stroke="#16a085" stroke-width="1"/>
      <text x="185" y="66" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" font-weight="700" fill="#0e6655">Type</text>
      <text x="185" y="86" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#16a085">int · String · boolean…</text>
      <text x="340" y="76" text-anchor="middle" font-size="22" fill="#c0392b" font-weight="700">=</text>
      <rect x="352" y="42" width="286" height="62" rx="10" fill="#edf7f4" stroke="#16a085" stroke-width="1"/>
      <text x="495" y="66" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" font-weight="700" fill="#0e6655">Class</text>
      <text x="495" y="86" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#16a085">Car · Dog · Person…</text>
      <rect x="42" y="122" width="286" height="62" rx="10" fill="#f4f0fb" stroke="#8e44ad" stroke-width="1"/>
      <text x="185" y="146" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" font-weight="700" fill="#6c3483">Variable name</text>
      <text x="185" y="166" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#8e44ad">Holds a RAM address</text>
      <text x="340" y="156" text-anchor="middle" font-size="22" fill="#c0392b" font-weight="700">=</text>
      <rect x="352" y="122" width="286" height="62" rx="10" fill="#f4f0fb" stroke="#8e44ad" stroke-width="1"/>
      <text x="495" y="146" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" font-weight="700" fill="#6c3483">Object variable</text>
      <text x="495" y="166" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#8e44ad">Holds a Heap address</text>
      <rect x="42" y="202" width="286" height="62" rx="10" fill="#fef9ec" stroke="#e67e22" stroke-width="1"/>
      <text x="185" y="226" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" font-weight="700" fill="#a04000">Value</text>
      <text x="185" y="246" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#e67e22">5 · "hello" · true…</text>
      <text x="340" y="236" text-anchor="middle" font-size="22" fill="#c0392b" font-weight="700">=</text>
      <rect x="352" y="202" width="286" height="62" rx="10" fill="#fef9ec" stroke="#e67e22" stroke-width="1"/>
      <text x="495" y="226" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" font-weight="700" fill="#a04000">Object</text>
      <text x="495" y="246" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#e67e22">Lives in the Heap</text>
    </svg>
    <div class="caption">Fig. 1 — The type/value analogy mapped to class/object</div>
  </div>

  <h2 id="s2"><span class="num">02 &mdash;</span> Where Everything Lives in RAM</h2>

  <p>When your Java program runs, the JVM divides memory into distinct regions. Two of them are critical to understanding OOP.</p>

  <h3>The Method Area (Class Area)</h3>
  <p>When the JVM loads a class for the first time, it reads the compiled bytecode and stores the class's <em>blueprint</em> here. This includes field names, their types, any default values you declared inline, all method definitions, constructor definitions, and — crucially — all static variables and static methods. This happens once, at class loading time.</p>

  <h3>The Heap</h3>
  <p>This is where actual objects live. Every time you call <code>new Car()</code>, the JVM carves out a fresh chunk of Heap memory, populates it with the object's fields, and returns the address of that chunk. Your object variable (say, <code>myCar</code>) stores this address. It is just a pointer.</p>

  <div class="diagram-card">
    <svg viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#8e44ad" stroke-width="1.5" stroke-linecap="round"/>
        </marker>
      </defs>
      <rect x="20" y="30" width="150" height="160" rx="12" fill="#f4f0fb" stroke="#8e44ad" stroke-width="1"/>
      <text x="95" y="54" text-anchor="middle" font-family="Playfair Display,serif" font-size="15" font-weight="700" fill="#6c3483">Stack</text>
      <text x="95" y="72" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#8e44ad">local variables</text>
      <rect x="34" y="84" width="122" height="42" rx="6" fill="#e8dff7" stroke="#8e44ad" stroke-width="0.8"/>
      <text x="95" y="101" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" font-weight="500" fill="#6c3483">myCar</text>
      <text x="95" y="116" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#8e44ad">&#8594; 0x4F2A</text>
      <rect x="34" y="136" width="122" height="42" rx="6" fill="#e8dff7" stroke="#8e44ad" stroke-width="0.8"/>
      <text x="95" y="153" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" font-weight="500" fill="#6c3483">yourCar</text>
      <text x="95" y="168" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#8e44ad">&#8594; 0x7B1C</text>
      <path d="M170 105 Q220 105 248 160" fill="none" stroke="#8e44ad" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arr2)"/>
      <path d="M170 157 Q220 157 248 290" fill="none" stroke="#8e44ad" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#arr2)"/>
      <rect x="250" y="30" width="234" height="360" rx="12" fill="#fef9ec" stroke="#e67e22" stroke-width="1"/>
      <text x="367" y="54" text-anchor="middle" font-family="Playfair Display,serif" font-size="15" font-weight="700" fill="#a04000">Heap</text>
      <text x="367" y="72" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#e67e22">all objects live here</text>
      <rect x="264" y="84" width="206" height="116" rx="8" fill="#fdebd0" stroke="#e67e22" stroke-width="0.8"/>
      <text x="367" y="104" text-anchor="middle" font-family="Playfair Display,serif" font-size="14" font-weight="700" fill="#a04000">Object 1 — myCar</text>
      <text x="367" y="122" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#784212">addr: 0x4F2A</text>
      <text x="367" y="142" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#6e2c00">color = "red"</text>
      <text x="367" y="160" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#6e2c00">size  = "large"</text>
      <text x="367" y="178" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#a04000">own copy of fields</text>
      <rect x="264" y="214" width="206" height="116" rx="8" fill="#d5f5e9" stroke="#16a085" stroke-width="0.8"/>
      <text x="367" y="234" text-anchor="middle" font-family="Playfair Display,serif" font-size="14" font-weight="700" fill="#0e6655">Object 2 — yourCar</text>
      <text x="367" y="252" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#0e6655">addr: 0x7B1C</text>
      <text x="367" y="272" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#0b5345">color = "blue"</text>
      <text x="367" y="290" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="12" fill="#0b5345">size  = "small"</text>
      <text x="367" y="308" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#0e6655">own copy of fields</text>
      <text x="367" y="370" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#e67e22">separate copies — independent</text>
      <rect x="498" y="30" width="164" height="360" rx="12" fill="#edf2fb" stroke="#2980b9" stroke-width="1"/>
      <text x="580" y="54" text-anchor="middle" font-family="Playfair Display,serif" font-size="15" font-weight="700" fill="#1a5276">Method Area</text>
      <text x="580" y="72" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#2980b9">loaded once</text>
      <rect x="510" y="84" width="140" height="190" rx="8" fill="#d6e8f7" stroke="#2980b9" stroke-width="0.8"/>
      <text x="580" y="104" text-anchor="middle" font-family="Playfair Display,serif" font-size="13" font-weight="700" fill="#1a5276">class Car</text>
      <text x="580" y="122" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#154360">color="green"</text>
      <text x="580" y="138" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#154360">size = null</text>
      <text x="580" y="162" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#154360">Constructor()</text>
      <text x="580" y="178" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#154360">getColor()</text>
      <text x="580" y="194" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#154360">setColor()</text>
      <rect x="518" y="210" width="124" height="52" rx="6" fill="#7d3c98" stroke="#6c3483" stroke-width="0.8"/>
      <text x="580" y="231" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#f5eef8">static totalCars</text>
      <text x="580" y="249" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#d7bde2">shared by all</text>
      <text x="580" y="300" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#2980b9">blueprint only</text>
      <text x="580" y="318" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#2980b9">not actual values</text>
      <text x="580" y="370" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#2980b9">Car.totalCars</text>
    </svg>
    <div class="caption">Fig. 2 — Stack (pointers), Heap (objects), Method Area (blueprint + statics)</div>
  </div>

  <div class="info-box tip">
    <div class="icon">&#8594;</div>
    <p>The variable <code>myCar</code> itself lives on the <strong>Stack</strong>. It does not hold the object — it holds the <em>address</em> of the object. This is why in Java, when you pass an object to a method, you are passing a copy of the reference (the address), not a copy of the object itself.</p>
  </div>

  <h2 id="s3"><span class="num">03 &mdash;</span> Blueprint Defaults and What Happens at Object Creation</h2>

  <p>Consider this class:</p>

  <pre data-lang="Java"><code><span class="kw">class</span> <span class="ty">Car</span> {
    <span class="kw">private</span> <span class="ty">String</span> color = <span class="str">"green"</span>;
    <span class="kw">private</span> <span class="ty">String</span> size;
}</code></pre>

  <p>When the JVM loads this class, it writes both field declarations into the Method Area as part of the blueprint. <code>color</code> gets an explicit default of <code>"green"</code>. <code>size</code> gets no explicit default, so it is stored as <code>null</code>.</p>

  <p>Now the critical moment: you call <code>new Car()</code>. Here is the exact sequence:</p>

  <ol>
    <li>The JVM allocates a fresh block of memory in the <strong>Heap</strong></li>
    <li>It reads the blueprint from the Method Area</li>
    <li>It copies the defaults into the new Heap block: <code>color = "green"</code>, <code>size = null</code></li>
    <li>It returns the address of this Heap block</li>
    <li>Your variable (e.g. <code>myCar</code>) stores that address</li>
  </ol>

  <h2 id="s4"><span class="num">04 &mdash;</span> The Constructor — Overwriting the Blueprint Defaults</h2>

  <p>Now let us add a constructor and watch what changes:</p>

  <pre data-lang="Java"><code><span class="kw">class</span> <span class="ty">Car</span> {
    <span class="kw">private</span> <span class="ty">String</span> color = <span class="str">"green"</span>;
    <span class="kw">private</span> <span class="ty">String</span> size;

    <span class="kw">public</span> <span class="fn">Car</span>(<span class="ty">String</span> size) {
        <span class="kw">this</span>.color = <span class="str">"red"</span>;
        <span class="kw">this</span>.size  = size;
    }
}</code></pre>

  <p>When you call <code>new Car("large")</code>, blueprint defaults are applied <em>first</em>, then the constructor overwrites them. Step through it below:</p>

  <div class="stepper">
    <div class="stepper-header">
      <span>Constructor execution order</span>
      <div class="step-dots">
        <div class="step-dot active" onclick="goStep(0)"></div>
        <div class="step-dot" onclick="goStep(1)"></div>
        <div class="step-dot" onclick="goStep(2)"></div>
      </div>
    </div>
    <div class="stepper-body">
      <div class="step-panel active" id="step-0">
        <div class="step-title"><span class="step-num">01</span>Call new Car("large")</div>
        <p style="color:var(--ink-soft);font-size:clamp(14px,2.2vw,17px);margin-bottom:14px">The JVM allocates a fresh block of memory in the Heap. All fields start completely uninitialised.</p>
        <div class="constructor-viz">
          <div class="field-row blueprint"><span class="field-label">color</span><span>= ??? (not set yet)</span><span class="field-source">waiting</span></div>
          <div class="field-row blueprint"><span class="field-label">size</span><span>= ??? (not set yet)</span><span class="field-source">waiting</span></div>
        </div>
      </div>
      <div class="step-panel" id="step-1">
        <div class="step-title"><span class="step-num">02</span>Blueprint defaults applied</div>
        <p style="color:var(--ink-soft);font-size:clamp(14px,2.2vw,17px);margin-bottom:14px">The JVM reads the class blueprint from the Method Area and copies the declared defaults into the new Heap object. The constructor has not run yet.</p>
        <div class="constructor-viz">
          <div class="field-row blueprint"><span class="field-label">color</span><span>= "green"</span><span class="field-source">from blueprint</span></div>
          <div class="field-row blueprint"><span class="field-label">size</span><span>= null</span><span class="field-source">from blueprint</span></div>
        </div>
      </div>
      <div class="step-panel" id="step-2">
        <div class="step-title"><span class="step-num">03</span>Constructor overwrites</div>
        <p style="color:var(--ink-soft);font-size:clamp(14px,2.2vw,17px);margin-bottom:14px">Now the constructor body runs. It overwrites both fields. The initial <code>"green"</code> never survives — it was applied and immediately replaced.</p>
        <div class="constructor-viz">
          <div class="field-row overwritten"><span class="field-label">color</span><span>= "red" &nbsp;<span style="text-decoration:line-through;opacity:0.4">"green"</span></span><span class="field-source">overwritten</span></div>
          <div class="field-row overwritten"><span class="field-label">size</span><span>= "large" &nbsp;<span style="text-decoration:line-through;opacity:0.4">null</span></span><span class="field-source">set by constructor</span></div>
        </div>
      </div>
    </div>
    <div class="stepper-nav">
      <button id="btn-prev" onclick="prevStep()" disabled>&#8592; Prev</button>
      <button id="btn-next" onclick="nextStep()">Next &#8594;</button>
    </div>
  </div>

  <div class="info-box warn">
    <div class="icon">!</div>
    <p>If a constructor sets a field, the inline default value for that field is practically useless — it gets applied for a fraction of a millisecond before the constructor overwrites it. Inline defaults only matter when there is <em>no constructor</em>, or when the constructor does not touch that particular field.</p>
  </div>

  <h2 id="s5"><span class="num">05 &mdash;</span> Static — Where the Analogy Breaks Down</h2>

  <p>Recall our analogy: just as <code>int</code> needs a value to be useful, a class needs an object. But now consider this:</p>

  <pre data-lang="Java"><code><span class="kw">class</span> <span class="ty">Car</span> {
    <span class="kw">static</span> <span class="kw">int</span> totalCars = <span class="num-c">0</span>;

    <span class="kw">public</span> <span class="fn">Car</span>() {
        totalCars++;
    }
}

<span class="ty">System</span>.out.<span class="fn">println</span>(<span class="ty">Car</span>.totalCars);  <span class="cm">// 0 — no object needed</span>
<span class="ty">Car</span> a = <span class="kw">new</span> <span class="ty">Car</span>();               <span class="cm">// totalCars = 1</span>
<span class="ty">Car</span> b = <span class="kw">new</span> <span class="ty">Car</span>();               <span class="cm">// totalCars = 2</span>
<span class="ty">System</span>.out.<span class="fn">println</span>(<span class="ty">Car</span>.totalCars);  <span class="cm">// 2</span></code></pre>

  <p>Static members do <em>not</em> live in the Heap with objects. They live directly in the <strong>Method Area</strong>. There is exactly one copy of every static field, shared by all objects and accessible without creating any object at all.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Concept</th><th>Where it lives</th><th>Created when?</th><th>Shared?</th></tr>
      </thead>
      <tbody>
        <tr><td>Class blueprint</td><td>Method Area</td><td>Class is loaded</td><td>Yes — once for all</td></tr>
        <tr><td>Static field/method</td><td>Method Area</td><td>Class is loaded</td><td>Yes — one copy</td></tr>
        <tr><td>Instance field</td><td>Heap (inside object)</td><td>new ClassName()</td><td>No — own copy per object</td></tr>
        <tr><td>Object variable</td><td>Stack</td><td>Variable declaration</td><td>No — per scope</td></tr>
      </tbody>
    </table>
  </div>

  <div class="takeaways">
    <h2>Key takeaways</h2>
    <ul>
      <li>Class = Type, Object variable = Variable name, Object = Value. This analogy maps perfectly for instance-based OOP.</li>
      <li>Object variables hold addresses, not objects. Your variable <code>myCar</code> stores a Heap address — not the Car object itself.</li>
      <li>The Method Area holds the blueprint. Field names, default values, method and constructor definitions all live here, written once when the class loads.</li>
      <li>Blueprint defaults are applied first, then the constructor runs. If the constructor sets a field, the inline default is overwritten before you ever see it.</li>
      <li>Static breaks the analogy. Static fields and methods live in the Method Area alongside the blueprint, not in the Heap. There is one shared copy, and no object is needed to access them.</li>
    </ul>
  </div>

  <p>Understanding memory does not just satisfy curiosity — it changes how you write code. You stop guessing why a field is <code>null</code> when you expected a value. You understand intuitively why two objects do not interfere with each other's fields. You know exactly why <code>static</code> is a fundamentally different kind of thing from an instance field.</p>

  <blockquote>
    <p>Did you know all of this was happening under the hood? What OOP concept confused you the most when you started?</p>
  </blockquote>

</div>

<script>
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop;
    const total = doc.scrollHeight - doc.clientHeight;
    document.getElementById('progress').style.width = (scrolled / total * 100) + '%';
  });
  let currentStep = 0;
  const totalSteps = 3;
  function goStep(n) {
    document.getElementById('step-' + currentStep).classList.remove('active');
    document.querySelectorAll('.step-dot')[currentStep].classList.remove('active');
    currentStep = n;
    document.getElementById('step-' + currentStep).classList.add('active');
    document.querySelectorAll('.step-dot')[currentStep].classList.add('active');
    document.getElementById('btn-prev').disabled = currentStep === 0;
    document.getElementById('btn-next').disabled = currentStep === totalSteps - 1;
  }
  function nextStep() { if (currentStep < totalSteps - 1) goStep(currentStep + 1); }
  function prevStep() { if (currentStep > 0) goStep(currentStep - 1); }
<\/script>
</body>
</html>`,
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE 2 — Spring Framework
// ─────────────────────────────────────────────────────────────────────────────
const springFrameWorkArticle: Article = {
  id: "spring-framework-complete-guide",
  title: "The Complete Guide to Spring Framework for Java Developers",
  subtitle:
    "Everything from IoC and dependency injection to beans, scopes, all three configuration styles, auto-wiring, and Spring Boot — explained clearly for beginners",
  category: "Spring · Complete Guide",
  date: "March 20, 2026",
  readTime: "25 min read",
  excerpt:
    "Spring Framework is the backbone of enterprise Java. This guide walks you through IoC, dependency injection, beans, scopes, XML/Java/annotation configuration, and Spring Boot — from first principles.",
  featured: false,
  content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Spring Framework 6 — The Complete Beginner's Guide | CodeScribe</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Fira+Code:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
/* ════════════════════════════════════════════════════
   TOKENS
════════════════════════════════════════════════════ */
:root {
  --c-bg:       #f7f4ef;
  --c-surface:  #efeae1;
  --c-surface2: #e8e2d7;
  --c-border:   #d8d0c4;
  --c-border2:  #c4baac;
  --c-ink:      #2c2820;
  --c-ink2:     #483e35;
  --c-ink3:     #7a6e62;
  --c-ink4:     #a89e92;
  --c-red:      #b5351a;
  --c-red-h:    #d4502c;
  --c-amber:    #c17a2a;
  --c-amber-l:  #dfa040;
  --c-teal:     #2a7a6a;
  --c-code-bg:  #1c1a16;
  --f-display:  'Cormorant Garamond', Georgia, serif;
  --f-body:     'Lora', Georgia, serif;
  --f-mono:     'Fira Code', 'Courier New', monospace;
  --max-article: 720px;
  --max-page:    1140px;
  --sh-soft:    0 1px 4px rgba(44,40,32,.06), 0 4px 16px rgba(44,40,32,.04);
  --sh-card:    0 2px 12px rgba(44,40,32,.08), 0 8px 32px rgba(44,40,32,.06);
  --sh-lift:    0 4px 24px rgba(44,40,32,.12), 0 16px 48px rgba(44,40,32,.08);
}

/* ════════════════════════════════════════════════════
   RESET & BASE
════════════════════════════════════════════════════ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body { background: var(--c-bg); color: var(--c-ink2); font-family: var(--f-body); font-size: 17px; line-height: 1.85; }
::selection { background: rgba(181,53,26,.15); color: var(--c-ink); }
h1,h2,h3,h4 { font-family: var(--f-display); color: var(--c-ink); line-height: 1.18; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--c-surface); }
::-webkit-scrollbar-thumb { background: var(--c-border2); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: var(--c-ink4); }

/* ════════════════════════════════════════════════════
   PROGRESS BAR
════════════════════════════════════════════════════ */
#prog {
  position: fixed; top: 0; left: 0; z-index: 300;
  height: 2.5px; width: 0%;
  background: linear-gradient(90deg, var(--c-red), var(--c-amber-l));
  transition: width .1s linear;
}

/* ════════════════════════════════════════════════════
   HEADER
════════════════════════════════════════════════════ */
.hdr {
  position: sticky; top: 0; z-index: 200;
  background: rgba(247,244,239,.93);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid transparent;
  transition: border-color .3s, box-shadow .3s;
}
.hdr.on { border-bottom-color: var(--c-border); box-shadow: var(--sh-soft); }
.hdr-i {
  max-width: var(--max-page); margin: 0 auto;
  padding: 0 36px; height: 66px;
  display: flex; align-items: center; justify-content: space-between;
}
.logo { display: flex; align-items: center; gap: 11px; cursor: pointer; }
.logo-mark {
  width: 38px; height: 38px; border-radius: 5px;
  background: var(--c-ink);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--f-display); font-size: 21px; font-weight: 700;
  color: var(--c-bg); transition: background .22s; flex-shrink: 0;
}
.logo:hover .logo-mark { background: var(--c-red); }
.logo-name {
  font-family: var(--f-display); font-size: 23px; font-weight: 600;
  color: var(--c-ink); letter-spacing: -.025em; transition: color .22s;
}
.logo:hover .logo-name { color: var(--c-red); }
.nav { display: flex; align-items: center; gap: 34px; }
.nav a {
  font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .13em;
  text-transform: uppercase; color: var(--c-ink3);
  transition: color .2s; position: relative; padding-bottom: 2px;
}
.nav a::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 1px; background: var(--c-red); transition: width .25s;
}
.nav a:hover { color: var(--c-ink); }
.nav a:hover::after { width: 100%; }

/* ════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════ */
.hero {
  background: var(--c-ink);
  padding: 92px 36px 84px;
  position: relative; overflow: hidden;
}
.hero::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(
    -52deg, transparent, transparent 48px,
    rgba(255,255,255,.014) 48px, rgba(255,255,255,.014) 49px
  );
}
.hero::after {
  content: ''; position: absolute;
  right: -80px; top: -80px;
  width: 480px; height: 480px; border-radius: 50%;
  background: radial-gradient(circle, rgba(181,53,26,.16) 0%, transparent 68%);
  pointer-events: none;
}
.hero-glow2 {
  position: absolute; left: -60px; bottom: -100px;
  width: 360px; height: 360px; border-radius: 50%;
  background: radial-gradient(circle, rgba(193,122,42,.09) 0%, transparent 70%);
  pointer-events: none;
}
.hero-i { max-width: var(--max-article); margin: 0 auto; position: relative; z-index: 1; }
.hero-back {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .11em;
  text-transform: uppercase; color: rgba(247,244,239,.26);
  margin-bottom: 38px; cursor: pointer; transition: color .2s;
}
.hero-back:hover { color: rgba(247,244,239,.6); }
.hero-kicker {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .2em;
  text-transform: uppercase; color: var(--c-amber-l); margin-bottom: 24px;
}
.hero-kicker::before { content: ''; width: 26px; height: 1px; background: var(--c-amber-l); }
.hero-title {
  font-family: var(--f-display); font-size: clamp(34px,5.2vw,60px);
  font-weight: 400; color: var(--c-bg); line-height: 1.09;
  letter-spacing: -.03em; margin-bottom: 24px; max-width: 660px;
}
.hero-title em { font-style: italic; color: var(--c-amber-l); font-weight: 300; }
.hero-sub {
  font-family: var(--f-body); font-size: 17px; font-style: italic;
  color: rgba(247,244,239,.48); line-height: 1.7; max-width: 520px; margin-bottom: 40px;
}
.hero-meta {
  display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
  font-family: var(--f-mono); font-size: 11px; color: rgba(247,244,239,.24);
  letter-spacing: .06em;
}
.hero-dot { width: 3px; height: 3px; border-radius: 50%; background: rgba(247,244,239,.16); }
.hero-badge {
  display: inline-flex; align-items: center; gap: 7px;
  border: 1px solid rgba(223,160,64,.35); border-radius: 3px;
  padding: 4px 13px; color: var(--c-amber-l);
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .14em;
  text-transform: uppercase;
}

/* Layout handled by ArticlePage.tsx — no page-shell CSS needed */

/* ════════════════════════════════════════════════════
   PROSE
════════════════════════════════════════════════════ */
.prose { font-family: var(--f-body); font-size: 17.5px; line-height: 1.9; color: var(--c-ink2); }
.prose .drop::first-letter {
  font-family: var(--f-display); font-size: 5.6em; font-weight: 500;
  float: left; line-height: .72; margin: .06em .12em 0 0; color: var(--c-red);
}
.prose p { margin-bottom: 1.7em; }
.prose h2 {
  font-family: var(--f-display); font-size: 32px; font-weight: 500;
  color: var(--c-ink); margin: 76px 0 22px;
  letter-spacing: -.028em; line-height: 1.18;
  padding-bottom: 15px; border-bottom: 1px solid var(--c-border);
  scroll-margin-top: 90px;
}
.prose h2 .sec {
  font-family: var(--f-mono); font-size: 10.5px; color: var(--c-red);
  letter-spacing: .14em; display: block; margin-bottom: 7px;
}
.prose h3 {
  font-family: var(--f-display); font-size: 23px;
  font-weight: 400; font-style: italic; color: var(--c-ink);
  margin: 46px 0 14px; letter-spacing: -.015em;
}
.prose h4 {
  font-family: var(--f-mono); font-size: 11.5px; font-style: normal;
  letter-spacing: .12em; text-transform: uppercase; color: var(--c-ink3);
  margin: 28px 0 10px;
}
.prose blockquote {
  border-left: 3px solid var(--c-red); margin: 44px 0;
  padding: 18px 28px; background: var(--c-surface);
  border-radius: 0 8px 8px 0; box-shadow: var(--sh-soft);
}
.prose blockquote p {
  font-family: var(--f-display); font-size: 23px; font-style: italic;
  color: var(--c-ink); margin: 0; line-height: 1.5; font-weight: 400;
}
.prose code {
  font-family: var(--f-mono); font-size: 13px;
  background: var(--c-surface2); color: var(--c-red);
  padding: 2px 7px; border-radius: 4px; border: 1px solid var(--c-border);
}
.prose pre {
  background: var(--c-code-bg) !important;
  border-radius: 11px; padding: 26px 28px; margin: 24px 0 30px;
  overflow-x: auto; box-shadow: var(--sh-card); position: relative;
  border: 1px solid rgba(255,255,255,.04);
}
.prose pre::before {
  content: attr(data-lang); position: absolute; top: 11px; right: 14px;
  font-family: var(--f-mono); font-size: 9px; letter-spacing: .15em;
  text-transform: uppercase; color: rgba(232,226,212,.16);
}
.prose pre code {
  font-family: var(--f-mono) !important; font-size: 13.5px !important;
  line-height: 1.86 !important; color: #e0d9ce !important;
  background: none !important; border: none !important; padding: 0 !important;
  white-space: pre;
}
/* Syntax tokens */
.kw  { color: #e07070 !important; }
.ty  { color: #d4b06a !important; }
.str { color: #85c78a !important; }
.cm  { color: #556250 !important; font-style: italic; }
.fn  { color: #7aadde !important; }
.nc  { color: #c89060 !important; }
.an  { color: #b09ad4 !important; }
.op  { color: #c0b090 !important; }

.prose ul, .prose ol { margin: 0 0 1.7em 1.5em; }
.prose li { margin-bottom: 9px; line-height: 1.75; }
.prose strong { color: var(--c-ink); font-weight: 600; }
.prose em { font-style: italic; }
.prose table {
  width: 100%; border-collapse: collapse; font-size: 14px;
  margin: 28px 0 34px; box-shadow: var(--sh-card);
  border-radius: 9px; overflow: hidden;
}
.prose th {
  background: var(--c-ink); color: var(--c-bg);
  font-family: var(--f-mono); font-size: 10px;
  letter-spacing: .13em; text-transform: uppercase;
  padding: 13px 18px; text-align: left; font-weight: 400;
}
.prose td {
  padding: 11px 18px; border-bottom: 1px solid var(--c-border);
  font-size: 14px; vertical-align: top;
}
.prose tr:last-child td { border-bottom: none; }
.prose tr:nth-child(even) td { background: var(--c-surface); }
.prose .divider {
  text-align: center; margin: 60px 0;
  color: var(--c-border2); letter-spacing: .5em; font-size: 11px;
  font-family: var(--f-mono); user-select: none;
}

/* ════════════════════════════════════════════════════
   INFO / CALLOUT BOXES
════════════════════════════════════════════════════ */
.box {
  border-radius: 9px; padding: 16px 20px; margin: 26px 0;
  display: flex; gap: 14px; align-items: flex-start; border: 1px solid;
}
.box-body { flex: 1; }
.box-body p { margin: 0; font-size: 15px; color: var(--c-ink2); line-height: 1.68; }
.box-body p + p { margin-top: 8px; }
.box-ico { font-family: var(--f-mono); font-size: 15px; flex-shrink: 0; margin-top: 1px; }
.box.tip  { border-color: rgba(42,122,106,.25); background: rgba(42,122,106,.055); }
.box.tip  .box-ico { color: var(--c-teal); }
.box.warn { border-color: rgba(181,53,26,.22); background: rgba(181,53,26,.052); }
.box.warn .box-ico { color: var(--c-red); }
.box.note { border-color: rgba(193,122,42,.28); background: rgba(193,122,42,.055); }
.box.note .box-ico { color: var(--c-amber); }

/* ════════════════════════════════════════════════════
   FLOW DIAGRAM
════════════════════════════════════════════════════ */
.diagram {
  background: #fff; border: 1px solid var(--c-border);
  border-radius: 12px; padding: 28px 22px 18px;
  margin: 30px 0 36px; box-shadow: var(--sh-card);
}
.diagram-title {
  font-family: var(--f-mono); font-size: 9.5px; letter-spacing: .18em;
  text-transform: uppercase; color: var(--c-ink4); margin-bottom: 20px;
  text-align: center;
}
.flow {
  display: flex; align-items: stretch; justify-content: center;
  gap: 0; flex-wrap: wrap;
}
.fbox {
  border: 1px solid var(--c-border); border-radius: 8px;
  padding: 14px 18px; text-align: center; min-width: 110px; flex: 1; max-width: 160px;
  background: var(--c-surface);
}
.fbox.dark  { background: var(--c-ink); border-color: var(--c-ink); }
.fbox.red   { background: rgba(181,53,26,.07); border-color: rgba(181,53,26,.3); }
.fbox.amber { background: rgba(193,122,42,.07); border-color: rgba(193,122,42,.3); }
.fbox.teal  { background: rgba(42,122,106,.07); border-color: rgba(42,122,106,.3); }
.fbox-label {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: .13em;
  text-transform: uppercase; color: var(--c-ink4); margin-bottom: 5px;
}
.fbox.dark .fbox-label  { color: rgba(247,244,239,.38); }
.fbox.red  .fbox-label  { color: rgba(181,53,26,.6); }
.fbox.teal .fbox-label  { color: rgba(42,122,106,.7); }
.fbox-name {
  font-family: var(--f-display); font-size: 15px; font-weight: 600;
  color: var(--c-ink); letter-spacing: -.01em; line-height: 1.3;
}
.fbox.dark  .fbox-name { color: var(--c-bg); }
.fbox.red   .fbox-name { color: var(--c-red); }
.fbox.amber .fbox-name { color: var(--c-amber); }
.fbox.teal  .fbox-name { color: var(--c-teal); }
.farr {
  display: flex; align-items: center;
  font-family: var(--f-mono); font-size: 16px;
  color: var(--c-border2); padding: 0 6px; flex-shrink: 0;
}
.diagram-cap {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .11em;
  text-transform: uppercase; color: var(--c-ink4);
  text-align: center; margin-top: 16px;
  padding-top: 13px; border-top: 1px solid var(--c-border);
}

/* ════════════════════════════════════════════════════
   TAB SWITCHER
════════════════════════════════════════════════════ */
.tabs { border: 1px solid var(--c-border); border-radius: 12px; overflow: hidden; margin: 32px 0; box-shadow: var(--sh-card); }
.tabs-hdr { background: var(--c-ink); display: flex; }
.t-btn {
  font-family: var(--f-mono); font-size: 10.5px; letter-spacing: .1em;
  text-transform: uppercase; color: rgba(247,244,239,.34);
  padding: 14px 20px; cursor: pointer; border: none;
  background: none; border-right: 1px solid rgba(247,244,239,.06);
  transition: color .2s, background .2s; flex: 1;
}
.t-btn:last-child { border-right: none; }
.t-btn.on { color: var(--c-amber-l); background: rgba(255,255,255,.04); }
.t-btn:hover:not(.on) { color: rgba(247,244,239,.62); }
.t-panel { display: none; padding: 26px 26px 20px; background: #fff; }
.t-panel.on { display: block; animation: fd .25s ease; }
@keyframes fd { from { opacity:0; transform:translateY(6px) } to { opacity:1; transform:translateY(0) } }
.t-panel p { font-size: 15px; color: var(--c-ink2); line-height: 1.7; margin-bottom: 14px; font-family: var(--f-body); }
.t-panel p:last-of-type { margin-bottom: 0; }

/* ════════════════════════════════════════════════════
   SCOPE CARDS
════════════════════════════════════════════════════ */
.scope-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0 32px; }
.sc {
  border: 1px solid var(--c-border); border-radius: 10px;
  padding: 20px 22px; background: #fff;
  transition: box-shadow .22s, border-color .22s, transform .22s;
}
.sc:hover { box-shadow: var(--sh-card); border-color: var(--c-border2); transform: translateY(-2px); }
.sc-tag {
  font-family: var(--f-mono); font-size: 9.5px; letter-spacing: .14em;
  text-transform: uppercase; padding: 3px 10px; border-radius: 3px;
  display: inline-block; margin-bottom: 13px;
}
.sc-tag.g { background: rgba(42,122,106,.1); color: var(--c-teal); }
.sc-tag.r { background: rgba(181,53,26,.09); color: var(--c-red); }
.sc-title { font-family: var(--f-display); font-size: 20px; font-weight: 600; color: var(--c-ink); margin-bottom: 9px; }
.sc-desc { font-family: var(--f-body); font-size: 14px; color: var(--c-ink3); line-height: 1.68; }
.sc-proof {
  margin-top: 12px; padding: 10px 13px; border-radius: 6px;
  background: var(--c-surface); border: 1px solid var(--c-border);
  font-family: var(--f-mono); font-size: 12px; color: var(--c-ink3); line-height: 1.6;
}

/* ════════════════════════════════════════════════════
   CONFIG CARDS (3-col)
════════════════════════════════════════════════════ */
.cfg-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin: 26px 0; }
.cfg {
  border: 1px solid var(--c-border); border-radius: 10px;
  overflow: hidden; background: #fff;
  transition: box-shadow .22s;
}
.cfg:hover { box-shadow: var(--sh-card); }
.cfg-hdr {
  padding: 13px 16px; font-family: var(--f-mono); font-size: 10px;
  letter-spacing: .14em; text-transform: uppercase;
  display: flex; align-items: center; gap: 9px;
}
.cfg-hdr.am { background: rgba(193,122,42,.08); color: var(--c-amber); border-bottom: 1px solid rgba(193,122,42,.2); }
.cfg-hdr.tl { background: rgba(42,122,106,.08); color: var(--c-teal); border-bottom: 1px solid rgba(42,122,106,.2); }
.cfg-hdr.rd { background: rgba(181,53,26,.07); color: var(--c-red); border-bottom: 1px solid rgba(181,53,26,.18); }
.cfg-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.cfg-body { padding: 15px 16px; }
.cfg-list { list-style: none; }
.cfg-list li {
  font-family: var(--f-body); font-size: 13px; color: var(--c-ink3);
  padding: 6px 0 6px 18px; border-bottom: 1px solid var(--c-border);
  position: relative; line-height: 1.5;
}
.cfg-list li:last-child { border-bottom: none; }
.cfg-list li::before { content: '→'; position: absolute; left: 0; font-family: var(--f-mono); font-size: 10px; color: var(--c-border2); }

/* ════════════════════════════════════════════════════
   ANNOTATION GRID
════════════════════════════════════════════════════ */
.ann-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin: 24px 0; }
.ann {
  border: 1px solid var(--c-border); border-radius: 9px;
  padding: 16px 18px; background: #fff;
  transition: border-color .22s, box-shadow .22s;
}
.ann:hover { border-color: var(--c-border2); box-shadow: var(--sh-soft); }
.ann-name { font-family: var(--f-mono); font-size: 13px; color: var(--c-red); font-weight: 500; margin-bottom: 8px; }
.ann-desc { font-family: var(--f-body); font-size: 13.5px; color: var(--c-ink3); line-height: 1.62; }

/* ════════════════════════════════════════════════════
   WIRING VISUAL
════════════════════════════════════════════════════ */
.wire-vis {
  background: #fff; border: 1px solid var(--c-border);
  border-radius: 12px; padding: 26px 22px 18px;
  margin: 30px 0; box-shadow: var(--sh-card);
}
.wire-row { display: flex; align-items: center; gap: 10px; margin: 10px 0; flex-wrap: wrap; }
.wire-bean {
  border: 1px solid var(--c-border); border-radius: 7px;
  padding: 10px 16px; font-family: var(--f-mono); font-size: 12px;
  color: var(--c-ink2); background: var(--c-surface); flex-shrink: 0;
}
.wire-bean.primary { background: rgba(42,122,106,.08); border-color: rgba(42,122,106,.35); color: var(--c-teal); }
.wire-bean.iface { background: rgba(193,122,42,.08); border-color: rgba(193,122,42,.35); color: var(--c-amber); }
.wire-bean.impl  { background: rgba(181,53,26,.06); border-color: rgba(181,53,26,.25); color: var(--c-red); }
.wire-label {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: .1em;
  text-transform: uppercase; color: var(--c-ink4); margin-top: 2px;
}
.wire-conn {
  font-family: var(--f-mono); font-size: 14px; color: var(--c-border2);
  display: flex; align-items: center; gap: 4px;
}
.wire-conn span { font-size: 9px; color: var(--c-ink4); }

/* ════════════════════════════════════════════════════
   PREREQUISITE TABLE (SPECIAL)
════════════════════════════════════════════════════ */
.prereq-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin: 24px 0; }
.prereq {
  border: 1px solid var(--c-border); border-radius: 9px;
  padding: 16px 17px; background: #fff;
  transition: box-shadow .22s, transform .22s;
}
.prereq:hover { box-shadow: var(--sh-card); transform: translateY(-2px); }
.prereq-num {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: .14em;
  text-transform: uppercase; color: var(--c-red); margin-bottom: 7px;
}
.prereq-title { font-family: var(--f-display); font-size: 16px; font-weight: 600; color: var(--c-ink); margin-bottom: 6px; }
.prereq-desc { font-family: var(--f-body); font-size: 13px; color: var(--c-ink3); line-height: 1.6; }

/* ════════════════════════════════════════════════════
   TAKEAWAYS
════════════════════════════════════════════════════ */
.takeaways {
  background: var(--c-ink); border-radius: 12px;
  padding: 36px 38px 30px; margin: 54px 0 0;
  box-shadow: var(--sh-lift);
}
.tk-title {
  font-family: var(--f-display); font-size: 28px; font-weight: 400;
  color: var(--c-bg); border-bottom: 1px solid rgba(247,244,239,.1);
  padding-bottom: 15px; margin-bottom: 22px; letter-spacing: -.02em;
}
.takeaways ul { list-style: none; padding: 0; margin: 0; }
.takeaways li {
  padding: 11px 0 11px 30px; position: relative;
  border-bottom: 1px solid rgba(247,244,239,.07);
  font-size: 15px; color: rgba(247,244,239,.72);
  line-height: 1.72; font-family: var(--f-body);
}
.takeaways li::before { content: '→'; position: absolute; left: 0; color: var(--c-amber-l); font-family: var(--f-mono); }
.takeaways li:last-child { border-bottom: none; }
.takeaways li strong { color: rgba(247,244,239,.95); }

/* Footer CSS removed — provided by the app shell */

/* ════════════════════════════════════════════════════
   RESPONSIVE — component cards only
════════════════════════════════════════════════════ */
@media (max-width: 640px) {
  .prose { font-size: 16px; }
  .scope-row { grid-template-columns: 1fr; }
  .cfg-row { grid-template-columns: 1fr; }
  .ann-grid { grid-template-columns: 1fr; }
  .prereq-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 420px) {
  .prereq-grid { grid-template-columns: 1fr; }
}
</style>
</head>
<body>

<div id="prog"></div>

<article class="prose">

  <!-- ─────── INTRO ─────── -->
  <p class="drop">
    Spring Framework is the most widely used Java framework in the enterprise world. Banks, e-commerce platforms, government systems, and startups all rely on it daily. Yet its concepts — IoC, DI, beans, containers — can feel abstract when you first meet them. This guide removes that confusion. Every concept is explained the way a teacher would explain it: starting with <em>why</em> something exists before showing you <em>how</em> to use it.
  </p>
  <p>
    This article covers Spring Framework 6 and Spring Boot 3. By the end, you will understand the entire foundation of Spring deeply enough to read, write, and reason about real Spring code with confidence.
  </p>

  <!-- ─────── S1 ─────── -->
  <h2 id="s1"><span class="sec">01 — Foundation</span>What Is Spring Framework?</h2>
  <p>
    Spring is an <strong>open-source Java framework</strong> built to make enterprise application development simpler, faster, and less error-prone. Think of a framework as a smart toolkit — it solves recurring problems so you can focus on what makes your application unique: the business logic.
  </p>
  <p>
    Before Spring arrived, Java developers used a mix of technologies that did not work well together. <strong>EJBs (Enterprise JavaBeans)</strong> were the standard for enterprise components but were notoriously complex and heavyweight. <strong>Struts</strong> handled web applications. <strong>Hibernate</strong> handled database access. Each had its own configuration, its own lifecycle, its own quirks. Spring brought everything under one coherent roof — and made it lightweight.
  </p>

  <blockquote>
    <p>"Spring makes Java simple, modern, reactive, and productive — all in one framework."</p>
  </blockquote>

  <p>
    The word <strong>lightweight</strong> is key. Spring works with <strong>POJOs — Plain Old Java Objects</strong>. A POJO is just a regular Java class with no special parent class, no special interface, no framework-specific code inside it. Spring manages these ordinary classes for you. The power of Spring is that a completely normal Java object can suddenly do extraordinary things inside the framework.
  </p>

  <!-- ─────── S2 ─────── -->
  <h2 id="s2"><span class="sec">02 — Ecosystem</span>The Spring Ecosystem</h2>
  <p>
    Spring is not one single thing. It is a <strong>collection of projects</strong> — an ecosystem. Each project solves a specific problem. When developers say "Spring," they often mean all of these together:
  </p>

  <table>
    <thead><tr><th>Project</th><th>What it solves</th><th>You use it when…</th></tr></thead>
    <tbody>
      <tr><td><code>Spring Core / Framework</code></td><td>Dependency injection, IoC container</td><td>Always — it is the foundation</td></tr>
      <tr><td><code>Spring Boot</code></td><td>Auto-configuration, zero-setup startup</td><td>Starting any modern Spring project</td></tr>
      <tr><td><code>Spring MVC</code></td><td>Web applications and REST APIs</td><td>Building HTTP endpoints and web UIs</td></tr>
      <tr><td><code>Spring Data</code></td><td>Database access (JPA, MongoDB, Redis…)</td><td>Reading and writing data</td></tr>
      <tr><td><code>Spring Security</code></td><td>Authentication and authorisation</td><td>Protecting your application</td></tr>
      <tr><td><code>Spring AOP</code></td><td>Aspect-Oriented Programming</td><td>Logging, transactions, cross-cutting concerns</td></tr>
      <tr><td><code>Spring Cloud</code></td><td>Microservices infrastructure</td><td>Building distributed, cloud-native systems</td></tr>
      <tr><td><code>Spring Batch</code></td><td>Large-scale batch processing</td><td>Scheduled data processing jobs</td></tr>
    </tbody>
  </table>

  <p>
    In this article we focus on <strong>Spring Core</strong> — the foundation that every other project builds upon. Master this, and all other Spring projects will make natural sense.
  </p>

  <!-- ─────── S3 ─────── -->
  <h2 id="s3"><span class="sec">03 — Preparation</span>What You Need to Know First</h2>
  <p>
    Spring is a framework, not a beginner's tutorial. To get the most out of it, you should be comfortable with the following Java concepts before diving in:
  </p>

  <div class="prereq-grid">
    <div class="prereq">
      <div class="prereq-num">Must-have 01</div>
      <div class="prereq-title">Core Java &amp; OOP</div>
      <div class="prereq-desc">Syntax, classes, objects, inheritance, interfaces, and polymorphism. Spring is built on OOP principles.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Must-have 02</div>
      <div class="prereq-title">Exception Handling</div>
      <div class="prereq-desc">Try-catch, checked vs unchecked exceptions. Spring throws and wraps exceptions constantly.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Must-have 03</div>
      <div class="prereq-title">Collections API</div>
      <div class="prereq-desc">Lists, Maps, Sets. Used throughout Spring for bean definitions, configuration, and data handling.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Must-have 04</div>
      <div class="prereq-title">JDBC Basics</div>
      <div class="prereq-desc">How Java connects to databases. Spring Data and Spring ORM build directly on top of JDBC concepts.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Must-have 05</div>
      <div class="prereq-title">Maven</div>
      <div class="prereq-desc">Build tool used to add Spring dependencies. You will use <code>pom.xml</code> constantly. Gradle also works.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Good to have</div>
      <div class="prereq-title">Hibernate / ORM</div>
      <div class="prereq-desc">Object-Relational Mapping concepts. Needed when you move into Spring Data JPA.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Good to have</div>
      <div class="prereq-title">Servlets</div>
      <div class="prereq-desc">Spring MVC runs inside a servlet container like Tomcat. Servlet knowledge explains what happens under the hood.</div>
    </div>
    <div class="prereq">
      <div class="prereq-num">Good to have</div>
      <div class="prereq-title">Basic Threads</div>
      <div class="prereq-desc">Singleton beans are shared across threads. Knowing thread basics helps you write safe Spring code.</div>
    </div>
  </div>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body"><p><strong>IDE choice:</strong> You can use Eclipse (add the Spring Tools plugin from Eclipse Marketplace), IntelliJ IDEA Community Edition (no built-in Spring support, but fully works), IntelliJ Ultimate (Spring support built in), or VS Code (install the VMware Spring extension). The code and project structure remain identical across all IDEs because Maven controls the structure.</p></div>
  </div>

  <!-- ─────── S4 ─────── -->
  <h2 id="s4"><span class="sec">04 — Versions</span>Spring vs Spring Boot — Cleared Up</h2>
  <p>
    This confuses nearly every beginner. Here is the simple truth:
  </p>

  <div class="diagram">
    <div class="diagram-title">Relationship between Spring Framework and Spring Boot</div>
    <div class="flow">
      <div class="fbox amber">
        <div class="fbox-label">Foundation</div>
        <div class="fbox-name">Spring<br/>Framework 6</div>
      </div>
      <div class="farr">&#8592; built on</div>
      <div class="fbox dark">
        <div class="fbox-label">Layer on top</div>
        <div class="fbox-name">Spring<br/>Boot 3</div>
      </div>
      <div class="farr">&#8594; requires</div>
      <div class="fbox teal">
        <div class="fbox-label">Runtime</div>
        <div class="fbox-name">Java 17<br/>or above</div>
      </div>
    </div>
    <div class="diagram-cap">Spring Boot 3 is not a replacement — it is built on top of Spring Framework 6</div>
  </div>

  <p>
    <strong>Spring Framework</strong> is the core. It provides the IoC container, dependency injection, AOP, and the foundation for everything else. Writing a Spring application directly requires manual configuration.
  </p>
  <p>
    <strong>Spring Boot</strong> sits on top of Spring Framework and removes that manual configuration work. It makes <em>opinionated</em> choices for you (sensible defaults) so you can run an application with almost zero setup. When you use Spring Boot, you are still using Spring Framework — Boot just configures it automatically.
  </p>
  <p>
    In this article we learn both. We start with Spring Framework directly so you understand <em>what is happening</em>, then you will see how Spring Boot simplifies all of it.
  </p>

  <div class="box note">
    <span class="box-ico">&#9888;</span>
    <div class="box-body"><p><strong>Version rule:</strong> Spring Boot 3 requires Spring Framework 6, which requires Java 17 as the minimum. If you are using Spring Boot 3, make sure you have at least JDK 17 installed. Java 21 works perfectly and is recommended.</p></div>
  </div>

  <!-- ─────── S5 ─────── -->
  <h2 id="s5"><span class="sec">05 — Core Principle</span>Inversion of Control (IoC)</h2>
  <p>
    This is the single most important idea in Spring. Everything else builds on it. To understand IoC, you first need to understand what the <em>problem</em> is.
  </p>

  <h3>The Problem: You Control Everything</h3>
  <p>
    In normal Java code, when one class needs another class, it creates that object itself using the <code>new</code> keyword:
  </p>

  <pre data-lang="Java"><code><span class="kw">public class</span> <span class="ty">BookService</span> {
    <span class="cm">// BookService creates its own dependency</span>
    <span class="kw">private</span> <span class="ty">BookRepository</span> repo = <span class="kw">new</span> <span class="fn">BookRepository</span>();

    <span class="kw">public void</span> <span class="fn">saveBook</span>(<span class="ty">Book</span> book) {
        repo.<span class="fn">save</span>(book);
    }
}</code></pre>

  <p>
    As a programmer, you are controlling three things here: <strong>object creation</strong> (calling <code>new</code>), <strong>object wiring</strong> (connecting classes together), and <strong>object lifecycle</strong> (when to keep, reuse, or destroy them). In a small project this is fine. But in a large enterprise application with hundreds of classes, managing all of this yourself:
  </p>
  <ul>
    <li>Takes significant time and effort</li>
    <li>Makes testing very hard (you cannot easily swap <code>BookRepository</code> for a mock)</li>
    <li>Creates tightly coupled classes that are difficult to change</li>
    <li>Pulls your focus away from writing the actual business logic</li>
  </ul>

  <h3>The Solution: Invert the Control</h3>
  <p>
    <strong>Inversion of Control</strong> means: <em>stop managing objects yourself — give that responsibility to the framework.</em> You declare what you need. Spring creates it, wires it, and manages its lifecycle. This is the "inversion" — the control shifts from you to Spring.
  </p>

  <div class="diagram">
    <div class="diagram-title">Inversion of Control — who manages what</div>
    <div class="flow">
      <div class="fbox red">
        <div class="fbox-label">Before IoC</div>
        <div class="fbox-name">You create &amp;<br/>manage objects</div>
      </div>
      <div class="farr">&#8594;</div>
      <div class="fbox dark">
        <div class="fbox-label">IoC Principle</div>
        <div class="fbox-name">Hand control<br/>to Spring</div>
      </div>
      <div class="farr">&#8594;</div>
      <div class="fbox teal">
        <div class="fbox-label">After IoC</div>
        <div class="fbox-name">You write<br/>business logic</div>
      </div>
    </div>
    <div class="diagram-cap">IoC is a design principle — Dependency Injection is the pattern that implements it</div>
  </div>

  <div class="box note">
    <span class="box-ico">&#9888;</span>
    <div class="box-body">
      <p><strong>IoC is a principle. Dependency Injection is a design pattern.</strong> IoC tells you <em>what</em> to do (invert control). Dependency Injection tells you <em>how</em> to do it. Spring uses Dependency Injection to achieve IoC. People often use these two terms interchangeably in everyday conversation — and that is fine in practice. Just know they are technically different concepts.</p>
    </div>
  </div>

  <!-- ─────── S6 ─────── -->
  <h2 id="s6"><span class="sec">06 — Design Pattern</span>Dependency Injection Explained</h2>
  <p>
    Dependency Injection (DI) is the mechanism Spring uses to implement IoC. The idea is simple: <em>instead of an object creating its own dependencies, those dependencies are injected into it from outside.</em>
  </p>
  <p>
    Consider a <code>Player</code> class. A player needs a <code>GameEngine</code> to play. Without DI:
  </p>

  <pre data-lang="Java"><code><span class="cm">// ✗ Tightly coupled — Player creates its own GameEngine</span>
<span class="kw">public class</span> <span class="ty">Player</span> {
    <span class="kw">private</span> <span class="ty">GameEngine</span> engine = <span class="kw">new</span> <span class="fn">GameEngine</span>();

    <span class="kw">public void</span> <span class="fn">play</span>() {
        engine.<span class="fn">start</span>();
    }
}</code></pre>

  <p>
    With DI, <code>Player</code> does not create <code>GameEngine</code>. It simply declares that it needs one. Spring provides it:
  </p>

  <pre data-lang="Java"><code><span class="cm">// ✓ Loosely coupled — Spring injects the GameEngine</span>
<span class="kw">public class</span> <span class="ty">Player</span> {
    <span class="kw">private</span> <span class="ty">Engine</span> engine;  <span class="cm">// depend on the interface, not the class</span>

    <span class="cm">// Spring calls this setter and passes the right Engine implementation</span>
    <span class="kw">public void</span> <span class="fn">setEngine</span>(<span class="ty">Engine</span> engine) {
        <span class="kw">this</span>.engine = engine;
    }

    <span class="kw">public void</span> <span class="fn">play</span>() {
        engine.<span class="fn">start</span>();
    }
}</code></pre>

  <p>
    Notice that <code>Player</code> now depends on an <em>interface</em> called <code>Engine</code>, not a concrete class. This is the critical best practice in Spring. By depending on an interface, Spring can inject any class that implements it — <code>GameEngine</code>, <code>MockEngine</code> for tests, or <code>TurboEngine</code> for production. <strong>Your <code>Player</code> class never changes.</strong>
  </p>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body"><p><strong>Always code to interfaces.</strong> Create an interface (<code>Engine</code>), then have multiple classes implement it (<code>GameEngine</code>, <code>MockEngine</code>). Your classes that <em>use</em> those depend on the interface. Spring then decides which implementation to inject. This is the foundation of loosely coupled, testable, enterprise-grade code.</p></div>
  </div>

  <!-- ─────── S7 ─────── -->
  <h2 id="s7"><span class="sec">07 — Core Concept</span>Beans and the IoC Container</h2>

  <h3>What is a Bean?</h3>
  <p>
    A <strong>Spring Bean</strong> is any Java object that is created, configured, and managed by the Spring IoC container. There is nothing special about the class — it is a plain Java class. The word "bean" simply means: <em>this object's lifecycle is under Spring's control.</em>
  </p>

  <h3>What is the IoC Container?</h3>
  <p>
    The IoC Container is the heart of Spring. It is a runtime environment that holds all your beans. When your application starts, Spring reads your configuration, creates all the bean objects you declared, injects their dependencies, and stores them in this container. Whenever your code needs an object, it asks the container — not the <code>new</code> keyword.
  </p>

  <div class="diagram">
    <div class="diagram-title">The IoC Container Lifecycle</div>
    <div class="flow">
      <div class="fbox amber">
        <div class="fbox-label">Step 1</div>
        <div class="fbox-name">Your<br/>Configuration</div>
      </div>
      <div class="farr">&#8594;</div>
      <div class="fbox dark">
        <div class="fbox-label">Step 2</div>
        <div class="fbox-name">IoC Container<br/>Starts</div>
      </div>
      <div class="farr">&#8594;</div>
      <div class="fbox teal">
        <div class="fbox-label">Step 3</div>
        <div class="fbox-name">Beans Created<br/>&amp; Wired</div>
      </div>
      <div class="farr">&#8594;</div>
      <div class="fbox">
        <div class="fbox-label">Step 4</div>
        <div class="fbox-name">Your Code<br/>Uses Beans</div>
      </div>
    </div>
    <div class="diagram-cap">The container reads config → creates beans → injects dependencies → serves them to your code</div>
  </div>

  <h3>BeanFactory vs ApplicationContext</h3>
  <p>
    Spring gives you two container types. <strong><code>BeanFactory</code></strong> is the original, basic container — it is now deprecated and most of its classes have been removed in Spring 6. <strong><code>ApplicationContext</code></strong> is the modern, feature-rich container. It does everything <code>BeanFactory</code> does, plus event publishing, internationalisation, AOP support, and more.
  </p>

  <div class="box warn">
    <span class="box-ico">!</span>
    <div class="box-body"><p><strong>Always use <code>ApplicationContext</code>.</strong> Never use <code>BeanFactory</code> in Spring 6 — most of its implementing classes are deprecated or removed. <code>ApplicationContext</code> is the correct, modern choice for all projects.</p></div>
  </div>

  <p>There are different implementations of <code>ApplicationContext</code> — which one you use depends on how you configure Spring:</p>
  <ul>
    <li><code>ClassPathXmlApplicationContext</code> — for XML configuration</li>
    <li><code>AnnotationConfigApplicationContext</code> — for Java-based or annotation-based configuration</li>
    <li><code>SpringApplication.run()</code> — what Spring Boot uses internally (returns <code>ConfigurableApplicationContext</code>)</li>
  </ul>

  <!-- ─────── S8 ─────── -->
  <h2 id="s8"><span class="sec">08 — Config Style 1</span>XML Configuration</h2>
  <p>
    The original way to configure Spring. You write an XML file that tells Spring which classes to manage as beans. While modern projects use annotations, understanding XML configuration gives you a deep, intuitive understanding of what Spring is doing under the hood — and you will encounter it in many existing enterprise projects.
  </p>

  <h3>Step 1 — Add Spring Context to pom.xml</h3>
  <pre data-lang="XML"><code><span class="cm">&lt;!-- pom.xml — add this inside &lt;dependencies&gt; --&gt;</span>
<span class="kw">&lt;dependency&gt;</span>
    <span class="ty">&lt;groupId&gt;</span>org.springframework<span class="ty">&lt;/groupId&gt;</span>
    <span class="ty">&lt;artifactId&gt;</span>spring-context<span class="ty">&lt;/artifactId&gt;</span>
    <span class="ty">&lt;version&gt;</span>6.1.0<span class="ty">&lt;/version&gt;</span>
<span class="kw">&lt;/dependency&gt;</span></code></pre>

  <h3>Step 2 — Create the XML configuration file</h3>
  <p>Create a file named <code>beans.xml</code> (or any name you choose) inside <code>src/main/resources</code>. The namespace declaration at the top is mandatory — it tells Spring what the <code>&lt;bean&gt;</code> tag means:</p>

  <pre data-lang="XML"><code><span class="cm">&lt;!-- src/main/resources/beans.xml --&gt;</span>
<span class="kw">&lt;beans</span> xmlns=<span class="str">"http://www.springframework.org/schema/beans"</span>
       xmlns:xsi=<span class="str">"http://www.w3.org/2001/XMLSchema-instance"</span>
       xsi:schemaLocation=<span class="str">"http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd"</span><span class="kw">&gt;</span>

    <span class="cm">&lt;!-- id = the name used to retrieve this bean --&gt;</span>
    <span class="cm">&lt;!-- class = the fully-qualified class name       --&gt;</span>
    <span class="ty">&lt;bean</span> id=<span class="str">"player"</span>     class=<span class="str">"com.game.Player"</span><span class="ty">/&gt;</span>
    <span class="ty">&lt;bean</span> id=<span class="str">"gameEngine"</span> class=<span class="str">"com.game.GameEngine"</span><span class="ty">/&gt;</span>

<span class="kw">&lt;/beans&gt;</span></code></pre>

  <h3>Step 3 — Load the container and get beans</h3>
  <pre data-lang="Java"><code><span class="kw">public class</span> <span class="ty">MainApp</span> {
    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="ty">String</span>[] args) {

        <span class="cm">// This line: creates the container AND creates all beans in beans.xml</span>
        <span class="ty">ApplicationContext</span> context =
            <span class="kw">new</span> <span class="fn">ClassPathXmlApplicationContext</span>(<span class="str">"beans.xml"</span>);

        <span class="cm">// Ask by name only (returns Object — needs cast)</span>
        <span class="ty">Player</span> p1 = (<span class="ty">Player</span>) context.<span class="fn">getBean</span>(<span class="str">"player"</span>);

        <span class="cm">// Ask by name AND type (no cast needed — recommended)</span>
        <span class="ty">Player</span> p2 = context.<span class="fn">getBean</span>(<span class="str">"player"</span>, <span class="ty">Player</span>.class);

        <span class="cm">// Ask by type only (Spring searches the container by type)</span>
        <span class="ty">Player</span> p3 = context.<span class="fn">getBean</span>(<span class="ty">Player</span>.class);

        p2.<span class="fn">play</span>();
    }
}</code></pre>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body">
      <p><strong>When exactly are beans created?</strong> For the default singleton scope, beans are created <em>the moment you execute <code>new ClassPathXmlApplicationContext("beans.xml")</code></em> — not when you call <code>getBean()</code>. You can prove this by adding a <code>System.out.println("Object created")</code> inside the class constructor. If you comment out <code>getBean()</code> but keep the context line, you will still see "Object created" printed.</p>
      <p>This means: if you declare 10 beans in XML, Spring creates all 10 objects when the container loads — before you ask for any of them.</p>
    </div>
  </div>

  <!-- ─────── S9 ─────── -->
  <h2 id="s9"><span class="sec">09 — Injection Types</span>Setter Injection and Constructor Injection</h2>
  <p>
    When Spring creates a bean, it may need to fill in its properties. There are two ways to do this in XML: through <strong>setter methods</strong> using <code>&lt;property&gt;</code>, or through a <strong>constructor</strong> using <code>&lt;constructor-arg&gt;</code>.
  </p>

  <div class="tabs">
    <div class="tabs-hdr">
      <button class="t-btn on" onclick="tab(this,'ti-setter')">Setter Injection</button>
      <button class="t-btn" onclick="tab(this,'ti-ctor')">Constructor Injection</button>
      <button class="t-btn" onclick="tab(this,'ti-inner')">Inner Beans</button>
    </div>

    <div class="t-panel on" id="ti-setter">
      <p>Use <code>&lt;property&gt;</code> to set values via setter methods. Spring calls your setter method after creating the object. Use <code>value</code> for primitive types and Strings. Use <code>ref</code> to reference another bean by its id.</p>
<pre data-lang="XML" style="margin:0;"><code><span class="ty">&lt;bean</span> id=<span class="str">"player"</span> class=<span class="str">"com.game.Player"</span><span class="ty">&gt;</span>
    <span class="cm">&lt;!-- primitive value — calls setLevel(5) --&gt;</span>
    <span class="kw">&lt;property</span> name=<span class="str">"level"</span> value=<span class="str">"5"</span><span class="kw">/&gt;</span>

    <span class="cm">&lt;!-- object reference — calls setEngine(gameEngineBean) --&gt;</span>
    <span class="kw">&lt;property</span> name=<span class="str">"engine"</span> ref=<span class="str">"gameEngine"</span><span class="kw">/&gt;</span>
<span class="ty">&lt;/bean&gt;</span>

<span class="ty">&lt;bean</span> id=<span class="str">"gameEngine"</span> class=<span class="str">"com.game.GameEngine"</span><span class="ty">/&gt;</span></code></pre>
      <p>Spring calls your <code>setEngine()</code> setter automatically. You can prove this by adding a print statement inside the setter — it fires during container startup, not when you call <code>getBean()</code>.</p>
    </div>

    <div class="t-panel" id="ti-ctor">
      <p>Use <code>&lt;constructor-arg&gt;</code> to pass values through the constructor. Best for <strong>mandatory dependencies</strong> — the object cannot be created without them. To avoid ambiguity when you have multiple arguments of similar types, always use the <code>index</code> attribute:</p>
<pre data-lang="XML" style="margin:0;"><code><span class="ty">&lt;bean</span> id=<span class="str">"player"</span> class=<span class="str">"com.game.Player"</span><span class="ty">&gt;</span>
    <span class="cm">&lt;!-- index="0" = first constructor parameter --&gt;</span>
    <span class="kw">&lt;constructor-arg</span> index=<span class="str">"0"</span> value=<span class="str">"5"</span><span class="kw">/&gt;</span>
    <span class="cm">&lt;!-- index="1" = second constructor parameter --&gt;</span>
    <span class="kw">&lt;constructor-arg</span> index=<span class="str">"1"</span> ref=<span class="str">"gameEngine"</span><span class="kw">/&gt;</span>
<span class="ty">&lt;/bean&gt;</span></code></pre>
      <p>You can also use <code>type="int"</code> when all types are distinct, or <code>name="level"</code> when you add <code>@ConstructorProperties({"level","engine"})</code> to the constructor. However, <strong>index is the most reliable approach</strong> and works in all situations.</p>
    </div>

    <div class="t-panel" id="ti-inner">
      <p>If a bean is used by only one other bean and should not be accessible from anywhere else in your application, declare it as an <strong>inner bean</strong> — directly inside the <code>&lt;property&gt;</code> tag:</p>
<pre data-lang="XML" style="margin:0;"><code><span class="ty">&lt;bean</span> id=<span class="str">"player"</span> class=<span class="str">"com.game.Player"</span><span class="ty">&gt;</span>
    <span class="kw">&lt;property</span> name=<span class="str">"engine"</span><span class="kw">&gt;</span>
        <span class="cm">&lt;!-- Inner bean: only Player can use this --&gt;</span>
        <span class="ty">&lt;bean</span> class=<span class="str">"com.game.GameEngine"</span><span class="ty">/&gt;</span>
    <span class="kw">&lt;/property&gt;</span>
<span class="ty">&lt;/bean&gt;</span></code></pre>
      <p>An inner bean has no <code>id</code> attribute and is completely private to its parent. No other bean can reference it. Use this when a dependency belongs to one owner only.</p>
    </div>
  </div>

  <table>
    <thead><tr><th>Approach</th><th>XML Tag</th><th>Best for</th><th>When to choose</th></tr></thead>
    <tbody>
      <tr><td>Setter injection</td><td><code>&lt;property&gt;</code></td><td>Optional dependencies</td><td>When the property can be missing or changed after creation</td></tr>
      <tr><td>Constructor injection</td><td><code>&lt;constructor-arg&gt;</code></td><td>Mandatory dependencies</td><td>When the object cannot function without that value or object</td></tr>
      <tr><td>Primitive value</td><td><code>value="..."</code></td><td>int, String, boolean…</td><td>Any simple type that is not another bean</td></tr>
      <tr><td>Bean reference</td><td><code>ref="beanId"</code></td><td>Object dependencies</td><td>When the dependency is another managed bean</td></tr>
      <tr><td>Inner bean</td><td><code>&lt;bean&gt;</code> inside tag</td><td>Private dependencies</td><td>When only one bean ever needs this object</td></tr>
    </tbody>
  </table>

  <!-- ─────── S10 ─────── -->
  <h2 id="s10"><span class="sec">10 — Smarter Wiring</span>Auto-Wiring</h2>
  <p>
    Writing a <code>&lt;property ref="..."&gt;</code> for every dependency gets repetitive. Spring has a smarter option called <strong>auto-wiring</strong>, where you tell Spring to find and inject matching beans automatically — without you specifying every connection manually.
  </p>
  <p>
    Set <code>autowire</code> on the bean tag. Spring supports two main modes:
  </p>

  <pre data-lang="XML"><code><span class="cm">&lt;!-- byName: matches the field name to a bean id --&gt;</span>
<span class="cm">&lt;!--  Player.engine field → looks for bean with id="engine" --&gt;</span>
<span class="ty">&lt;bean</span> id=<span class="str">"player"</span> class=<span class="str">"com.game.Player"</span>
      autowire=<span class="str">"byName"</span><span class="ty">/&gt;</span>

<span class="cm">&lt;!-- byType: matches the field type to a bean's class --&gt;</span>
<span class="cm">&lt;!--  Player needs Engine → finds GameEngine (implements Engine) --&gt;</span>
<span class="ty">&lt;bean</span> id=<span class="str">"player"</span> class=<span class="str">"com.game.Player"</span>
      autowire=<span class="str">"byType"</span><span class="ty">/&gt;</span></code></pre>

  <div class="box warn">
    <span class="box-ico">!</span>
    <div class="box-body">
      <p><strong>Important:</strong> If you have an explicit <code>&lt;property&gt;</code> tag <em>and</em> <code>autowire</code> on the same bean, the explicit <code>&lt;property&gt;</code> tag always wins. Auto-wiring only fills in properties that are not already explicitly set.</p>
    </div>
  </div>

  <h3>The Ambiguity Problem — and How to Solve It</h3>
  <p>
    When you use <code>autowire="byType"</code> and Spring finds <em>two</em> beans of the same type (for example, both <code>GameEngine</code> and <code>MockEngine</code> implement the <code>Engine</code> interface), Spring does not know which one to pick and throws an error. There are two ways to fix this:
  </p>

  <div class="wire-vis">
    <div class="diagram-title">Two beans, same type — ambiguity problem</div>
    <div class="wire-row">
      <div>
        <div class="wire-bean iface">Engine (interface)</div>
        <div class="wire-label">what Player needs</div>
      </div>
      <div class="wire-conn">&#8592; <span>implemented by</span> &#8594;</div>
      <div>
        <div class="wire-bean impl">GameEngine</div>
        <div class="wire-label">id="gameEngine"</div>
      </div>
      <div class="wire-conn">&amp;</div>
      <div>
        <div class="wire-bean impl">MockEngine</div>
        <div class="wire-label">id="mockEngine"</div>
      </div>
    </div>
    <div class="diagram-cap">Spring cannot decide between two implementations of the same interface — use primary or explicit ref to resolve</div>
  </div>

  <pre data-lang="XML"><code><span class="cm">&lt;!-- Solution 1: mark one as primary — Spring picks it when confused --&gt;</span>
<span class="ty">&lt;bean</span> id=<span class="str">"gameEngine"</span> class=<span class="str">"com.game.GameEngine"</span> primary=<span class="str">"true"</span><span class="ty">/&gt;</span>
<span class="ty">&lt;bean</span> id=<span class="str">"mockEngine"</span>  class=<span class="str">"com.game.MockEngine"</span><span class="ty">/&gt;</span>

<span class="cm">&lt;!-- Solution 2: be explicit — use ref to name exactly which bean you want --&gt;</span>
<span class="ty">&lt;bean</span> id=<span class="str">"player"</span> class=<span class="str">"com.game.Player"</span><span class="ty">&gt;</span>
    <span class="kw">&lt;property</span> name=<span class="str">"engine"</span> ref=<span class="str">"gameEngine"</span><span class="kw">/&gt;</span>
<span class="ty">&lt;/bean&gt;</span></code></pre>

  <!-- ─────── S11 ─────── -->
  <h2 id="s11"><span class="sec">11 — Object Lifecycle</span>Bean Scope</h2>
  <p>
    Scope controls <em>how many instances</em> of a bean Spring creates and <em>when</em> it creates them. Spring Core provides two scopes you will use all the time:
  </p>

  <div class="scope-row">
    <div class="sc">
      <span class="sc-tag g">Default</span>
      <div class="sc-title">Singleton</div>
      <div class="sc-desc">Spring creates exactly <strong>one instance</strong> per container. Every call to <code>getBean()</code> returns the exact same object. The object is created when the container starts.</div>
      <div class="sc-proof">// Both obj1 and obj2 are the same object<br/>obj1.setLevel(10);<br/>System.out.println(obj2.getLevel()); // → 10</div>
    </div>
    <div class="sc">
      <span class="sc-tag r">On-demand</span>
      <div class="sc-title">Prototype</div>
      <div class="sc-desc">Spring creates a <strong>brand-new instance</strong> every time <code>getBean()</code> is called. Objects are <em>not</em> created at container startup — only when requested.</div>
      <div class="sc-proof">// obj1 and obj2 are different objects<br/>obj1.setLevel(10);<br/>System.out.println(obj2.getLevel()); // → 0</div>
    </div>
  </div>

  <pre data-lang="XML"><code><span class="ty">&lt;bean</span> id=<span class="str">"reportService"</span> class=<span class="str">"com.app.ReportService"</span>
      scope=<span class="str">"singleton"</span><span class="ty">/&gt;</span>  <span class="cm">&lt;!-- default if you omit scope --&gt;</span>

<span class="ty">&lt;bean</span> id=<span class="str">"shoppingCart"</span>  class=<span class="str">"com.app.ShoppingCart"</span>
      scope=<span class="str">"prototype"</span><span class="ty">/&gt;</span>  <span class="cm">&lt;!-- new instance every time --&gt;</span></code></pre>

  <div class="box note">
    <span class="box-ico">&#9888;</span>
    <div class="box-body"><p>Web applications add more scopes: <code>request</code> (one per HTTP request), <code>session</code> (one per HTTP session), and <code>websocket</code>. These only work inside a web-aware Spring application context. For Spring Core projects, only singleton and prototype are relevant.</p></div>
  </div>

  <!-- ─────── S12 ─────── -->
  <h2 id="s12"><span class="sec">12 — Performance</span>Lazy Initialisation</h2>
  <p>
    By default, all singleton beans are created when the container starts — even if your code never actually uses them during a given run. For beans that are expensive to create and rarely needed, this wastes memory and slows startup. The solution is <strong>lazy initialisation</strong>.
  </p>

  <pre data-lang="XML"><code><span class="cm">&lt;!-- This bean will NOT be created at startup --&gt;</span>
<span class="cm">&lt;!-- It is created only the first time someone calls getBean("reportEngine") --&gt;</span>
<span class="ty">&lt;bean</span> id=<span class="str">"reportEngine"</span>
      class=<span class="str">"com.app.HeavyReportEngine"</span>
      lazy-init=<span class="str">"true"</span><span class="ty">/&gt;</span></code></pre>

  <p>There are three important things to understand about lazy beans:</p>
  <ul>
    <li><strong>Still singleton:</strong> A lazy bean is still singleton. Spring creates it once and reuses it. The difference is <em>when</em> it is created — on first request, not at startup.</li>
    <li><strong>Forced by dependents:</strong> If a non-lazy (eager) bean depends on a lazy bean, the lazy bean will still be created at container startup because the eager bean needs it immediately.</li>
    <li><strong>Prototype beans are already lazy:</strong> Prototype beans are never created at startup — they are always created on demand when <code>getBean()</code> is called.</li>
  </ul>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body"><p>In a large application with hundreds of beans, marking rarely-used heavyweight beans as <code>lazy-init="true"</code> can noticeably improve startup time. However, do not mark everything lazy — eager beans give you early failure (errors appear at startup rather than halfway through the user's request).</p></div>
  </div>

  <div class="divider">&middot; &middot; &middot;</div>

  <!-- ─────── S13 ─────── -->
  <h2 id="s13"><span class="sec">13 — Config Style 2</span>Java-Based Configuration with @Bean</h2>
  <p>
    Java-based configuration replaces your XML file with a Java class. This is type-safe, IDE-friendly, and fully refactorable. Many developers prefer it over XML for modern projects.
  </p>
  <p>
    You need two things: a class annotated with <code>@Configuration</code>, and methods annotated with <code>@Bean</code> that return the objects Spring should manage.
  </p>

  <pre data-lang="Java"><code><span class="an">@Configuration</span>   <span class="cm">// tells Spring: this class contains bean definitions</span>
<span class="kw">public class</span> <span class="ty">AppConfig</span> {

    <span class="an">@Bean</span>           <span class="cm">// Spring manages the object returned by this method</span>
    <span class="kw">public</span> <span class="ty">GameEngine</span> <span class="fn">gameEngine</span>() {
        <span class="kw">return new</span> <span class="fn">GameEngine</span>();
    }

    <span class="an">@Bean</span>
    <span class="cm">// Spring sees Player needs Engine → looks in container → finds gameEngine()</span>
    <span class="kw">public</span> <span class="ty">Player</span> <span class="fn">player</span>(<span class="ty">Engine</span> engine) {
        <span class="ty">Player</span> p = <span class="kw">new</span> <span class="fn">Player</span>();
        p.<span class="fn">setLevel</span>(<span class="nc">1</span>);
        p.<span class="fn">setEngine</span>(engine);   <span class="cm">// Spring injects the engine bean here</span>
        <span class="kw">return</span> p;
    }
}</code></pre>

  <pre data-lang="Java"><code><span class="cm">// Load using AnnotationConfigApplicationContext (not ClassPathXmlApplicationContext)</span>
<span class="ty">ApplicationContext</span> context =
    <span class="kw">new</span> <span class="fn">AnnotationConfigApplicationContext</span>(<span class="ty">AppConfig</span>.class);

<span class="ty">Player</span> p = context.<span class="fn">getBean</span>(<span class="ty">Player</span>.class);
p.<span class="fn">play</span>();</code></pre>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body"><p><strong>Default bean name = method name.</strong> The bean returned by <code>gameEngine()</code> has the name <code>"gameEngine"</code>. You can override this with <code>@Bean(name = "myEngine")</code>, or provide multiple aliases: <code>@Bean(name = {"myEngine", "primaryEngine", "prod"})</code>. Whichever name you use in <code>getBean()</code>, Spring will find it.</p></div>
  </div>

  <h3>Scope, Primary, and Qualifier in Java Config</h3>
  <pre data-lang="Java"><code><span class="an">@Bean</span>
<span class="an">@Scope</span>(<span class="str">"prototype"</span>)          <span class="cm">// new instance every time</span>
<span class="kw">public</span> <span class="ty">ShoppingCart</span> <span class="fn">cart</span>() { <span class="kw">return new</span> <span class="fn">ShoppingCart</span>(); }

<span class="an">@Bean</span>
<span class="an">@Primary</span>                       <span class="cm">// preferred when Spring finds multiple Engine beans</span>
<span class="kw">public</span> <span class="ty">GameEngine</span> <span class="fn">gameEngine</span>() { <span class="kw">return new</span> <span class="fn">GameEngine</span>(); }

<span class="an">@Bean</span>
<span class="kw">public</span> <span class="ty">MockEngine</span> <span class="fn">mockEngine</span>() { <span class="kw">return new</span> <span class="fn">MockEngine</span>(); }

<span class="cm">// @Qualifier picks a specific bean by name — always beats @Primary</span>
<span class="an">@Bean</span>
<span class="kw">public</span> <span class="ty">Player</span> <span class="fn">player</span>(<span class="an">@Qualifier</span>(<span class="str">"mockEngine"</span>) <span class="ty">Engine</span> engine) {
    <span class="ty">Player</span> p = <span class="kw">new</span> <span class="fn">Player</span>();
    p.<span class="fn">setEngine</span>(engine);  <span class="cm">// specifically gets mockEngine, ignoring @Primary</span>
    <span class="kw">return</span> p;
}</code></pre>

  <!-- ─────── S14 ─────── -->
  <h2 id="s14"><span class="sec">14 — Config Style 3</span>Annotation-Based Configuration with @Component</h2>
  <p>
    The most modern approach — and the one you will see in almost every real Spring and Spring Boot project. Instead of declaring beans in XML or a config class, you annotate the classes themselves. Spring scans your packages, finds the annotated classes, and registers them as beans automatically.
  </p>

  <h3>Step 1 — Annotate your classes</h3>
  <pre data-lang="Java"><code><span class="an">@Component</span>                   <span class="cm">// "Spring, this class is a bean — manage it"</span>
<span class="kw">public class</span> <span class="ty">Player</span> {

    <span class="an">@Value</span>(<span class="str">"1"</span>)               <span class="cm">// inject a primitive value directly</span>
    <span class="kw">private int</span> level;

    <span class="an">@Autowired</span>
    <span class="kw">private</span> <span class="ty">Engine</span> engine;   <span class="cm">// Spring will inject this</span>

    <span class="kw">public void</span> <span class="fn">play</span>() {
        engine.<span class="fn">start</span>();
    }
}

<span class="an">@Component</span>
<span class="kw">public class</span> <span class="ty">GameEngine</span> <span class="kw">implements</span> <span class="ty">Engine</span> {
    <span class="kw">public void</span> <span class="fn">start</span>() {
        <span class="ty">System</span>.out.<span class="fn">println</span>(<span class="str">"Game engine starting..."</span>);
    }
}

<span class="an">@Component</span>
<span class="an">@Primary</span>                     <span class="cm">// preferred when multiple Engine implementations exist</span>
<span class="kw">public class</span> <span class="ty">TurboEngine</span> <span class="kw">implements</span> <span class="ty">Engine</span> {
    <span class="kw">public void</span> <span class="fn">start</span>() {
        <span class="ty">System</span>.out.<span class="fn">println</span>(<span class="str">"Turbo engine starting..."</span>);
    }
}</code></pre>

  <h3>Step 2 — Enable component scanning</h3>
  <pre data-lang="Java"><code><span class="an">@Configuration</span>
<span class="an">@ComponentScan</span>(basePackages = <span class="str">"com.game"</span>)  <span class="cm">// scan this package for @Component</span>
<span class="kw">public class</span> <span class="ty">AppConfig</span> {
    <span class="cm">// Empty — all beans come from @Component annotations on the classes</span>
}</code></pre>

  <div class="box warn">
    <span class="box-ico">!</span>
    <div class="box-body"><p><strong>Without <code>@ComponentScan</code>, nothing works.</strong> Spring will never look for <code>@Component</code> annotations on your classes unless you explicitly tell it where to scan. The <code>basePackages</code> value should be your top-level package. Spring then scans that package and all sub-packages automatically.</p></div>
  </div>

  <h3>Customising the bean name</h3>
  <p>
    By default, a class annotated with <code>@Component</code> gets a bean name that is the class name with the first letter lowercased. So <code>GameEngine</code> becomes <code>"gameEngine"</code>. You can override this:
  </p>
  <pre data-lang="Java"><code><span class="an">@Component</span>(<span class="str">"primaryEngine"</span>)  <span class="cm">// custom bean name</span>
<span class="kw">public class</span> <span class="ty">GameEngine</span> <span class="kw">implements</span> <span class="ty">Engine</span> { ... }</code></pre>

  <h3>Stereotype annotations</h3>
  <p>
    <code>@Component</code> is the generic marker. Spring provides three specialised versions that work identically under the hood, but communicate the <em>purpose</em> of the class more clearly to your team:
  </p>

  <div class="ann-grid">
    <div class="ann">
      <div class="ann-name">@Component</div>
      <div class="ann-desc">Generic — use when none of the others fits. Marks any class as a Spring-managed bean.</div>
    </div>
    <div class="ann">
      <div class="ann-name">@Service</div>
      <div class="ann-desc">For business logic / service layer classes. Semantically signals "this is where business rules live."</div>
    </div>
    <div class="ann">
      <div class="ann-name">@Repository</div>
      <div class="ann-desc">For data access layer (DAOs). Also auto-translates database-specific exceptions into Spring's exception hierarchy.</div>
    </div>
    <div class="ann">
      <div class="ann-name">@Controller</div>
      <div class="ann-desc">For web / MVC layer classes. Enables Spring MVC request mapping and HTTP handling capabilities.</div>
    </div>
  </div>

  <!-- ─────── S15 ─────── -->
  <h2 id="s15"><span class="sec">15 — Injection in Depth</span>@Autowired, @Qualifier, and @Value</h2>
  <p>
    When Spring scans and creates your <code>@Component</code>-annotated beans, it needs to fill in their dependencies. <code>@Autowired</code> is the annotation you use to tell Spring: <em>"this field/setter/constructor needs a bean injected into it."</em>
  </p>

  <h3>Three Ways to Use @Autowired</h3>
  <pre data-lang="Java"><code><span class="an">@Component</span>
<span class="kw">public class</span> <span class="ty">Player</span> {

    <span class="cm">// ── 1. Field Injection ──────────────────────────────────────</span>
    <span class="an">@Autowired</span>
    <span class="kw">private</span> <span class="ty">Engine</span> engine;
    <span class="cm">// Spring injects directly into the field</span>
    <span class="cm">// Quick, but hard to unit-test (cannot pass mock via constructor)</span>


    <span class="cm">// ── 2. Setter Injection ─────────────────────────────────────</span>
    <span class="kw">private</span> <span class="ty">Engine</span> engine;

    <span class="an">@Autowired</span>
    <span class="kw">public void</span> <span class="fn">setEngine</span>(<span class="ty">Engine</span> engine) {
        <span class="kw">this</span>.engine = engine;
    }
    <span class="cm">// Most flexible — dependency is optional, can be changed later</span>


    <span class="cm">// ── 3. Constructor Injection ─────────────────────────────────</span>
    <span class="kw">private final</span> <span class="ty">Engine</span> engine;

    <span class="an">@Autowired</span>
    <span class="kw">public</span> <span class="fn">Player</span>(<span class="ty">Engine</span> engine) {
        <span class="kw">this</span>.engine = engine;
    }
    <span class="cm">// Best for mandatory dependencies — easy to unit test</span>
    <span class="cm">// Allows field to be final (immutable)</span>
}</code></pre>

  <h3>Resolving Ambiguity: @Qualifier</h3>
  <p>
    When two or more beans match the required type, <code>@Autowired</code> alone is not enough — Spring does not know which one to inject. Use <code>@Qualifier</code> to specify the exact bean name:
  </p>
  <pre data-lang="Java"><code><span class="an">@Component</span>
<span class="kw">public class</span> <span class="ty">Player</span> {

    <span class="an">@Autowired</span>
    <span class="an">@Qualifier</span>(<span class="str">"mockEngine"</span>)   <span class="cm">// exact bean name — overrides @Primary</span>
    <span class="kw">private</span> <span class="ty">Engine</span> engine;
}</code></pre>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body"><p><strong>Priority rule:</strong> <code>@Qualifier</code> always wins over <code>@Primary</code>. If you specify a qualifier, Spring uses exactly that bean regardless of which one has <code>@Primary</code>. Use <code>@Primary</code> as a "safe default" and <code>@Qualifier</code> when you need a specific choice.</p></div>
  </div>

  <h3>@Value — Injecting Primitive Values</h3>
  <pre data-lang="Java"><code><span class="an">@Component</span>
<span class="kw">public class</span> <span class="ty">GameSettings</span> {

    <span class="an">@Value</span>(<span class="str">"1"</span>)                 <span class="cm">// hardcoded value</span>
    <span class="kw">private int</span> startingLevel;

    <span class="an">@Value</span>(<span class="str">game.maxPlayers</span>) <span class="cm">// reads from application.properties</span>
    <span class="kw">private int</span> maxPlayers;

    <span class="an">@Value</span>(<span class="str">game.title:MyGame</span>)<span class="cm">// reads from properties, default "MyGame"</span>
    <span class="kw">private</span> <span class="ty">String</span> title;
}</code></pre>

  <p>
    <code>@Value</code> is most powerful when reading from <code>application.properties</code> using the <code>property.key</code> syntax — this is how Spring Boot applications handle all their configuration values. You can also provide a default value after a colon: <code>key:defaultValue</code>.
  </p>

  <h3>@Scope in Annotation Config</h3>
  <pre data-lang="Java"><code><span class="an">@Component</span>
<span class="an">@Scope</span>(<span class="str">"prototype"</span>)            <span class="cm">// new instance on every getBean() call</span>
<span class="kw">public class</span> <span class="ty">ShoppingCart</span> { ... }

<span class="an">@Component</span>
<span class="an">@Scope</span>(<span class="str">"singleton"</span>)            <span class="cm">// default — one shared instance</span>
<span class="kw">public class</span> <span class="ty">ReportService</span> { ... }</code></pre>

  <!-- ─────── S16 ─────── -->
  <h2 id="s16"><span class="sec">16 — Spring Boot</span>How Spring Boot Connects Everything</h2>
  <p>
    In the early days of Spring, even printing "Hello World" required you to set up XML files, configure the container, and declare every bean before running a single line of business logic. Spring Boot was created specifically to eliminate that setup ceremony.
  </p>
  <p>
    <strong>Spring Boot is not a different framework</strong> — it is Spring Framework with opinionated defaults and auto-configuration on top. Every bean, every container, every annotation you learned in this article works exactly the same in Spring Boot.
  </p>

  <h3>Setting Up a Spring Boot Project</h3>
  <p>
    The easiest way to create a Spring Boot project is through <strong>start.spring.io</strong> — the official Spring Initializr. Go there, choose your project type (Maven), language (Java), Spring Boot version (3.x), and add any dependencies you need. Click Generate. You get a zip file with a complete, ready-to-run project structure. Import it into any IDE and you are ready to write code.
  </p>
  <p>Eclipse also has a "Spring Starter Project" option built into the New Project wizard (after installing the Spring Tools plugin) — it uses the same start.spring.io URL internally.</p>

  <h3>The @SpringBootApplication Annotation</h3>
  <pre data-lang="Java"><code><span class="cm">// @SpringBootApplication = three annotations combined:</span>
<span class="cm">// @Configuration + @ComponentScan + @EnableAutoConfiguration</span>
<span class="an">@SpringBootApplication</span>
<span class="kw">public class</span> <span class="ty">GameApp</span> {

    <span class="kw">public static void</span> <span class="fn">main</span>(<span class="ty">String</span>[] args) {

        <span class="cm">// SpringApplication.run() creates the IoC container</span>
        <span class="cm">// It returns ConfigurableApplicationContext</span>
        <span class="cm">// (which extends ApplicationContext)</span>
        <span class="ty">ApplicationContext</span> context =
            <span class="ty">SpringApplication</span>.<span class="fn">run</span>(<span class="ty">GameApp</span>.class, args);

        <span class="cm">// You can still call getBean() if needed</span>
        <span class="ty">Player</span> p = context.<span class="fn">getBean</span>(<span class="ty">Player</span>.class);
        p.<span class="fn">play</span>();
    }
}</code></pre>

  <p>
    <code>@SpringBootApplication</code> combines three annotations that you have already seen in this article:
  </p>
  <ul>
    <li><strong><code>@Configuration</code></strong> — this class can define <code>@Bean</code> methods</li>
    <li><strong><code>@ComponentScan</code></strong> — scan the current package and all sub-packages for <code>@Component</code>, <code>@Service</code>, <code>@Repository</code>, <code>@Controller</code></li>
    <li><strong><code>@EnableAutoConfiguration</code></strong> — the Boot-specific part — automatically configures Spring based on the jars on your classpath (if Spring MVC jar is present, configure a web server; if JPA jar is present, configure a database connection pool; etc.)</li>
  </ul>

  <h3>How Spring Boot Relates to Spring Framework</h3>
  <div class="cfg-row">
    <div class="cfg">
      <div class="cfg-hdr am"><span class="cfg-dot"></span>Spring Framework Only</div>
      <div class="cfg-body">
        <ul class="cfg-list">
          <li>Full manual configuration</li>
          <li>XML or Java <code>@Bean</code> config</li>
          <li>You choose every dependency</li>
          <li>ClassPathXmlApplicationContext or AnnotationConfigApplicationContext</li>
          <li>Best for learning internals</li>
        </ul>
      </div>
    </div>
    <div class="cfg">
      <div class="cfg-hdr tl"><span class="cfg-dot"></span>Spring Boot (on top)</div>
      <div class="cfg-body">
        <ul class="cfg-list">
          <li>Auto-configuration from classpath</li>
          <li><code>@SpringBootApplication</code></li>
          <li>Starter POMs bundle dependencies</li>
          <li>SpringApplication.run()</li>
          <li>Best for real projects</li>
        </ul>
      </div>
    </div>
    <div class="cfg">
      <div class="cfg-hdr rd"><span class="cfg-dot"></span>Under the Hood (always)</div>
      <div class="cfg-body">
        <ul class="cfg-list">
          <li>Spring Framework 6 core</li>
          <li>Same IoC container</li>
          <li>Same beans, same scopes</li>
          <li>Same @Autowired, @Component</li>
          <li>Same ApplicationContext</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="box tip">
    <span class="box-ico">&#10022;</span>
    <div class="box-body"><p>When you add Spring Boot to a project and look at its external libraries in your IDE, you will find <code>spring-framework</code> version 6 listed as a dependency of Spring Boot. This confirms: Spring Boot <em>depends on</em> Spring Framework — they are not alternatives. Every piece of knowledge from this article applies directly inside every Spring Boot application you will ever write.</p></div>
  </div>

  <div class="divider">* &nbsp;&nbsp; * &nbsp;&nbsp; *</div>

  <!-- TAKEAWAYS -->
  <div class="takeaways">
    <div class="tk-title">Everything You Need to Remember</div>
    <ul>
      <li><strong>Spring Framework</strong> is a lightweight, POJO-based enterprise Java framework. Spring Boot is an opinionated layer built on top of it — not a replacement.</li>
      <li><strong>Spring Boot 3 requires Spring Framework 6 and Java 17 or above.</strong> Use start.spring.io to generate a project structure without any manual setup.</li>
      <li><strong>IoC (Inversion of Control)</strong> means you hand responsibility for object creation and lifecycle to Spring. You focus on business logic.</li>
      <li><strong>Dependency Injection</strong> is the design pattern that implements IoC — objects receive their dependencies injected from outside rather than creating them with <code>new</code>.</li>
      <li><strong>A Bean</strong> is any Java object created and managed by the Spring IoC container. <code>ApplicationContext</code> is the modern container — never use the deprecated <code>BeanFactory</code>.</li>
      <li><strong>Beans are created at container startup</strong> (for singleton scope), not when you call <code>getBean()</code>. You can verify this by printing inside the constructor.</li>
      <li><strong>Singleton scope</strong> (default): one shared instance per container. <strong>Prototype scope</strong>: a new instance on every <code>getBean()</code> call.</li>
      <li><strong>Lazy-init</strong> delays singleton creation until first request. The bean is still singleton — just created later. Eager beans that depend on lazy beans force the lazy bean to be created at startup anyway.</li>
      <li><strong>Three configuration styles:</strong> XML (<code>&lt;bean&gt;</code> tags), Java-based (<code>@Configuration</code> + <code>@Bean</code>), and Annotation-based (<code>@Component</code> + <code>@ComponentScan</code>). All three produce the same result.</li>
      <li><strong>Setter injection</strong> (<code>&lt;property&gt;</code>) is best for optional dependencies. <strong>Constructor injection</strong> (<code>&lt;constructor-arg&gt;</code>) is best for mandatory dependencies.</li>
      <li><strong>Auto-wiring byType</strong> fails if two beans share the same type. Fix with <code>primary="true"</code> in XML or <code>@Primary</code> in Java/annotation config.</li>
      <li><strong><code>@Qualifier</code> always wins over <code>@Primary</code></strong> when resolving ambiguity. Use <code>@Primary</code> as the safe default, <code>@Qualifier</code> when you need a specific bean.</li>
      <li><strong><code>@Value</code></strong> injects primitive values. Use <code>property.key</code> to read from <code>application.properties</code> in Spring Boot.</li>
      <li><strong><code>@SpringBootApplication</code></strong> = <code>@Configuration</code> + <code>@ComponentScan</code> + <code>@EnableAutoConfiguration</code>. It starts the same IoC container you have been learning about throughout this article.</li>
    </ul>
  </div>

  </article>

<!-- ══════════════ JS ══════════════ -->
<script>
/* reading progress + header scroll */
window.addEventListener('scroll', () => {
  const st = document.documentElement.scrollTop;
  const dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (document.getElementById('prog')) document.getElementById('prog').style.width = (st / dh * 100) + '%';

  /* active TOC link */
  const links = document.querySelectorAll('.toc-list a');
  const sections = [...document.querySelectorAll('h2[id]')];
  let current = '';
  sections.forEach(s => { if (st >= s.offsetTop - 100) current = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});

/* tab switcher */
function tab(btn, id) {
  const box = btn.closest('.tabs');
  box.querySelectorAll('.t-btn').forEach(b => b.classList.remove('on'));
  box.querySelectorAll('.t-panel').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  document.getElementById(id).classList.add('on');
}
</script>
</body>
</html>`,
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS — all articles required by your app
// ─────────────────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  javaMemoryArticle,
  springFrameWorkArticle,
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}
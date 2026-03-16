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
// ARTICLE 2 — Java Memory & OOP
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
  body {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 19px;
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
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 700;
    color: var(--ink);
    margin: 64px 0 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--rule);
    line-height: 1.3;
  }
  h2 .num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: var(--accent);
    display: block;
    margin-bottom: 4px;
    letter-spacing: 0.1em;
  }
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 400;
    font-style: italic;
    color: var(--ink);
    margin: 36px 0 14px;
  }
  blockquote {
    border-left: 4px solid var(--accent);
    margin: 40px 0;
    padding: 20px 32px;
    background: var(--paper-warm);
    border-radius: 0 8px 8px 0;
  }
  blockquote p {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-style: italic;
    color: var(--ink);
    margin: 0;
    line-height: 1.5;
  }
  pre {
    background: #1e1e2e !important;
    border-radius: 10px;
    padding: 28px 32px;
    margin: 28px 0;
    overflow-x: auto;
    box-shadow: var(--shadow);
    position: relative;
    opacity: 1 !important;
  }
  pre::before {
    content: attr(data-lang);
    position: absolute; top: 10px; right: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(250,248,244,0.4);
  }
  pre code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14.5px;
    line-height: 1.75;
    color: #cdd6f4 !important;
    opacity: 1 !important;
    background: none !important;
    border: none !important;
    padding: 0 !important;
  }
  .kw   { color: #f38ba8 !important; opacity: 1 !important; }
  .ty   { color: #f9e2af !important; opacity: 1 !important; }
  .str  { color: #a6e3a1 !important; opacity: 1 !important; }
  .cm   { color: #6c7086 !important; font-style: italic; opacity: 1 !important; }
  .fn   { color: #89b4fa !important; opacity: 1 !important; }
  .num-c { color: #fab387 !important; opacity: 1 !important; }
  p code, li code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    background: var(--code-bg);
    padding: 2px 7px;
    border-radius: 4px;
    color: var(--accent);
    opacity: 1 !important;
  }
  .diagram-card {
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: 16px;
    padding: 32px 28px 24px;
    margin: 40px 0;
    box-shadow: var(--shadow);
  }
  .diagram-card .caption {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-faint);
    text-align: center;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--rule);
  }
  .diagram-card svg text { font-family: 'Source Serif 4', serif; }
  .info-box {
    border: 1px solid;
    border-radius: 10px;
    padding: 20px 24px;
    margin: 28px 0;
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }
  .info-box.tip  { border-color: rgba(22,160,133,0.3); background: rgba(22,160,133,0.05); }
  .info-box.warn { border-color: rgba(192,57,43,0.25); background: rgba(192,57,43,0.04); }
  .info-box .icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 500; }
  .info-box.tip  .icon { color: var(--accent-teal); }
  .info-box.warn .icon { color: var(--accent); }
  .info-box p { margin: 0; font-size: 16px; color: var(--ink-mid); }
  .table-wrap { overflow-x: auto; margin: 28px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 16px; }
  th {
    background: var(--ink);
    color: var(--paper);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 12px 18px;
    text-align: left;
  }
  td { padding: 12px 18px; border-bottom: 1px solid var(--rule); color: var(--ink-mid); }
  tr:nth-child(even) td { background: var(--paper-warm); }
  .stepper {
    background: var(--paper-card);
    border: 1px solid var(--rule);
    border-radius: 16px;
    overflow: hidden;
    margin: 40px 0;
    box-shadow: var(--shadow);
  }
  .stepper-header {
    background: var(--ink);
    color: var(--paper);
    padding: 18px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.08em;
  }
  .step-dots { display: flex; gap: 8px; }
  .step-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(250,248,244,0.2); cursor: pointer; transition: background 0.2s; }
  .step-dot.active { background: var(--accent-warm); }
  .stepper-body { padding: 32px 28px; }
  .step-panel { display: none; animation: fadeIn 0.3s ease; }
  .step-panel.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  .step-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
  .step-title .step-num { display: inline-block; background: var(--accent); color: white; font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 2px 8px; border-radius: 3px; margin-right: 10px; vertical-align: middle; }
  .stepper-nav { padding: 16px 28px; border-top: 1px solid var(--rule); display: flex; gap: 10px; }
  .stepper-nav button { padding: 8px 20px; border-radius: 6px; border: 1px solid var(--rule); background: var(--paper-warm); color: var(--ink); font-family: 'JetBrains Mono', monospace; font-size: 12px; cursor: pointer; transition: all 0.15s; }
  .stepper-nav button:hover { background: var(--ink); color: var(--paper); }
  .stepper-nav button:disabled { opacity: 0.35; cursor: default; }
  .stepper-nav button:disabled:hover { background: var(--paper-warm); color: var(--ink); }
  .takeaways { background: var(--ink); color: var(--paper); border-radius: 16px; padding: 40px 40px 36px; margin: 56px 0; }
  .takeaways h2 { color: var(--paper); border-bottom-color: rgba(250,248,244,0.15); margin-top: 0; font-size: 26px; }
  .takeaways ul { list-style: none; padding: 0; }
  .takeaways li { padding: 10px 0 10px 28px; position: relative; border-bottom: 1px solid rgba(250,248,244,0.08); font-size: 17px; color: rgba(250,248,244,0.8); line-height: 1.65; }
  .takeaways li::before { content: '\\2192'; position: absolute; left: 0; color: var(--accent-warm); font-family: 'JetBrains Mono', monospace; }
  .takeaways li:last-child { border-bottom: none; }
  .divider { text-align: center; margin: 48px 0; color: var(--ink-faint); letter-spacing: 0.3em; font-size: 13px; }
  .constructor-viz { padding: 24px; background: var(--paper-warm); border-radius: 12px; margin-top: 12px; }
  .field-row { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; margin: 8px 0; border: 1px solid transparent; transition: all 0.4s ease; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
  .field-row.blueprint  { background: #edf4fb; border-color: #b3cfe8; color: #1a5276; }
  .field-row.overwritten { background: #fdf0ec; border-color: #f0a898; color: #922b21; }
  .field-label { font-weight: 500; min-width: 60px; }
  .field-source { font-size: 11px; padding: 2px 8px; border-radius: 3px; margin-left: auto; }
  .blueprint .field-source  { background: #b3cfe8; color: #1a5276; }
  .overwritten .field-source { background: #f0a898; color: #922b21; }
</style>
</head>
<body>

<div id="progress"></div>

<div style="max-width:740px;margin:0 auto;padding:64px 24px 120px;">

  <p class="drop-cap">Most people learn Object-Oriented Programming the textbook way — memorizing lines like "a class is a blueprint" and "an object is an instance of a class." These definitions are correct. But they hide something far more interesting: what is <em>actually happening inside your computer's memory</em> when you type those words and hit run?</p>

  <p>In this article, we are going to pull back the curtain completely. We will connect OOP to RAM, trace every field and value to its exact memory region, and expose the one special case where the most intuitive analogy in programming completely breaks down. By the end, you will never look at a class definition the same way again.</p>

  <blockquote>
    <p>Understanding memory does not make you a slower programmer. It makes you a precise one — someone who knows <em>why</em> things work, not just that they do.</p>
  </blockquote>

  <h2><span class="num">01 &mdash;</span> The Analogy That Changes Everything</h2>

  <p>Before we touch memory regions, let us build the mental model with something you already know: basic variables.</p>

  <p>When you write <code>int x = 5;</code> you are doing three distinct things at once. <code>int</code> is the <strong>type</strong> — it tells the compiler what kind of thing this is. <code>x</code> is the <strong>variable name</strong> — it is a label that secretly holds a RAM address. And <code>5</code> is the <strong>value</strong> — the actual data living at that address.</p>

  <p>Now hold that structure in your head and look at this:</p>

  <pre data-lang="Java"><code><span class="ty">Car</span> myCar = <span class="kw">new</span> <span class="ty">Car</span>();</code></pre>

  <p>The mapping is exact. <code>Car</code> is the <strong>class</strong> (type). <code>myCar</code> is the <strong>object variable</strong> (name that holds an address). <code>new Car()</code> creates the <strong>object</strong> (the actual value living in memory).</p>

  <div class="diagram-card">
    <svg width="100%" viewBox="0 0 680 310" xmlns="http://www.w3.org/2000/svg">
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

  <h2><span class="num">02 &mdash;</span> Where Everything Lives in RAM</h2>

  <p>When your Java program runs, the JVM divides memory into distinct regions. Two of them are critical to understanding OOP.</p>

  <h3>The Method Area (Class Area)</h3>
  <p>When the JVM loads a class for the first time, it reads the compiled bytecode and stores the class's <em>blueprint</em> here. This includes field names, their types, any default values you declared inline, all method definitions, constructor definitions, and — crucially — all static variables and static methods. This happens once, at class loading time.</p>

  <h3>The Heap</h3>
  <p>This is where actual objects live. Every time you call <code>new Car()</code>, the JVM carves out a fresh chunk of Heap memory, populates it with the object's fields, and returns the address of that chunk. Your object variable (say, <code>myCar</code>) stores this address. It is just a pointer.</p>

  <div class="diagram-card">
    <svg width="100%" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg">
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

  <h2><span class="num">03 &mdash;</span> Blueprint Defaults and What Happens at Object Creation</h2>

  <p>Consider this class:</p>

  <pre data-lang="Java"><code><span class="kw">class</span> <span class="ty">Car</span> {
    <span class="kw">private</span> <span class="ty">String</span> color = <span class="str">"green"</span>;
    <span class="kw">private</span> <span class="ty">String</span> size;
}</code></pre>

  <p>When the JVM loads this class, it writes both field declarations into the Method Area as part of the blueprint. <code>color</code> gets an explicit default of <code>"green"</code>. <code>size</code> gets no explicit default, so it is stored as <code>null</code>.</p>

  <p>Now the critical moment: you call <code>new Car()</code>. Here is the exact sequence:</p>

  <ol style="margin: 0 0 1.6em 1.4em; color: var(--ink-mid);">
    <li style="margin-bottom: 10px;">The JVM allocates a fresh block of memory in the <strong>Heap</strong></li>
    <li style="margin-bottom: 10px;">It reads the blueprint from the Method Area</li>
    <li style="margin-bottom: 10px;">It copies the defaults into the new Heap block: <code>color = "green"</code>, <code>size = null</code></li>
    <li style="margin-bottom: 10px;">It returns the address of this Heap block</li>
    <li>Your variable (e.g. <code>myCar</code>) stores that address</li>
  </ol>

  <h2><span class="num">04 &mdash;</span> The Constructor — Overwriting the Blueprint Defaults</h2>

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
        <p style="color:var(--ink-soft);font-size:17px;margin-bottom:16px">The JVM allocates a fresh block of memory in the Heap. All fields start completely uninitialised.</p>
        <div class="constructor-viz">
          <div class="field-row blueprint"><span class="field-label">color</span><span>= ??? (not set yet)</span><span class="field-source">waiting</span></div>
          <div class="field-row blueprint"><span class="field-label">size</span><span>= ??? (not set yet)</span><span class="field-source">waiting</span></div>
        </div>
      </div>
      <div class="step-panel" id="step-1">
        <div class="step-title"><span class="step-num">02</span>Blueprint defaults applied</div>
        <p style="color:var(--ink-soft);font-size:17px;margin-bottom:16px">The JVM reads the class blueprint from the Method Area and copies the declared defaults into the new Heap object. The constructor has not run yet.</p>
        <div class="constructor-viz">
          <div class="field-row blueprint"><span class="field-label">color</span><span>= "green"</span><span class="field-source">from blueprint</span></div>
          <div class="field-row blueprint"><span class="field-label">size</span><span>= null</span><span class="field-source">from blueprint</span></div>
        </div>
      </div>
      <div class="step-panel" id="step-2">
        <div class="step-title"><span class="step-num">03</span>Constructor overwrites</div>
        <p style="color:var(--ink-soft);font-size:17px;margin-bottom:16px">Now the constructor body runs. It overwrites both fields. The initial <code>"green"</code> never survives — it was applied and immediately replaced.</p>
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

  <h2><span class="num">05 &mdash;</span> Static — Where the Analogy Breaks Down</h2>

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
      <li>Class = Type, Object variable = Variable name, Object = Value.This analogy maps perfectly for instance-based OOP.</li>
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
// EXPORTS — all three are required by your app
// ─────────────────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  javaMemoryArticle,
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { getArticleById } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Script execution helpers ─────────────────────────────────────────────────

function runInline(scripts: HTMLScriptElement[]) {
  scripts.forEach((s) => {
    const ns = document.createElement("script");
    ns.setAttribute("data-injected", "true");
    ns.textContent = s.textContent;
    s.parentNode?.replaceChild(ns, s);
  });
}

function loadExternalThenInline(container: HTMLElement) {
  const allScripts = Array.from(container.querySelectorAll("script"));
  const external = allScripts.filter((s) => s.src);
  const inline = allScripts.filter((s) => !s.src);

  if (external.length === 0) {
    runInline(inline);
    return;
  }

  let loaded = 0;
  external.forEach((s) => {
    const alreadyLoaded = Array.from(
      document.querySelectorAll("script[src]")
    ).some((existing) => (existing as HTMLScriptElement).src === s.src);

    if (alreadyLoaded) {
      loaded++;
      if (loaded === external.length) runInline(inline);
      return;
    }

    const ns = document.createElement("script");
    ns.src = s.src;
    ns.async = false;
    ns.setAttribute("data-injected", "true");
    ns.onload = () => {
      loaded++;
      if (loaded === external.length) runInline(inline);
    };
    ns.onerror = () => {
      loaded++;
      if (loaded === external.length) runInline(inline);
    };
    document.head.appendChild(ns);
    s.remove();
  });
}

// ─── TOC config per article ───────────────────────────────────────────────────

interface TocItem {
  id: string;
  label: string;
  num: string;
}

const TOC_MAP: Record<string, TocItem[]> = {
  "java-memory-oop": [
    { id: "s1", num: "01", label: "The Analogy That Changes Everything" },
    { id: "s2", num: "02", label: "Where Everything Lives in RAM" },
    { id: "s3", num: "03", label: "Blueprint Defaults & Object Creation" },
    { id: "s4", num: "04", label: "The Constructor — Overwriting Defaults" },
    { id: "s5", num: "05", label: "Static — Where the Analogy Breaks Down" },
  ],
  "spring-framework-complete-guide": [
    { id: "s1",  num: "01", label: "What Is Spring?" },
    { id: "s2",  num: "02", label: "The Ecosystem" },
    { id: "s3",  num: "03", label: "Prerequisites" },
    { id: "s4",  num: "04", label: "Spring vs Spring Boot" },
    { id: "s5",  num: "05", label: "Inversion of Control" },
    { id: "s6",  num: "06", label: "Dependency Injection" },
    { id: "s7",  num: "07", label: "Beans & Container" },
    { id: "s8",  num: "08", label: "XML Configuration" },
    { id: "s9",  num: "09", label: "Setter & Constructor DI" },
    { id: "s10", num: "10", label: "Auto-Wiring" },
    { id: "s11", num: "11", label: "Bean Scope" },
    { id: "s12", num: "12", label: "Lazy Initialisation" },
    { id: "s13", num: "13", label: "Java Config (@Bean)" },
    { id: "s14", num: "14", label: "Annotation Config" },
    { id: "s15", num: "15", label: "@Autowired in Depth" },
    { id: "s16", num: "16", label: "Spring Boot Explained" },
  ],
};

// ─── Animation variants ───────────────────────────────────────────────────────

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.35 },
  },
};

// ─── Hook: viewport width watcher ────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ─── Hook: measure actual header height dynamically ──────────────────────────

function useHeaderHeight() {
  const [headerHeight, setHeaderHeight] = useState(64);
  useEffect(() => {
    const measure = () => {
      const header =
        document.querySelector("header") ||
        document.querySelector("[data-header]") ||
        document.querySelector("nav");
      if (header) {
        setHeaderHeight(header.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);
  return headerHeight;
}

// ─── ArticlePage ──────────────────────────────────────────────────────────────

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || "");
  const contentRef = useRef<HTMLDivElement>(null);
  const tocItems = id ? (TOC_MAP[id] ?? []) : [];
  const isMobile = useIsMobile();
  const headerHeight = useHeaderHeight();

  // Mobile TOC bar is ~46px tall
  const mobileTocHeight = 46;
  // Total offset = header + TOC bar + 16px breathing room
  const mobileScrollOffset = headerHeight + mobileTocHeight + 16;

  // ── Always scroll to top when the article changes ──
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  // ── Re-run embedded scripts after content mounts ──
  useEffect(() => {
    if (!contentRef.current) return;
    const timer = setTimeout(() => {
      loadExternalThenInline(contentRef.current!);
    }, 50);
    return () => clearTimeout(timer);
  }, [article?.id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4 text-foreground">
              Article not found
            </h1>
            <Link to="/" className="text-primary hover:underline text-sm">
              ← Back to all articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasToc = tocItems.length > 0;

  // Wide layout for articles with many TOC items (Spring), normal for short ones
  const isWide = tocItems.length > 5;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={article.id}
        className="min-h-screen flex flex-col"
        style={{ background: "#faf8f4" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Header />

        {/* ── Dark hero banner ── */}
        <motion.div
          style={{ background: "#1a1814", color: "#faf8f4" }}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              maxWidth: isWide ? "1100px" : "780px",
              margin: "0 auto",
              padding: isMobile ? "40px 16px 36px" : "64px 24px 56px",
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Back link */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mb-6 md:mb-8 transition-opacity duration-200 hover:opacity-70"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "rgba(250,248,244,0.35)",
                    textDecoration: "none",
                  }}
                >
                  ← All Articles
                </Link>
              </motion.div>

              {/* Category badge */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-4 md:mb-5"
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: "#e67e22",
                    border: "1px solid rgba(230,126,34,0.35)",
                    padding: "3px 12px",
                    borderRadius: "2px",
                  }}
                >
                  {article.category}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? "clamp(22px, 7vw, 32px)" : "clamp(26px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#faf8f4",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "16px",
                  maxWidth: "720px",
                }}
              >
                {article.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(14px, 2.5vw, 18px)",
                  fontStyle: "italic",
                  color: "rgba(250,248,244,0.5)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  maxWidth: "560px",
                  marginBottom: "24px",
                }}
              >
                {article.subtitle}
              </motion.p>

              {/* Meta row */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.06em",
                  color: "rgba(250,248,244,0.3)",
                }}
              >
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Reading progress bar */}
        <ReadingProgress />

        {/* ── Mobile TOC: sticky below the header ── */}
        {hasToc && isMobile && (
          <MobileToc
            items={tocItems}
            scrollOffset={mobileScrollOffset}
            headerHeight={headerHeight}
            meta={{
              category: article.category,
              readTime: article.readTime,
              date: article.date,
            }}
          />
        )}

        {/* ── Article body + optional desktop TOC sidebar ── */}
        <motion.main
          className="flex-1"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            style={{
              maxWidth: hasToc && !isMobile ? (isWide ? "1280px" : "1100px") : "780px",
              margin: "0 auto",
              padding: isMobile ? "24px 16px 0" : "64px 32px 0",
              display: "grid",
              gridTemplateColumns:
                hasToc && !isMobile
                  ? isWide
                    ? "1fr 230px"
                    : "1fr 220px"
                  : "1fr",
              gridTemplateAreas:
                hasToc && !isMobile ? '"article toc"' : '"article"',
              justifyContent: "center",
              gap: hasToc && !isMobile ? "60px" : "0",
              alignItems: "start",
            }}
          >
            {/* Article HTML */}
            <div
              ref={contentRef}
              style={{ gridArea: "article", minWidth: 0, overflowX: "hidden" }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Desktop-only sticky TOC sidebar */}
            {hasToc && !isMobile && (
              <TocSidebar
                items={tocItems}
                meta={{
                  category: article.category,
                  readTime: article.readTime,
                  date: article.date,
                }}
              />
            )}
          </div>
        </motion.main>

        {/* Back link footer */}
        <motion.div
          style={{
            maxWidth: isWide ? "1280px" : "780px",
            margin: "0 auto",
            padding: isMobile ? "24px 16px 48px" : "32px 32px 64px",
            width: "100%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition-all duration-200 hover:gap-3"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "#c0392b",
              textDecoration: "none",
              textTransform: "uppercase" as const,
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all articles
          </Link>
        </motion.div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Mobile TOC — collapsible accordion ──────────────────────────────────────

const MobileToc = ({
  items,
  scrollOffset,
  headerHeight,
  meta,
}: {
  items: TocItem[];
  scrollOffset: number;
  headerHeight: number;
  meta: { category: string; readTime: string; date: string };
}) => {
  const [open, setOpen] = useState(false);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2ddd6",
        position: "sticky",
        top: `${headerHeight}px`,
        zIndex: 40,
        boxShadow: open ? "0 4px 16px rgba(26,24,20,0.08)" : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#c0392b",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "14px",
              height: "1px",
              background: "#c0392b",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          Contents
        </span>
        <span
          style={{
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease",
            fontSize: "13px",
            lineHeight: 1,
          }}
        >
          ▾
        </span>
      </button>

      {/* Expandable link list */}
      {open && (
        <div
          style={{
            padding: "0 16px 16px",
            maxHeight: "60vh",
            overflowY: "auto",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map(({ id, num, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "9px 4px",
                    borderBottom: "1px solid #f0ece4",
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "14.5px",
                    fontWeight: 300,
                    color: "#6b6358",
                    textDecoration: "none",
                    lineHeight: 1.45,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: "#9c9489",
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  >
                    {num}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#c0392b",
              lineHeight: 1.7,
              margin: "12px 4px 0",
              opacity: 0.7,
            }}
          >
            {meta.category} · {meta.readTime} · {meta.date}
          </p>
        </div>
      )}
    </div>
  );
};

// ─── TOC Sidebar — desktop only ───────────────────────────────────────────────

const TocSidebar = ({
  items,
  meta,
}: {
  items: TocItem[];
  meta: { category: string; readTime: string; date: string };
}) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      items.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = id;
        }
      });
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <aside
      style={{
        gridArea: "toc",
        position: "sticky",
        top: "90px",
        alignSelf: "start",
        maxHeight: "calc(100vh - 110px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2ddd6",
          borderRadius: "14px",
          padding: "20px 18px",
          boxShadow: "0 2px 24px rgba(26,24,20,0.07)",
        }}
      >
        {/* Heading */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            color: "#c0392b",
            marginBottom: "13px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "16px",
              height: "1px",
              background: "#c0392b",
              flexShrink: 0,
              display: "inline-block",
            }}
          />
          Contents
        </div>

        {/* Links */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map(({ id, num, label }) => {
            const isActive = activeId === id;
            return (
              <li key={id} style={{ marginBottom: "1px" }}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleClick(e, id)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    padding: "5px 8px 5px 10px",
                    borderLeft: `2px solid ${isActive ? "#c0392b" : "transparent"}`,
                    borderRadius: "0 5px 5px 0",
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "12.5px",
                    fontWeight: isActive ? 400 : 300,
                    color: isActive ? "#c0392b" : "#6b6358",
                    textDecoration: "none",
                    lineHeight: 1.45,
                    background: isActive
                      ? "rgba(192,57,43,0.05)"
                      : "transparent",
                    transition:
                      "color 0.2s, border-color 0.2s, background 0.2s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "9px",
                      color: "#9c9489",
                      flexShrink: 0,
                      marginTop: "3px",
                    }}
                  >
                    {num}
                  </span>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Meta info */}
        <div
          style={{
            marginTop: "16px",
            padding: "11px 12px",
            background: "rgba(192,57,43,0.05)",
            border: "1px solid rgba(192,57,43,0.16)",
            borderRadius: "7px",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              color: "#c0392b",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {meta.category}
            <br />
            {meta.readTime}
            <br />
            {meta.date}
          </p>
        </div>
      </div>
    </aside>
  );
};

// ─── Reading progress bar ─────────────────────────────────────────────────────

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #c0392b 0%, #e67e22 100%)",
        }}
      />
    </div>
  );
};

export default ArticlePage;
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

// ─── ArticlePage ──────────────────────────────────────────────────────────────

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || "");
  const contentRef = useRef<HTMLDivElement>(null);

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

        {/* ── Dark hero banner — staggered children ── */}
        <motion.div
          style={{ background: "#1a1814", color: "#faf8f4" }}
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Back link */}
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 mb-8 transition-opacity duration-200 hover:opacity-70"
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
                className="flex items-center gap-3 mb-5"
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
                  fontSize: "clamp(28px, 4.5vw, 48px)",
                  fontWeight: 700,
                  color: "#faf8f4",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                {article.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "18px",
                  fontStyle: "italic",
                  color: "rgba(250,248,244,0.5)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  maxWidth: "520px",
                  marginBottom: "32px",
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

        {/* ── Article body ── */}
        <motion.main
          className="flex-1"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div
            ref={contentRef}
            className="article-prose max-w-[720px] mx-auto px-6 py-16"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.main>

        {/* Back link footer */}
        <motion.div
          className="max-w-[720px] mx-auto px-6 pb-16"
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
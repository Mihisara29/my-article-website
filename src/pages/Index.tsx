import { motion } from "framer-motion";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedArticle from "@/components/FeaturedArticle";
import ArticleCard from "@/components/ArticleCard";

const Index = () => {
  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#faf8f4" }}
    >
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-14 w-full">

        {/* ── HERO SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Left: kicker + headline only */}
          <div>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "#c0392b",
                marginBottom: "10px",
              }}
            >
              Deep dives into software
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                color: "#1a1814",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                maxWidth: "560px",
              }}
            >
              Ideas that change how you{" "}
              <em style={{ color: "#c0392b", fontStyle: "italic" }}>think</em>{" "}
              about Software Engineering.
            </h1>
          </div>

          {/* Right: profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", flexShrink: 0 }}
          >
            {/* Decorative corner accent */}
            <div
              style={{
                position: "absolute",
                top: "-8px",
                left: "-8px",
                width: "44px",
                height: "44px",
                border: "2px solid #c0392b",
                borderRadius: "8px",
                opacity: 0.45,
                zIndex: 0,
              }}
            />

            {/* Dot grid */}
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                left: "-16px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "5px",
                zIndex: 0,
                opacity: 0.3,
              }}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "#bdb3a0",
                    display: "block",
                  }}
                />
              ))}
            </div>

            {/* Photo frame */}
            <div
              style={{
                position: "relative",
                width: "190px",
                height: "235px",
                borderRadius: "16px 16px 16px 4px",
                overflow: "hidden",
                boxShadow:
                  "0 12px 48px rgba(26,24,20,.16), 0 2px 8px rgba(26,24,20,.07)",
                background: "linear-gradient(145deg, #2c2820 0%, #1a1814 100%)",
                zIndex: 1,
              }}
            >
              <img
                src="/my-photo.png"
                alt="Induwara"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
                onError={(e) => {
                  const t = e.currentTarget as HTMLImageElement;
                  t.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.textContent = "I";
                  fallback.style.cssText =
                    "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:72px;font-weight:300;color:rgba(250,248,244,.35);letter-spacing:-.04em;";
                  t.parentElement!.appendChild(fallback);
                }}
              />
              {/* Subtle bottom gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(26,24,20,.28) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>

            {/* Name badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "-10px",
                background: "#1a1814",
                color: "#faf8f4",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.16em",
                textTransform: "uppercase" as const,
                padding: "7px 13px",
                borderRadius: "6px",
                boxShadow: "0 4px 14px rgba(26,24,20,.2)",
                zIndex: 2,
                lineHeight: 1.5,
              }}
            >
              Software Engineer
              <span
                style={{
                  display: "block",
                  color: "#d4963e",
                  fontSize: "11px",
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: "0.02em",
                  textTransform: "none" as const,
                  fontWeight: 500,
                  marginTop: "1px",
                }}
              >
                Induwara
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Featured article — untouched */}
        {featured && <FeaturedArticle article={featured} />}

        {/* All articles section — untouched */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#1a1814",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              All Articles
            </h2>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "#e2ddd6",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                color: "#9c9489",
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              {articles.length} posts
            </span>
          </div>

          <div>
            {rest.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
            {featured && (
              <ArticleCard
                key={featured.id + "-list"}
                article={featured}
                index={rest.length}
              />
            )}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
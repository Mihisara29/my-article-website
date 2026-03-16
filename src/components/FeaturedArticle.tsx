import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "@/data/articles";

const FeaturedArticle = ({ article }: { article: Article }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16"
    >
      <Link to={`/article/${article.id}`} className="group block" style={{ textDecoration: "none" }}>
        {/* Featured label */}
        <div className="flex items-center gap-3 mb-6">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#faf8f4",
              background: "#c0392b",
              padding: "4px 12px",
              borderRadius: "2px",
            }}
          >
            Featured
          </span>
          <div style={{ flex: 1, height: "1px", background: "#e2ddd6" }} />
        </div>

        {/* Card */}
        <div
          className="relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_12px_48px_rgba(26,24,20,0.12)]"
          style={{
            background: "#1a1814",
            borderRadius: "16px",
            padding: "clamp(32px, 5vw, 52px)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Subtle texture lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px)",
              borderRadius: "16px",
            }}
          />

          {/* Accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              background: "linear-gradient(180deg, #c0392b 0%, #e67e22 100%)",
              borderRadius: "16px 0 0 16px",
            }}
          />

          <div className="relative pl-4">
            {/* Category + date */}
            <div className="flex items-center gap-3 mb-5">
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
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(250,248,244,0.35)",
                  letterSpacing: "0.04em",
                }}
              >
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h2
              className="transition-colors duration-200 mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(24px, 3.5vw, 38px)",
                fontWeight: 700,
                color: "#faf8f4",
                lineHeight: 1.18,
                letterSpacing: "-0.02em",
                maxWidth: "680px",
              }}
            >
              <span className="group-hover:text-[#e8c5c0] transition-colors duration-300">
                {article.title}
              </span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: "17px",
                fontStyle: "italic",
                color: "rgba(250,248,244,0.5)",
                lineHeight: 1.65,
                fontWeight: 300,
                maxWidth: "540px",
                marginBottom: "28px",
              }}
            >
              {article.subtitle}
            </p>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "rgba(250,248,244,0.3)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {article.readTime}
                </span>
              </div>

              <span
                className="transition-all duration-200 group-hover:gap-3 flex items-center gap-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "#e67e22",
                  textTransform: "uppercase" as const,
                }}
              >
                Read article
                <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedArticle;
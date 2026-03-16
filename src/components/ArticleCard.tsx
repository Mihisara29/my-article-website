import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Article } from "@/data/articles";

const ArticleCard = ({ article, index }: { article: Article; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/article/${article.id}`}
        className="group block"
        style={{ textDecoration: "none" }}
      >
        <div
          className="py-8 transition-all duration-200"
          style={{
            borderBottom: "1px solid #e2ddd6",
          }}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Category + date row */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: "#c0392b",
                    fontWeight: 500,
                  }}
                >
                  {article.category}
                </span>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "#c8c3bb",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "#9c9489",
                    letterSpacing: "0.04em",
                  }}
                >
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h2
                className="transition-colors duration-200 group-hover:text-[#c0392b] mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(18px, 2.5vw, 23px)",
                  fontWeight: 700,
                  color: "#1a1814",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                }}
              >
                {article.title}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "15px",
                  color: "#6b6358",
                  lineHeight: 1.75,
                  fontWeight: 300,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                  maxWidth: "580px",
                }}
              >
                {article.excerpt}
              </p>

              {/* Read time */}
              <div className="flex items-center gap-2 mt-4">
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "#9c9489",
                    letterSpacing: "0.06em",
                  }}
                >
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Arrow indicator */}
            <div
              className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1"
              style={{
                color: "#c0392b",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              →
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ArticleCard;
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

        {/* Hero tagline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
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
        </motion.div>

        {/* Featured article */}
        {featured && <FeaturedArticle article={featured} />}

        {/* All articles section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          {/* Section header */}
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

          {/* Article list */}
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
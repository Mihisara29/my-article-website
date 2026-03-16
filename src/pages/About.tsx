import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── Animation variants ────────────────────────────────────────────────────────

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.6, ease: "easeOut", delay: 0.3 },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

const About = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <Header />

      <main className="flex-1 relative overflow-hidden">

        {/* ── Ghost photo ── */}
        <motion.div
          aria-hidden="true"
          variants={photoVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "52vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <img
            src="/my-photo.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: 0.11,
              filter: "grayscale(30%) contrast(1.05)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 28%, black 80%, transparent 100%), " +
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 28%, black 80%, transparent 100%), " +
                "linear-gradient(to bottom, black 60%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, var(--background, #faf8f4) 0%, transparent 40%)",
            }}
          />
        </motion.div>

        {/* ── Main content ── */}
        <div
          className="relative max-w-[720px] mx-auto px-6 py-16 w-full"
          style={{ zIndex: 1 }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
            >
              About
            </motion.h1>

            {/* Accent bar */}
            <motion.div
              variants={itemVariants}
              className="h-1 w-16 bg-primary rounded-full mb-10"
            />

            {/* All prose lives in ONE container — no more duplicate spacing */}
            <motion.div variants={itemVariants} className="article-prose">
              <p>
                Welcome to <strong>Articulate – Induwara</strong>. This platform
                is a place where I share the knowledge, ideas, and experiences I
                gain while exploring the world of technology.
              </p>

              <p>
                I'm <strong>Induwara Mihisara</strong>, a Software Engineering
                undergraduate who is passionate about learning how modern
                technologies work and how they shape the future of software
                development.
              </p>

              <p>
                This platform is not only about coding. Here, I share insights
                from a wide range of technology areas including software
                development, cloud computing, DevOps practices, system design,
                machine learning, and other topics I explore during my learning
                journey.
              </p>

              <p>
                My goal is to explain complex technical ideas in a simple and
                practical way so that students, developers, and anyone interested
                in technology can understand them more easily.
              </p>

              <h2>Why This Platform?</h2>
              <p>
                I believe that the best way to truly understand something is to
                share it with others. This platform allows me to document what I
                learn, organize my thoughts, and help others who may be learning
                similar technologies.
              </p>
              <p>
                As technology continues to evolve, this space will keep growing
                with new topics, ideas, and lessons learned along the way.
              </p>

              <h2>Get in Touch</h2>
              <p>
                If you have feedback, suggestions, or just want to discuss
                technology, feel free to reach out. I'm always happy to connect
                with people who are passionate about learning and building with
                technology.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default About;
"use client"
import { motion } from "framer-motion"
import { ShoppingCart, Tag, Sparkles, Zap, Database, Cpu, BarChart4, Layers, Globe } from "lucide-react"

const IntroAnimation = () => {
  // Create a grid of points for the cyber grid effect
  const gridPoints = []
  const gridSize = 20
  const spacing = 100

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      gridPoints.push({
        x: j * spacing - (gridSize * spacing) / 2,
        y: i * spacing - (gridSize * spacing) / 2,
        delay: (i + j) * 0.02,
      })
    }
  }

  return (
    <motion.div
      className="intro-animation"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cyber grid background */}
      <div className="cyber-grid">
        {gridPoints.map((point, index) => (
          <motion.div
            key={`grid-${index}`}
            className="grid-point"
            style={{ left: `calc(50% + ${point.x}px)`, top: `calc(50% + ${point.y}px)` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: point.delay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          />
        ))}

        {/* Horizontal and vertical lines */}
        <motion.div
          className="grid-line horizontal"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        />
        <motion.div
          className="grid-line vertical"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
        />
      </div>

      {/* Digital particles */}
      <div className="digital-particles">
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={`particle-${index}`}
            className="digital-particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: Math.random() * 2,
            }}
          >
            {index % 9 === 0 ? (
              <ShoppingCart size={16} />
            ) : index % 9 === 1 ? (
              <Tag size={16} />
            ) : index % 9 === 2 ? (
              <Sparkles size={16} />
            ) : index % 9 === 3 ? (
              <Zap size={16} />
            ) : index % 9 === 4 ? (
              <Database size={16} />
            ) : index % 9 === 5 ? (
              <Cpu size={16} />
            ) : index % 9 === 6 ? (
              <BarChart4 size={16} />
            ) : index % 9 === 7 ? (
              <Layers size={16} />
            ) : (
              <Globe size={16} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Binary code rain effect */}
      <div className="binary-rain">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={`binary-${index}`}
            className="binary-column"
            style={{
              left: `${(index + 1) * (100 / 16)}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {[...Array(20)].map((_, charIndex) => (
              <div
                key={`char-${index}-${charIndex}`}
                className="binary-char"
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.9 + 0.1,
                }}
              >
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Circular HUD elements */}
      <div className="hud-elements">
        <motion.div
          className="hud-circle outer"
          initial={{ opacity: 0, scale: 1.5, rotate: 0 }}
          animate={{
            opacity: [0, 0.4, 0.4, 0],
            scale: [1.5, 1, 1, 1.5],
            rotate: 360,
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.7, 1],
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
        <motion.div
          className="hud-circle middle"
          initial={{ opacity: 0, scale: 1.3, rotate: 180 }}
          animate={{
            opacity: [0, 0.6, 0.6, 0],
            scale: [1.3, 0.9, 0.9, 1.3],
            rotate: -180,
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.7, 1],
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        />
        <motion.div
          className="hud-circle inner"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.8, 1.1, 1.1, 0.8],
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.7, 1],
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        />
      </div>

      {/* Main content */}
      <div className="intro-content">
        {/* Animated logo container with scanning effect */}
        <motion.div
          className="logo-container"
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2.5,
            times: [0, 0.6, 1],
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="logo-circle"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(0, 123, 255, 0)",
                "0 0 0 20px rgba(0, 123, 255, 0.3)",
                "0 0 0 40px rgba(0, 123, 255, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
            }}
          >
            <ShoppingCart size={40} className="logo-icon" />

            {/* Scanning line effect */}
            <motion.div
              className="scan-line"
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Futuristic title with glitch effect */}
        <div className="title-container">
          <motion.h1
            className="intro-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              opacity: { duration: 1, delay: 1 },
              y: { duration: 1, delay: 1 },
            }}
          >
            <span className="glitch-text" data-text="BUYCISION">
              BUYCISION
            </span>
          </motion.h1>

          {/* Digital loading bar */}
          <motion.div
            className="loading-bar-container"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div
              className="loading-bar"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1.7 }}
            />
          </motion.div>

          <motion.p
            className="intro-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            AI-Powered Shopping Decisions
          </motion.p>

          {/* Initializing text */}
          <motion.div
            className="initializing-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              delay: 3,
              times: [0, 0.5, 1],
            }}
          >
            INITIALIZING INTERFACE...
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default IntroAnimation


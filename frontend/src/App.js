"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Tag, Search, Sparkles, TrendingUp, Star } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Add Link for navigation
import "./styles.css";
import IntroAnimation from "./intro-animation.jsx";
import TrafficInsights from "./TrafficInsights"; // Import the TrafficInsights component

function App() {
    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        // Hide intro animation after 4.5 seconds
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 4500);

        return () => clearTimeout(timer);
    }, []);

    const searchProducts = () => {
        if (!query) return;
        setLoading(true);
        setError("");

        // Log search traffic
        axios.post("http://localhost:5000/api/track-traffic", {
            event: "Search",
            productName: query,
            timestamp: new Date().toISOString(),
        });

        axios
            .get(`http://localhost:5000/api/search-with-sentiment/${query}`)
            .then((response) => {
                console.log("API Response:", response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products. Try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchProducts();
        }
    };

    return (
        <Router>
            <Routes>
                {/* Main App Route */}
                <Route
                    path="/"
                    element={
                        <div className="app-container">
                            <AnimatePresence>
                                {showIntro ? (
                                    <IntroAnimation key="intro" />
                                ) : (
                                    <motion.div
                                        key="main-content"
                                        className="main-content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        {/* Background Animation */}
                                        <div className="background-animation">
                                            {[...Array(10)].map((_, index) => (
                                                <motion.div
                                                    key={`cart-${index}`}
                                                    className="floating-element cart-icon"
                                                    initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                                                    animate={{
                                                        x: Math.random() * window.innerWidth,
                                                        y: Math.random() * window.innerHeight,
                                                        rotate: Math.random() * 360,
                                                    }}
                                                    transition={{ duration: 20 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                                >
                                                    <ShoppingCart size={24} />
                                                </motion.div>
                                            ))}
                                            {[...Array(10)].map((_, index) => (
                                                <motion.div
                                                    key={`tag-${index}`}
                                                    className="floating-element tag-icon"
                                                    initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                                                    animate={{
                                                        x: Math.random() * window.innerWidth,
                                                        y: Math.random() * window.innerHeight,
                                                        rotate: Math.random() * 360,
                                                    }}
                                                    transition={{ duration: 20 + Math.random() * 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                                >
                                                    <Tag size={24} />
                                                </motion.div>
                                            ))}
                                            {[...Array(5)].map((_, index) => (
                                                <motion.div
                                                    key={`sparkle-${index}`}
                                                    className="floating-element sparkle-icon"
                                                    initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
                                                    animate={{
                                                        x: Math.random() * window.innerWidth,
                                                        y: Math.random() * window.innerHeight,
                                                        rotate: Math.random() * 360,
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        duration: 15 + Math.random() * 10,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        ease: "linear",
                                                        scale: {
                                                            duration: 2,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                            ease: "easeInOut",
                                                        },
                                                    }}
                                                >
                                                    <Sparkles size={20} />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Header */}
                                        <div className="header-container">
                                            <motion.h1
                                                className="title"
                                                initial={{ opacity: 0, y: -50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                            >
                                                Buycision
                                            </motion.h1>
                                            <motion.div
                                                className="subtitle-container"
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 1, delay: 0.4 }}
                                            >
                                                <p className="subtitle">AI-Powered Shopping Decisions</p>
                                                <motion.div
                                                    className="subtitle-underline"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 1, delay: 0.6 }}
                                                />
                                            </motion.div>
                                        </div>

                                        {/* Search Bar */}
                                        <motion.div
                                            className="search-container"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, delay: 0.5 }}
                                        >
                                            <div className="search-input-wrapper">
                                                <input
                                                    type="text"
                                                    placeholder="Search for products..."
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    className="search-input"
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.05, backgroundColor: "#4a9eff" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={searchProducts}
                                                    className="search-button"
                                                >
                                                    <Search size={20} />
                                                </motion.button>
                                            </div>
                                        </motion.div>

                                        {/* Link to Traffic Insights */}
                                        <Link to="/traffic-insights" className="traffic-insights-link">
                                        
                                        </Link>

                                        {/* Loading State */}
                                        {loading && (
                                            <motion.div
                                                className="loading-container"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <motion.div
                                                    className="loading-spinner"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                                />
                                                <motion.p
                                                    className="loading-text"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                                >
                                                    Searching for the best products...
                                                </motion.p>
                                            </motion.div>
                                        )}

                                        {/* Error State */}
                                        {error && (
                                            <motion.p
                                                className="error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {error}
                                            </motion.p>
                                        )}

                                        {/* Product Grid */}
                                        <motion.div
                                            className="product-grid"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.8, delay: 0.8 }}
                                        >
                                            {products.length > 0 ? (
                                                products.map((product, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="product-card"
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                                        whileHover={{
                                                            y: -5,
                                                            boxShadow: "0 15px 30px rgba(0, 123, 255, 0.2)",
                                                            transition: { duration: 0.2 },
                                                        }}
                                                    >
                                                        <div className="product-image-container">
                                                            <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
                                                            <div className="product-overlay">
                                                                <motion.div className="product-rating-badge" whileHover={{ scale: 1.1 }}>
                                                                    <Star size={14} className="star-icon" />
                                                                    <span>{product.rating}</span>
                                                                </motion.div>
                                                                {/* Sentiment Badge */}
                                                                <motion.div className="sentiment-badge" whileHover={{ scale: 1.1 }}>
                                                                    <span>{product.sentimentLabel}</span>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                        <div className="product-info">
                                                            <h3 className="product-title">{product.name}</h3>
                                                            <div className="product-details">
                                                                <p className="product-price">{product.price}</p>
                                                                <TrendingUp size={16} className="trending-icon" />
                                                            </div>
                                                            {/* Recommendation */}
                                                            <p className="product-recommendation">
                                                                {product.recommendation}
                                                            </p>
                                                            <motion.a
                                                                href={product.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="buy-button"
                                                                whileHover={{ scale: 1.05, backgroundColor: "#0056b3" }}
                                                                whileTap={{ scale: 0.95 }}
                                                            >
                                                                Buy Now
                                                            </motion.a>
                                                        </div>
                                                    </motion.div>
                                                ))
                                            ) : (
                                                <motion.div
                                                    className="no-products-container"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {/* No products message */}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    }
                />

                {/* Traffic Insights Route */}
                <Route path="/traffic-insights" element={<TrafficInsights />} />
            </Routes>
        </Router>
    );
}

export default App;
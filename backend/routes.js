const express = require("express");
const { searchAmazonProducts, fetchAmazonProductReviews } = require("./scraper");

const router = express.Router();

// ✅ API Route to Get Amazon Products + Sentiment Analysis
router.get("/search-with-sentiment/:query", async (req, res) => {
    try {
        console.log(`🔹 Received search request with sentiment for: ${req.params.query}`);
        const products = await searchAmazonProducts(req.params.query);

        if (!products.length) {
            throw new Error("No products found");
        }

        // ✅ Add sentiment analysis for each product
        const productsWithSentiment = await Promise.all(products.map(async (product) => {
            const sentimentData = await fetchAmazonProductReviews(product.asin);
            return { ...product, ...sentimentData };  // ✅ Merge sentiment data with product
        }));

        res.json(productsWithSentiment);

    } catch (error) {
        console.error("❌ Amazon API Error:", error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

module.exports = router;

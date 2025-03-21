const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { searchAmazonProducts, fetchAmazonProductReviews } = require("./scraper");
const vader = require("vader-sentiment");

const app = express();
app.use(cors());
app.use(express.json());

let trafficLogs = [];

/** ✅ Analyze Sentiment with VADER */
function analyzeSentimentVADER(text) {
    if (!text) return { sentimentLabel: "Neutral 😐", score: 0 };

    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    
    if (intensity.compound >= 0.05) return { sentimentLabel: "Positive 😊", score: intensity.compound };
    if (intensity.compound <= -0.05) return { sentimentLabel: "Negative 😡", score: intensity.compound };

    return { sentimentLabel: "Neutral 😐", score: intensity.compound };
}

/** ✅ API Route to Search Products */
app.get("/api/search-with-sentiment/:query", async (req, res) => {
    try {
        const query = req.params.query;
        console.log(`🔹 Searching products for: ${query}`);

        // Log search traffic
        trafficLogs.push({ event: "Search", productName: query, timestamp: new Date().toISOString() });

        // Fetch Amazon products
        const products = await searchAmazonProducts(query);

        // Process each product with detailed review analysis
        const productsWithSentiment = await Promise.all(
            products.map(async (product) => {
                console.log(`🔹 Processing: ${product.name} | Rating: ${product.rating}`);

                // Fetch reviews separately
                const reviewsData = await fetchAmazonProductReviews(product.asin);
                const reviewsText = reviewsData.reviews?.join(" ") || "No reviews available";

                // Perform sentiment analysis on reviews
                const { sentimentLabel, score } = analyzeSentimentVADER(reviewsText);

                // Convert rating to number
                const rating = product.rating && !isNaN(product.rating) ? parseFloat(product.rating) : 0;

                // Determine recommendation based on sentiment & rating
                let recommendation = "Consider Alternatives ⚖";
                if (sentimentLabel === "Positive 😊" && rating > 4) recommendation = "Recommended ✅";
                if (sentimentLabel === "Negative 😡" || rating < 2.5) recommendation = "Not Recommended ❌";

                return { ...product, sentimentLabel, score, recommendation };
            })
        );

        console.log("✅ Processed Products:", productsWithSentiment);
        res.json(productsWithSentiment);
    } catch (error) {
        console.error("❌ Amazon API Error:", error.message);
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
});

/** ✅ API Route to Log Traffic */
app.post("/api/track-traffic", (req, res) => {
    const { event, productName, timestamp } = req.body;
    trafficLogs.push({ event, productName, timestamp });

    console.log(`📊 Traffic Logged: ${event} on ${productName} at ${timestamp}`);
    res.json({ message: "Traffic logged successfully" });
});

/** ✅ API Route to Get Traffic Insights */
app.get("/api/traffic-insights", (req, res) => {
    if (trafficLogs.length === 0) {
        console.log("🔹 No traffic data available.");
        return res.json({ insights: "No traffic data available." });
    }

    // Find most searched products
    const productCounts = {};
    trafficLogs.forEach(log => {
        if (log.event === "Search") {
            productCounts[log.productName] = (productCounts[log.productName] || 0) + 1;
        }
    });

    // Get top searched product
    const mostSearchedProduct = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b);

    // Find busiest hours
    const hourCounts = {};
    trafficLogs.forEach(log => {
        const hour = new Date(log.timestamp).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    // Get busiest hour
    const busiestHour = Object.keys(hourCounts).reduce((a, b) => hourCounts[a] > hourCounts[b] ? a : b);

    res.json({
        insights: {
            mostSearchedProduct,
            busiestHour: `${busiestHour}:00 - ${parseInt(busiestHour) + 1}:00`,
        },
    });
});

/** ✅ Start Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

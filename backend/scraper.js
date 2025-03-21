require("dotenv").config();
const axios = require("axios");
const vader = require("vader-sentiment");

/** ✅ Enhanced Sentiment Analysis with Weighted Reviews */
function analyzeSentimentVADER(text) {
    if (!text) return "Neutral 😐";

    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);

    if (intensity.compound >= 0.2) return "Positive 😊";
    if (intensity.compound <= -0.2) return "Negative 😡";

    return "Neutral 😐";
}

/** ✅ Fetch Amazon Products **/
async function searchAmazonProducts(query) {
    console.log(`🔹 Searching Amazon for: ${query}`);

    const apiUrl = "https://amazon-online-data-api.p.rapidapi.com/search?query=crocs&page=1&geo=IN";  

    const headers = {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,  
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
    };

    try {
        const response = await axios.get(apiUrl, {
            headers,
            params: { query: query, country: "IN" }
        });
    
        console.log("✅ FULL RAW RESPONSE:", response.data); // Log raw response
        console.log("✅ FULL JSON RESPONSE:", JSON.stringify(response.data, null, 2));
    
        if (!response.data || !response.data.data || !response.data.data.products) {
            throw new Error("No products found.");
        }
    
        return response.data.data.products.map(product => ({
            asin: product.asin || "N/A",
            name: product.product_title || "No title",
            price: product.product_price || "Price not available",
            rating: product.product_star_rating || "No rating",
            url: product.product_url || "N/A",
            image: product.product_photo || "N/A",
            source: "Amazon"
        }));
    } catch (error) {
        console.error("❌ Error searching Amazon products:", error.response ? error.response.data : error.message);
        return [];
    }
    


}

/** ✅ Fetch Amazon Product Reviews **/
/** ✅ Fetch Amazon Product Reviews with Improved Sentiment Analysis */
/** ✅ Fetch Amazon Product Reviews with Sentiment */
async function fetchAmazonProductReviews(asin, rating) {
    if (asin === "N/A") {
        return { sentimentLabel: "No Data", positiveCount: 0, negativeCount: 0, recommendation: "No reviews available" };
    }

    console.log(`🔹 Fetching Amazon reviews for ASIN: ${asin}`);

    const apiUrl = "https://amazon-online-data-api.p.rapidapi.com/v2/product-reviews?geo=IN&page=1&asin=B09J713ZS7&filter_by_star=5&media_reviews_only=false";
    const headers = {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,  
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
    };

    try {
        const response = await axios.get(apiUrl, {
            headers,
            params: { asin: asin, country: "IN", sort_by: "TOP_REVIEWS", page: 1 }  
        });

        if (!response.data.data || !response.data.data.reviews) {
            throw new Error("No reviews found.");
        }

        const reviews = response.data.data.reviews.map(review => review.review_text);
        const sentiments = reviews.map(review => analyzeSentimentVADER(review));

        const positiveCount = sentiments.filter(s => s === "Positive 😊").length;
        const negativeCount = sentiments.filter(s => s === "Negative 😡").length;

        let sentimentLabel = "Neutral 😐";

        // 🎯 Apply Rating-based Sentiment FIRST
        if (rating && !isNaN(rating)) {
            const numericRating = parseFloat(rating);
            if (numericRating > 4.0) sentimentLabel = "Positive 😊";
            else if (numericRating >= 2.5 && numericRating <= 4.0) sentimentLabel = "Neutral 😐";
            else if (numericRating < 2.5) sentimentLabel = "Negative 😡";
        }

        // 🎯 If Rating is Missing, Use Review-Based Sentiment
        if (!rating || rating === "No rating") {
            if (positiveCount > negativeCount) sentimentLabel = "Positive 😊";
            else if (negativeCount > positiveCount) sentimentLabel = "Negative 😡";
        }

        // 📌 Closing Statement
        let recommendation = "Consider Alternatives ⚖";
        if (sentimentLabel === "Positive 😊") recommendation = "Recommended ✅";
        if (sentimentLabel === "Negative 😡") recommendation = "Not Recommended ❌";

        return { sentimentLabel, positiveCount, negativeCount, recommendation };
    } catch (error) {
        console.error("❌ Error fetching Amazon reviews:", error.message);
        return { sentimentLabel: "No Data", positiveCount: 0, negativeCount: 0, recommendation: "No reviews available" };
    }
}

/** ✅ Ensure correct exports **/
module.exports = { searchAmazonProducts, fetchAmazonProductReviews };

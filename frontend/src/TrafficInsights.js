import { useState, useEffect } from "react";
import axios from "axios";

function TrafficInsights() {
    const [insights, setInsights] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/api/traffic-insights")
            .then(response => {
                setInsights(response.data.insights);
            })
            .catch(error => {
                console.error("Error fetching traffic insights:", error);
            });
    }, []);

    return (
        <div className="traffic-insights-container">
            <h2>Traffic Insights</h2>
            {insights ? (
                <div>
                    <p><strong>Most Searched Product:</strong> {insights.mostSearchedProduct}</p>
                    <p><strong>Busiest Hour:</strong> {insights.busiestHour}</p>
                </div>
            ) : (
                <p>No traffic insights available.</p>
            )}
        </div>
    );
}

export default TrafficInsights;
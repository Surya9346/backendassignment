import axios from "axios";
import { Crypto } from "./cryptoModel.js";
import connectDB from "./connect.js";

const fetchAndStoreTop10Data = async () => {
  let client;
  try {
    // Connect to MongoDB
    client = await connectDB();

    // Fetch data from WazirX API
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const data = response.data;

    // Get top 10 results sorted by volume
    const top10Results = Object.values(data)
      .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
      .slice(0, 10)
      .map((item) => ({
        name: item.name,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
        base_unit: item.base_unit,
      }));

    // Store top 10 results in MongoDB
    await Crypto.deleteMany({}); // Clear existing data
    await Crypto.insertMany(top10Results);
    console.log("Top 10 crypto data stored successfully");
  } catch (error) {
    console.error("Error fetching or storing data:", error);
  } finally {
    // Close MongoDB connection
    if (client) {
      client.close();
      console.log("MongoDB connection closed");
    }
  }
};

export { fetchAndStoreTop10Data };


// import axios from "axios";
// import { Crypto } from "./cryptoModel.js";
// import connectDB from "./connect.js";
// import mongoose from "mongoose";

// export const fetchAndStoreTop10Data = async () => {
//   try {
//     // Connect to MongoDB
//     await connectDB();

//     // Fetch data from WazirX API
//     const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
//     const data = response.data;

//     // Get top 10 results sorted by volume
//     const top10Results = Object.values(data)
//       .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
//       .slice(0, 10)
//       .map((item) => ({
//         name: item.name,
//         last: item.last,
//         buy: item.buy,
//         sell: item.sell,
//         volume: item.volume,
//         base_unit: item.base_unit,
//       }));

//     // Store top 10 results in MongoDB
//     await Crypto.deleteMany({}); // Clear existing data
//     await Crypto.insertMany(top10Results);
//     console.log("Top 10 crypto data stored successfully");
//   } catch (error) {
//     console.error("Error fetching or storing data:", error);
//   } finally {
//     mongoose.connection.close(); // Close MongoDB connection
//   }
// };

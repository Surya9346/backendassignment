import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./connect.js"; // Import your Mongoose connection function
import { fetchAndStoreTop10Data } from "./fetchAndStore.js";
import { Crypto } from "./cryptoModel.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Connect to MongoDB using Mongoose
await connectDB();


// Define endpoint to fetch stored crypto data
app.get('/api/cryptos', async (req, res) => {
  try {
    await fetchAndStoreTop10Data();
    const cryptoData = await Crypto.find({}); // Use Mongoose find method to fetch data
    return res.json(cryptoData);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).send("Server Error");
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at : ${port}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace of the error
  res.status(500).json({ error: "Internal Server Error" }); // Respond with an error message
});

export { app };

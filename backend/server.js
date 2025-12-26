const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoute");
const cors = require("cors");

const upload = require("./middleware/upload");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://mini-e-commerce-website-gqfq.vercel.app",
 }));
app.use("/upload",express.static("upload"))


app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});


app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on this ${PORT}`));

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
app.use(cors());
app.use("/upload",express.static("upload"))

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on this ${PORT}`));

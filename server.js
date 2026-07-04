const express = require("express");
const cors = require("cors");

const app = express();

require("./database/db");

const transactionRoutes = require("./routes/transactions");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
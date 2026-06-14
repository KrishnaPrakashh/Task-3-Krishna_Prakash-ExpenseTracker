const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Get all transactions
router.get("/", (req, res) => {
  db.all("SELECT * FROM transactions", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get one transaction
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.get(
    "SELECT * FROM transactions WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(row);
    }
  );
});

// Add transaction
router.post("/", (req, res) => {
  const { title, amount, type, category, transaction_date } = req.body;

  const sql = `
    INSERT INTO transactions
    (title, amount, type, category, transaction_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [title, amount, type, category, transaction_date],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Transaction added successfully",
        id: this.lastID
      });
    }
  );
});

// Update transaction
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const {
    title,
    amount,
    type,
    category,
    transaction_date
  } = req.body;

  db.run(
    `UPDATE transactions
     SET title = ?,
         amount = ?,
         type = ?,
         category = ?,
         transaction_date = ?
     WHERE id = ?`,
    [
      title,
      amount,
      type,
      category,
      transaction_date,
      id
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Transaction updated successfully"
      });
    }
  );
});
// Delete transaction
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    "DELETE FROM transactions WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        message: "Transaction deleted successfully"
      });
    }
  );
});


module.exports = router;
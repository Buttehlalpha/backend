import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  console.log("REGISTER ROUTE HIT");
  res.json({ ok: true });
});

router.post("/login", (req, res) => {
  console.log("LOGIN ROUTE HIT");
  res.json({ ok: true });
});

export default router;
// import express from "express";
// import { translateToKhasi } from "../controllers/translateController.js";

// const router = express.Router();

// router.post("/", translateToKhasi);

// export default router;


import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/translate", {
      text,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error contacting FastAPI:", err.message);
    res.status(500).json({ error: "Failed to translate text via FastAPI" });
  }
});

export default router;

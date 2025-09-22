// import { spawn } from "child_process";

// export const translateToKhasi = async (req, res) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ error: "Text is required" });
//   }

//   try {
//     const python = spawn("python", ["./backend/python/translate.py", text]);

//     let translated = "";
//     python.stdout.on("data", (data) => {
//       translated += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//       console.error(`stderr: ${data}`);
//     });

//     python.on("close", (code) => {
//       if (code !== 0) {
//         return res.status(500).json({ error: "Translation script failed" });
//       }
//       return res.json({ translated: translated.trim() });
//     });
//   } catch (err) {
//     console.error("Translation error:", err);
//     res.status(500).json({ error: "Translation failed" });
//   }
// };

import axios from "axios";

export const translateToKhasi = async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post("http://localhost:8000/translate", {
      text,
    });

    const translated = response.data.translated;
    res.json({ translated });
  } catch (error) {
    console.error("🔴 FastAPI translation error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
};


// export const translateText = async (text, selectedLang) => {
//   console.log("🟡 translateText called:", text, selectedLang); // ✅ Log when it's called

//   if (selectedLang !== 'kh') return text;

//   try {
//     const response = await fetch('/api/translate', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ text }),
//     });

//     const data = await response.json();
//     console.log("✅ Translated result:", data); // ✅ Log response
//     return data.translated || text;
//   } catch (err) {
//     console.error("❌ Translation failed:", err);
//     return text;
//   }
// };


export const translateText = async (text, selectedLang) => {
  console.log("🟡 translateText called:", text, selectedLang);

  if (selectedLang !== 'kh') return text;

  try {
    const response = await fetch('http://localhost:8000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    
    const data = await response.json();
    console.log("✅ Translated result:", data);

    return data.translated || text;
  } catch (err) {
    console.error("❌ Translation failed:", err);
    return text;
  }
};

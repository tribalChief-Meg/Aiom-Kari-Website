// // frontend/src/i18n.js
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import HttpApi from "i18next-http-backend";

// i18n
//   .use(HttpApi)
//   .use(initReactI18next)
//   .init({

//     lng: localStorage.getItem("language") === 'kh' ? 'en' : localStorage.getItem("language"),
//     fallbackLng: "en",
//     debug: true,
//     interpolation: {
//       escapeValue: false, // React already does escaping
//     },
//     backend: {
//       //loadPath: "/src/locales/{{lng}}/translation.json",
//       loadPath: (lng) => {
//     if (lng === "kh") {
//       // Don't attempt to load a static Khasi file
//       return "/__DUMMY__.json";
//     }
//     return `/src/locales/${lng}/translation.json`;
//   },
//     },
//     react: {
//       useSuspense: false,
//     },
//   });

// export default i18n;

  // import i18n from "i18next";
  // import { initReactI18next } from "react-i18next";
  // import HttpApi from "i18next-http-backend";

  // // Get saved language or default to English
  // const savedLang = localStorage.getItem("language") || "en";

  // // Decide what to load statically
  // const staticLang = savedLang === "kh" ? "en" : savedLang;

  // i18n
  //   .use(HttpApi)
  //   .use(initReactI18next)
  //   .init({
  //     lng: staticLang, // use 'en' for kh to avoid file load
  //     fallbackLng: "en",
  //     debug: true,
  //     interpolation: {
  //       escapeValue: false,
  //     },
  //     backend: {
  //       loadPath: (lng) => {
  //         if (lng === "kh") {
  //           return "/ignore.json"; // never loaded
  //         }
  //         return `/src/locales/${lng}/translation.json`;
  //       },
  //     },
  //     react: {
  //       useSuspense: false,
  //     },
  //   });

  // // After i18n is ready, force set actual language
  // i18n.on("initialized", () => {
  //   if (savedLang === "kh") {
  //     i18n.changeLanguage("kh"); // this is what your code uses for checks
  //   }
  // });

  // export default i18n;

    import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

// Load saved language or default to English on first load
let savedLang = localStorage.getItem("language");

if (!savedLang) {
  savedLang = "en";
  localStorage.setItem("language", "en");
}

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: (lng) => {
        if (lng === "kh") return "/ignore.json";
        return `/src/locales/${lng}/translation.json`;
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

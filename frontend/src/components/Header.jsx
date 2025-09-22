// import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
// import Loader from "./Loader";
// import SmallProduct from "../pages/Products/SmallProduct";
// import ProductCarousel from "../pages/Products/ProductCarousel";

// const Header = () => {
//   const { data, isLoading, error } = useGetTopProductsQuery();

//   if (isLoading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <h1>ERROR</h1>;
//   }

//   return (
//     <>
//       <div className="flex justify-around">
//         <div className="xl:block lg:hidden md:hidden:sm:hidden">
//           <div className="grid grid-cols-2">
//             {data.map((product) => (
//               <div key={product._id}>
//                 <SmallProduct product={product} />
//               </div>
//             ))}
//           </div>
//         </div>
//         <ProductCarousel />
//       </div>
//     </>
//   );
// };

// export default Header;

import { useEffect, useState } from "react";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import { useTranslation } from "react-i18next";
import { translateText } from "../Utils/translate";

import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();
  const { i18n } = useTranslation();
  const selectedLanguage = i18n.language;

  const [translatedProducts, setTranslatedProducts] = useState([]);

useEffect(() => {
  console.log("🌐 Current language:", selectedLanguage);  // Log current language

  const translateProducts = async () => {
    if (!data) return;

    if (selectedLanguage === "kh") {
      const translated = await Promise.all(
        data.map(async (product) => {
          const name = await translateText(product.name, "kh");
          const description = await translateText(product.description, "kh");
          return { ...product, name, description };
        })
      );
      setTranslatedProducts(translated);
    } else {
      setTranslatedProducts(data);
    }
  };

  translateProducts();
}, [data, selectedLanguage]);


  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2">
            {translatedProducts.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;

"use client"; // 1. ይህ ኮድ በተጠቃሚው ብሮውዘር ላይ እንዲሰራ ማዘዣ።
import React, { useState } from "react";
import { PRODUCTS } from "../data"; // 2. የእቃዎቹን ዳታ መጫን።
import ProductCard from "../components/ProductCard"; // 3. የእቃ ማሳያ ካርዱን መጫን።
import { useCart } from "../context/CartContext"; // 4. እቃ ለመጨመር የካርት ማዕከሉን ማገናኘት።

function Home() {
  const { addToCart } = useCart(); // 5. እቃ የመደመሪያውን ተግባር መውሰድ።
  const [search, setSearch] = useState(""); // 6. ፍለጋ (Search) የተጻፈውን ጽሑፍ መከታተያ ስቴት።
  const [category, setCategory] = useState("All"); // 7. የትኛው ዘርፍ (Category) እንደተመረጠ መከታተያ ስቴት።

  // 8. ከዳታው ውስጥ ያሉትን የዘርፍ ስሞች (Shoes, Bags..) ለይቶ በማውጣት በምናሌው ላይ "All" የሚል ጨምሮ ማዘጋጀት።
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  // 9. ተጠቃሚው በፈለገው ስም እና በመረጠው ዘርፍ መሰረት እቃዎቹን አጥሮ (Filter) ማውጣት።
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase()); // 10. የተጻፈው ጽሑፍ እቃው ስም ውስጥ መኖሩን ማየት።
    const matchCategory = category === "All" || product.category === category; // 11. የተመረጠው ዘርፍ ከእቃው ዘርፍ ጋር መገጠሙን ማየት።
    return matchSearch && matchCategory; // 12. ሁለቱንም የሚያሟላውን እቃ ብቻ ማስቀረት።
  });

  return (
    <div>
      {/* 13. የገጹ ራስጌ ጽሑፎች */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Our Products</h1>
        <p className="text-gray-500">Search and filter products easily</p>
      </header>

      {/* 14. መፈለጊያ ሳጥን እና የዘርፍ መምረጫ (Search & Filter Bar) */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} // 15. ተጠቃሚው በጻፈ ቁጥር ስቴቱን ማደስ።
          className="w-full md:w-1/2 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // 16. ዘርፍ በተቀየረ ቁጥር ስቴቱን ማደስ።
          className="w-full md:w-1/4 p-3 border rounded-xl shadow-sm focus:outline-none"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option> // 17. ዘርፎቹን በዝርዝር አማራጭነት ማሳየት።
          ))}
        </select>
      </div>

      {/* 18. እቃዎቹ በረድፍና በአምድ (Grid) የሚደረደሩበት ክፍል */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            // 19. የተጣሩትን እቃዎች በሙሉ በካርድ ኮምፖነንት አማካኝነት አንድ በአንድ ማሳየት።
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found 😢
          </p> // 20. የሚዛመድ እቃ ከጠፋ የሚታይ ጽሑፍ።
        )}
      </div>
    </div>
  );
}

export default Home;

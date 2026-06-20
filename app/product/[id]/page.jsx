"use client"; // 1. በተጠቃሚው ብሮውዘር ላይ እንዲሰራ ማዘዣ።
import React, { use } from 'react'; // 2. የ Next.js አዳዲስ መረጃዎችን ለመቀበል 'use'ን መጫን።
import Link from 'next/link';
import { PRODUCTS } from '../../../data';
import { useCart } from '../../../context/CartContext';

function ProductDetails({ params }) { // 3. ከሊንኩ (URL) ላይ የሚመጣውን መረጃ በ 'params' መቀበል።
  const resolvedParams = use(params); // 4. የሊንኩን መረጃ በደህንነት መፍታት (Unwrap ማድረግ)።
  const { id } = resolvedParams; // 5. ከሊንኩ ላይ የእቃውን ID ቁጥር ለይቶ ማውጣት (ለምሳሌ፡ "1")።
  const { addToCart } = useCart();
  
  // 6. በሊንኩ የመጣው ቁጥር ከየትኛው እቃ ID ጋር እንደሚመሳሰል ከዳታው ላይ መፈለግ።
  const product = PRODUCTS.find((p) => p.id === parseInt(id));

  if (!product) { // 7. እቃው ካልተገኘ (የሌለ ID ከሆነ) ስህተት ማሳየት።
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product not found!</h2>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  return (
    <div>
      {/* 8. ወደ ኋላ መመለሻ ቁልፍ */}
      <Link href="/" className="text-blue-600 hover:underline inline-block mb-6">← Back to Products</Link>
      
      {/* 9. የእቃው ዝርዝር መረጃ ማሳያ ሰሌዳ */}
      <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-lg" />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          {/* 10. እቃውን እዚሁ ገጽ ላይ ሆኖ ወደ ካርት መክተቻ ቁልፍ */}
          <button 
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition max-w-xs"
          >
            Add to Shopping Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
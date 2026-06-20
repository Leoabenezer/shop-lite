import React from "react";
import Link from "next/link"; 
import Image from "next/image"; // 1. ፎቶዎችን አሳንሶ በፍጥነት እንዲከፈቱ የሚያደርገውን የNext.js Image መጫን።

function ProductCard({ product, addToCart }) { // 2. የእቃውን መረጃ እና የመደመሪያውን ተግባር ከዋናው ገጽ መቀበል።
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-xs mx-auto flex flex-col hover:shadow-xl transition">
      
      {/* 3. የእቃው ፎቶ ማስቀመጫ ክፍል (Image በ fill ሲሰራ አባቱ relative መሆን አለበት) */}
      <div className="w-full h-40 bg-gray-100 overflow-hidden relative">
        <Image
          src={product.image} // 4. የእቃው ፎቶ ሊንክ።
          alt={product.name} // 5. ፎቶው ባይከፈት የሚታይ የእቃው ስም።
          fill // 6. ፎቶው የተሰጠውን የሳጥን ቦታ ሙሉ በሙሉ እንዲሞላ ማድረግ።
          sizes="(max-width: 768px) 100vw, 25vw" // 7. እንደ ስልኩ ወይም ኮምፒውተሩ መጠን ፎቶውን ማሳነስ።
          className="object-cover block" // 8. ፎቶው ሳይሰባበር እንዲቀመጥ ማድረግ።
          priority={product.id <= 4} // 9. የመጀመሪያዎቹ 4 እቃዎች ገጹ ሲከፈት ወዲያውኑ ቀድመው እንዲጫኑ ማድረግ።
        />
      </div>

      {/* 10. የጽሑፍ መረጃዎች ማስቀመጫ ክፍል */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {product.name} {/* 11. የእቃው ስም (ረጅም ከሆነ እንዲቆረጥ 'truncate' ተደርጓል) */}
        </h3>

        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
          {product.description} {/* 12. ስለ እቃው ማብራሪያ (ከ 2 መስመር በላይ አይሄድም) */}
        </p>

        <p className="text-blue-600 font-bold text-lg mt-2">
          ${product.price.toFixed(2)} {/* 13. የእቃው ዋጋ በሁለት ዲጂት ዴሲማል ማሳያ */}
        </p>

        {/* 14. የቁልፎች (Buttons) ማስቀመጫ ክፍል */}
        <div className="flex gap-2 mt-auto pt-3">
          {/* 15. ወደ እቃው ዝርዝር መረጃ ገጽ መሄጃ ቁልፍ (ለምሳሌ፡ /product/1) */}
          <Link
            href={`/product/${product.id}`}
            className="w-1/2 text-center bg-gray-100 hover:bg-gray-200 text-xs py-2 rounded-lg"
          >
            View
          </Link>

          {/* 16. እቃውን ወደ ካርት የሚጨምር ቁልፍ */}
          <button
            onClick={() => addToCart(product)}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
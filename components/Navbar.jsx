"use client"; // 1. ይህ ኮድ በተጠቃሚው ብሮውዘር ላይ እንዲሰራ ማዘዣ።
import React, { useState, useEffect } from 'react'; // 2. የሪአክት መሰረታዊ ተግባራትን መጫን።
import Link from 'next/link'; // 3. ገጾችን ያለ ሪፍሬሽ በፍጥነት የሚያገናኘውን የNext.js Link መጫን።
import { useCart } from '../context/CartContext'; // 4. የካርቱን መረጃ ለማንበብ ማዕከሉን ማገናኘት።

function Navbar() {
  const { cart } = useCart(); // 5. ከማዕከሉ ላይ የካርቱን እቃዎች ዝርዝር መውሰድ።
  const [mounted, setMounted] = useState(false); // 6. ገጹ ብሮውዘር ላይ ሙሉ በሙሉ መጫኑን (Mounted) ማወቂያ ስቴት።

  // 7. ገጹ በብሮውዘር ላይ እንደተከፈተ mounted የሚለውን true ያደርጋል። (Hydration Error ለመከላከል)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 8. ገጹ ሙሉ በሙሉ ከተጫነ የካርቱን ብዛት ይቆጥራል፣ ካልሆነ ግን መጀመሪያ ላይ 0 ያደርገዋል።
  const cartCount = mounted ? cart.length : 0;

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50"> {/* 9. ሰማያዊ ከለር ያለውና ከላይ የሚጣበቅ የሜኑ ክፍል */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 10. ወደ ዋናው ገጽ የሚወስድ የድረ-ገጹ ስም (Logo) */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          ShopLite
        </Link>
        <div className="flex space-x-6 items-center">
          {/* 11. ወደ መነሻ ገጽ መመለሻ ሊንክ */}
          <Link href="/" className="hover:text-blue-200 transition">Home</Link>
          {/* 12. ወደ ካርት ገጽ መሄጃ ቁልፍ */}
          <Link href="/cart" className="relative bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition">
            🛒 Cart
            {/* 13. በካርቱ ውስጥ እቃ ካለ ብቻ ቀይ ክብ የቁጥር ማሳያ ምልክት ማሳየት */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; // 14. ይህንን ሜኑ በሌሎች ገጾች ላይ እንዲታይ አሳልፎ መስጠት።
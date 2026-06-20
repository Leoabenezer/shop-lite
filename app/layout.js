import "./globals.css"; // 1. የTailwind CSS ዲዛይን ህጎችን መጫን።
import Navbar from "../components/Navbar"; // 2. የሰራነውን የላይኛው ሜኑ መጫን።
import { CartProvider } from "../context/CartContext"; // 3. የካርት መቆጣጠሪያ ማዕከሉን መጫን።

export const metadata = {
  title: "ShopLite App", // 4. በብሮውዘር ታብ ላይ የሚታየው የሳይቱ ስም።
};

export default function RootLayout({ children }) {
  // 5. ዋናውን ማዕቀፍ መገንባት ('children' ማለት የሚቀያየሩት የየገጹ መረጃዎች ናቸው)።
  return (
    <html lang="en">
      <body>
        {/* 6. ሁሉንም ገጾች በካርት ማዕከሉ ውስጥ መክተት (መረጃ እንዲያገኙ) */}
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 text-gray-800 font-sans">
            <Navbar /> {/* 7. የላይኛው ሜኑ ሁልጊዜ ከላይ እንዲታይ እዚህ መክተት */}
            <main className="container mx-auto px-4 py-6">
              {children}{" "}
              {/* 8. የሚቀያየሩት ገጾች (ሆም ገጽ፣ ካርት ገጽ ወዘተ) እዚህ ውስጥ ይከፈታሉ */}
            </main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

"use client";
import React, { useState } from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; // 1. ክፍያ ሲያልቅ ገጽ ለመቀየር (Redirect) የሚረዳ መጫኛ።
import { useCart } from '../../context/CartContext';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart(); // 2. ከማዕከሉ ተግባራትን መውሰድ።
  const router = useRouter(); // 3. የገጽ መቀየሪያውን መክፈት።
  const [isCheckingOut, setIsCheckingOut] = useState(false); // 4. ክፍያ እየተፈጸመ መሆኑን ማሳያ (Loading) ስቴት።
  
  // 5. በካርቱ ያሉትን እቃዎች ዋጋ ጠቅላላ ድምር ማሰላት።
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // 6. "Proceed to Checkout" ሲጫኑ የሚሰራ ዋና ተግባር።
  const handleCheckout = () => {
    setIsCheckingOut(true); // 7. የLoading ምልክቱን ማብራት።
    const finalAmountToSend = total.toFixed(2); // 8. ካርቱ ከመጥፋቱ በፊት ትክክለኛውን ድምር ሴቭ ማድረግ።

    setTimeout(() => { // 9. የ 2 ሰከንድ የባንክ መዘግየት መምሰል።
      router.push(`/checkout-success?amount=${finalAmountToSend}`); // 10. ዋጋውን ይዞ ወደ ስኬት ገጽ መሄድ።
      clearCart(); // 11. ክፍያ ስላለቀ የድሮውን ካርት ማጽዳት።
      setIsCheckingOut(false); // 12. የLoading ምልክቱን ማጥፋት።
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Shopping Cart</h1>
        {/* 13. እቃ ካለ ሁሉንም በአንዴ ማጥፊያ ቁልፍ (Clear All) ማሳየት */}
        {cart.length > 0 && !isCheckingOut && (
          <button 
            onClick={() => {
              if(confirm("Are you sure you want to remove all items?")) { clearCart(); }
            }}
            className="text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition"
          >
            🗑️ Clear All
          </button>
        )}
      </div>
      
      {/* 14. ካርቱ ባዶ ከሆነና እቃ ካለው የሚታይ ምርጫ */}
      {cart.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link href="/" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">Go Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* 15. እቃዎችን በዝርዝር ማሳያ */}
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
                </div>
              </div>
              {/* 16. ያንን እቃ ብቻ ከካርት ማስወገጃ ቁልፍ */}
              <button 
                onClick={() => removeFromCart(item.id)}
                disabled={isCheckingOut}
                className="text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}

          {/* 17. የዋጋ ማጠቃለያ እና የቼክአውት ቁልፍ */}
          <div className="bg-white rounded-xl shadow p-6 mt-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Amount:</p>
              <p className="text-2xl font-extrabold text-gray-900">${total.toFixed(2)}</p>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut} // 18. ሎዲንግ ሲሆን እንዳይታገዝ መቆለፊያ።
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition shadow flex items-center gap-2"
            >
              {isCheckingOut ? "Processing..." : "Proceed to Checkout"} {/* 19. በሁኔታው ላይ ተመስርቶ ጽሑፍ መቀየር */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
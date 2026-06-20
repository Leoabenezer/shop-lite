"use client"; // 1. ይህ ኮድ በሰርቨር ሳይሆን በተጠቃሚው ብሮውዘር (Client) ላይ እንዲሰራ ማዘዣ።
import React, { createContext, useState, useEffect, useContext } from "react"; // 2. የሪአክት አስፈላጊ ተግባራትን መጫን።

const CartContext = createContext(); // 3. በገጾች መካከል መረጃን በቀላሉ ለማጋራት አዲስ 'Context' መፍጠር።

export function CartProvider({ children }) { // 4. ሁሉንም ገጾች አቅፎ መረጃ የሚያጋራ 'Provider' የተባለ ዋና ኮምፖነንት መክፈት።
  
  // 5. ካርቱ ውስጥ ያሉትን እቃዎች የሚይዝ ስቴት (State) መፍጠር። መጀመሪያ ሲከፈት በኮምፒውተሩ (localStorage) ላይ የተቀመጠ ካለ ያነባል፣ ከሌለ ባዶ ያደርጋል።
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") { // 6. ኮዱ ብሮውዘር ላይ መሆኑን ማረጋገጫ (localStorage የሚገኘው ብሮውዘር ላይ ብቻ ስለሆነ)።
      const savedCart = localStorage.getItem("cart"); // 7. 'cart' በሚል ስም የተቀመጠ መረጃ ካለ መፈለግ።
      return savedCart ? JSON.parse(savedCart) : []; // 8. የተገኘውን የጽሑፍ መረጃ ወደ ሪአክት እቃዎች (JSON) መቀየር፣ ከሌለ ባዶ [] ማድረግ።
    }
    return []; // 9. ሰርቨር ላይ ከሆነ ባዶ ማድረግ።
  });

  // 10. ካርቱ ውስጥ ያሉ እቃዎች ቁጥር በተቀየረ ቁጥር መረጃውን በኮምፒውተሩ ላይ በቋሚነት ሴቭ ማድረግ።
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // 11. የካርቱን መረጃ ወደ ጽሑፍ (String) ቀይሮ በ 'cart' ስም ማስቀመጥ።
  }, [cart]); // 12. ይህ 'useEffect' የሚሰራው 'cart' የተባለው ስቴት ሲቀየር ብቻ ነው።

  // 13. አዲስ እቃ ወደ ካርት የሚጨምር ተግባር (Function)።
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id); // 14. እቃው ቀድሞውኑ ካርቱ ውስጥ መኖሩን ማረጋገጥ።
    if (exist) {
      alert("Item is already in your cart!"); // 15. እቃው ካለ ማስጠንቀቂያ መስጠት።
    } else {
      setCart([...cart, product]); // 16. እቃው ከሌለ የድሮዎቹ እቃዎች ላይ አዲሱን እቃ ጨምሮ መመዝገብ።
    }
  };

  // 17. እቃን ከካርት ውስጥ የሚያስወግድ ተግባር።
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id)); // 18. ከተሰጠው መለያ (ID) ውጪ ያሉትን እቃዎች በሙሉ አስቀርቶ ያንን እቃ ብቻ ማጥፋት።
  };

  // 19. በካርት ውስጥ ያሉትን እቃዎች በሙሉ በአንዴ የሚያጠፋ ተግባር (ለ Clear All ቁልፍ የተሰራ)።
  const clearCart = () => {
    setCart([]); // 20. የካርት ስቴቱን ሙሉ በሙሉ ባዶ ማድረግ።
    localStorage.removeItem("cart"); // 21. በኮምፒውተሩ ላይ የተቀመጠውን መረጃ ማጥፋት።
  };

  return (
    // 22. የተሰሩትን ተግባራትና መረጃዎች በሙሉ ለሁሉም የውስጥ ገጾች (children) ማጋሪያ ዋና ማዕቀፍ ማቅረብ።
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children} 
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext); // 23. ማንኛውም ገጽ በቀላሉ የካርቱን መረጃ እንዲጠቀም የሚረዳ አጭር መግቢያ (Hook) ማዘጋጀት።
"use client";
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // 1. ከሊንኩ የመጣውን ዋጋ ለማንበብ የሚረዳ መጫኛ።

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams(); // 2. የሊንክ አንባቢውን መክፈት።
  
  // 3. ከሊንኩ ላይ 'amount' የሚለውን ቁጥር መውሰድ (ከሌለ 0 ያደርገዋል)።
  const baseAmount = parseFloat(searchParams.get('amount')) || 0;
  
  // 4. በኢትዮጵያ ህግ መሰረት የ 15% የተጨማሪ እሴት ታክስ (VAT) ስሌት።
  const taxRate = 0.15; // 15%
  const taxAmount = baseAmount * taxRate; // የታክሱ መጠን በገንዘብ።
  const finalTotal = baseAmount + taxAmount; // ጠቅላላ የሚከፈለው ዋና ድምር።

  return (
    <div className="max-w-md mx-auto text-center py-12 px-6 bg-white rounded-2xl shadow-md border mt-10">
      {/* 5. የአረንጓዴ የሪካርድ ምልክት አኒሜሽን */}
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 animate-bounce">✓</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-6 text-sm leading-relaxed">Thank you for your purchase. Your payment was processed successfully.</p>

      {/* 6. የክፍያ ደረሰኝ ማሳያ ፎርም (Receipt) */}
      <div className="bg-gray-50 rounded-xl p-4 text-left border text-sm mb-8 space-y-2.5">
        <h3 className="font-bold text-gray-700 border-b pb-1.5 mb-2">Payment Receipt</h3>
        
        {/* 7. የእቃዎቹ ብቻ ድምር (Subtotal) */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span className="font-medium">${baseAmount.toFixed(2)}</span>
        </div>
        
        {/* 8. የ 15% የኢትዮጵያ ታክስ መጠን */}
        <div className="flex justify-between text-gray-600">
          <span>VAT / ታክስ (15%):</span>
          <span className="font-medium text-red-500">+${taxAmount.toFixed(2)}</span>
        </div>
        
        {/* 9. ታክስ ተጨምሮበት የተከፈለው ጠቅላላ ሙሉ ዋጋ */}
        <div className="flex justify-between text-gray-900 font-extrabold text-base border-t pt-2 mt-2">
          <span>Total Paid:</span>
          <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* 10. ወደ መገበያያ ገጽ መመለሻ ቁልፍ */}
      <Link href="/" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow">
        Continue Shopping
      </Link>
    </div>
  );
}
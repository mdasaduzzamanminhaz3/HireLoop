

import React from "react";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import Link from "next/link";

export default async function CheckoutPage({searchParams}:{searchParams: Promise<{canceled?:string}>}) {
 
 const {canceled} = await searchParams;
 if(canceled){
    console.log("Order canceled -- continue to shop around and check out when you\'re ready.");
 }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col justify-between p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full space-y-10">
        
        {/* Top Header / Back Button & Brand */}
        <div className="flex items-center gap-3">
          <Link
            href="/pricing"
            className="p-2 rounded-xl bg-[#18181c] border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="text-base md:text-lg font-bold tracking-tight">Hireloop</span>
        </div>

        {/* Main Content Grid (Order Summary & Payment Method) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pt-4">
          
          {/* Left Side: Order Summary */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-base md:text-lg font-bold text-white">
                    Hireloop Pro Plan
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Access to all features
                  </p>
                </div>
                <span className="text-base md:text-lg font-bold text-white">
                  $20.00
                </span>
              </div>

              <div className="border-t border-neutral-800 pt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Total</span>
                <span className="text-lg md:text-xl font-bold text-white">
                  $20.00
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Payment Method Box */}
          <div className="space-y-6">
            <h2 className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
              Payment method
            </h2>

            <div className="space-y-4">
              {/* Card Option Box */}
              <div className="bg-[#121216] border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <CreditCard className="w-4 h-4 text-neutral-300" />
                  <span>Card</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You&apos;ll be redirected to Stripe&apos;s secure checkout to complete your payment. Card details are never stored on Hireloop.
                </p>
              </div>

              {/* Pay Button */}


    <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs md:text-sm py-3.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2">
          <span>Pay $20.00</span>
        </button>
      </section>
    </form>

              {/* Powered by Stripe Footer */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-1">
                <Lock className="w-3 h-3" />
                <span>Powered by Stripe</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
import { checkoutVerify } from '@/lib/actions/payments';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
// যদি সেশন বা ইউজার ইনফো ফেচ করার ফাংশন থাকে তা এখানে ইম্পোর্ট করতে পারেন
// import { getSession } from '@/lib/auth'; 

export default async function PaymentSuccessPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ session_id?: string }> 
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const {
    status,
    payment_status,
    customer_email,
    metadata,
    payment_intent,
  } = session;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete' && payment_status === 'paid') {
    console.log({ status, payment_status, customer_email, metadata, payment_intent });
    

    await checkoutVerify(session_id);

    const userRole = metadata?.role || "seeker"; // ডিফল্ট seeker ধরতে পারেন
    
    let dashboardPath = "/dashboard"; // ডিফল্ট ড্যাশবোর্ড
    if (userRole === "recruiter") {
      dashboardPath = "/dashboard/recruiter";
    } else if (userRole === "admin") {
      dashboardPath = "/dashboard/admin";
    } else {
      dashboardPath = "/dashboard/seeker"; // অথবা আপনার প্রজেক্টের রুট অনুযায়ী
    }

    return (
      <div className="min-h-screen bg-[#0c0c0e] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#121216] border border-neutral-800/80 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
          
          {/* Background Glow Effect */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Success Check Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>

          {/* Header & Title */}
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold tracking-wider uppercase">
              Upgrade Successful
            </span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Welcome to Hireloop Pro
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
              Your payment of <span className="text-white font-semibold">$20.00</span> was received perfectly.
              <br />
              All advanced premium recruiting modules are unlocked on your account.
            </p>
          </div>

          {/* Session ID / Transaction Box */}
          <div className="bg-[#18181c] border border-neutral-800 rounded-2xl p-3.5 flex items-center justify-between text-left gap-3">
            <div className="flex items-center gap-2 text-neutral-400 text-xs shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Session ID Verified</span>
            </div>
            <code className="text-[11px] text-neutral-300 bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-800 truncate max-w-[160px]" title={session_id}>
              {session_id}
            </code>
          </div>

          {/* Dynamic Role-based Action Button */}
          <Link
            href={dashboardPath}
            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-black font-semibold text-xs md:text-sm py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>Go to Workspace Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Support Email Footer */}
          <p className="text-[11px] text-neutral-500 pt-1">
            A confirmation email will be sent to <span className="text-neutral-400">{customer_email || "your registered email"}</span>. Questions? Contact <a href="mailto:orders@example.com" className="text-indigo-400 hover:underline">support</a>.
          </p>

        </div>
      </div>
    );
  }

  return null;
}



// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";
// import { CheckCircle } from "lucide-react";
// import { useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast";
// import { useWindowSize } from "react-use";

// function PaymentSuccessPage() {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { width, height } = useWindowSize();

//   useEffect(() => {
//     toast({
//       title: "Payment Successful!",
//       description: "Your payment has been successfully processed.",
//     });

//     const timer = setTimeout(() => {
//       navigate("/shop/account");
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [navigate, toast]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//     >
//       <Confetti width={width} height={height} />

//       <Card className="p-10 shadow-lg rounded-lg">
//         <motion.div
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <CardHeader className="p-0 flex items-center gap-4">
//             <CheckCircle size={60} className="text-green-600" />
//             <CardTitle className="text-4xl font-bold text-green-600">
//               Payment is successful!
//             </CardTitle>
//           </CardHeader>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6, duration: 0.3 }}
//         >
//           <Button
//             className="mt-5 w-full bg-green-600 text-white hover:bg-green-700"
//             onClick={() => navigate("/shop/account")}
//           >
//             View Orders
//           </Button>
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8, duration: 0.3 }}
//           className="mt-3 text-gray-600 text-center"
//         >
//           Redirecting to your orders page in 5 seconds...
//         </motion.p>
//       </Card>
//     </motion.div>
//   );
// }

// export default PaymentSuccessPage;


import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { CheckCircle, Package, ShoppingBag, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useWindowSize } from "react-use";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { width, height } = useWindowSize();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    toast({
      title: "Payment Successful!",
      description: "Your payment has been successfully processed.",
    });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/shop/account");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Confetti width={width} height={height} numberOfPieces={200} gravity={0.2} />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-lg"
      >
        <Card className="p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-2xl">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center space-y-6"
          >
            {/* Success Icon */}
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle size={56} className="text-green-600" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
              >
                <Package className="h-4 w-4 text-white" />
              </motion.div>
            </div>

            {/* Success Message */}
            <CardHeader className="p-0 space-y-3">
              <CardTitle className="text-3xl font-bold text-green-600">
                Payment Successful!
              </CardTitle>
              <p className="text-gray-600 text-lg">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </CardHeader>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-green-50 rounded-xl p-4 border border-green-200"
            >
              <div className="flex items-center justify-center space-x-4 text-sm text-green-800">
                <div className="flex items-center space-x-1">
                  <Package className="h-4 w-4" />
                  <span>Order confirmed</span>
                </div>
                <div className="w-1 h-1 bg-green-400 rounded-full" />
                <div className="flex items-center space-x-1">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Receipt sent to email</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="space-y-3"
            >
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg py-6 text-lg font-semibold"
                onClick={() => navigate("/shop/account")}
              >
                <Package className="h-5 w-5 mr-2" />
                View My Orders
              </Button>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/shop/listing")}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Redirecting to orders in {countdown} seconds...</span>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}

export default PaymentSuccessPage;
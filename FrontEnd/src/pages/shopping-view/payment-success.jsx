// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";
// import { CheckCircle } from "lucide-react";
// import { useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast"; // Your toast component
// import { useWindowSize } from "react-use";

// function PaymentSuccessPage() {
//   const navigate = useNavigate();
//   const { toast } = useToast(); // Use toast from your setup
//   const { width, height } = useWindowSize(); // For full-screen confetti effect

//   // Auto-redirect after 5 seconds
//   useEffect(() => {
//     toast({
//       title: "Payment Successful!",
//       description: "Your payment has been successfully processed.",
//     });

//     const timer = setTimeout(() => {
//       navigate("/shop/account");
//     }, 5000);
//     return () => clearTimeout(timer); // Clean up timer
//   }, [navigate, toast]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//     >
//       {/* Confetti Celebration */}
//       <Confetti width={width} height={height} />

//       <Card className="p-10 shadow-lg rounded-lg">
//         <motion.div
//           initial={{ scale: 0.8 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           <CardHeader className="p-0 flex items-center gap-4">
//             {/* Checkmark Icon */}
//             <CheckCircle size={60} className="text-green-600" />
//             <CardTitle className="text-4xl font-bold text-green-600">
//               Payment is successful!
//             </CardTitle>
//           </CardHeader>
//         </motion.div>

//         {/* View Orders Button with Animation */}
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

//         {/* Countdown message */}
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
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useWindowSize } from "react-use";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { width, height } = useWindowSize();

  useEffect(() => {
    toast({
      title: "Payment Successful!",
      description: "Your payment has been successfully processed.",
    });

    const timer = setTimeout(() => {
      navigate("/shop/account");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate, toast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Confetti width={width} height={height} />

      <Card className="p-10 shadow-lg rounded-lg">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <CardHeader className="p-0 flex items-center gap-4">
            <CheckCircle size={60} className="text-green-600" />
            <CardTitle className="text-4xl font-bold text-green-600">
              Payment is successful!
            </CardTitle>
          </CardHeader>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Button
            className="mt-5 w-full bg-green-600 text-white hover:bg-green-700"
            onClick={() => navigate("/shop/account")}
          >
            View Orders
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.3 }}
          className="mt-3 text-gray-600 text-center"
        >
          Redirecting to your orders page in 5 seconds...
        </motion.p>
      </Card>
    </motion.div>
  );
}

export default PaymentSuccessPage;
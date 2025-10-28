


// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { capturePayment, clearOrderStorage } from "@/store/shop/order-slice";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";

// function PaystackReturnPage() {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const reference = params.get("reference");
//   const trxref = params.get("trxref");

//   const { toast } = useToast();
//   const [isProcessing, setIsProcessing] = useState(true);
//   const [isSuccessful, setIsSuccessful] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const paymentReference = reference || trxref;
    
//     if (paymentReference) {
//       // Use localStorage to get order data
//       const orderId = localStorage.getItem("currentOrderId");
//       const storedReference = localStorage.getItem("currentOrderReference");
      
//       console.log("Payment Reference from Paystack:", paymentReference);
//       console.log("Order ID from localStorage:", orderId);
//       console.log("Stored Reference from localStorage:", storedReference);

//       // Clean up the orderId if it's stringified
//       const cleanOrderId = orderId ? orderId.replace(/"/g, '') : null;

//       if (cleanOrderId) {
//         processPaymentWithOrderId(paymentReference, cleanOrderId);
//       } else {
//         console.log("No orderId in localStorage, trying to find order by reference...");
//         processPaymentWithReference(paymentReference);
//       }
//     } else {
//       console.error("No payment reference found in URL");
//       setIsProcessing(false);
//       setIsSuccessful(false);
//       setErrorMessage("No payment reference found in the return URL.");
//       toast({
//         title: "Invalid Payment Return",
//         description: "No payment reference found. Please contact support.",
//         variant: "destructive",
//       });
//     }
//   }, [reference, trxref, dispatch, navigate, toast]);

//   const processPaymentWithOrderId = (paymentReference, orderId) => {
//     dispatch(capturePayment({ reference: paymentReference, orderId }))
//       .then((data) => {
//         console.log("Capture Payment Response:", data);
//         setIsProcessing(false);

//         if (data?.payload?.success) {
//           setIsSuccessful(true);
//           // Clear localStorage after successful payment
//           dispatch(clearOrderStorage());
//           toast({
//             title: "Payment Successful!",
//             description: "Your payment has been successfully processed.",
//           });
//           setTimeout(() => navigate("/shop/payment-success"), 2000);
//         } else {
//           setIsSuccessful(false);
//           const errorMsg = data?.payload?.message || "There was an error processing your payment.";
//           setErrorMessage(errorMsg);
//           toast({
//             title: "Payment Failed",
//             description: errorMsg,
//             variant: "destructive",
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Payment capture error:", error);
//         setIsProcessing(false);
//         setIsSuccessful(false);
//         const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
//         setErrorMessage(errorMsg);
//         toast({
//           title: "Payment Error",
//           description: errorMsg,
//           variant: "destructive",
//         });
//       });
//   };

//   const processPaymentWithReference = async (paymentReference) => {
//     try {
//       // If we don't have orderId, we need to find the order by reference
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/shop/order/find-by-reference/${paymentReference}`
//       );
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.order) {
//           // Found the order, now process payment
//           processPaymentWithOrderId(paymentReference, data.order._id);
//         } else {
//           throw new Error("Order not found for reference");
//         }
//       } else {
//         throw new Error("Failed to find order");
//       }
//     } catch (error) {
//       console.error("Error finding order by reference:", error);
//       setIsProcessing(false);
//       setIsSuccessful(false);
//       const errorMsg = "Could not find your order. Please contact support with your payment reference.";
//       setErrorMessage(errorMsg);
//       toast({
//         title: "Order Not Found",
//         description: errorMsg,
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className="w-full max-w-md"
//       >
//         <Card className="p-8 shadow-lg rounded-lg">
//           <CardHeader className="flex items-center justify-center p-0">
//             {isProcessing && (
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className="text-center"
//               >
//                 <Loader2 size={48} className="animate-spin text-blue-600 mx-auto" />
//                 <CardTitle className="mt-5 text-2xl text-gray-700">
//                   Processing Payment...
//                 </CardTitle>
//                 <p className="mt-2 text-gray-600">Please wait while we confirm your payment.</p>
//               </motion.div>
//             )}

//             {!isProcessing && isSuccessful && (
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className="text-center"
//               >
//                 <CheckCircle size={60} className="text-green-600 mx-auto" />
//                 <CardTitle className="mt-5 text-2xl font-bold text-green-600">
//                   Payment Successful!
//                 </CardTitle>
//                 <p className="mt-2 text-gray-600">Redirecting to success page...</p>
//               </motion.div>
//             )}

//             {!isProcessing && isSuccessful === false && (
//               <motion.div
//                 initial={{ scale: 0.8 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.4 }}
//                 className="text-center"
//               >
//                 <AlertCircle size={60} className="text-red-600 mx-auto" />
//                 <CardTitle className="mt-5 text-2xl font-bold text-red-600">
//                   Payment Failed
//                 </CardTitle>
//                 <p className="mt-2 text-gray-600 mb-2">
//                   {errorMessage || "There was an issue processing your payment."}
//                 </p>
//                 {reference && (
//                   <p className="text-sm text-gray-500 mb-4">
//                     Reference: {reference}
//                   </p>
//                 )}
//                 <div className="space-y-3">
//                   <Button
//                     className="w-full bg-red-600 hover:bg-red-700 text-white"
//                     onClick={() => navigate("/shop/checkout")}
//                   >
//                     Return to Checkout
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={() => navigate("/shop/account")}
//                   >
//                     Go to Account
//                   </Button>
//                 </div>
//               </motion.div>
//             )}
//           </CardHeader>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

// export default PaystackReturnPage;


import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment, clearOrderStorage } from "@/store/shop/order-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, Home, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function PaystackReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");
  const trxref = params.get("trxref");

  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const paymentReference = reference || trxref;
    
    if (paymentReference) {
      const orderId = localStorage.getItem("currentOrderId");
      const storedReference = localStorage.getItem("currentOrderReference");
      
      const cleanOrderId = orderId ? orderId.replace(/"/g, '') : null;

      if (cleanOrderId) {
        processPaymentWithOrderId(paymentReference, cleanOrderId);
      } else {
        processPaymentWithReference(paymentReference);
      }
    } else {
      setIsProcessing(false);
      setIsSuccessful(false);
      setErrorMessage("No payment reference found in the return URL.");
      toast({
        title: "Invalid Payment Return",
        description: "No payment reference found. Please contact support.",
        variant: "destructive",
      });
    }
  }, [reference, trxref, dispatch, navigate, toast]);

  const processPaymentWithOrderId = (paymentReference, orderId) => {
    dispatch(capturePayment({ reference: paymentReference, orderId }))
      .then((data) => {
        setIsProcessing(false);

        if (data?.payload?.success) {
          setIsSuccessful(true);
          dispatch(clearOrderStorage());
          toast({
            title: "Payment Successful!",
            description: "Your payment has been successfully processed.",
          });
          setTimeout(() => navigate("/shop/payment-success"), 2000);
        } else {
          setIsSuccessful(false);
          const errorMsg = data?.payload?.message || "There was an error processing your payment.";
          setErrorMessage(errorMsg);
          toast({
            title: "Payment Failed",
            description: errorMsg,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        setIsProcessing(false);
        setIsSuccessful(false);
        const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
        setErrorMessage(errorMsg);
        toast({
          title: "Payment Error",
          description: errorMsg,
          variant: "destructive",
        });
      });
  };

  const processPaymentWithReference = async (paymentReference) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/shop/order/find-by-reference/${paymentReference}`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.order) {
          processPaymentWithOrderId(paymentReference, data.order._id);
        } else {
          throw new Error("Order not found for reference");
        }
      } else {
        throw new Error("Failed to find order");
      }
    } catch (error) {
      setIsProcessing(false);
      setIsSuccessful(false);
      const errorMsg = "Could not find your order. Please contact support with your payment reference.";
      setErrorMessage(errorMsg);
      toast({
        title: "Order Not Found",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl">
          <CardHeader className="flex items-center justify-center p-0 space-y-6">
            {isProcessing && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-4"
              >
                <div className="relative">
                  <Loader2 size={64} className="animate-spin text-blue-600 mx-auto" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Processing Payment
                  </CardTitle>
                  <p className="text-gray-600 text-sm">Please wait while we confirm your payment</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}

            {!isProcessing && isSuccessful && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-green-600">
                    Payment Successful!
                  </CardTitle>
                  <p className="text-gray-600">Your payment has been confirmed</p>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center space-x-2 text-sm text-gray-500"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Redirecting to success page...</span>
                </motion.div>
              </motion.div>
            )}

            {!isProcessing && isSuccessful === false && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <AlertCircle size={48} className="text-red-600" />
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-2xl font-bold text-red-600">
                    Payment Failed
                  </CardTitle>
                  <p className="text-gray-600">
                    {errorMessage || "There was an issue processing your payment"}
                  </p>
                  {reference && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 font-mono">
                        Reference: {reference}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg"
                    onClick={() => navigate("/shop/checkout")}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Return to Checkout
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate("/shop/account")}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      My Account
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate("/")}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Go Home
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}

export default PaystackReturnPage;
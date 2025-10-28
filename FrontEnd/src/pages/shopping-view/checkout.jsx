

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { useToast } from "@/components/ui/use-toast";
// import { createNewOrder, resetApprovalURL } from "@/store/shop/order-slice";
// import Address from "@/components/shopping-view/address";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
// import { getDeliveryPrice } from "../../services/delivery-service";
// import { Truck, Package, CreditCard, CheckCircle, LogIn, AlertCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { fetchCartItems } from "@/store/shop/cart-slice";

// function ShoppingCheckout() {
//   const { cartItems, isLoading } = useSelector((state) => state.shopCart);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const { approvalURL, orderId } = useSelector((state) => state.shopOrder);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymentStart] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const { toast } = useToast();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchCartItems());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       sessionStorage.setItem('fromCheckout', 'true');
//       toast({
//         title: "Please login to complete your purchase",
//         description: "Your cart items will be saved and merged after login",
//       });
//       navigate("/auth/login");
//     }
//   }, [isAuthenticated, navigate, toast]);

//   // Redirect to Paystack when approvalURL is available
//   useEffect(() => {
//     if (approvalURL && isPaymentStart) {
//       console.log('Redirecting to Paystack:', approvalURL);
//       // Reset the approvalURL to prevent multiple redirects
//       dispatch(resetApprovalURL());
//       window.location.href = approvalURL;
//     }
//   }, [approvalURL, isPaymentStart, dispatch]);

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-16 max-w-7xl">
//         <div className="max-w-md mx-auto text-center">
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
//             <Package className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
//             <h2 className="text-xl font-bold text-blue-800 mb-2">
//               Loading Your Cart...
//             </h2>
//             <p className="text-blue-700 mb-4">
//               Please wait while we prepare your cart for checkout.
//             </p>
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="container mx-auto px-4 py-16 max-w-7xl">
//         <div className="max-w-md mx-auto text-center">
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//             <LogIn className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-yellow-800 mb-2">
//               Authentication Required
//             </h2>
//             <p className="text-yellow-700 mb-4">
//               Please login to access the checkout page.
//             </p>
//             <Button
//               onClick={() => navigate("/auth/login")}
//               className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
//             >
//               Login to Continue
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 max-w-7xl">
//         <div className="max-w-md mx-auto text-center">
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
//             <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-yellow-800 mb-2">
//               Your Cart is Empty
//             </h2>
//             <p className="text-yellow-700 mb-4">
//               Please add some items to your cart before proceeding to checkout.
//             </p>
//             <Button
//               onClick={() => navigate("/shop/listing")}
//               className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
//             >
//               Continue Shopping
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const totalCartAmount = cartItems.reduce(
//     (sum, currentItem) =>
//       sum +
//       (currentItem?.salePrice > 0
//         ? currentItem?.salePrice
//         : currentItem?.price) *
//         currentItem?.quantity,
//     0
//   );

//   const deliveryPrice = currentSelectedAddress
//     ? getDeliveryPrice(currentSelectedAddress.state)
//     : 0;

//   const totalAmountWithDelivery = totalCartAmount + deliveryPrice;

//   async function handleInitiatepaystackPayment() {
//     if (!isAuthenticated) {
//       toast({
//         title: "Please login to complete your purchase",
//         variant: "destructive",
//       });
//       navigate("/auth/login");
//       return;
//     }

//     if (!cartItems || cartItems.length === 0) {
//       toast({
//         title: "Your cart is empty, Please add items to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     if (currentSelectedAddress === null) {
//       toast({
//         title: "Please select one address to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Generate cartId BEFORE creating the order data
//     const cartId = `cart_${user?.id}_${Date.now()}`;
//     console.log('Generated cartId:', cartId);

//     const orderData = {
//       userId: user?.id,
//       cartId: cartId,
//       cartItems: cartItems.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         fullName: currentSelectedAddress?.fullName,
//         address: currentSelectedAddress?.address,
//         lga: currentSelectedAddress?.lga,
//         state: currentSelectedAddress?.state,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         country: currentSelectedAddress?.country || "Nigeria",
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paystack",
//       paymentStatus: "pending",
//       totalAmount: totalAmountWithDelivery,
//       deliveryPrice,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: user?.email,
//     };

//     console.log('Order data being sent to backend:', orderData);

//     try {
//       setIsPaymentStart(true);
//       const data = await dispatch(createNewOrder(orderData)).unwrap();
      
//       if (data?.success) {
//         console.log('Order created successfully, approval URL:', data.approvalURL);
//         setCurrentStep(3);
//         // The useEffect will handle the redirect when approvalURL is set
//       } else {
//         setIsPaymentStart(false);
//         toast({
//           title: "Payment failed!",
//           description: "Please try again later.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Order creation error:", error);
//       setIsPaymentStart(false);
//       toast({
//         title: "Payment failed!",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <div className="flex justify-between items-center mb-8 relative">
//         <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
//         <div 
//           className="absolute top-1/2 left-0 h-1 bg-peach-600 -z-10 transition-all duration-300"
//           style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
//         ></div>
        
//         {[1, 2, 3, 4].map((step) => (
//           <div key={step} className="flex flex-col items-center bg-white px-4">
//             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
//               currentStep >= step 
//                 ? 'bg-peach-600 border-peach-600 text-white' 
//                 : 'bg-white border-gray-300 text-gray-500'
//             }`}>
//               {step === 1 && <Package className="w-5 h-5" />}
//               {step === 2 && <Truck className="w-5 h-5" />}
//               {step === 3 && <CreditCard className="w-5 h-5" />}
//               {step === 4 && <CheckCircle className="w-5 h-5" />}
//             </div>
//             <span className={`text-sm mt-2 font-medium ${
//               currentStep >= step ? 'text-peach-600' : 'text-gray-500'
//             }`}>
//               {step === 1 && 'Cart'}
//               {step === 2 && 'Address'}
//               {step === 3 && 'Payment'}
//               {step === 4 && 'Confirm'}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//               <Truck className="w-5 h-5" />
//               Delivery Address
//             </h2>
//             <Address
//               selectedId={currentSelectedAddress}
//               setCurrentSelectedAddress={setCurrentSelectedAddress}
//             />
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-bold mb-4">Order Items ({cartItems.length})</h2>
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <UserCartItemsContent cartItem={item} key={item.productId} />
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-sm border p-6">
//             <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//             <div className="space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
//                 <span>₦{totalCartAmount.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600 flex items-center gap-1">
//                   <Truck className="w-4 h-4" />
//                   Delivery Fee
//                   {currentSelectedAddress && (
//                     <span className="text-xs text-gray-400 ml-1">
//                       ({currentSelectedAddress.state})
//                     </span>
//                   )}
//                 </span>
//                 <span>₦{deliveryPrice.toLocaleString()}</span>
//               </div>
//               <div className="border-t pt-3">
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total Amount</span>
//                   <span>₦{totalAmountWithDelivery.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
//               <div className="flex items-start gap-2">
//                 <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <div>
//                   <strong>Standard delivery:</strong> 2-3 business days
//                   {currentSelectedAddress && (
//                     <div className="text-xs mt-1">
//                       Delivery to {currentSelectedAddress.state}: ₦{deliveryPrice.toLocaleString()}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Button
//               onClick={handleInitiatepaystackPayment}
//               disabled={!currentSelectedAddress || isPaymentStart}
//               className="w-full mt-6 py-3 text-base font-semibold bg-peach-600 hover:bg-peach-700 text-white"
//               size="lg"
//             >
//               {isPaymentStart
//                 ? "Processing Paystack Payment..."
//                 : `Pay ₦${totalAmountWithDelivery.toLocaleString()} with Paystack`}
//             </Button>

//             {!currentSelectedAddress && (
//               <div className="text-center text-sm text-orange-600 mt-2">
//                 Please select a delivery address to continue
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder, resetApprovalURL } from "@/store/shop/order-slice";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { getDeliveryPrice } from "../../services/delivery-service";
import { Truck, Package, CreditCard, CheckCircle, LogIn, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchCartItems } from "@/store/shop/cart-slice";

function ShoppingCheckout() {
  const { cartItems, isLoading } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { approvalURL, orderId } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem('fromCheckout', 'true');
      toast({
        title: "Please login to complete your purchase",
        description: "Your cart items will be saved and merged after login",
      });
      navigate("/auth/login");
    }
  }, [isAuthenticated, navigate, toast]);

  useEffect(() => {
    if (approvalURL && isPaymentStart) {
      console.log('Redirecting to Paystack:', approvalURL);
      dispatch(resetApprovalURL());
      window.location.href = approvalURL;
    }
  }, [approvalURL, isPaymentStart, dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h2 className="text-xl font-bold text-blue-800 mb-2">
              Loading Your Cart...
            </h2>
            <p className="text-blue-700 mb-4">
              Please wait while we prepare your cart for checkout.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <LogIn className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-yellow-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-yellow-700 mb-4">
              Please login to access the checkout page.
            </p>
            <Button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Login to Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-yellow-800 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-yellow-700 mb-4">
              Please add some items to your cart before proceeding to checkout.
            </p>
            <Button
              onClick={() => navigate("/shop/listing")}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalCartAmount = cartItems.reduce(
    (sum, currentItem) =>
      sum +
      (currentItem?.salePrice > 0
        ? currentItem?.salePrice
        : currentItem?.price) *
        currentItem?.quantity,
    0
  );

  const deliveryPrice = currentSelectedAddress
    ? getDeliveryPrice(currentSelectedAddress.state)
    : 0;

  const totalAmountWithDelivery = totalCartAmount + deliveryPrice;

  async function handleInitiatepaystackPayment() {
    if (!isAuthenticated) {
      toast({
        title: "Please login to complete your purchase",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Your cart is empty, Please add items to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const cartId = `cart_${user?.id}_${Date.now()}`;
    console.log('Generated cartId:', cartId);

    const orderData = {
      userId: user?.id,
      cartId: cartId,
      cartItems: cartItems.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        fullName: currentSelectedAddress?.fullName,
        address: currentSelectedAddress?.address,
        lga: currentSelectedAddress?.lga,
        state: currentSelectedAddress?.state,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        country: currentSelectedAddress?.country || "Nigeria",
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paystack",
      paymentStatus: "pending",
      totalAmount: totalAmountWithDelivery,
      deliveryPrice,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: user?.email,
    };

    console.log('Order data being sent to backend:', orderData);

    try {
      setIsPaymentStart(true);
      const data = await dispatch(createNewOrder(orderData)).unwrap();
      
      if (data?.success) {
        console.log('Order created successfully, approval URL:', data.approvalURL);
        setCurrentStep(3);
      } else {
        setIsPaymentStart(false);
        toast({
          title: "Payment failed!",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setIsPaymentStart(false);
      toast({
        title: "Payment failed!",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-peach-600 -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        ></div>
        
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center bg-white px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
              currentStep >= step 
                ? 'bg-peach-600 border-peach-600 text-white' 
                : 'bg-white border-gray-300 text-gray-500'
            }`}>
              {step === 1 && <Package className="w-5 h-5" />}
              {step === 2 && <Truck className="w-5 h-5" />}
              {step === 3 && <CreditCard className="w-5 h-5" />}
              {step === 4 && <CheckCircle className="w-5 h-5" />}
            </div>
            <span className={`text-sm mt-2 font-medium ${
              currentStep >= step ? 'text-peach-600' : 'text-gray-500'
            }`}>
              {step === 1 && 'Cart'}
              {step === 2 && 'Address'}
              {step === 3 && 'Payment'}
              {step === 4 && 'Confirm'}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Delivery Address
            </h2>
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">Order Items ({cartItems.length})</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.productId} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span>₦{totalCartAmount.toLocaleString("en-NG")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  Delivery Fee
                  {currentSelectedAddress && (
                    <span className="text-xs text-gray-400 ml-1">
                      ({currentSelectedAddress.state})
                    </span>
                  )}
                </span>
                <span>₦{deliveryPrice.toLocaleString("en-NG")}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₦{totalAmountWithDelivery.toLocaleString("en-NG")}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Standard delivery:</strong> 2-3 business days
                  {currentSelectedAddress && (
                    <div className="text-xs mt-1">
                      Delivery to {currentSelectedAddress.state}: ₦{deliveryPrice.toLocaleString("en-NG")}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleInitiatepaystackPayment}
              disabled={!currentSelectedAddress || isPaymentStart}
              className="w-full mt-6 py-3 text-base font-semibold bg-peach-600 hover:bg-peach-700 text-white"
              size="lg"
            >
              {isPaymentStart
                ? "Processing Paystack Payment..."
                : `Pay ₦${totalAmountWithDelivery.toLocaleString("en-NG")} with Paystack`}
            </Button>

            {!currentSelectedAddress && (
              <div className="text-center text-sm text-orange-600 mt-2">
                Please select a delivery address to continue
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;



// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { useToast } from "@/components/ui/use-toast";
// import { createNewOrder } from "@/store/shop/order-slice";
// import Address from "@/components/shopping-view/address";
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content";

// function ShoppingCheckout() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymentStart] = useState(false);
//   const { approvalURL } = useSelector((state) => state.shopOrder);
//   const [currentStep, setCurrentStep] = useState(1); // Step 1 initially
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   function handleInitiatepaystackPayment() {
//     if (cartItems.items.length === 0) {
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

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id,
//       cartItems: cartItems.items.map((singleCartItem) => ({
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
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "paystack",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: user?.email,
//     };

//     dispatch(createNewOrder(orderData)).then((data) => {
//       if (data?.payload?.success) {
//         setIsPaymentStart(true);
//         setCurrentStep(3); // Move to payment step
//       } else {
//         setIsPaymentStart(false);
//         toast({
//           title: "Payment failed!",
//           description: "Please try again later.",
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   if (approvalURL && !isPaymentStart) {
//     window.location.href = approvalURL;
//   }

//   return (
//     <div className="flex flex-col p-5">
//       {/* Dynamic Progress Indicator */}
//       <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-5">
//         <span
//           className={`font-semibold ${
//             currentStep >= 1 ? "text-blue-600" : "text-gray-500"
//           }`}
//         >
//           1. Cart
//         </span>
//         <span
//           className={`font-semibold ${
//             currentStep >= 2 ? "text-blue-600" : "text-gray-500"
//           }`}
//         >
//           2. Address
//         </span>
//         <span
//           className={`font-semibold ${
//             currentStep >= 3 ? "text-blue-600" : "text-gray-500"
//           }`}
//         >
//           3. Payment
//         </span>
//         <span
//           className={`font-semibold ${
//             currentStep >= 4 ? "text-blue-600" : "text-gray-500"
//           }`}
//         >
//           4. Confirmation
//         </span>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//         {/* Address Selection */}
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />
//         {/* Cart Items & Summary */}
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent cartItem={item} key={item.productId} />
//               ))
//             : null}

//           {/* Order Summary */}
//           <div className="p-5 bg-gray-100 rounded-lg shadow">
//             <h2 className="text-lg font-bold mb-4">Order Summary</h2>
//             <div className="flex justify-between">
//               <span>Total Items:</span>
//               <span>{cartItems.items.length}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Total Amount:</span>
//               <span>₦{totalCartAmount.toLocaleString()}</span>
//             </div>
//           </div>

//           {/* Checkout Button */}
//           <div className="mt-4 w-full">
//             <Button
//               onClick={handleInitiatepaystackPayment}
//               className="w-full bg-black hover:bg-indigo-700 text-white"
//             >
//               {isPaymentStart
//                 ? "Processing Paystack Payment..."
//                 : "Checkout with Paystack"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCheckout;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { getDeliveryPrice } from "../../services/delivery-service";
import { Truck, Package, CreditCard, CheckCircle } from "lucide-react";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const deliveryPrice = currentSelectedAddress
    ? getDeliveryPrice(currentSelectedAddress.state)
    : 0;

  const totalAmountWithDelivery = totalCartAmount + deliveryPrice;

  function handleInitiatepaystackPayment() {
    if (cartItems.items.length === 0) {
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

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
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

    dispatch(createNewOrder(orderData)).then((data) => {
      if (data?.payload?.success) {
        setIsPaymentStart(true);
        setCurrentStep(3);
      } else {
        setIsPaymentStart(false);
        toast({
          title: "Payment failed!",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    });
  }

  if (approvalURL && !isPaymentStart) {
    window.location.href = approvalURL;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Enhanced Progress Indicator */}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Address Selection */}
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

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            <div className="space-y-4">
              {cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items.map((item) => (
                    <UserCartItemsContent cartItem={item} key={item.productId} />
                  ))
                : (
                  <div className="text-center py-8 text-gray-500">
                    Your cart is empty
                  </div>
                )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({cartItems?.items?.length || 0} items)</span>
                <span>₦{totalCartAmount.toLocaleString()}</span>
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
                <span>₦{deliveryPrice.toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₦{totalAmountWithDelivery.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <strong>Standard delivery:</strong> 2-3 business days
                  {currentSelectedAddress && (
                    <div className="text-xs mt-1">
                      Delivery to {currentSelectedAddress.state}: ₦{deliveryPrice.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleInitiatepaystackPayment}
              disabled={!currentSelectedAddress || cartItems.items.length === 0 || isPaymentStart}
              className="w-full mt-6 py-3 text-base font-semibold bg-peach-600 hover:bg-peach-700 text-white"
              size="lg"
            >
              {isPaymentStart
                ? "Processing Paystack Payment..."
                : `Pay ₦${totalAmountWithDelivery.toLocaleString()} with Paystack`}
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
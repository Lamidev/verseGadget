
// import { Minus, Plus, Trash } from "lucide-react";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";
// import { motion } from "framer-motion";

// function UserCartItemsContent({ cartItem }) {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { productList } = useSelector((state) => state.shopProducts);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function handleUpdateQuantity(getCartItem, typeOfAction) {
//     if (typeOfAction === "plus") {
//       const currentItem = cartItems.items.find(
//         (item) => item.productId === getCartItem?.productId
//       );
//       const product = productList.find(
//         (product) => product._id === getCartItem?.productId
//       );

//       if (currentItem && product) {
//         if (currentItem.quantity + 1 > product.totalStock) {
//           toast({
//             title: `Only ${product.totalStock} quantity can be added.`,
//             variant: "destructive",
//           });
//           return;
//         }
//       }
//     }

//     dispatch(
//       updateCartQuantity({
//         userId: user?.id,
//         productId: getCartItem?.productId,
//         quantity:
//           typeOfAction === "plus"
//             ? getCartItem?.quantity + 1
//             : getCartItem?.quantity - 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart updated successfully",
//         });
//       }
//     });
//   }

//   function handleCartItemDelete(getCartItem) {
//     dispatch(
//       deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: "Cart item deleted successfully",
//         });
//       }
//     });
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
//     >
//       {/* Product Image */}
//       <img
//         src={cartItem?.image}
//         alt={cartItem?.title}
//         className="w-20 h-20 rounded object-cover"
//       />

//       {/* Product Details */}
//       <div className="flex-1">
//         <h3 className="font-extrabold">{cartItem?.title}</h3>
//         <p className="text-sm text-gray-600">
//           ₦{(cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price).toFixed(2)} x {cartItem?.quantity}
//         </p>

//         {/* Quantity Controls */}
//         <div className="flex items-center gap-2 mt-2">
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             disabled={cartItem?.quantity === 1}
//             onClick={() => handleUpdateQuantity(cartItem, "minus")}
//           >
//             <Minus className="w-4 h-4" />
//             <span className="sr-only">Decrease quantity</span>
//           </Button>
//           <span className="font-semibold">{cartItem?.quantity}</span>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             onClick={() => handleUpdateQuantity(cartItem, "plus")}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="sr-only">Increase quantity</span>
//           </Button>
//         </div>
//       </div>

//       {/* Price & Delete */}
//       <div className="flex flex-col items-end">
//         <p className="font-semibold">
//           ₦{((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
//         </p>
//         <Trash
//           onClick={() => handleCartItemDelete(cartItem)}
//           className="cursor-pointer text-red-500 hover:text-red-700 mt-1"
//           size={20}
//         />
//       </div>
//     </motion.div>
//   );
// }

// export default UserCartItemsContent;
import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { motion } from "framer-motion";
import { useState } from "react";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      const currentItem = cartItems.items.find(
        (item) => item.productId === getCartItem?.productId
      );
      const product = productList.find(
        (product) => product._id === getCartItem?.productId
      );

      if (currentItem && product) {
        if (currentItem.quantity + 1 > product.totalStock) {
          toast({
            title: `Stock Limit`,
            description: `Only ${product.totalStock} units available in stock.`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart updated",
          description: "Quantity updated successfully",
        });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    setIsDeleting(true);
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Item removed",
          description: "Product removed from your cart",
        });
      }
      setIsDeleting(false);
    });
  }

  const currentPrice = cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price;
  const originalPrice = cartItem?.salePrice > 0 ? cartItem?.price : null;
  const itemTotal = currentPrice * cartItem?.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
    >
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={cartItem?.image}
          alt={cartItem?.title}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border"
        />
      </div>

      {/* Product Details - Improved responsive layout */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title and Delete Button */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2 leading-tight flex-1">
            {cartItem?.title}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
            onClick={() => handleCartItemDelete(cartItem)}
            disabled={isDeleting}
          >
            <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Price Information */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary text-sm">
            ₦{currentPrice.toFixed(2)}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="text-xs text-gray-500 line-through">
              ₦{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity Controls and Total Price */}
        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-md"
              size="icon"
              disabled={cartItem?.quantity === 1}
              onClick={() => handleUpdateQuantity(cartItem, "minus")}
            >
              <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Button>
            <span className="font-medium text-sm w-6 sm:w-8 text-center">
              {cartItem?.quantity}
            </span>
            <Button
              variant="outline"
              className="h-6 w-6 sm:h-7 sm:w-7 rounded-md"
              size="icon"
              onClick={() => handleUpdateQuantity(cartItem, "plus")}
            >
              <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Button>
          </div>
          
          {/* Total Price for this item */}
          <div className="text-right">
            <div className="font-bold text-sm">
              ₦{itemTotal.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 hidden xs:block">
              {cartItem?.quantity} × ₦{currentPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UserCartItemsContent;

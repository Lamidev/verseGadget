

// import { useDispatch, useSelector } from "react-redux";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Dialog, DialogContent } from "../ui/dialog";
// import { Input } from "../ui/input";
// import { Separator } from "../ui/separator";
// import { StarIcon } from "lucide-react";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";
// import { setProductDetails } from "@/store/shop/products-slice";
// import { Label } from "../ui/label";
// import StarRatingComponent from "../common/star-rating";
// import { addReview, getReviews } from "@/store/shop/review-slice";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function ProductDetailsDialog({ open, setOpen, productDetails }) {
//   const [reviewMsg, setReviewMsg] = useState("");
//   const [rating, setRating] = useState(0);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { reviews } = useSelector((state) => state.shopReview);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   function handleRatingChange(getRating) {
//     setRating(getRating);
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     if (!user) {
//       navigate("/auth/login");
//       toast({
//         title: "Please login to add items to the cart",
//         variant: "destructive",
//       });
//       return;
//     }

//     let getCartItems = cartItems.items || [];

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//           toast({
//             title: `Only ${getQuantity} quantity can be added for this item`,
//             variant: "destructive",
//           });
//           return;
//         }
//       }
//     }
//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product added to cart!",
//         });
//       }
//     });
//   }

//   function handleDialogClose() {
//     setOpen(false);
//     dispatch(setProductDetails());
//     setReviewMsg("");
//     setRating(0);
//   }

//   function handleAddReview() {
//     if (!user) {
//       navigate("/auth/login");
//       toast({
//         title: "Please login to add a review",
//         variant: "destructive",
//       });
//       return;
//     }

//     dispatch(
//       addReview({
//         productId: productDetails?._id,
//         userId: user?.id,
//         userName: user?.userName,
//         reviewMessage: reviewMsg,
//         reviewValue: rating,
//       })
//     ).then((data) => {
//       if (data.payload.success) {
//         setRating(0);
//         setReviewMsg("");
//         dispatch(getReviews(productDetails?._id));
//         toast({
//           title: "Review added successfully!",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) dispatch(getReviews(productDetails?._id));
//   }, [productDetails]);

//   const averageReview =
//     reviews && reviews.length > 0
//       ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//         reviews.length
//       : 0;

//   return (
//     <Dialog open={open} onOpenChange={handleDialogClose}>
//       <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-[95vw] md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] 2xl:max-w-[60vw] h-[80vh] md:h-[85vh] overflow-y-auto">
//         {/* Product Image - Full width on mobile, half on larger screens */}
//         <div className="flex flex-col gap-4">
//           <div className="relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center h-64 sm:h-80 md:h-96">
//             <img
//               src={productDetails?.image}
//               alt={productDetails?.title}
//               className="object-contain w-full h-full p-4"
//             />
//           </div>

//           {/* Price and Add to Cart - Show below image on mobile, but could be moved to right column if preferred */}
//           <div className="lg:hidden space-y-4">
//             <div className="flex items-center justify-between">
//               <p
//                 className={`text-lg font-bold text-primary ${
//                   productDetails?.salePrice > 0 ? "line-through" : ""
//                 }`}
//               >
//                 ₦{productDetails?.price}
//               </p>
//               {productDetails?.salePrice > 0 && (
//                 <p className="text-lg font-bold text-muted-foreground">
//                   ₦{productDetails?.salePrice}
//                 </p>
//               )}
//             </div>

//             <div className="mt-2">
//               {productDetails?.totalStock === 0 ? (
//                 <Button className="w-full opacity-60 cursor-not-allowed">
//                   Out of Stock
//                 </Button>
//               ) : (
//                 <Button
//                   className="w-full"
//                   onClick={() =>
//                     handleAddToCart(productDetails?._id, productDetails?.totalStock)
//                   }
//                 >
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Product Details - Full width on mobile, half on larger screens */}
//         <div className="flex flex-col gap-4 overflow-y-auto">
//           <div>
//             <h1 className="text-xl md:text-2xl font-extrabold break-words">
//               {productDetails?.title}
//             </h1>
//             <p className="text-sm md:text-base text-muted-foreground mt-2">
//               {productDetails?.description}
//             </p>
//           </div>

//           {/* Price and Add to Cart - Hidden on mobile, shown in right column on larger screens */}
//           <div className="hidden lg:block space-y-4">
//             <div className="flex items-center justify-between">
//               <p
//                 className={`text-lg md:text-xl font-bold text-primary ${
//                   productDetails?.salePrice > 0 ? "line-through" : ""
//                 }`}
//               >
//                 ₦{productDetails?.price}
//               </p>
//               {productDetails?.salePrice > 0 && (
//                 <p className="text-lg md:text-xl font-bold text-muted-foreground">
//                   ₦{productDetails?.salePrice}
//                 </p>
//               )}
//             </div>

//             <div className="mt-2">
//               {productDetails?.totalStock === 0 ? (
//                 <Button className="w-full opacity-60 cursor-not-allowed">
//                   Out of Stock
//                 </Button>
//               ) : (
//                 <Button
//                   className="w-full"
//                   onClick={() =>
//                     handleAddToCart(productDetails?._id, productDetails?.totalStock)
//                   }
//                 >
//                   Add to Cart
//                 </Button>
//               )}
//             </div>
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-0.5">
//               <StarRatingComponent rating={averageReview} />
//             </div>
//             <span className="text-sm md:text-base text-muted-foreground">
//               ({averageReview.toFixed(2)})
//             </span>
//           </div>

//           <Separator />

//           {/* Reviews Section with scrollable area */}
//           <div className="flex-1 overflow-y-auto">
//             <h2 className="text-lg font-bold mb-2 md:mb-4">Reviews</h2>
//             <div className="space-y-3 md:space-y-4">
//               {reviews && reviews.length > 0 ? (
//                 reviews.map((reviewItem) => (
//                   <div key={reviewItem._id} className="flex gap-3">
//                     <Avatar className="w-8 h-8 md:w-10 md:h-10 border">
//                       <AvatarFallback>
//                         {reviewItem?.userName[0].toUpperCase()}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="space-y-1 flex-1">
//                       <div className="flex items-center justify-between">
//                         <h3 className="font-bold text-sm md:text-base">
//                           {reviewItem?.userName}
//                         </h3>
//                         <div className="flex items-center gap-0.5">
//                           <StarRatingComponent rating={reviewItem?.reviewValue} />
//                         </div>
//                       </div>
//                       <p className="text-xs md:text-sm text-muted-foreground">
//                         {reviewItem.reviewMessage}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm md:text-base text-muted-foreground">
//                   No Reviews
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Write a Review Section */}
//           <div className="space-y-2 pt-2">
//             <Label className="text-sm md:text-base">Write a review</Label>
//             <div className="flex gap-1">
//               <StarRatingComponent
//                 rating={rating}
//                 handleRatingChange={handleRatingChange}
//               />
//             </div>
//             <Input
//               name="reviewMsg"
//               value={reviewMsg}
//               onChange={(event) => setReviewMsg(event.target.value)}
//               placeholder="Write a review..."
//               className="text-sm md:text-base"
//             />
//             <Button
//               onClick={handleAddReview}
//               disabled={reviewMsg.trim() === "" || !user}
//               className="w-full"
//             >
//               Submit
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ProductDetailsDialog;



import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { StarIcon, Plus, Minus } from "lucide-react";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateSessionId } from "@/components/utils/session";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();
  const navigate = useNavigate();

  const currentPrice =
    productDetails?.salePrice > 0
      ? productDetails?.salePrice
      : productDetails?.price;
  const originalPrice =
    productDetails?.salePrice > 0 ? productDetails?.price : null;
  const totalPrice = currentPrice * quantity;

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleQuantityChange(type) {
    if (type === "increment") {
      if (quantity < productDetails?.totalStock) {
        setQuantity(quantity + 1);
      } else {
        toast({
          title: `Only ${productDetails?.totalStock} units available`,
          variant: "destructive",
        });
      }
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  async function handleAddToCart(getCurrentProductId, getTotalStock) {
    try {
      const userId = user?.id;
      const sessionId = userId ? null : getOrCreateSessionId();

      if (!userId && !sessionId) {
        toast({
          title: "Session information missing",
          description: "Please log in or enable cookies.",
          variant: "destructive",
        });
        return;
      }

      const currentCartItems = Array.isArray(cartItems) ? cartItems : [];
      const existingItem = currentCartItems.find(
        (item) => item.productId === getCurrentProductId
      );

      if (existingItem && existingItem.quantity >= getTotalStock) {
        toast({
          title: `Stock Limit`,
          description: `Only ${getTotalStock} units available.`,
          variant: "destructive",
        });
        return;
      }

      if (!existingItem && quantity > getTotalStock) {
        toast({
          title: `Limited Stock`,
          description: `Only ${getTotalStock} available.`,
          variant: "destructive",
        });
        return;
      }

      if (existingItem && existingItem.quantity + quantity > getTotalStock) {
        toast({
          title: `Stock Exceeded`,
          description: `Adding ${quantity} more exceeds available stock.`,
          variant: "destructive",
        });
        return;
      }

      const response = await dispatch(
        addToCart({
          productId: getCurrentProductId,
          quantity,
        })
      ).unwrap();

      if (response.success) {
        await dispatch(fetchCartItems()).unwrap();
        toast({
          title: `${quantity} product${quantity > 1 ? "s" : ""} added to cart!`,
          description: "Item successfully added to your shopping cart.",
        });
        setQuantity(1);
      } else {
        toast({
          title: response.message || "Failed to add product to cart",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: "Failed to add product to cart",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setReviewMsg("");
    setRating(0);
    setQuantity(1);
  }

  function handleAddReview() {
    if (!user) {
      navigate("/auth/login");
      toast({
        title: "Please login to add a review",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
      setQuantity(1);
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, item) => sum + item.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 max-w-[95vw] md:max-w-[85vw] xl:max-w-[70vw] 2xl:max-w-[60vw] h-[85vh] overflow-y-auto rounded-2xl shadow-lg">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-xl bg-transparent flex items-center justify-center h-80 sm:h-96 md:h-[500px]">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className="object-contain w-full h-full"
            />
          </div>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {productDetails?.description}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-5">
          {/* Title, Brand, Availability */}
          <div className="space-y-3">
            <h1 className="text-2xl font-bold leading-tight">
              {productDetails?.title}
            </h1>
            {productDetails?.brand && (
              <p className="text-sm text-gray-700">
                <span className="font-medium">Brand:</span>{" "}
                {productDetails.brand}
              </p>
            )}
            <p className="text-sm text-gray-700">
              <span className="font-medium">Availability:</span>{" "}
              <span
                className={`font-semibold ${productDetails?.totalStock > 0
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {productDetails?.totalStock > 0
                  ? `${productDetails.totalStock} in stock`
                  : "Out of stock"}
              </span>
            </p>
          </div>

          {/* Price + Quantity + Add to Cart */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {originalPrice && (
                <p className="text-xl font-bold text-gray-400 line-through">
                  ₦{originalPrice?.toLocaleString("en-NG")}
                </p>
              )}
              <p className="text-2xl font-bold text-orange-500">
                ₦{currentPrice?.toLocaleString("en-NG")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange("increment")}
                  disabled={quantity >= productDetails?.totalStock}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Add to Cart */}
              {productDetails?.totalStock === 0 ? (
                <Button className="flex-1 opacity-60 cursor-not-allowed">
                  Out of Stock
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock
                    )
                  }
                >
                  Add ₦{totalPrice.toLocaleString("en-NG")} to Cart
                </Button>
              )}
            </div>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-sm text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>

          <Separator />

          {/* Reviews */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Reviews</h2>
            {reviews && reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((reviewItem) => (
                  <div key={reviewItem._id} className="flex gap-3">
                    <Avatar className="w-9 h-9 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">
                          {reviewItem?.userName}
                        </h3>
                        <StarRatingComponent
                          rating={reviewItem?.reviewValue}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No Reviews yet</p>
            )}
          </div>

          {/* Write Review */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Write a review</Label>
            <StarRatingComponent
              rating={rating}
              handleRatingChange={handleRatingChange}
            />
            <Input
              name="reviewMsg"
              value={reviewMsg}
              onChange={(e) => setReviewMsg(e.target.value)}
              placeholder="Write a review..."
            />
            <Button
              onClick={handleAddReview}
              disabled={reviewMsg.trim() === "" || !user}
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;

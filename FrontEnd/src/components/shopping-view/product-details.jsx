import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Plus, Minus, Truck, ShieldCheck, RefreshCcw, Package, CreditCard, ChevronRight } from "lucide-react";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const currentPrice =
    productDetails?.salePrice > 0
      ? productDetails?.salePrice
      : productDetails?.price;
  const originalPrice =
    productDetails?.salePrice > 0 ? productDetails?.price : null;
  const totalPrice = currentPrice * quantity;

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

  async function handleAddToCart() {
    try {
      if (productDetails?.totalStock === 0) return;

      const response = await dispatch(
        addToCart({
          productId: productDetails?._id,
          quantity,
        })
      ).unwrap();

      if (response.success) {
        await dispatch(fetchCartItems()).unwrap();
        toast({
          title: "Added to Cart!",
          description: `${quantity} × ${productDetails?.title} successfully added.`,
        });
        setOpen(false); // Optional: close dialog after adding
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to cart. Please try again.",
        variant: "destructive",
      });
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setQuantity(1);
  }

  useEffect(() => {
    if (productDetails) {
      setQuantity(1);
    }
  }, [productDetails]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="p-0 max-w-[95vw] md:max-w-[85vw] lg:max-w-[1000px] max-h-[90vh] overflow-hidden rounded-3xl border-none shadow-2xl">
        <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* Left Side: Image Gallery Style */}
          <div className="lg:w-1/2 bg-gray-50/50 p-6 flex items-center justify-center relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-square max-h-[400px] lg:max-h-full"
            >
              <img
                src={productDetails?.image}
                alt={productDetails?.title}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Discount Badge */}
            {originalPrice && (
              <div className="absolute top-6 left-6 bg-peach-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                -{Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
              </div>
            )}
          </div>

          {/* Right Side: Product Info */}
          <div className="lg:w-1/2 flex flex-col h-full bg-white overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Breadcrumb & Brand */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span>{productDetails?.category}</span>
                  <ChevronRight size={10} />
                  <span>{productDetails?.brand}</span>
                </div>
                <h1 className="text-3xl font-black text-gray-900 leading-tight">
                  {productDetails?.title}
                </h1>
              </div>

              {/* Pricing & Stock */}
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-peach-600">
                      ₦{currentPrice?.toLocaleString("en-NG")}
                    </span>
                    {originalPrice && (
                      <span className="text-xl font-bold text-gray-300 line-through decoration-peach-300">
                        ₦{originalPrice?.toLocaleString("en-NG")}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                    Price inclusive of all taxes
                  </p>
                </div>

                <div className="text-right">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border ${productDetails?.totalStock > 0
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-red-50 text-red-600 border-red-100"
                    }`}>
                    {productDetails?.totalStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <Separator className="bg-gray-100" />

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Description</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {productDetails?.description}
                </p>
              </div>

              {/* Delivery info box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5 text-peach-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 uppercase">Express Delivery</h4>
                    <p className="text-[11px] text-gray-500 font-bold mt-0.5">Lagos: Same Day | Outside: 1-2 Days</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-gray-900 uppercase">Warranty</h4>
                    <p className="text-[11px] text-gray-500 font-bold mt-0.5">100% Authentic Product Guarantee</p>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between py-4 border-y border-gray-100">
                <div className="flex flex-col items-center gap-1.5">
                  <Package className="h-5 w-5 text-orange-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Quality Check</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <RefreshCcw className="h-5 w-5 text-gray-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Secure Payment</span>
                </div>
              </div>

              {/* Action Section */}
              <div className="sticky bottom-0 bg-white pt-4 pb-0 flex flex-col sm:flex-row items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-gray-100 rounded-2xl p-1 w-full sm:w-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1 || productDetails?.totalStock === 0}
                    className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-black text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange("increment")}
                    disabled={quantity >= productDetails?.totalStock || productDetails?.totalStock === 0}
                    className="h-12 w-12 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={productDetails?.totalStock === 0}
                  className="w-full h-14 bg-peach-500 hover:bg-peach-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-peach-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {productDetails?.totalStock === 0
                    ? "OUT OF STOCK"
                    : `ADD TO CART • ₦${totalPrice.toLocaleString("en-NG")}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;

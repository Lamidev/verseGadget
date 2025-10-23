
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/products-slice";
// import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
// import { motion } from "framer-motion";
// import debounce from "lodash.debounce";
// import { CheckCircle, AlertCircle } from "lucide-react"; // Replace with actual icons if needed

// function SearchProducts() {
//   const [keyword, setKeyword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // Debounced search to reduce unnecessary dispatches
//   const debouncedSearch = debounce((value) => {
//     if (value.trim().length >= 3) {
//       setSearchParams(new URLSearchParams(`?keyword=${value}`));
//       setIsLoading(true);
//       dispatch(getSearchResults(value)).finally(() => setIsLoading(false));
//     } else {
//       setSearchParams(new URLSearchParams());
//       dispatch(resetSearchResults());
//     }
//   }, 300);

//   // Handle search input changes
//   const handleSearchInputChange = (event) => {
//     setKeyword(event.target.value);
//     debouncedSearch(event.target.value);
//   };

//   // Handle add to cart
//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     if (!user) {
//       navigate("/auth/login"); // Redirect if not authenticated
//       toast({
//         title: "Please login to add to cart.",
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
//             icon: <AlertCircle />,
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
//           title: "Product is added to cart",
//           icon: <CheckCircle />,
//         });
//       }
//     });
//   }

//   // Handle product details fetching
//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   return (
//     <div className="container mx-auto md:px-6 px-4 py-8">
//       {/* Search Bar */}
//       <div className="flex justify-center mb-8">
//         <div className="w-full flex items-center">
//           <motion.div
//             initial={{ boxShadow: "0 0 0px rgba(0,0,0,0.2)" }}
//             whileFocus={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
//           >
//             <Input
//               value={keyword}
//               name="keyword"
//               onChange={handleSearchInputChange}
//               className="py-6"
//               placeholder="Search Products..."
//             />
//           </motion.div>
//           {isLoading && (
//             <div className="loader border-t-4 border-gray-600 rounded-full w-6 h-6 animate-spin ml-2" />
//           )}
//         </div>
//       </div>

//       {/* No Results Message with Animation */}
//       {!searchResults.length && !isLoading && (
//         <motion.h1
//           className="text-5xl font-extrabold"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//         >
//           No result found!
//         </motion.h1>
//       )}

//       {/* Product Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {searchResults.map((item) => (
//           <motion.div
//             key={item.id}
//             whileHover={{ scale: 1.05 }}
//             // whileTap={{ scale: 0.95 }}
//           >
//             <ShoppingProductTile
//               handleAddToCart={handleAddToCart}
//               product={item}
//               handleGetProductDetails={handleGetProductDetails}
//             />
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Product Details Dialog */}
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </div>
//   );
// }

// export default SearchProducts;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { getOrCreateSessionId } from "@/components/utils/session";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Debounced search to reduce unnecessary dispatches
  const debouncedSearch = debounce((value) => {
    if (value.trim().length >= 3) {
      setSearchParams(new URLSearchParams(`?keyword=${value}`));
      setIsLoading(true);
      dispatch(getSearchResults(value)).finally(() => setIsLoading(false));
    } else {
      setSearchParams(new URLSearchParams());
      dispatch(resetSearchResults());
    }
  }, 300);

  // Handle search input changes
  const handleSearchInputChange = (event) => {
    setKeyword(event.target.value);
    debouncedSearch(event.target.value);
  };

  // Handle add to cart
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
          description: `Only ${getTotalStock} units available in stock.`,
          variant: "destructive",
        });
        return;
      }

      if (!existingItem && 1 > getTotalStock) {
        toast({
          title: `Limited Stock`,
          description: `Only ${getTotalStock} quantity available for this product.`,
          variant: "destructive",
        });
        return;
      }

      if (existingItem && existingItem.quantity + 1 > getTotalStock) {
        toast({
          title: `Stock Exceeded`,
          description: `Adding one more would exceed available stock of ${getTotalStock}.`,
          variant: "destructive",
        });
        return;
      }

      const response = await dispatch(
        addToCart({
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).unwrap();

      if (response.success) {
        await dispatch(fetchCartItems()).unwrap();
        toast({
          title: "Product added to cart!",
          description: "Item successfully added to your shopping cart.",
        });
      } else {
        toast({
          title: response.message || "Failed to add product to cart",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add product to cart",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  }

  // Handle product details fetching
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await dispatch(fetchCartItems()).unwrap();
      } catch (error) {
        // Silently handle cart fetch error
      }
    };
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <motion.div
            initial={{ boxShadow: "0 0 0px rgba(0,0,0,0.2)" }}
            whileFocus={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
          >
            <Input
              value={keyword}
              name="keyword"
              onChange={handleSearchInputChange}
              className="py-6"
              placeholder="Search Products..."
            />
          </motion.div>
          {isLoading && (
            <div className="loader border-t-4 border-gray-600 rounded-full w-6 h-6 animate-spin ml-2" />
          )}
        </div>
      </div>

      {/* No Results Message with Animation */}
      {!searchResults.length && !isLoading && (
        <motion.h1
          className="text-5xl font-extrabold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          No result found!
        </motion.h1>
      )}

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {searchResults.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
          >
            <ShoppingProductTile
              handleAddToCart={handleAddToCart}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
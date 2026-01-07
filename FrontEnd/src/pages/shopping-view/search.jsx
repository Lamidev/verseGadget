import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
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
import { Loader2, Search, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // Debounced search to reduce unnecessary dispatches
  const debouncedSearch = debounce((value) => {
    if (value.trim().length >= 1) {
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
    const value = event.target.value;
    setKeyword(value);
    debouncedSearch(value);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setKeyword("");
    setSearchParams(new URLSearchParams());
    dispatch(resetSearchResults());
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
          title: "Stock Limit reached",
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
        });
      }
    } catch (error) {
      toast({
        title: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  }

  // Handle product details fetching
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Sync keyword with URL on load
  useEffect(() => {
    const urlKeyword = searchParams.get("keyword");
    if (urlKeyword) {
      setKeyword(urlKeyword);
      dispatch(getSearchResults(urlKeyword));
    }
  }, []);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8 min-h-screen">
      {/* Search Header */}
      <div className="flex flex-col items-center mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-primary">Explore Gadgets</h1>
        <p className="text-muted-foreground max-w-lg mb-8">
          Search for your favorite phones, laptops, and accessories across GadgetsGrid.
        </p>

        <div className="w-full max-w-2xl relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-peach-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <Input
            value={keyword}
            name="keyword"
            onChange={handleSearchInputChange}
            className="py-7 pl-12 pr-12 text-lg rounded-2xl border-gray-200 focus:ring-4 focus:ring-peach-100 transition-all shadow-sm"
            placeholder="Type at least 1 character to start searching..."
          />
          {keyword.length > 0 && (
            <button
              onClick={handleClearSearch}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
              title="Clear search"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {searchResults.length > 0 && (
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold">Search Results ({searchResults.length.toLocaleString()})</h2>
          </div>
        )}

        {!searchResults.length && keyword.trim().length > 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-400">No results found for "{keyword}"</h3>
            <p className="text-muted-foreground">Try adjusting your search or check for spelling errors.</p>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          layout
        >
          {searchResults.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ShoppingProductTile
                handleAddToCart={handleAddToCart}
                product={item}
                handleGetProductDetails={handleGetProductDetails}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

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
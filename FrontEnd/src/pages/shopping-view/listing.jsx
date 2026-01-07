import { filterOptions } from "@/config";
import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getOrCreateSessionId } from "@/components/utils/session";

function createSearchParamsHelper(filterParams, minPrice, maxPrice) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => {
        queryParams.push(`${key}=${encodeURIComponent(item)}`);
      });
    }
  }

  if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
    queryParams.push(`minPrice=${minPrice}`);
  }

  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
    queryParams.push(`maxPrice=${maxPrice}`);
  }

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const categorySearchParams = searchParams.get("category");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [minimumLoaderTime, setMinimumLoaderTime] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  function handleSort(value) {
    setIsFilterLoading(true);
    setMinimumLoaderTime(true);
    setSort(value);

    // Auto-apply sort instantly
    dispatch(
      fetchAllFilteredProducts({
        filterParams: { ...filters, minPrice, maxPrice },
        sortParams: value
      })
    ).finally(() => {
      setTimeout(() => {
        setIsFilterLoading(false);
        setMinimumLoaderTime(false);
      }, 500);
    });
  }

  function handleFilter(getSectionId, getCurrentOption, checked) {
    let cpyFilters = { ...filters };

    if (getSectionId === "condition") {
      cpyFilters[getSectionId] = checked ? [getCurrentOption] : [];
    } else {
      const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
      if (indexOfCurrentSection === -1) {
        cpyFilters = {
          ...cpyFilters,
          [getSectionId]: [getCurrentOption],
        };
      } else {
        const indexOfCurrentOption =
          cpyFilters[getSectionId].indexOf(getCurrentOption);
        if (indexOfCurrentOption === -1) {
          cpyFilters[getSectionId].push(getCurrentOption);
        } else {
          cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handlePriceChange(type, value) {
    if (type === "min") setMinPrice(value);
    if (type === "max") setMaxPrice(value);
  }

  function handleResetFilters() {
    setFilters({});
    setMinPrice(0);
    setMaxPrice(5000000);
    sessionStorage.removeItem("filters");
    setSearchParams(new URLSearchParams());

    setIsFilterLoading(true);
    setMinimumLoaderTime(true);

    dispatch(
      fetchAllFilteredProducts({
        filterParams: { minPrice: 0, maxPrice: 5000000 },
        sortParams: sort
      })
    ).finally(() => {
      setTimeout(() => {
        setIsFilterLoading(false);
        setMinimumLoaderTime(false);
      }, 500);
    });
  }

  function handleApplyFilters() {
    setIsFilterLoading(true);
    setMinimumLoaderTime(true);
    const startTime = Date.now();

    // 1. Update URL Search Params
    const createQueryString = createSearchParamsHelper(filters, minPrice, maxPrice);
    setSearchParams(new URLSearchParams(createQueryString));

    // 2. Dispatch API Call
    dispatch(
      fetchAllFilteredProducts({
        filterParams: { ...filters, minPrice, maxPrice },
        sortParams: sort
      })
    ).finally(() => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, 500 - elapsed);

      setTimeout(() => {
        setIsFilterLoading(false);
        setMinimumLoaderTime(false);
        setIsMobileFilterOpen(false);
      }, remainingTime);
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
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
          description: `Only ${getTotalStock} units available in stock.`,
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsLoading(true);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setIsLoading(true);
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Handle category param from Home Page
  useEffect(() => {
    const sessionFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    const urlMin = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")) : 0;
    const urlMax = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")) : 5000000;

    setFilters(sessionFilters);
    setMinPrice(urlMin);
    setMaxPrice(urlMax);

    dispatch(
      fetchAllFilteredProducts({
        filterParams: { ...sessionFilters, minPrice: urlMin, maxPrice: urlMax },
        sortParams: sort
      })
    );
  }, [categorySearchParams]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList?.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productList?.length / productsPerPage);

  // Scroll to top on page change
  useEffect(() => {
    if (isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const timeout = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentPage, isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Global Filter/Sort Loader Overlay */}
      {(isFilterLoading || minimumLoaderTime) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-lg font-medium">Updating results...</span>
          </div>
        </div>
      )}



      <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter
          filters={filters}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
          isFilterLoading={isFilterLoading}
          minPrice={minPrice}
          maxPrice={maxPrice}
          handlePriceChange={handlePriceChange}
          handleResetFilters={handleResetFilters}
          handleApplyFilters={handleApplyFilters}
        />

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-background w-full rounded-lg shadow-sm"
        >
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground">{productList?.length}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center gap-1.5 border-peach-200 bg-peach-50/30 text-peach-700 hover:bg-peach-100 font-bold"
                disabled={isFilterLoading}
              >
                <ArrowUpDown className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    disabled={isFilterLoading}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                        disabled={isFilterLoading}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4"
            >
              {currentProducts?.length > 0 ? (
                currentProducts.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-muted-foreground">
                  No products found matching your filters.
                </div>
              )}
            </motion.div>
          )}

          {/* Pagination */}
          {productList?.length > productsPerPage && (
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-background border-t rounded-b-lg gap-3">
              <div className="w-full sm:w-auto">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                  Showing <span className="font-medium">{(currentPage - 1) * productsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * productsPerPage, productList?.length || 0)}
                  </span>{' '}
                  of <span className="font-medium">{productList?.length || 0}</span> results
                </p>
              </div>

              <div className="flex items-center justify-center w-full sm:w-auto space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || isLoading || isFilterLoading}
                  className="px-2 sm:px-3 py-1.5 rounded-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Previous</span>
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => !isLoading && handlePageChange(pageNum)}
                        disabled={isLoading || isFilterLoading}
                        className={`h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm ${currentPage === pageNum ? 'bg-primary text-primary-foreground' : ''
                          }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || isLoading || isFilterLoading}
                  className="px-2 sm:px-3 py-1.5 rounded-md"
                >
                  <span className="sr-only sm:not-sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </motion.div>
  );
}

export default ShoppingListing;
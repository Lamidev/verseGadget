

// import { filterOptions } from "@/config";
// import ProductFilter from "@/components/shopping-view/filter";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ArrowUpDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { sortOptions } from "@/config";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useSearchParams } from "react-router-dom";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/components/ui/use-toast";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// function createSearchParamsHelper(filterParams) {
//   const queryParams = [];
//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       value.forEach((item) => {
//         queryParams.push(`${key}=${encodeURIComponent(item)}`);
//       });
//     }
//   }
//   return queryParams.join("&");
// }

// function ShoppingListing() {
//   const dispatch = useDispatch();
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState(null);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const categorySearchParams = searchParams.get("category");
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isFilterLoading, setIsFilterLoading] = useState(false);
//   const [minimumLoaderTime, setMinimumLoaderTime] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(8);
//   const [isLoading, setIsLoading] = useState(false);

//   function handleSort(value) {
//     setIsFilterLoading(true);
//     setMinimumLoaderTime(true);
//     setSort(value);
//     setTimeout(() => setMinimumLoaderTime(false), 500);
//   }

//   function handleFilter(getSectionId, getCurrentOption, checked) {
//     setIsFilterLoading(true);
//     setMinimumLoaderTime(true);
    
//     let cpyFilters = { ...filters };

//     if (getSectionId === "condition") {
//       cpyFilters[getSectionId] = checked ? [getCurrentOption] : [];
//     } else {
//       const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
//       if (indexOfCurrentSection === -1) {
//         cpyFilters = {
//           ...cpyFilters,
//           [getSectionId]: [getCurrentOption],
//         };
//       } else {
//         const indexOfCurrentOption =
//           cpyFilters[getSectionId].indexOf(getCurrentOption);
//         if (indexOfCurrentOption === -1) {
//           cpyFilters[getSectionId].push(getCurrentOption);
//         } else {
//           cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
//         }
//       }
//     }
//     setFilters(cpyFilters);
//     sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
//     setTimeout(() => setMinimumLoaderTime(false), 500);
//   }

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   function handleAddToCart(getCurrentProductId, getTotalStock) {
//     if (!user) {
//       navigate("/auth/login");
//       toast({
//         title: "Please login to add items to the cart.",
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
//         toast({ title: "Product added to cart!" });
//       }
//     });
//   }

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setIsLoading(true);
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setIsLoading(true);
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setIsLoading(true);
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     setSort("price-lowtohigh");
//     setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
//   }, [categorySearchParams]);

//   useEffect(() => {
//     if (filters && Object.keys(filters).length > 0) {
//       const createQueryString = createSearchParamsHelper(filters);
//       setSearchParams(new URLSearchParams(createQueryString));
//     }
//   }, [filters, setSearchParams]);

//   useEffect(() => {
//     if (filters !== null && sort !== null) {
//       setIsFilterLoading(true);
//       setMinimumLoaderTime(true);
//       const startTime = Date.now();
      
//       dispatch(
//         fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
//       ).finally(() => {
//         const elapsed = Date.now() - startTime;
//         const remainingTime = Math.max(0, 500 - elapsed);
        
//         setTimeout(() => {
//           setIsFilterLoading(false);
//           setMinimumLoaderTime(false);
//           setIsMobileFilterOpen(false);
//         }, remainingTime);
//       });
//     }
//   }, [dispatch, sort, filters]);

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = productList?.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(productList?.length / productsPerPage);

//   // Scroll to top on page change
//   useEffect(() => {
//     if (isLoading) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       const timeout = setTimeout(() => setIsLoading(false), 1000);
//       return () => clearTimeout(timeout);
//     }
//   }, [currentPage, isLoading]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="relative"
//     >
//       {/* Global Filter/Sort Loader Overlay */}
//       {(isFilterLoading || minimumLoaderTime) && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
//             <Loader2 className="h-8 w-8 animate-spin text-primary" />
//             <span className="text-lg font-medium">Loading products...</span>
//           </div>
//         </div>
//       )}

//       {/* Mobile Filter Button */}
//       <div className="md:hidden fixed bottom-6 right-6 z-40">
//         <Button
//           size="lg"
//           className="rounded-full shadow-lg h-14 w-14"
//           onClick={() => setIsMobileFilterOpen(true)}
//           disabled={isFilterLoading}
//         >
//           {isFilterLoading ? (
//             <Loader2 className="h-5 w-5 animate-spin" />
//           ) : (
//             <ArrowUpDown className="h-5 w-5" />
//           )}
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
//         <ProductFilter 
//           filters={filters} 
//           handleFilter={handleFilter} 
//           filterOptions={filterOptions}
//           isMobileFilterOpen={isMobileFilterOpen}
//           setIsMobileFilterOpen={setIsMobileFilterOpen}
//           isFilterLoading={isFilterLoading}
//         />
        
//         <motion.div
//           initial={{ y: 10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//           className="bg-background w-full rounded-lg shadow-sm"
//         >
//           <div className="p-4 border-b flex items-center justify-between">
//             <h2 className="text-lg font-extrabold">All Products</h2>
//             <div className="flex items-center gap-3">
//               <span className="text-muted-foreground">{productList?.length}</span>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button 
//                     variant="outline" 
//                     size="sm" 
//                     className="flex items-center gap-1"
//                     disabled={isFilterLoading}
//                   >
//                     {isFilterLoading ? (
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                     ) : (
//                       <>
//                         <ArrowUpDown className="h-4 w-4" />
//                         <span>Sort by</span>
//                       </>
//                     )}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-[200px]">
//                   <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
//                     {sortOptions.map((sortItem) => (
//                       <DropdownMenuRadioItem 
//                         value={sortItem.id} 
//                         key={sortItem.id}
//                         disabled={isFilterLoading}
//                       >
//                         {sortItem.label}
//                       </DropdownMenuRadioItem>
//                     ))}
//                   </DropdownMenuRadioGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>

//           {isLoading ? (
//             <div className="flex items-center justify-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin" />
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4"
//             >
//               {currentProducts?.map((productItem) => (
//                 <ShoppingProductTile
//                   key={productItem.id}
//                   handleGetProductDetails={handleGetProductDetails}
//                   product={productItem}
//                   handleAddToCart={handleAddToCart}
//                 />
//               ))}
//             </motion.div>
//           )}

//           {/* Pagination */}
//           <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 bg-background border-t rounded-b-lg gap-3">
//             <div className="w-full sm:w-auto">
//               <p className="text-sm text-muted-foreground text-center sm:text-left">
//                 Showing <span className="font-medium">{(currentPage - 1) * productsPerPage + 1}</span> to{' '}
//                 <span className="font-medium">
//                   {Math.min(currentPage * productsPerPage, productList?.length || 0)}
//                 </span>{' '}
//                 of <span className="font-medium">{productList?.length || 0}</span> results
//               </p>
//             </div>
            
//             <div className="flex items-center justify-center w-full sm:w-auto space-x-1">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1 || isLoading || isFilterLoading}
//                 className="px-2 sm:px-3 py-1.5 rounded-md"
//               >
//                 {isLoading && currentPage > 1 ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <ChevronLeft className="h-4 w-4" />
//                 )}
//                 <span className="sr-only sm:not-sr-only">Previous</span>
//               </Button>
              
//               <div className="flex items-center space-x-1">
//                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                   let pageNum;
//                   if (totalPages <= 5) {
//                     pageNum = i + 1;
//                   } else if (currentPage <= 3) {
//                     pageNum = i + 1;
//                   } else if (currentPage >= totalPages - 2) {
//                     pageNum = totalPages - 4 + i;
//                   } else {
//                     pageNum = currentPage - 2 + i;
//                   }
                  
//                   return (
//                     <Button
//                       key={pageNum}
//                       variant={currentPage === pageNum ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => !isLoading && handlePageChange(pageNum)}
//                       disabled={isLoading || isFilterLoading}
//                       className={`h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm ${
//                         currentPage === pageNum ? 'bg-primary text-primary-foreground' : ''
//                       }`}
//                     >
//                       {pageNum}
//                     </Button>
//                   );
//                 })}
                
//                 {totalPages > 5 && currentPage < totalPages - 2 && (
//                   <>
//                     <span className="px-1 sm:px-2 text-sm text-muted-foreground">...</span>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => !isLoading && handlePageChange(totalPages)}
//                       disabled={isLoading || isFilterLoading}
//                       className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm"
//                     >
//                       {totalPages}
//                     </Button>
//                   </>
//                 )}
//               </div>
              
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages || isLoading || isFilterLoading}
//                 className="px-2 sm:px-3 py-1.5 rounded-md"
//               >
//                 <span className="sr-only sm:not-sr-only">Next</span>
//                 {isLoading && currentPage < totalPages ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <ChevronRight className="h-4 w-4" />
//                 )}
//               </Button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
      
//       <ProductDetailsDialog
//         open={openDetailsDialog}
//         setOpen={setOpenDetailsDialog}
//         productDetails={productDetails}
//       />
//     </motion.div>
//   );
// }

// export default ShoppingListing;

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

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((item) => {
        queryParams.push(`${key}=${encodeURIComponent(item)}`);
      });
    }
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
  const [sort, setSort] = useState(null);
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
  const [productsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  function handleSort(value) {
    setIsFilterLoading(true);
    setMinimumLoaderTime(true);
    setSort(value);
    setTimeout(() => setMinimumLoaderTime(false), 500);
  }

  function handleFilter(getSectionId, getCurrentOption, checked) {
    setIsFilterLoading(true);
    setMinimumLoaderTime(true);
    
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
    setTimeout(() => setMinimumLoaderTime(false), 500);
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
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParams]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      setIsFilterLoading(true);
      setMinimumLoaderTime(true);
      const startTime = Date.now();
      
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
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
  }, [dispatch, sort, filters]);

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
            <span className="text-lg font-medium">Loading products...</span>
          </div>
        </div>
      )}

      {/* Mobile Filter Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Button
          size="lg"
          className="rounded-full shadow-lg h-14 w-14"
          onClick={() => setIsMobileFilterOpen(true)}
          disabled={isFilterLoading}
        >
          {isFilterLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <ArrowUpDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
        <ProductFilter 
          filters={filters} 
          handleFilter={handleFilter} 
          filterOptions={filterOptions}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsMobileFilterOpen={setIsMobileFilterOpen}
          isFilterLoading={isFilterLoading}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    disabled={isFilterLoading}
                  >
                    {isFilterLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <ArrowUpDown className="h-4 w-4" />
                        <span>Sort by</span>
                      </>
                    )}
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
              {currentProducts?.map((productItem) => (
                <ShoppingProductTile
                  key={productItem.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
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
                {isLoading && currentPage > 1 ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
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
                      className={`h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm ${
                        currentPage === pageNum ? 'bg-primary text-primary-foreground' : ''
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-1 sm:px-2 text-sm text-muted-foreground">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => !isLoading && handlePageChange(totalPages)}
                      disabled={isLoading || isFilterLoading}
                      className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoading || isFilterLoading}
                className="px-2 sm:px-3 py-1.5 rounded-md"
              >
                <span className="sr-only sm:not-sr-only">Next</span>
                {isLoading && currentPage < totalPages ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
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
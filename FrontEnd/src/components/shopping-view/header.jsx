

// import { LogOut, Menu, ShoppingCart, User, Search } from "lucide-react";
// import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { shoppingViewHeaderMenuItems } from "@/config";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuContent,
// } from "../ui/dropdown-menu";
// import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Label } from "../ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "../ui/dialog";
// import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

// function MenuItems({ closeSheet }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   function handleNavigate(getCurrentMenuItem) {
//     sessionStorage.removeItem("filters");

//     if (
//       getCurrentMenuItem.id !== "home" &&
//       getCurrentMenuItem.id !== "products" &&
//       getCurrentMenuItem.id !== "about"
//     ) {
//       const currentFilter = { category: [getCurrentMenuItem.id] };
//       sessionStorage.setItem("filters", JSON.stringify(currentFilter));

//       if (location.pathname.includes("listing")) {
//         setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
//         return;
//       }
//     }

//     navigate(getCurrentMenuItem.path);
//     closeSheet();
//   }

//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderMenuItems.map((menuItem) => (
//         <div key={menuItem.id} className="relative">
//           <Label
//             onClick={() => handleNavigate(menuItem)}
//             className="text-sm font-medium cursor-pointer flex items-center gap-2 pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
//           >
//             {menuItem.label}
//           </Label>
//         </div>
//       ))}
//     </nav>
//   );
// }

// function HeaderRightContent({ closeSheet }) {
//   const { user } = useSelector((state) => state.auth);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   function handleLogout() {
//     dispatch(logoutUser());
//     setIsLogoutDialogOpen(false);
//     closeSheet();
//   }

//   useEffect(() => {
//     if (user?.Id) {
//       dispatch(fetchCartItems());
//     }
//   }, [dispatch, user?.Id]);

//   return (
//     <div className="flex items-center gap-4">
//       <Button
//         onClick={() => {
//           navigate("/shop/search");
//           closeSheet();
//         }}
//         variant="outline"
//         size="icon"
//         className="relative"
//       >
//         <Search className="w-6 h-6" />
//       </Button>

//       <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//         <Button
//           onClick={() => setOpenCartSheet(true)}
//           variant="outline"
//           size="icon"
//           className="relative"
//         >
//           <ShoppingCart className="w-6 h-6" />
//           {cartItems?.length > 0 && (
//             <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
//               {cartItems.length}
//             </span>
//           )}
//         </Button>
//         <UserCartWrapper
//           setOpenCartSheet={setOpenCartSheet}
//           cartItems={cartItems?.length > 0 ? cartItems : []}
//         />
//       </Sheet>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Avatar className="bg-black cursor-pointer">
//             <AvatarFallback className="bg-primary text-white font-bold">
//               {user?.userName ? user?.userName[0].toUpperCase() : "U"}
//             </AvatarFallback>
//           </Avatar>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent side="right" className="w-56">
//           {user?.userName ? (
//             <>
//               <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => {
//                   navigate("/shop/account");
//                   closeSheet();
//                 }}
//               >
//                 <User className="mr-2 h-4 w-4" /> Account
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>
//                 <LogOut className="mr-2 h-4 w-4" /> Logout
//               </DropdownMenuItem>
//             </>
//           ) : (
//             <DropdownMenuItem
//               onClick={() => {
//                 navigate("/auth/login");
//                 closeSheet();
//               }}
//             >
//               <User className="mr-2 h-4 w-4" /> Login
//             </DropdownMenuItem>
//           )}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Logout</DialogTitle>
//           </DialogHeader>
//           <p>Are you sure you want to log out?</p>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleLogout}>
//               Logout
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// function ShoppingHeader() {
//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const navigate = useNavigate();

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 shadow-md">
//       <div className="flex h-16 items-center justify-between px-4 md:px-6">
//         <div className="flex items-center gap-3">
//           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="lg:hidden">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="left" className="flex flex-col h-full justify-between p-6">
//               <div className="flex flex-col gap-6">
//                 <div className="flex items-center gap-2 mb-4">
//                   <img
//                     src={GadgetgridLogo}
//                     alt="GadgetGrid Logo"
//                     className="h-10 w-10 rounded-md"
//                   />
//                   <span className="text-xl font-extrabold text-gray-900 tracking-tight">
//                     Gadget<span className="text-primary">Grid</span>
//                   </span>
//                 </div>

//                 <MenuItems closeSheet={() => setIsSheetOpen(false)} />
//               </div>

//               <div className="flex flex-col gap-3 mt-6">
//                 <Button
//                   variant="default"
//                   onClick={() => {
//                     navigate("/auth/login");
//                     setIsSheetOpen(false);
//                   }}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     navigate("/auth/register");
//                     setIsSheetOpen(false);
//                   }}
//                 >
//                   Register
//                 </Button>
//               </div>
//             </SheetContent>
//           </Sheet>

//           <Link to="/shop/home" className="flex items-center gap-2">
//             <img
//               src={GadgetgridLogo}
//               alt="GadgetGrid Logo"
//               className="h-10 w-10 rounded-md"
//             />
//             <span className="text-xl font-extrabold text-gray-900 tracking-tight">
//               Gadgets<span className="text-primary">Grid</span>
//             </span>
//           </Link>
//         </div>

//         <div className="flex items-center gap-2 lg:hidden">
//           <Button variant="outline" size="icon" onClick={() => navigate("/shop/search")}>
//             <Search className="h-5 w-5" />
//           </Button>
          
//           <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
//             <Button
//               onClick={() => setOpenCartSheet(true)}
//               variant="outline"
//               size="icon"
//               className="relative"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {cartItems?.length > 0 && (
//                 <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
//                   {cartItems.length}
//                 </span>
//               )}
//             </Button>
//             <UserCartWrapper
//               setOpenCartSheet={setOpenCartSheet}
//               cartItems={cartItems?.length > 0 ? cartItems : []}
//             />
//           </Sheet>
//         </div>

//         <div className="hidden lg:flex flex-1 justify-center">
//           <MenuItems closeSheet={() => setIsSheetOpen(false)} />
//         </div>

//         <div className="hidden lg:flex items-center gap-4">
//           <HeaderRightContent closeSheet={() => setIsSheetOpen(false)} />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default ShoppingHeader;

import { LogOut, Menu, ShoppingCart, User, Search } from "lucide-react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { logoutUser, directLogout } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

function MenuItems({ closeSheet }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    if (
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "about"
    ) {
      const currentFilter = { category: [getCurrentMenuItem.id] };
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));

      if (location.pathname.includes("listing")) {
        setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
        return;
      }
    }

    navigate(getCurrentMenuItem.path);
    closeSheet();
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <div key={menuItem.id} className="relative">
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer flex items-center gap-2 pb-1 hover:text-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            {menuItem.label}
          </Label>
        </div>
      ))}
    </nav>
  );
}

function HeaderRightContent({ closeSheet }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    // Use direct logout for immediate response
    dispatch(directLogout());
    setIsLogoutDialogOpen(false);
    closeSheet();
    navigate("/shop/home");
    
    // Still try the API logout but don't wait for it
    dispatch(logoutUser()).catch(error => {
      console.error("Background logout error:", error);
    });
  }

  useEffect(() => {
    if (user?.Id) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, user?.Id]);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => {
          navigate("/shop/search");
          closeSheet();
        }}
        variant="outline"
        size="icon"
        className="relative"
      >
        <Search className="w-6 h-6" />
      </Button>

      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems?.length > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
              {cartItems.length}
            </span>
          )}
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.length > 0 ? cartItems : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="bg-primary text-white font-bold">
              {user?.userName ? user?.userName[0].toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          {user?.userName ? (
            <>
              <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigate("/shop/account");
                  closeSheet();
                }}
              >
                <User className="mr-2 h-4 w-4" /> Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsLogoutDialogOpen(true)}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                navigate("/auth/login");
                closeSheet();
              }}
            >
              <User className="mr-2 h-4 w-4" /> Login
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to log out?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ShoppingHeader() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 shadow-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col h-full justify-between p-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={GadgetgridLogo}
                    alt="GadgetGrid Logo"
                    className="h-10 w-10 rounded-md"
                  />
                  <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Gadget<span className="text-primary">Grid</span>
                  </span>
                </div>

                <MenuItems closeSheet={() => setIsSheetOpen(false)} />
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <Button
                  variant="default"
                  onClick={() => {
                    navigate("/auth/login");
                    setIsSheetOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate("/auth/register");
                    setIsSheetOpen(false);
                  }}
                >
                  Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/shop/home" className="flex items-center gap-2">
            <img
              src={GadgetgridLogo}
              alt="GadgetGrid Logo"
              className="h-10 w-10 rounded-md"
            />
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">
              Gadgets<span className="text-primary">Grid</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="outline" size="icon" onClick={() => navigate("/shop/search")}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
            <Button
              onClick={() => setOpenCartSheet(true)}
              variant="outline"
              size="icon"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItems?.length > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Button>
            <UserCartWrapper
              setOpenCartSheet={setOpenCartSheet}
              cartItems={cartItems?.length > 0 ? cartItems : []}
            />
          </Sheet>
        </div>

        <div className="hidden lg:flex flex-1 justify-center">
          <MenuItems closeSheet={() => setIsSheetOpen(false)} />
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <HeaderRightContent closeSheet={() => setIsSheetOpen(false)} />
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
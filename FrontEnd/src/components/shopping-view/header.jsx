import { LogOut, Menu, ShoppingCart, User, Search, Instagram, Facebook, Twitter, PhoneCall } from "lucide-react";
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
        <div key={menuItem.id} className="relative group">
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-xs uppercase tracking-widest font-black cursor-pointer flex items-center gap-2 pb-1 text-gray-900 hover:text-peach-500 transition-all after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-peach-500 after:transition-all after:duration-300 group-hover:after:w-full"
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
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-peach-50 text-gray-900 hover:text-peach-600 transition-all"
      >
        <Search className="w-5 h-5" />
      </Button>

      <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-peach-50 text-gray-900 hover:text-peach-600 transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItems?.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-peach-600 text-white text-[10px] font-black shadow-sm ring-2 ring-white">
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

function MobileSheetContent({ closeSheet }) {
  const { user } = useSelector((state) => state.auth);
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

  return (
    <SheetContent side="left" className="flex flex-col h-full justify-between p-6 bg-white border-r-0">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border-2 border-primary/20 p-0.5">
            <img
              src={GadgetgridLogo}
              alt="GadgetGrid Logo"
              className="h-10 w-10 object-cover rounded-lg"
            />
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tighter uppercase">
            Gadget<span className="text-primary">Grid</span>
          </span>
        </div>

        <MenuItems closeSheet={closeSheet} />

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest pl-1">Connect with us</p>
          <div className="flex items-center gap-4 pl-1">
            <Facebook className="w-5 h-5 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-700 hover:text-pink-600 transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-700 hover:text-blue-400 transition-colors cursor-pointer" />
            <PhoneCall className="w-5 h-5 text-gray-700 hover:text-green-600 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        {user?.userName ? (
          <>
            <div className="flex items-center gap-3 p-4 bg-peach-50 rounded-2xl mb-2 border border-peach-100">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarFallback className="bg-peach-600 text-white text-sm font-bold">
                  {user?.userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-xs font-bold text-peach-600 uppercase tracking-tighter">Verified User</p>
                <p className="text-sm font-black text-gray-900 truncate max-w-[150px]">{user.userName}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => {
                navigate("/shop/account");
                closeSheet();
              }}
              className="justify-start rounded-xl hover:bg-gray-100 font-bold"
            >
              <User className="mr-3 h-4 w-4 text-peach-600" />
              My Account
            </Button>

            <Button
              variant="ghost"
              onClick={() => setIsLogoutDialogOpen(true)}
              className="justify-start rounded-xl hover:bg-red-50 text-red-600 font-bold"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Button
              className="rounded-xl font-bold bg-gray-900 hover:bg-gray-800 text-white"
              onClick={() => {
                navigate("/auth/login");
                closeSheet();
              }}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="rounded-xl font-bold border-gray-200 hover:bg-gray-50"
              onClick={() => {
                navigate("/auth/register");
                closeSheet();
              }}
            >
              Register
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="rounded-3xl max-w-[90vw] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-center">Confirm Sign Out</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center text-gray-500 font-medium">
            Are you sure you want to end your session? We'll be here when you get back.
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="rounded-xl font-bold order-2 sm:order-1" onClick={() => setIsLogoutDialogOpen(false)}>
              Stay Logged In
            </Button>
            <Button variant="destructive" className="rounded-xl font-bold bg-red-600 hover:bg-red-700 order-1 sm:order-2" onClick={handleLogout}>
              Yes, Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SheetContent>
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

            <MobileSheetContent closeSheet={() => setIsSheetOpen(false)} />
          </Sheet>

          <Link to="/shop/home" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 p-0.5 group-hover:border-primary/50 transition-colors">
              <img
                src={GadgetgridLogo}
                alt="GadgetGrid Logo"
                className="h-10 w-10 object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="text-lg leading-tight font-black text-gray-900 tracking-tighter uppercase">
                Gadgets<span className="text-primary">Grid</span>
              </span>
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest -mt-1">Premium Store</span>
            </div>
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
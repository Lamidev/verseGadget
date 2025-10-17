

import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";
import { FaWhatsapp } from "react-icons/fa";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Common header */}
      <ShoppingHeader />

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Outlet />
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2349025765871?text=Hi,%20I%20would%20love%20to%20place%20an%20order"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center gap-2"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Common Footer */}
      <Footer />
    </div>
  );
};

export default ShoppingLayout;

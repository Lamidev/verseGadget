

import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

function AuthLayout() {
  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Mobile: Logo above the form */}
      <motion.div
        className="lg:hidden flex flex-col items-center justify-center w-full px-6 py-8 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Website Logo */}
        <div className="flex items-center justify-center mb-4">
          <img 
            src={GadgetgridLogo} 
            alt="Gadget Grid" 
            className="w-16 h-16 object-contain rounded-lg"
          />
        </div>
        
        {/* Tagline */}
        <motion.p 
          className="text-gray-600 text-center text-lg font-medium max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Your one stop shop for quality and affordable gadgets
        </motion.p>
      </motion.div>

      {/* Desktop: Left Panel with Logo and Description */}
      <motion.div
        className="hidden lg:flex flex-col items-center justify-center w-1/2 px-12 py-8"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        {/* Logo Container */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Website Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={GadgetgridLogo} 
              alt="Gadget Grid" 
              className="w-32 h-32 object-contain rounded-xl"
            />
          </div>
          
          {/* Tagline */}
          <motion.h2 
            className="text-2xl font-bold text-gray-800 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your one stop shop for quality and affordable gadgets
          </motion.h2>
        </motion.div>
      </motion.div>

      {/* Right Panel for Content (Login, Register, etc.) */}
      <motion.div
        className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8 w-full"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}

export default AuthLayout;
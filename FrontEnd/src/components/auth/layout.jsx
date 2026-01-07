

import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

function AuthLayout() {
  return (
    <motion.div
      className="min-h-screen bg-[#fafafa] flex flex-col lg:flex-row items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-peach-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-100 rounded-full blur-[120px] opacity-60" />
      <div className="absolute top-[20%] right-[10%] w-[15%] h-[15%] bg-blue-50 rounded-full blur-[80px] opacity-40" />

      {/* Mobile: Logo above the form */}
      <motion.div
        className="lg:hidden flex flex-col items-center justify-center w-full px-6 py-8 relative z-10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-peach-100 mb-6 border border-peach-50">
          <img
            src={GadgetgridLogo}
            alt="Gadget Grid"
            className="w-16 h-16 object-contain rounded-xl"
          />
        </div>
        <motion.p
          className="text-gray-900 text-center text-lg font-black max-w-xs uppercase tracking-tight leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Gadgets <span className="text-peach-500">Grid</span>
        </motion.p>
        <p className="text-gray-500 text-xs font-bold mt-2 uppercase tracking-[0.2em]">Premium Tech Store</p>
      </motion.div>

      {/* Desktop: Left Panel with Logo and Description */}
      <motion.div
        className="hidden lg:flex flex-col items-center justify-center w-1/2 px-12 py-4 relative z-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-peach-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
          <motion.div
            className="bg-white p-6 rounded-[2.5rem] shadow-2xl relative z-20 border border-white/50"
            whileHover={{ y: -5, rotate: -2 }}
          >
            <img
              src={GadgetgridLogo}
              alt="Gadget Grid"
              className="w-40 h-40 object-contain rounded-3xl"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">
            Gadgets <span className="text-peach-500">Grid.</span>
          </h1>
          <p className="text-gray-500 text-sm font-black uppercase tracking-[0.3em] mb-8">Elevate Your Tech Game</p>
          <p className="text-gray-700 text-xl font-medium max-w-sm mx-auto leading-relaxed border-l-4 border-peach-500 pl-6 text-left italic">
            "Your one stop shop for quality and affordable gadgets that match your lifestyle."
          </p>
        </motion.div>
      </motion.div>

      {/* Right Panel for Content (Login, Register, etc.) */}
      <motion.div
        className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8 w-full relative z-20"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AuthLayout;
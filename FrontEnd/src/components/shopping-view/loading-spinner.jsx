import { motion } from "framer-motion";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <motion.div
        className="flex items-center justify-center"
        animate={{ 
          scale: [1, 1.1, 1] // More subtle zoom effect
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.5, 1] // Controls the timing of each keyframe
        }}
      >
        <img 
          src={GadgetgridLogo} 
          alt="GadgetGrid Logo" 
          className="w-32 h-32 object-contain rounded-lg" // Added rounded corners for better appearance
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Lock, Loader } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "@/store/auth-slice";
// import { loginFormControls } from "@/config";

// function AuthLogin() {
//   const initialState = { email: "", password: "" };
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Get authentication state from Redux
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   function onSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);

//     dispatch(loginUser(formData))
//       .then((data) => {
//         setIsLoading(false);
//         if (data?.payload?.success) {
//           toast({ title: data?.payload?.message || "Login successful!" });
//           setFormData(initialState); // Clear form on success
//         } else {
//           toast({
//             title: data?.payload?.message || "Login failed. Please try again.",
//             variant: "destructive",
//           });
//         }
//       })
//       .catch(() => {
//         setIsLoading(false);
//         setError("An error occurred. Please try again.");
//       });
//   }

//   // Redirect when authenticated
//   // useEffect(() => {
//   //   if (isAuthenticated) {
//   //     navigate(user?.role === "admin" ? "/admin/dashboard" : "/shop/home");
//   //   }
//   // }, [isAuthenticated, user, navigate]);

//   useEffect(() => {
//     console.log("Auth state changed:", isAuthenticated, user);
//     if (isAuthenticated && user) {
//       navigate(user.role === "admin" ? "/admin/dashboard" : "/shop/home");
//     }
//   }, [isAuthenticated, user, navigate]);
  

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto"
//     >
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
//           Welcome Back
//         </h2>

//         <CommonForm
//           formControls={loginFormControls}
//           buttonText={isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />

//         {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

//         <div className="flex items-center justify-between mt-6">
//           <Link to="/auth/forgot-password" className="text-sm text-white hover:underline">
//             Forgot password?
//           </Link>
//           <p className="text-sm text-white">
//             Don't have an account?{" "}
//             <Link to="/auth/register" className="text-white hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default AuthLogin;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { loginFormControls } from "@/config";

function AuthLogin() {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      
      if (result?.success) {
        toast({ 
          title: "Login successful!",
          description: "Welcome back!"
        });
        
        setFormData(initialState);
      } else {
        toast({
          title: result?.message || "Login failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error || "An error occurred. Please try again.");
      toast({
        title: error || "Login failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      const fromCheckout = sessionStorage.getItem('fromCheckout');
      
      if (fromCheckout) {
        sessionStorage.removeItem('fromCheckout');
        navigate("/shop/checkout");
      } else {
        navigate(user.role === "admin" ? "/admin/dashboard" : "/shop/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mx-auto"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto" /> : "Login"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />

        {error && (
          <p className="text-red-500 text-sm font-semibold mb-2 text-center mt-4">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-6">
          <Link 
            to="/auth/forgot-password" 
            className="text-sm text-white hover:underline transition-colors"
          >
            Forgot password?
          </Link>
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link 
              to="/auth/register" 
              className="text-white hover:underline font-medium transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthLogin;
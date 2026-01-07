import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast"; // For showing messages
import { registerFormControls } from "@/config"; // Fields to show in the form
import { registerUser } from "@/store/auth-slice"; // Action to save the user info
import { useState } from "react"; // To keep track of form data
import { useDispatch } from "react-redux"; // To call actions
import { Link, useNavigate } from "react-router-dom"; // For navigation
import { Loader, Lock, Mail, User } from "lucide-react"; // Icons for the inputs
import PasswordStrengthMeter from "@/components/common/password-strength-meter"; // Password Strength Meter
import CommonForm from "@/components/common/form"; // The form where the user types

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/verify-email");
        setFormData(initialState);
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-md space-y-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
          Create Account
        </h2>

        <CommonForm
          formControls={registerFormControls}
          buttonText="Sign Up"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />

        <PasswordStrengthMeter password={formData.password} />
      </div>
      <div className="px-6 py-3 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-white">
          Already have an account?{" "}
          <Link to={"/auth/login"} className="text-white hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}


export default AuthRegister;

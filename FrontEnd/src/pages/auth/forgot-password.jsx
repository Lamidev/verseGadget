import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../store/auth-slice/index';
import { useToast } from '@/components/ui/use-toast';
import { Mail, ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CommonForm from '@/components/common/form';

const forgotPasswordControls = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
];

function ForgotPasswordPage() {
  const [formData, setFormData] = useState({ email: "" });
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast({ title: "Error", description: "Email is required!", variant: "destructive" });
      return;
    }
    try {
      const response = await dispatch(forgotPassword({ email: formData.email })).unwrap();
      toast({ title: "Success", description: response.message, variant: "success" });
      setIsSubmitted(true);
    } catch (err) {
      toast({ title: "Error", description: error || "Failed to send reset password email", variant: "destructive" });
    }
  };

  return (
    <motion.div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-white to-white text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <CommonForm
            formControls={forgotPasswordControls}
            buttonText="Send Reset Link"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isBtnDisabled={isLoading}
          />
        ) : (
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gray-300">
              Check your email for a password reset link.
            </motion.div>
          </div>
        )}
      </div>
      <div className="px-6 py-3 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link to={"/auth/login"} className="text-white hover:underline flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
}


export default ForgotPasswordPage;

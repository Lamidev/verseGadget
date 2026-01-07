import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaCode,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/common/newsletter/subscribe`, { email });
      if (response.data.success) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to subscribe!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // WhatsApp message for developer
  const developerWhatsAppMessage = "Hello! I came across your portfolio from the Gadget Grid website and I'm interested in discussing a project with you.";

  // URL encode the message for WhatsApp
  const encodedMessage = encodeURIComponent(developerWhatsAppMessage);
  const developerWhatsAppUrl = `https://wa.me/+2347056501913?text=${encodedMessage}`;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-white text-gray-900 pt-16 pb-8 mt-auto border-t border-gray-200 shadow-sm overflow-hidden relative"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-peach-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-peach-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16 p-8 sm:p-12 rounded-[2.5rem] bg-gray-900 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-peach-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Stay in the <span className="text-peach-500">Loop</span>
              </h2>
              <p className="text-gray-400 font-medium max-w-sm">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md items-center space-x-2 bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-none text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="bg-peach-500 hover:bg-peach-600 text-white rounded-xl font-bold px-6 shadow-lg shadow-peach-500/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <>
                    <span className="hidden sm:inline">Subscribe</span>
                    <Send className="sm:ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="flex flex-col items-center md:items-start space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={GadgetgridLogo}
                  alt="Gadget Grid Logo"
                  width={160}
                  height={40}
                  className="object-contain filter brightness-110 contrast-110 drop-shadow-sm"
                />
              </motion.div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Welcome to GADGETS GRID Phone and accessories, your African one stop shop
                for the latest and greatest in tech. Quality gadgets, trusted service.
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Us</h2>
              <ul className="text-gray-600 space-y-3">
                <motion.li
                  className="flex items-center justify-center md:justify-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FaEnvelope className="w-4 h-4 mr-3 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <a
                    href="mailto:gadgetsgridphones@gmail.com"
                    className="hover:text-gray-800 transition-colors text-sm"
                  >
                    gadgetsgridphones@gmail.com
                  </a>
                </motion.li>
                <motion.li
                  className="flex items-center justify-center md:justify-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FaPhone className="w-4 h-4 mr-3 text-green-600 group-hover:text-green-700 transition-colors" />
                  <a
                    href="tel:+2349025765871"
                    className="hover:text-gray-800 transition-colors text-sm"
                  >
                    <div>07047005444</div>
                    <div>09025765871</div>
                  </a>
                </motion.li>
                <motion.li
                  className="flex items-start justify-center md:justify-start group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <FaMapMarkerAlt className="w-4 h-4 mr-3 text-red-600 group-hover:text-red-700 transition-colors mt-1 flex-shrink-0" />
                  <span className="text-gray-600 text-sm text-left">
                    Platinum Plaza Shop B15, 9 Ola-Ayeni Street<br />
                    Computer Village, Ikeja, Lagos.
                  </span>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-1"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Follow Us</h2>
              <div className="flex justify-center md:justify-start space-x-3">
                {[
                  { icon: FaFacebook, href: "https://facebook.com", color: "hover:text-blue-600" },
                  { icon: FaTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
                  { icon: FaInstagram, href: "https://instagram.com", color: "hover:text-pink-600" },
                  { icon: FaWhatsapp, href: "https://wa.me/2349025765871", color: "hover:text-green-600" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-gray-600 ${social.color} hover:bg-gray-100 rounded-full transition-all duration-300`}
                      >
                        <social.icon className="w-5 h-5" />
                      </Button>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Accordion Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-1"
          >
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Support</h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="return-policy" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-gray-900 font-semibold hover:no-underline hover:text-gray-700 py-3">
                    Return Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm pb-3">
                    We offer a 7-day return policy for all products. If you're not satisfied with your purchase, you can return it in its original condition for an exchange.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="delivery-info" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-gray-900 font-semibold hover:no-underline hover:text-gray-700 py-3">
                    Delivery Information
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm pb-3">
                    Our delivery time is <strong>2-3 business days</strong>. We ensure quick and secure shipping so you receive your gadgets in top condition. Tracking details will be provided once your order is shipped.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="terms" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-gray-900 font-semibold hover:no-underline hover:text-gray-700 py-3">
                    Terms & Conditions
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm pb-3">
                    By using our website, you agree to our terms and conditions. All products are subject to availability. Prices may vary without notice.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </motion.div>
        </div>

        {/* Main Separator */}
        <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Copyright Section */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} GADGET GRID. All rights reserved.
          </p>
        </div>

        {/* Developer Credit Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="border-t border-gray-200 pt-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaCode className="w-4 h-4" />
              <span>Developed with ❤️ by</span>
              <motion.span
                className="font-semibold text-gray-700"
                whileHover={{ color: "#2563eb" }}
                transition={{ duration: 0.2 }}
              >
                Lamidev
              </motion.span>
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                href="https://www.linkedin.com/in/akinyemi-oluwatosin-95519130b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/thisslami?igsh=MWRtNmwydnBzbnhuaw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors text-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="w-4 h-4" />
                <span>Instagram</span>
              </motion.a>

              <motion.a
                href={developerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                title="Contact developer on WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
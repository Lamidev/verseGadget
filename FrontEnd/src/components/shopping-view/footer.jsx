// import { motion } from "framer-motion";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaWhatsapp,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
// } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

// const Footer = () => {
//   return (
//     <motion.footer
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white text-gray-900 py-8 mt-auto border-t border-gray-200"
//     >
//       <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
//         {/* About Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="md:col-span-1"
//         >
//           <div className="flex flex-col items-center md:items-start space-y-4">
//             <img
//               src={GadgetgridLogo}
//               alt="Gadget Grid Logo"
//               width={140}
//               height={35}
//               className="object-contain filter brightness-110 contrast-110"
//             />
//             <p className="text-sm text-gray-600 leading-relaxed">
//               Welcome to GADGETS GRID Phone and accessories, your African one stop shop
//               for the latest and greatest in tech.
//             </p>
//           </div>
//         </motion.div>

//         {/* Contact Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="md:col-span-1"
//         >
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
//             <ul className="text-gray-600 space-y-3">
//               <li className="flex items-center justify-center md:justify-start">
//                 <FaEnvelope className="w-5 h-5 mr-2 text-gray-700" />
//                 <a
//                   href="mailto:gadgetsgridphones@gmail.com"
//                   className="hover:text-gray-800 transition"
//                 >
//                   gadgetsgridphones@gmail.com
//                 </a>
//               </li>
//               <li className="flex items-center justify-center md:justify-start">
//                 <FaPhone className="w-5 h-5 mr-2 text-gray-700" />
//                 <a
//                   href="tel:+2349025765871"
//                   className="hover:text-gray-800 transition"
//                 >
//                   07047005444
//                   <br />
//                   09025765871
//                 </a>
//               </li>
//               <li className="flex items-center justify-center md:justify-start">
//                 <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-700" />
//                 <span className="text-gray-600">
//                   Platinum Plaza Shop B15 9 Ola-Ayeni Street Computer Village
//                   ikeja Lagos.
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </motion.div>

//         {/* Social Media Links */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//           className="md:col-span-1"
//         >
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
//             <div className="flex justify-center md:justify-start space-x-2">
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <FaFacebook className="w-6 h-6" />
//                 </Button>
//               </a>
//               <a
//                 href="https://twitter.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <FaTwitter className="w-6 h-6" />
//                 </Button>
//               </a>
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <FaInstagram className="w-6 h-6" />
//                 </Button>
//               </a>
//               <a
//                 href="https://wa.me/2349025765871"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
//                 >
//                   <FaWhatsapp className="w-6 h-6" />
//                 </Button>
//               </a>
//             </div>
//           </div>
//         </motion.div>

//         {/* Accordion Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.8 }}
//           className="md:col-span-1"
//         >
//           <div>
//             <Accordion type="single" collapsible>
//               <AccordionItem value="return-policy">
//                 <AccordionTrigger className="text-gray-900 font-bold hover:no-underline hover:text-gray-700">
//                   Return Policy
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-600">
//                   <p>
//                     We offer a 7-day return policy for all products. If you're not satisfied with your purchase, you can return it in its original condition for a exchange.
//                   </p>
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="delivery-info">
//                 <AccordionTrigger className="text-gray-900 font-bold hover:no-underline hover:text-gray-700">
//                   Delivery Information
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-600">
//                   <p>
//                     Our delivery time is <strong>2-3 business days</strong>. We ensure quick and secure shipping so you receive your gadgets in top condition. Tracking details will be provided once your order is shipped.
//                   </p>
//                 </AccordionContent>
//               </AccordionItem>

//               <AccordionItem value="terms">
//                 <AccordionTrigger className="text-gray-900 font-bold hover:no-underline hover:text-gray-700">
//                   Terms and Conditions
//                 </AccordionTrigger>
//                 <AccordionContent className="text-gray-600">
//                   <p>
//                     By using our website, you agree to our terms and conditions. All products are subject to availability.
//                   </p>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//         </motion.div>
//       </div>

//       {/* Separator and Copyright */}
//       <Separator className="my-8 bg-gray-300" />
//       <p className="text-center text-gray-500 text-sm">
//         &copy; {new Date().getFullYear()} GADGET GRID. All rights reserved.
//       </p>
//     </motion.footer>
//   );
// };

// export default Footer;

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
  FaGithub,
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
import GadgetgridLogo from "../../assets/Gadgetgrid.jpg";

const Footer = () => {
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
      className="bg-gradient-to-br from-gray-50 to-white text-gray-900 py-12 mt-auto border-t border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left mb-8">
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
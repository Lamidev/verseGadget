import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
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
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-gray-900 py-8 mt-auto border-t border-gray-200"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-1"
        >
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src={GadgetgridLogo}
              alt="Gadget Grid Logo"
              width={140}
              height={35}
              className="object-contain filter brightness-110 contrast-110"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              Welcome to GADGETS GRID Phone and accessories, your go-to place
              for the latest and greatest in tech.
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
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="w-5 h-5 mr-2 text-gray-700" />
                <a
                  href="mailto:gadgetsgridphones@gmail.com"
                  className="hover:text-gray-800 transition"
                >
                  gadgetsgridphones@gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaPhone className="w-5 h-5 mr-2 text-gray-700" />
                <a
                  href="tel:+2349025765871"
                  className="hover:text-gray-800 transition"
                >
                  07047005444
                  <br />
                  09025765871
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-700" />
                <span className="text-gray-600">
                  Platinum Plaza Shop B15 9 Ola-Ayeni Street Computer Village
                  ikeja Lagos.
                </span>
              </li>
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
            <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FaFacebook className="w-6 h-6" />
                </Button>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FaTwitter className="w-6 h-6" />
                </Button>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FaInstagram className="w-6 h-6" />
                </Button>
              </a>
              <a
                href="https://wa.me/2349025765871"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </Button>
              </a>
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
            <Accordion type="single" collapsible>
              <AccordionItem value="return-policy">
                <AccordionTrigger className="text-gray-900 font-bold hover:no-underline hover:text-gray-700">
                  Return Policy
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p>
                    We offer a 7-day return policy for all products. If you're not satisfied with your purchase, you can return it in its original condition for a exchange.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery-info">
                <AccordionTrigger className="text-gray-900 font-bold hover:no-underline hover:text-gray-700">
                  Delivery Information
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p>
                    Our delivery time is <strong>2-3 business days</strong>. We ensure quick and secure shipping so you receive your gadgets in top condition. Tracking details will be provided once your order is shipped.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="terms">
                <AccordionTrigger className="text-gray-900 font-bold hover:no-underline hover:text-gray-700">
                  Terms and Conditions
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <p>
                    By using our website, you agree to our terms and conditions. All products are subject to availability.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.div>
      </div>

      {/* Separator and Copyright */}
      <Separator className="my-8 bg-gray-300" />
      <p className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} GADGET GRID. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
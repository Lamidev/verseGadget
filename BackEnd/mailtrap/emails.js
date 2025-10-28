

// require("dotenv").config();
// const axios = require("axios");
// const {
//   PASSWORD_RESET_REQUEST_TEMPLATE,
//   PASSWORD_RESET_SUCCESS_TEMPLATE,
//   VERIFICATION_EMAIL_TEMPLATE,
//   ORDER_RECEIPT_TEMPLATE
// } = require("./email-template.js");
// const { mailtrapClient, sender } = require("./mailtrap.config.js");

// // Load environment variables
// const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
// const MAILTRAP_ENDPOINT = process.env.MAILTRAP_ENDPOINT;

// // Common function for handling email sending errors
// const handleEmailError = (error, message) => {
//   console.error(`${message}:`, error.response ? error.response.data : error.message);
//   // Don't throw - just return false
//   return false;
// };

// // Send Verification Email
// exports.sendVerificationEmail = async (email, verificationToken) => {
//   const recipient = [{ email }];
//   console.log("Verification token:", verificationToken);

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Verify your email",
//       html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//       category: "Email Verification",
//     });

//     console.log("Verification email sent successfully");
//     return true;
//   } catch (error) {
//     return handleEmailError(error, "Error sending verification email");
//   }
// };

// // Send Welcome Email using Mailtrap Template API
// exports.sendWelcomeEmail = async (email, userName) => {
//   const recipient = [{ email }];
//   const templateUUID = "36f55807-bcb9-4083-a8b9-8de5241136a1"; // Your GadgetsGrid template UUID

//   try {
//     const response = await axios.post(
//       MAILTRAP_ENDPOINT,
//       {
//         from: sender,
//         to: recipient,
//         template_uuid: templateUUID,
//         template_variables: {
//           company_info_name: "Gadgetsgridphonesandaccessories",
//           name: userName,
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${MAILTRAP_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     // console.log("Welcome email sent successfully");
//     return true;
//   } catch (error) {
//     return handleEmailError(error, "Error sending welcome email");
//   }
// };

// // Send Password Reset Email
// exports.sendPasswordResetEmail = async (email, resetURL) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Reset your password",
//       html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
//       category: "Password Reset",
//     });

//     // console.log("Password reset request email sent successfully");
//     return true;
//   } catch (error) {
//     return handleEmailError(error, "Error sending password reset email");
//   }
// };

// // Send Password Reset Success Email
// exports.sendResetSuccessEmail = async (email) => {
//   const recipient = [{ email }];

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Password Reset Successful",
//       html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//       category: "Password Reset",
//     });

//     // console.log("Password reset success email sent successfully");
//     return true;
//   } catch (error) {
//     return handleEmailError(error, "Error sending password reset success email");
//   }
// };

// // Send Order Receipt Email
// exports.sendReceiptEmail = async (email, order) => {
//   const recipient = [{ email }];
//   const cartItemsHTML = order.cartItems.map(item => 
//     `<li>${item.title} - NGN ${item.price} x ${item.quantity}</li>`
//   ).join("");

//   const addressInfo = `
//     ${order.addressInfo.fullName}<br>
//     ${order.addressInfo.address}<br>
//     ${order.addressInfo.lga}<br>
//     ${order.addressInfo.state}<br>
//     ${order.addressInfo.phone}
//   `;

//   const emailContent = ORDER_RECEIPT_TEMPLATE
//     .replace("{userName}", order.payerId)
//     .replace("{orderId}", order._id)
//     .replace("{paymentStatus}", order.paymentStatus)
//     .replace("{orderPrice}", order.totalAmount - order.deliveryPrice)
//     .replace("{deliveryPrice}", order.deliveryPrice)
//     .replace("{totalAmount}", order.totalAmount)
//     .replace("{cartItems}", cartItemsHTML)
//     .replace("{addressInfo}", addressInfo);

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Your Order Receipt",
//       html: emailContent,
//       category: "Order Receipt",
//     });

//     // console.log("Order receipt email sent successfully");
//     return true;
//   } catch (error) {
//     return handleEmailError(error, "Error sending order receipt email");
//   }
// };


require("dotenv").config();
const axios = require("axios");
const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  ORDER_RECEIPT_TEMPLATE
} = require("./email-template.js");
const { mailtrapClient, sender } = require("./mailtrap.config.js");

// Load environment variables
const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
const MAILTRAP_ENDPOINT = process.env.MAILTRAP_ENDPOINT;

// Common function for handling email sending errors
const handleEmailError = (error, message) => {
  if (error.response) {
    console.error(`${message}:`, error.response.status, error.response.data);
  } else {
    console.error(`${message}:`, error.message);
  }
  return false;
};

// Format order ID consistently - handle both string and ObjectId
const formatOrderId = (id) => {
  if (!id) return "N/A";
  
  // Convert to string if it's an ObjectId
  const idString = id.toString ? id.toString() : String(id);
  
  // Use the last 8 characters for consistency
  return `ORD${idString.slice(-8).toUpperCase()}`;
};

// Format Naira amounts with commas
const formatNaira = (amount) => {
  if (!amount) return "₦0";
  return `₦${Number(amount).toLocaleString("en-NG")}`;
};

// Send Verification Email
exports.sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending verification email");
  }
};

// Send Welcome Email using Mailtrap Template API
exports.sendWelcomeEmail = async (email, userName) => {
  const recipient = [{ email }];
  const templateUUID = "36f55807-bcb9-4083-a8b9-8de5241136a1";

  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: recipient,
        template_uuid: templateUUID,
        template_variables: {
          company_info_name: "Gadgetsgridphonesandaccessories",
          name: userName,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending welcome email");
  }
};

// Send Password Reset Email
exports.sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });

    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending password reset email");
  }
};

// Send Password Reset Success Email
exports.sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending password reset success email");
  }
};

// Send Order Receipt Email
exports.sendReceiptEmail = async (email, order) => {
  const recipient = [{ email }];
  
  try {
    // Format cart items with proper Naira formatting
    const cartItemsHTML = order.cartItems.map(item => 
      `<li>${item.title} - ${formatNaira(item.price)} x ${item.quantity} = ${formatNaira(item.price * item.quantity)}</li>`
    ).join("");

    const addressInfo = `
      ${order.addressInfo.fullName}<br>
      ${order.addressInfo.address}<br>
      ${order.addressInfo.lga}<br>
      ${order.addressInfo.state}<br>
      ${order.addressInfo.phone}
    `;

    const emailContent = ORDER_RECEIPT_TEMPLATE
      .replace(/{userName}/g, order.payerId)
      .replace(/{orderId}/g, formatOrderId(order._id))
      .replace(/{paymentStatus}/g, order.paymentStatus)
      .replace(/{orderPrice}/g, formatNaira(order.totalAmount - order.deliveryPrice))
      .replace(/{deliveryPrice}/g, formatNaira(order.deliveryPrice))
      .replace(/{totalAmount}/g, formatNaira(order.totalAmount))
      .replace(/{cartItems}/g, cartItemsHTML)
      .replace(/{addressInfo}/g, addressInfo);

    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Your Order Receipt",
      html: emailContent,
      category: "Order Receipt",
    });

    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending order receipt email");
  }
};
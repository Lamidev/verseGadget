
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
//   throw new Error(`${message}: ${error.message}`);
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

//     // console.log("Verification email sent successfully", response);
//   } catch (error) {
//     handleEmailError(error, "Error sending verification email");
//   }
// };

// // Send Welcome Email using Mailtrap Template API
// exports.sendWelcomeEmail = async (email, userName) => {
//   const recipient = [{ email }];
//   const templateUUID = "36f55807-bcb9-4083-a8b9-8de5241136a1"; // Mailtrap template UUID

//   try {
//     const response = await axios.post(
//       MAILTRAP_ENDPOINT,
//       {
//         from: sender,
//         to: recipient,
//         template_uuid: templateUUID,
//         template_variables: {
//           company_info_name: "Gadgetsgridphonesandacessories", // Matches email template variables
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
//   } catch (error) {
//     handleEmailError(error, "Error sending welcome email");
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

//     console.log("Password reset request email sent successfully", response);
//   } catch (error) {
//     handleEmailError(error, "Error sending password reset email");
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

//     console.log("Password reset success email sent successfully", response);
//   } catch (error) {
//     handleEmailError(error, "Error sending password reset success email");
//   }
// };

// // exports.sendReceiptEmail = async (email, order) => {
// //   const recipient = [{ email }];
  
// //   // Convert cart items into an HTML list
// //   const cartItemsHTML = order.cartItems.map(item => 
// //     `<li>${item.productName} - NGN ${item.price} x ${item.quantity}</li>`
// //   ).join("");

// //   const emailContent = ORDER_RECEIPT_TEMPLATE
// //     .replace("{userName}", order.payerId)
// //     .replace("{orderId}", order._id)
// //     .replace("{paymentStatus}", order.paymentStatus)
// //     .replace("{totalAmount}", order.totalAmount)
// //     .replace("{cartItems}", cartItemsHTML)
// //     .replace("{addressInfo}", order.addressInfo);

// //   try {
// //     await mailtrapClient.send({
// //       from: sender,
// //       to: recipient,
// //       subject: "Your Order Receipt",
// //       html: emailContent,
// //       category: "Order Receipt",
// //     });

// //     console.log("Receipt email sent successfully to", email);
// //   } catch (error) {
// //     console.error("Error sending receipt email:", error.message);
// //   }
// // };

// exports.sendReceiptEmail = async (email, order) => {
//   const recipient = [{ email }];
  
//   // console.log("Sending receipt email to:", email);
//   // console.log("Order details:", order);

//   // Convert cart items into an HTML list
//   const cartItemsHTML = order.cartItems.map(item => 
//     `<li>${item.title} - NGN ${item.price} x ${item.quantity}</li>`
//   ).join("");

//   // console.log("Cart items HTML:", cartItemsHTML);

//   // Format address info without notes
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
//     .replace("{orderPrice}", order.totalAmount - order.deliveryPrice) // Order price (without delivery)
//     .replace("{deliveryPrice}", order.deliveryPrice) // Delivery price
//     .replace("{totalAmount}", order.totalAmount) // Total amount (order price + delivery price)
//     .replace("{cartItems}", cartItemsHTML)
//     .replace("{addressInfo}", addressInfo);

//   // console.log("Email content:", emailContent);

//   try {
//     const response = await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: "Your Order Receipt",
//       html: emailContent,
//       category: "Order Receipt",
//     });
  
//     console.log("Email sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending receipt email:", error.message);
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

const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
const MAILTRAP_ENDPOINT = process.env.MAILTRAP_ENDPOINT;

const sender = {
  email: "info@gadgetsgrid.ng",
  name: "Gadgetsgridphonesandaccessories"
};

const handleEmailError = (error, message) => {
  console.error(`${message}:`, error.response ? error.response.data : error.message);
  throw new Error(`${message}: ${error.message}`);
};

// Send Verification Email
exports.sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: [{ email }],
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Verification email sent successfully:", response.data);
  } catch (error) {
    handleEmailError(error, "Error sending verification email");
  }
};

// Send Welcome Email
exports.sendWelcomeEmail = async (email, userName) => {
  const templateUUID = "36f55807-bcb9-4083-a8b9-8de5241136a1";
  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: [{ email }],
        template_uuid: templateUUID,
        template_variables: {
          company_info_name: "Gadgetsgridphonesandaccessories",
          name: userName
        }
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Welcome email sent successfully:", response.data);
  } catch (error) {
    handleEmailError(error, "Error sending welcome email");
  }
};

// Send Password Reset Email
exports.sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: [{ email }],
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Password reset request email sent successfully:", response.data);
  } catch (error) {
    handleEmailError(error, "Error sending password reset email");
  }
};

// Send Password Reset Success Email
exports.sendResetSuccessEmail = async (email) => {
  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: [{ email }],
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Password reset success email sent successfully:", response.data);
  } catch (error) {
    handleEmailError(error, "Error sending password reset success email");
  }
};

// Send Order Receipt Email
exports.sendReceiptEmail = async (email, order) => {
  const cartItemsHTML = order.cartItems.map(item => 
    `<li>${item.title} - NGN ${item.price} x ${item.quantity}</li>`
  ).join("");

  const addressInfo = `
    ${order.addressInfo.fullName}<br>
    ${order.addressInfo.address}<br>
    ${order.addressInfo.lga}<br>
    ${order.addressInfo.state}<br>
    ${order.addressInfo.phone}
  `;

  const emailContent = ORDER_RECEIPT_TEMPLATE
    .replace("{userName}", order.payerId)
    .replace("{orderId}", order._id)
    .replace("{paymentStatus}", order.paymentStatus)
    .replace("{orderPrice}", order.totalAmount - order.deliveryPrice)
    .replace("{deliveryPrice}", order.deliveryPrice)
    .replace("{totalAmount}", order.totalAmount)
    .replace("{cartItems}", cartItemsHTML)
    .replace("{addressInfo}", addressInfo);

  try {
    const response = await axios.post(
      MAILTRAP_ENDPOINT,
      {
        from: sender,
        to: [{ email }],
        subject: "Your Order Receipt",
        html: emailContent
      },
      {
        headers: {
          Authorization: `Bearer ${MAILTRAP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Order receipt email sent successfully:", response.data);
  } catch (error) {
    handleEmailError(error, "Error sending order receipt email");
  }
};

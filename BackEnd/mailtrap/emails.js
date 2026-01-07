

require("dotenv").config();
const axios = require("axios");
const {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  ORDER_RECEIPT_TEMPLATE,
  NEWSLETTER_SUBSCRIPTION_TEMPLATE,
  ADMIN_NEWSLETTER_NOTIFICATION_TEMPLATE,
} = require("./email-template.js");
const { mailtrapClient, sender, MAILTRAP_ENDPOINT } = require("./mailtrap.config.js");

// Load environment variables
const MAIL_USER_INFO = "gadgetsgridphones@gmail.com"; // Admin notification email

// Send Newsletter Welcome Email
exports.sendNewsletterWelcomeEmail = async (email) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to the Gadgets Grid Newsletter! 🚀",
      html: NEWSLETTER_SUBSCRIPTION_TEMPLATE,
      category: "Newsletter Welcome",
    });

    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending newsletter welcome email");
  }
};

// Send Newsletter Admin Notification
exports.sendNewsletterAdminNotification = async (subscriberEmail) => {
  const recipient = [{ email: MAIL_USER_INFO }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "New Newsletter Subscriber! 📧",
      html: ADMIN_NEWSLETTER_NOTIFICATION_TEMPLATE
        .replace("{subscriberEmail}", subscriberEmail)
        .replace("{subscriptionDate}", new Date().toLocaleString()),
      category: "Admin Notification",
    });

    return true;
  } catch (error) {
    return handleEmailError(error, "Error sending newsletter admin notification");
  }
};

// Load environment variables
const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;

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
    const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);
    // console.log("HTML length:", htmlContent.length); // Verify template is not empty

    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "IMPORTANT: Password Reset for Gadgets Grid",
      html: htmlContent,
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
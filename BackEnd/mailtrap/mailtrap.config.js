

require("dotenv").config();
const { MailtrapClient } = require("mailtrap");

// Load environment variables and ensure endpoint has protocol
const MAILTRAP_TOKEN = process.env.MAILTRAP_TOKEN;
let MAILTRAP_ENDPOINT = process.env.MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io";

if (MAILTRAP_ENDPOINT && !MAILTRAP_ENDPOINT.startsWith("http")) {
  MAILTRAP_ENDPOINT = `https://${MAILTRAP_ENDPOINT}`;
}

// Ensure credentials exist
if (!MAILTRAP_TOKEN) {
  throw new Error("Missing MAILTRAP_TOKEN in environment variables.");
}

// Initialize Mailtrap client - only use endpoint if it's not the default or if it's needed for a different region
const mailtrapClient = new MailtrapClient({
  endpoint: MAILTRAP_ENDPOINT || "https://send.api.mailtrap.io",
  token: MAILTRAP_TOKEN
});

// Define the sender details
const sender = {
  email: "info@gadgetsgrid.ng",
  name: "Gadgetsgridphonesandaccessories"
};

module.exports = {
  mailtrapClient,
  sender,
  MAILTRAP_ENDPOINT
};
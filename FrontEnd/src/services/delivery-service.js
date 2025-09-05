// deliveryService.js
export const getDeliveryPrice = (state) => {
    const deliveryPrices = {
      'Lagos': 3000,
      'Abuja': 10000,
      'Port Harcourt': 10000,
      "Ibadan": 5000,
      // Add more cities and prices as needed
    };
    return deliveryPrices[state] || 15000; // Default price if city not found
  };
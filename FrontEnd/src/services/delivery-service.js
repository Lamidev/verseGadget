// deliveryService.js
export const getDeliveryPrice = (state) => {
    const deliveryPrices = {
      'Lagos': 3,
      'Abuja': 1,
      'Port Harcourt': 1,
      "Ibadan": 2,
      // Add more cities and prices as needed
    };
    return deliveryPrices[state] || 2; // Default price if city not found
  };
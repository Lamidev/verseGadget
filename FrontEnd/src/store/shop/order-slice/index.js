// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   approvalURL: null,
//   isLoading: false,
//   orderId: null,
//   orderList: [],
//   orderDetails: null,
// }

// export const createNewOrder = createAsyncThunk(
//   "/order/createNewOrder",
//   async (orderData) => {
//     // console.log("Order Data:", orderData); // Log the orderData to verify its contents
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/order/create`,
//       orderData
//     );

//     return response.data;
//   }
// );

// export const capturePayment = createAsyncThunk(
//   "/order/capturePayment",
//   async ({ reference, orderId }) => {
//     // console.log("Payload sent to capture payment:", { reference, orderId });
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/order/capture`,
//       {
//         reference,
//         orderId,
//       }
//     );
//     return response.data;
//   }
// );

// export const getAllOrdersByUserId = createAsyncThunk(
//   "/order/getAllOrdersByUserId",
//   async (userId) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/order/list/${userId}`
//     );

//     return response.data;
//   }
// );

// export const getOrderDetails = createAsyncThunk(
//   "/order/getOrderDetails",
//   async (id) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/order/details/${id}`
//     );

//     return response.data;
//   }
// );

// export const handlePaystackReturn = createAsyncThunk(
//   "/order/handlePaystackReturn",
//   async ({ reference }) => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/order/paystack-return?reference=${reference}`
//     );
//     return response.data;
//   }
// );


// const shoppingOrderSlice = createSlice({
//   name: "shoppingOrderSlice",
//   initialState,
//   reducers: {
//     resetOrderDetails:(state) => {
// state.orderDetails = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createNewOrder.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(createNewOrder.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.approvalURL = action.payload.approvalURL;
//         state.orderId = action.payload.orderId;
//         sessionStorage.setItem(
//           "currentOrderId",
//           JSON.stringify(action.payload.orderId)
//         );
//         // console.log("Order ID saved to sessionStorage:", action.payload.orderId);
//       })
//       .addCase(createNewOrder.rejected, (state) => {
//         state.isLoading = false;
//         state.approvalURL = null;
//         state.orderId = null;
//         state.error = action.error.message;
//       }) 
//       .addCase(getAllOrdersByUserId.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderList = action.payload.data;
//       })
//       .addCase(getAllOrdersByUserId.rejected, (state) => {
//         state.isLoading = false;
//         state.orderList = [];
//       })
//       .addCase(getOrderDetails.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getOrderDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orderDetails = action.payload.data;
//       })
//       .addCase(getOrderDetails.rejected, (state) => {
//         state.isLoading = false;
//         state.orderDetails = null;
//       })
//       .addCase(handlePaystackReturn.fulfilled, (state, action) => {
//         state.paymentStatus = action.payload.message;
//         state.paymentSuccess = true;
//         state.orderDetails = action.payload.order;
//       });
//   },
// });

// export const { resetOrderDetails } = shoppingOrderSlice.actions;

// export default shoppingOrderSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
}

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/shop/order/create`,
      orderData
    );

    return response.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ reference, orderId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/shop/order/capture`,
      {
        reference,
        orderId,
      }
    );
    return response.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/shop/order/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/shop/order/details/${id}`
    );

    return response.data;
  }
);

export const handlePaystackReturn = createAsyncThunk(
  "/order/handlePaystackReturn",
  async ({ reference }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/shop/order/paystack-return?reference=${reference}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails:(state) => {
      state.orderDetails = null;
    },
    clearOrderStorage: () => {
      // Clear both localStorage items
      localStorage.removeItem("currentOrderId");
      localStorage.removeItem("currentOrderReference");
    },
    resetApprovalURL: (state) => {
      state.approvalURL = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        
        // Store in localStorage for the return page
        localStorage.setItem("currentOrderId", action.payload.orderId);
        localStorage.setItem("currentOrderReference", action.payload.reference);
        
        console.log("Order ID saved to localStorage:", action.payload.orderId);
        console.log("Reference saved to localStorage:", action.payload.reference);
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.error = action.error.message;
      }) 
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(handlePaystackReturn.fulfilled, (state, action) => {
        state.paymentStatus = action.payload.message;
        state.paymentSuccess = true;
        state.orderDetails = action.payload.order;
      });
  },
});

export const { resetOrderDetails, clearOrderStorage, resetApprovalURL } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
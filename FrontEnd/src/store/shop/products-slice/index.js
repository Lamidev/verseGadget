// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   productList: [],
//   productDetails: null,
// };

// export const fetchAllFilteredProducts = createAsyncThunk(
//   "/products/fetchAllProducts",
//   async ({ filterParams, sortParams }) => {
//     const query = new URLSearchParams({
//       ...filterParams,
//       sortBy: sortParams,
//     });

//     const result = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/products/get?${query}`
//     );

//     return result?.data;
//   }
// );

// export const fetchProductDetails = createAsyncThunk(
//   "/products/fetchProductDetails",
//   async (id) => {
//     const result = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/shop/products/get/${id}`
//     );

//     return result?.data;
//   }
// );

// const shoppingProductSlice = createSlice({
//   name: "shoppingProducts",
//   initialState,
//   reducers: {
//     setProductDetails: (state) => {
//       state.productDetails = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllFilteredProducts.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productList = action.payload.data;
//       })
//       .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
//         state.isLoading = false;
//         state.productList = [];
//       })
//       .addCase(fetchProductDetails.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchProductDetails.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.productDetails = action.payload.data;
//       })
//       .addCase(fetchProductDetails.rejected, (state, action) => {
//         state.isLoading = false;
//         state.productDetails = null;
//       });
//   },
// });

// export const { setProductDetails } = shoppingProductSlice.actions;

// export default shoppingProductSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const initialState = {
  isLoading: false,
  productList: JSON.parse(localStorage.getItem("productList")) || [],
  productDetails: JSON.parse(localStorage.getItem("productDetails")) || null,
};

// 🧠 Utility: Get cache safely and remove expired entries
function getValidCache() {
  const cache = JSON.parse(localStorage.getItem("productDetailsCache")) || {};
  const now = Date.now();
  const validCache = {};

  Object.keys(cache).forEach((id) => {
    const { timestamp, data } = cache[id];
    if (now - timestamp < CACHE_EXPIRY_MS) {
      validCache[id] = { data, timestamp };
    }
  });

  localStorage.setItem("productDetailsCache", JSON.stringify(validCache));
  return validCache;
}

// ✅ Fetch all filtered products
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/shop/products/get?${query}`
    );

    // Cache product list
    localStorage.setItem("productList", JSON.stringify(result.data.data));
    return result.data;
  }
);

// ✅ Fetch product details (with caching + expiry)
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (productId) => {
    const cache = getValidCache();

    if (cache[productId]) {
      // Return cached version instantly
      return { data: cache[productId].data, fromCache: true };
    }

    // If not in cache or expired, fetch from API
    const result = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/shop/products/get/${productId}`
    );

    // Save new data with timestamp
    const updatedCache = {
      ...cache,
      [productId]: {
        data: result.data.data,
        timestamp: Date.now(),
      },
    };

    localStorage.setItem("productDetailsCache", JSON.stringify(updatedCache));
    localStorage.setItem("productDetails", JSON.stringify(result.data.data));

    return result.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
      localStorage.removeItem("productDetails");
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        console.error("Failed to fetch products");
      })

      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;

        if (!action.payload.fromCache) {
          localStorage.setItem(
            "productDetails",
            JSON.stringify(action.payload.data)
          );
        }
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        console.error("Failed to fetch product details");
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;

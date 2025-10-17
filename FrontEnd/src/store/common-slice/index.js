// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   isLoading: false,
//   featureImageList: [],
// };

// export const getFeatureImages = createAsyncThunk(
//   "/common/getFeatureImages",
//   async () => {
//     const response = await axios.get(
//       `${import.meta.env.VITE_API_BASE_URL}/common/features/get`
//     );

//     return response.data;
//   }
// );

// export const addFeatureImage = createAsyncThunk(
//   "/common/addFeatureImage",
//   async (image) => {
//     const response = await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL}/common/features/add`,
//       { image }
//     );

//     return response.data;
//   }
// );

// export const deleteFeatureImage = createAsyncThunk(
//   "/common/deleteFeatureImage",
//   async (id) => {
//     const response = await axios.delete(
//       `${import.meta.env.VITE_API_BASE_URL}/common/features/delete/${id}`
//     );
//     return { id }; // Return the deleted image's id to remove from the list in state
//   }
// );

// const commonSlice = createSlice({
//   name: "commonSlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getFeatureImages.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getFeatureImages.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.featureImageList = action.payload.data;
//       })
//       .addCase(getFeatureImages.rejected, (state) => {
//         state.isLoading = false;
//         state.featureImageList = [];
//         console.error("Failed to fetch feature images:", action.error.message);
//       })
//       .addCase(deleteFeatureImage.fulfilled, (state, action) => {
//         state.featureImageList = state.featureImageList.filter(
//           (image) => image._id !== action.payload.id
//         );
//       });
//   },
// });

// export default commonSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: JSON.parse(localStorage.getItem("featureImageList")) || [],
};

// ✅ Fetch feature images (stale-while-revalidate)
export const getFeatureImages = createAsyncThunk(
  "/common/getFeatureImages",
  async (_, { dispatch }) => {
    // 1️⃣ Load cached images instantly (stale)
    const cached = JSON.parse(localStorage.getItem("featureImageList"));
    if (cached && cached.length > 0) {
      // Dispatch cached data immediately for instant UI
      dispatch(setFeatureImages(cached));
    }

    // 2️⃣ Fetch fresh data in the background
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/common/features/get`
    );

    // 3️⃣ Update cache only if new data is different
    const newData = response.data.data;
    const cachedString = JSON.stringify(cached || []);
    const newString = JSON.stringify(newData);

    if (cachedString !== newString) {
      localStorage.setItem("featureImageList", JSON.stringify(newData));
      dispatch(setFeatureImages(newData));
    }

    return response.data;
  }
);

// ✅ Add new feature image
export const addFeatureImage = createAsyncThunk(
  "/common/addFeatureImage",
  async (imageUrl, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/common/features/add`,
        { image: imageUrl }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ Delete feature image
export const deleteFeatureImage = createAsyncThunk(
  "/common/deleteFeatureImage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/common/features/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    // ✅ For immediate state updates (used by caching)
    setFeatureImages: (state, action) => {
      state.featureImageList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Get images
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        console.error("Failed to fetch feature images");
      })

      // ✅ Add image
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.featureImageList.push(action.payload.data);
        localStorage.setItem(
          "featureImageList",
          JSON.stringify(state.featureImageList)
        );
      })

      // ✅ Delete image
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = state.featureImageList.filter(
          (img) => img._id !== action.meta.arg
        );
        localStorage.setItem(
          "featureImageList",
          JSON.stringify(state.featureImageList)
        );
      });
  },
});

export const { setFeatureImages } = commonSlice.actions;
export default commonSlice.reducer;

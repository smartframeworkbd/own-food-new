import { FeaturedVideo } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const items =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];
const initialState = {
  cartItems: items,
};
const User = JSON.parse(localStorage.getItem("UserDetails"));
export const addItem = createAsyncThunk(
  "cart/addItem",
  async (newItem, { getState, dispatch }) => {
    const { cartItems } = getState().cart;
    const foodStock = newItem.foodQty;
    let existingItem = cartItems.find((item) => item._id === newItem._id);
    const sellerExists = cartItems.find(
      (item) => item.sellerID === newItem.sellerID
    );

    const sameFoodTypeExists = cartItems.find(
      (item) => item.foodType === newItem.foodType
    );
    const existingItemIndex = cartItems.findIndex(
      (item) => item._id === newItem._id
    );
    const foodTypesInCart = [...new Set(cartItems.map((item) => item.foodType))];

    if (existingItemIndex !== -1) {
      const existingItem = cartItems[existingItemIndex];
      let requestQty = existingItem.foodQty + 1;
      const foodStock = existingItem.foodStock;
      if (foodStock > 0 && requestQty > foodStock) {
        requestQty = foodStock;
        await Swal.fire({
          title: "You have reached maximum food quantity.",
        });
      }
      const updatedItem = {
        ...existingItem,
        foodQty: requestQty,
      };

      return { index: existingItemIndex, item: updatedItem };
    } else if (cartItems.length > 0 && !sellerExists) {
      await Swal.fire({
        title: "Are you Remove your Previous food?",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {

          dispatch(removeAllItems());

          dispatch(addItemLocally(newItem));

        } else {
          return [...cartItems];
          //  return;
        }
      });
    } else if (cartItems.length > 0 && !sameFoodTypeExists && sellerExists
       && (foodTypesInCart.includes("INSTANT") && newItem.foodType === "PREORDER") ||
      (foodTypesInCart.includes("PREORDER") && newItem.foodType === "INSTANT")
    ) {
      await Swal.fire({
        title:
          "don't buy another type food at a time.please remove previous data",
        showCancelButton: true,
        confirmButtonText: "Save",
      }).then(async (result) => {
        if (result.isConfirmed) {

          dispatch(removeAllItems());

          dispatch(addItemLocally(newItem));


        } else {
          return [...cartItems];
        }
      });
    } else {
      let requestQty = 1;
      const foodStock = newItem.foodQty;
      if (foodStock > 0 && requestQty > foodStock) {
        requestQty = foodStock;
      }
      return {
        index: -1,
        item: { ...newItem, foodQty: requestQty, foodStock: foodStock },
      };
    }


  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemLocally: (state, action) => {
      state.cartItems.push({ ...action.payload, foodQty: 1 });
    },
    setCartList: (state, action) => {
      state.cartItems = action.payload;
    },
    removeAllItems: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      let removeData = state.cartItems.filter((item) => item._id !== itemId);
      state.cartItems = removeData;
    },


    addAdditionalInfo: (state, action) => {
      const { additionalInfo, id } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);
      if (existingItem) {
        existingItem.additionalInfo = additionalInfo;
      } else {
      }
    },

    decreaseItem: (state, action) => {
      const itemId = action.payload._id;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === itemId
      );
      const existingItem = state.cartItems.find((item) => item._id === itemId);
      if (existingItem) {
        if (existingItem.foodQty > 1) {
          existingItem.foodQty--;
        } else {
          state.cartItems.splice(existingItemIndex, 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.pending, (state, action) => {
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      const { index, item } = action.payload;
      if (index !== -1) {

        state.cartItems[index] = item;
      } else {

        state.cartItems.push(item);
      }

      //  action.payload;
    });
    builder.addCase(addItem.rejected, (state, action) => {
    });
  },
});
export const {
  removeItem,
  setCartList,
  removeAllItems,
  addItemLocally,
  decreaseItem,
  addAdditionalInfo
} = cartSlice.actions;
export default cartSlice.reducer;

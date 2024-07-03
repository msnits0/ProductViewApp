import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: { [productName: string]: number };
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const productName = action.payload;
      if (state.items[productName]) {
        state.items[productName]++;
      } else {
        state.items[productName] = 1;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const productName = action.payload;
      if (state.items[productName]) {
        state.items[productName]--;
        if (state.items[productName] === 0) {
          delete state.items[productName];
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  firstName: string,
  lastName: string,
};

const initialState: User = {
  firstName: '',
  lastName: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state: User, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },

    setLastName: (state: User, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    }
  }
});

export const { setFirstName, setLastName } = userSlice.actions;
export default userSlice.reducer;
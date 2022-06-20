import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type isEditUserMode = {
    isEditUser: boolean
}

const initialState: isEditUserMode = {
  isEditUser: false,
};

const editUserSlice = createSlice({
  name: 'isEdit',
  initialState,
  reducers: {
    setCreateUserMode: (state: any, action: PayloadAction) => {
      state.isEditUser = false
    },
    setEditUserMode: (state: any, action: PayloadAction) => {
      state.isEditUser = true
    },
  },
});

export const { setCreateUserMode, setEditUserMode } = editUserSlice.actions;

export default editUserSlice.reducer;
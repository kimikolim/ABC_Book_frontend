import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type isEditMode = {
    isEdit: boolean
}

const initialState: isEditMode = {
  isEdit: false,
};

const editSlice = createSlice({
  name: 'isEdit',
  initialState,
  reducers: {
    setCreateBookMode: (state: any, action: PayloadAction) => {
      state.isEdit = false
    },
    setEditBookMode: (state: any, action: PayloadAction) => {
      state.isEdit = true
    },
  },
});

export const { setCreateBookMode, setEditBookMode } = editSlice.actions;

export default editSlice.reducer;
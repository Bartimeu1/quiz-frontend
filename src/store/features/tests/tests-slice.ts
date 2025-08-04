import { createSlice } from '@reduxjs/toolkit';
import { TestsSliceState } from './types';

const INITIAL_STATE: TestsSliceState = {
  editingTest: null,
};

export const testsSlice = createSlice({
  name: 'tests',
  initialState: INITIAL_STATE,
  reducers: {
    setEditingTest: (state, action) => {
      state.editingTest = action.payload;
    },
  },
});

export const { setEditingTest } = testsSlice.actions;
export default testsSlice.reducer;

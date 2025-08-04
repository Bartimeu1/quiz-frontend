import { RootState } from '../store';

export const editingTestSelector = (state: RootState) =>
  state.tests.editingTest;

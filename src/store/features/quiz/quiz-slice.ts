import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizRoomState, TestsSliceState } from './types';
import { QuizStatus, ParticipantType } from '@root/types/quiz';
import { NOT_FOUND_INDEX } from '@constants/quiz';

const INITIAL_ROOM_STATE: QuizRoomState = {
  quizStatus: QuizStatus.WAITING,
  testId: null,
  targetQuestionId: null,
  participants: [],
  answers: [],
};

const INITIAL_STATE: TestsSliceState = {};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: INITIAL_STATE,
  reducers: {
    initializeRoom: (state, action: PayloadAction<{ roomId: string }>) => {
      const { roomId } = action.payload;
      const roomData = state[roomId];

      if (!roomData) {
        state[roomId] = { ...INITIAL_ROOM_STATE };
      }
    },
    clearRoom: (state, action: PayloadAction<{ roomId: string }>) => {
      const { roomId } = action.payload;

      delete state[roomId];
    },
    setQuizStatus: (
      state,
      action: PayloadAction<{ roomId: string; status: QuizStatus }>,
    ) => {
      const { roomId, status } = action.payload;

      state[roomId].quizStatus = status;
    },
    setTestId: (
      state,
      action: PayloadAction<{ roomId: string; testId: number }>,
    ) => {
      const { roomId, testId } = action.payload;

      state[roomId].testId = testId;
    },
    setTargetQuestionId: (
      state,
      action: PayloadAction<{ roomId: string; questionId: number | null }>,
    ) => {
      const { roomId, questionId } = action.payload;

      state[roomId].targetQuestionId = questionId;
    },
    setParticipants: (
      state,
      action: PayloadAction<{
        roomId: string;
        participants: ParticipantType[];
      }>,
    ) => {
      const { roomId, participants } = action.payload;

      state[roomId].participants = participants;
    },
    setAnswer: (
      state,
      action: PayloadAction<{
        roomId: string;
        questionId: number;
        answer: string[];
      }>,
    ) => {
      const { roomId, questionId, answer } = action.payload;
      const roomState = state[roomId];

      const existingIndex = roomState.answers.findIndex(
        (item) => item.questionId === questionId,
      );

      if (existingIndex !== NOT_FOUND_INDEX) {
        state[roomId].answers[existingIndex] = { questionId, answer };
      } else {
        state[roomId].answers.push({ questionId, answer });
      }
    },
  },
});

export const {
  initializeRoom,
  clearRoom,
  setTestId,
  setQuizStatus,
  setParticipants,
  setTargetQuestionId,
  setAnswer,
} = quizSlice.actions;
export default quizSlice.reducer;

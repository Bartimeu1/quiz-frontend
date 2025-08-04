import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const quizRoomSelector = (roomId: string) => (state: RootState) =>
  state.quiz[roomId];

export const quizStatusSelector = (roomId: string) =>
  createSelector(
    quizRoomSelector(roomId),
    (roomState) => roomState?.quizStatus,
  );

export const quizTargetQuestionIdSelector = (roomId: string) =>
  createSelector(
    quizRoomSelector(roomId),
    (roomState) => roomState?.targetQuestionId,
  );

export const quizParticipantsSelector = (roomId: string) =>
  createSelector(
    quizRoomSelector(roomId),
    (roomState) => roomState.participants,
  );

export const quizAnswersSelector = (roomId: string) =>
  createSelector(quizRoomSelector(roomId), (roomState) => roomState?.answers);

export const quizTestIdSelector = (roomId: string) =>
  createSelector(quizRoomSelector(roomId), (roomState) => roomState?.testId);

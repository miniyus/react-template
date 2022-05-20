import { PayloadAction } from '@reduxjs/toolkit';
import { CreateSentence, Sentence } from '../sentence/sentenceAction';
import { ReviewResult } from '../../../components/common/WorkSpace';
import { Concept } from '../tasks/taskAction';

export interface User {
  id: number;
  loginId: number;
}

export interface Task {
  id: number;
  concepts: Concept[];
  pos_length: number;
  refId: number;
}

export interface SentenceReject {
  id: number;
  sentenceNumber: number;
  sentenceRejectCode: number;
  memo?: string;
}

export interface SentenceReview {
  id: number;
  userId: number;
  sentenceId: number;
  sentence1Result: ReviewResult;
  sentence2Result: ReviewResult;
  createAt: string;
  updateAt: string;
  edges?: {
    users: User;
    sentenceReject1?: SentenceReject[];
    sentenceReject2?: SentenceReject[];
  };
}

export interface CreateReview {
  sentenceId: number;
  sentence1: string;
  sentence2: string;
  sentence1Patterned: string;
  sentence2Patterned: string;
  sentence1PatternedModified: string;
  sentence2PatternedModified: string;
  sentence1Count: number;
  sentence2Count: number;
  sentence1Result: ReviewResult;
  sentence2Result: ReviewResult;
  sentence1ResultReason?: number[];
  sentence2ResultReason?: number[];
  memo1?: string;
  memo2?: string;
}

export interface UpdateReview extends Sentence {
  id: number;
  sentence1Result: ReviewResult;
  sentence2Result: ReviewResult;
  sentence1ResultReason: number[];
  memo1: string;
  memo2: string;
}

export interface Review {
  id: number;
  refId: string;
  concepts: Concept[];
  posLength: number;
  created1Length: number;
  created2Length: number;
  creatorId: string;
  createdAt: string;
  reviewer1Id: string;
  reviewer2Id: string;
  review1At: string;
  review2At: string;
  reviewResult: boolean;
  reviewRsTxt?: string;
  reviewReasons: number[];
}

export interface ReviewState {
  time: string | null;
  totalCount: number;
  seq: number;
  reviews: Review[];
  sentences: Sentence[];
  assignSentence: Sentence | null;
  editReview: Sentence | null;
  createReview: CreateReview | null;
}

export const initialState: ReviewState = {
  time: null,
  totalCount: 0,
  seq: 1,
  reviews: [],
  sentences: [],
  assignSentence: null,
  editReview: null,
  createReview: null,
};

const reviewAction = {
  assign: (state: ReviewState, action: PayloadAction<number>) => {
    state.seq = action.payload;
  },
  setTime: (state: ReviewState, action: PayloadAction<string>) => {
    state.time = action.payload;
  },
  setTotalCount: (state: ReviewState, action: PayloadAction<number>) => {
    state.totalCount = action.payload;
  },
  getAssignList: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; page: number; limit: number }>,
  ) => {
    state.seq = action.payload.seq;
    state.sentences = [];
  },
  setAssignList: (state: ReviewState, action: PayloadAction<Sentence[]>) => {
    state.sentences = action.payload;
  },
  getAssign: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; assignId: number }>,
  ) => {
    state.seq = action.payload.seq;
    state.assignSentence = null;
  },
  setAssign: (state: ReviewState, action: PayloadAction<Sentence | null>) => {
    state.assignSentence = action.payload;
  },
  getReviewList: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; page: number; limit: number }>,
  ) => {
    state.seq = action.payload.seq;
    state.reviews = [];
  },
  setReviewList: (state: ReviewState, action: PayloadAction<Review[]>) => {
    state.reviews = action.payload;
  },
  getReview: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; id: number }>,
  ) => {
    state.editReview = null;
  },
  setReview: (state: ReviewState, action: PayloadAction<Sentence | null>) => {
    state.editReview = action.payload;
  },
  createReview: (
    state: ReviewState,
    action: PayloadAction<{ seq: number; review: CreateReview }>,
  ) => {
    state.seq = action.payload.seq;
    state.createReview = action.payload.review;
  },
};

export default reviewAction;
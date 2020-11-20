import { User } from './../models/user/user';

export interface Answer {
    id: string;
    questionId: string;
    user: User;
    answer: string;
    time: number;
}

export interface Question {
    id: string;
    user: User;
    question: string;
    time: number;
    answers: Answer[];
}
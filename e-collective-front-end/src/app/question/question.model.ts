import { User } from './../models/user/user';

export interface Answer {
    id: string;
    questionId: string;
    user: User;
    answer: string;
    time: string;
}

export interface Question {
    id: string;
    idProduct:string;
    user: User;
    question: string;
    time: string;
    answers: Answer[];
}
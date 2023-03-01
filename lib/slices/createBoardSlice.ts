import { StateCreator } from 'zustand';

export interface BoardSlice {
    boards: Board[];
}

export const createBoardSlice: StateCreator<BoardSlice> = (set, get) => ({
    boards: [
        {
            id: 1,
            name: 'Platform Launch',
            columns: [],
        },
        {
            id: 2,
            name: 'Marketing Plan',
            columns: [],
        },
        {
            id: 3,
            name: 'Roadmap',
            columns: [],
        },
    ],
});

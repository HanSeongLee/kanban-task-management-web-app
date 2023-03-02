import { StateCreator } from 'zustand';
import { ModalID } from 'types/modal';

export interface BoardSlice {
    boards: Board[];
    openAddNewBoardModal: () => void;
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
    openAddNewBoardModal: () => {
        set({
            modalId: ModalID.ADD_NEW_BOARD,
            showModal: true,
        });
    },
});

import { StateCreator } from 'zustand';
import { ModalID } from 'types/modal';

export interface BoardSlice {
    boards: Board[];
    addBoard: (board: Board) => number;
    deleteBoard: (id: number) => number;
    editBoard: (board: Board) => number;
    openAddNewBoardModal: () => void;
    openDeleteBoardModal: () => void;
    openEditBoardModal: () => void;
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
    addBoard: (board: Board) => {
        const { boards } = get();
        const newId = boards.length + 1;
        set({
            boards: [
                ...boards,
                {
                    id: newId,
                    ...board,
                },
            ],
        });
        return newId;
    },
    deleteBoard: (id: number) => {
        const { boards } = get();
        const newBoards = boards.filter(({ id: _id }) => _id !== id);
        set({
            boards: newBoards,
        });
        return newBoards.length > 0 ? newBoards[newBoards.length - 1].id : -1;
    },
    editBoard: (board: Board) => {
        const { boards } = get();
        const newBoards = boards.map((item) => {
            if (item.id === board.id) {
                return board;
            }
            return item;
        });
        set({
            boards: newBoards,
        });
        return board.id;
    },
    openAddNewBoardModal: () => {
        set({
            modalId: ModalID.ADD_NEW_BOARD,
            showModal: true,
        });
    },
    openDeleteBoardModal: () => {
        set({
            modalId: ModalID.DELETE_BOARD,
            showModal: true,
        });
    },
    openEditBoardModal: () => {
        set({
            modalId: ModalID.EDIT_BOARD,
            showModal: true,
        });
    }
});

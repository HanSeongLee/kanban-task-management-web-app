import { StateCreator } from 'zustand';
import { ModalID } from 'types/modal';

export interface ModalSlice {
    modalId: ModalID;
    showModal: boolean;
    closeModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set, get) => ({
    modalId: ModalID.UNKNOWN,
    showModal: false,
    closeModal: () => {
        set({
            modalId: ModalID.UNKNOWN,
            showModal: false,
        });
    },
});

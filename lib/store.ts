import { create } from 'zustand';
import { createSidebarSlice, SidebarSlice } from 'lib/slices/createSidebarSlice';
import { BoardSlice, createBoardSlice } from 'lib/slices/createBoardSlice';
import { createModalSlice, ModalSlice } from 'lib/slices/createModalSlice';

type StoreState = ModalSlice & BoardSlice & SidebarSlice;

export const useAppStore = create<StoreState>()((...a) => ({
    ...createModalSlice(...a),
    ...createBoardSlice(...a),
    ...createSidebarSlice(...a),
}));

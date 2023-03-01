import { create } from 'zustand';
import { createSidebarSlice, SidebarSlice } from 'lib/slices/createSidebarSlice';
import { BoardSlice, createBoardSlice } from 'lib/slices/createBoardSlice';

type StoreState = BoardSlice & SidebarSlice;

export const useAppStore = create<StoreState>()((...a) => ({
    ...createBoardSlice(...a),
    ...createSidebarSlice(...a),
}));

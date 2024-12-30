import { create } from 'zustand';

interface StoreState {
  clickCount: number;
  incrementClick: () => void;
}

const useStore = create<StoreState>((set) => ({
  clickCount: 0,
  incrementClick: () => set((state) => ({ clickCount: state.clickCount + 1 })),
}));

export default useStore;

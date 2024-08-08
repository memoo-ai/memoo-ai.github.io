import { create } from 'zustand';

interface StoreState {
  pubKey: string;
  setPubKey: (key: string) => void;
}

const useStore = create<StoreState>((set) => ({
  pubKey: '',
  setPubKey: (key) => set({ pubKey: key }),
}));

export default useStore;

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  pubKey: string;
  setPubKey: (key: string) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      pubKey: '',
      setPubKey: (key) => set({ pubKey: key }),
    }),
    {
      name: 'pubKey-storage',
      getStorage: () => localStorage,
    },
  ),
);

export default useStore;

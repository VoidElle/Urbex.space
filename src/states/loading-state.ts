import { create } from "zustand";

export interface LoadingState {
  loading: boolean;
  changeState: () => void;
}

const useLoadingState = create<LoadingState>((set) => ({
  loading: false,

  changeState: () =>
    set((state: LoadingState) => ({
      loading: !state.loading,
    })),
}));

export default useLoadingState;

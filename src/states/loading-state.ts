import { create } from "zustand";

export interface LoadingState {
	loading: boolean;
	changeState: (newValue: boolean) => void;
}

const useLoadingState = create<LoadingState>((set) => ({
	loading: false,

	changeState: (newValue: boolean) =>
		set((_: LoadingState) => ({
			loading: newValue,
		})),
}));

export default useLoadingState;

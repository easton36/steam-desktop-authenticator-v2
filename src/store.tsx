import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

export interface RootState {
	settingsModal: any,
	noticeModal: any,
	importAccountModal: any,
	setupSteamAccountModal: any,
	steam: any
};

const store = configureStore({ reducer: rootReducer });

export default store;
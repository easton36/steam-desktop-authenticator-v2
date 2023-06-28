import { combineReducers } from 'redux';

import settingsModal from './settingsModal';
import noticeModal from './noticeModal';
import importAccountModal from './importAccountModal';
import setupSteamAccountModal from './setupSteamAccountModal';

export default combineReducers({
	settingsModal,
	noticeModal,
	importAccountModal,
	setupSteamAccountModal,
});
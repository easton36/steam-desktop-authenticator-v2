import { combineReducers } from 'redux';

import settingsModal from './settingsModal';
import noticeModal from './noticeModal';
import importAccountModal from './importAccountModal';
import setupSteamAccountModal from './setupSteamAccountModal';
import setupEncryptionModal from './setupEncryptionModal';
// import steam from './steam';
import settings from './settings';

export default combineReducers({
	settingsModal,
	noticeModal,
	importAccountModal,
	setupSteamAccountModal,
	setupEncryptionModal,
	// steam,
	settings
});
import Account, { AccountProps } from './Account';
import { listMaFiles, readMaFile } from '../utils/dataStorage.util';
import store, { RootState } from '../store';

/**
 * redux store action to dispatch accounts
 */
const dispatchAccount = (steamId: string, account: any) => {
	return {
		type: 'ADD_STEAM_ACCOUNT',
		steamId,
		account
	};
};

/**
 * Set selected account in redux store
 */
export const setSelectedAccount = (steamId: string) => {
	return {
		type: 'SET_STEAM_SELECTED_ACCOUNT',
		steamId
	};
};

/**
 * Initializes the Steam accounts.
 */
export const initializeSteamAccounts = async () => {
	const maFiles = await listMaFiles();

	const createdAccounts: string[] = [];

	for(const maFile of maFiles){
		const maFileData = await readMaFile(maFile);

		const steamId: string = maFileData.steamId;

		const accountProps: AccountProps = {
			steamId,
			username: maFileData.username,
			password: null,
			identitySecret: maFileData.identitySecret,
			sharedSecret: maFileData.sharedSecret,

			refreshToken: maFileData.refreshToken,
			proxy: maFileData.proxy
		};

		const account = Account(accountProps);
		
		createdAccounts.push(steamId);
		// dispatch to redux store
		store.dispatch(dispatchAccount(steamId, account));
	}

	// select first account
	if(createdAccounts.length > 0 && createdAccounts[0]){
		store.dispatch(setSelectedAccount(createdAccounts[0]));
	}

	return createdAccounts;
};

/**
 * Get steam account by steamId
 */
export const getSteamAccount = (steamId: string) => {
	const state: RootState = store.getState();

	return state.steam?.accounts[steamId];
};

/**
 * Get selected steam account
 */
export const getSelectedSteamAccount = () => {
	const state: RootState = store.getState();

	return state.steam?.accounts[state.steam?.selectedAccount];
};
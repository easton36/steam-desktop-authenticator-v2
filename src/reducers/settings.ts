import { saveSettings } from '../utils/dataStorage.util';

export const initialState: SettingsState = {
	encrypted: false,
	firstRun: true,
	checkForNewConfirmations: false,
	secondsBetweenChecks: 5,
	checkAllAccounts: false,
	autoConfirmMarket: false,
	autoConfirmTrades: false,
	minimalMode: false,
	// steam settings
	selectedAccount: '',
	accounts: {},
	steamIdToUsername: {
		'76561198853737123': 'testAccount123',
		'76561198853737456': 'testAccount456',
		'76561198853737789': 'testAccount789',
		'76561198853737321': 'testAccount321',
		'76561198853737654': 'testAccount654',
		'76561198853737987': 'testAccount987'
	},
	accountManifests: {},
};

interface SettingsState {
	encrypted: boolean,
	firstRun: boolean,
	checkForNewConfirmations: boolean,
	secondsBetweenChecks: number,
	checkAllAccounts: boolean,
	autoConfirmMarket: boolean,
	autoConfirmTrades: boolean,
	minimalMode: boolean,
	// steam settings
	selectedAccount: string,
	accounts: any,
	steamIdToUsername: {
		[steamId: string]: string
	},
	accountManifests: {
		[steamId: string]: {
			encryption_iv: string | null,
			encryption_salt: string | null,
			filename: string
		}
	}
};

const settings = (state = initialState, action: any) => {
	switch(action.type){
		case 'SET_SETTINGS':
			const newSettings = {
				...state,
				...action.settings
			};

			if(action?.intialLoad){
				// Set selected account to first account if none is selected
				const steamIds = Object.keys(newSettings.steamIdToUsername);
				if(steamIds?.length > 0 && (!newSettings.selectedAccount || newSettings.selectedAccount === '')){
					newSettings.selectedAccount = steamIds[0];
				}
			} else{
				// Save settings to local file
				saveSettings(newSettings);
			}

			console.log('Settings Saved:', newSettings);

			return newSettings;
		case 'ADD_STEAM_ACCOUNT':
				return {
					...state,
					accounts: {
						...state.accounts,
						[action.steamId]: action.account,
					},
					steamIdToUsername: {
						...state.steamIdToUsername,
						[action.steamId]: action.username
					}
				};
		case 'SET_STEAM_SELECTED_ACCOUNT':
			return {
				...state,
				selectedAccount: action.steamId
			};
		default:
			return state;
	}
};

export default settings;
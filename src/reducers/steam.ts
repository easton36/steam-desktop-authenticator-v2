const initialState: SteamState = {
	selectedAccount: '',
	selectedAccountUsername: '',
	accounts: {},
	steamIds: [],
	usernameToSteamId: {
		'testAccount123': '76561198853737123',
		'testAccount456': '76561198853737456',
		'testAccount789': '76561198853737789',
		'testAccount321': '76561198853737321',
		'testAccount654': '76561198853737654',
		'testAccount987': '76561198853737987',
	},
	steamIdToUsername: {
		'76561198853737123': 'testAccount123',
		'76561198853737456': 'testAccount456',
		'76561198853737789': 'testAccount789',
		'76561198853737321': 'testAccount321',
		'76561198853737654': 'testAccount654',
		'76561198853737987': 'testAccount987',
	}
};

export interface SteamState {
	selectedAccount: string,
	selectedAccountUsername: string,
	accounts: any,
	steamIds: string[],
	usernameToSteamId: {
		[username: string]: string
	},
	steamIdToUsername: {
		[steamId: string]: string
	}
};

const steam = (state = initialState, action: any) => {
	switch (action.type) {
		case 'ADD_STEAM_ACCOUNT':
			return {
				...state,
				accounts: {
					...state.accounts,
					[action.steamId]: action.account,
				},
				steamIds: [
					...state.steamIds,
					action.steamId
				],
				usernameToSteamId: {
					...state.usernameToSteamId,
					[action.username]: action.steamId
				},
				steamIdToUsername: {
					...state.steamIdToUsername,
					[action.steamId]: action.username
				}
			};
		case 'SET_STEAM_SELECTED_ACCOUNT':
			return {
				...state,
				selectedAccount: action.steamId,
				selectedAccountUsername: state.steamIdToUsername[action.steamId]
			};
		case 'SET_STEAM_SELECTED_ACCOUNT_BY_USERNAME':
			return {
				...state,
				selectedAccount: state.usernameToSteamId[action.username],
				selectedAccountUsername: action.username
			};

		default:
			return state;
	}
};

export default steam;
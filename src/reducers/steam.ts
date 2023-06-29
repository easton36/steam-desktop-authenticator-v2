const initialState = {
	selectedAccount: '',
	accounts: {},
	steamIds: []
};

export interface SteamState {
	selectedAccount: string,
	accounts: any,
	steamIds: string[]
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
				]
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

export default steam;
const initialState = {
	selectedAccount: '',
	accounts: []
};

const steam = (state = initialState, action: any) => {
	switch (action.type) {
		case 'SET_STEAM_ACCOUNTS':
			return {
				...state,
				accounts: action.accounts
			};
		case 'SET_STEAM_SELECTED_ACCOUNT':
			return {
				...state,
				selectedAccount: action.selectedAccount
			};
		default:
			return state;
	}
};

export default steam;
const initialState = {
	isOpen: false
};

const setupSteamAccountModal = (state = initialState, action: any) => {
	switch(action.type){
		case 'SET_SETUP_STEAM_ACCOUNT_MODAL':
			return {
				...state,
				isOpen: action.isOpen,
			};
		default:
			return state;
	}
};

export default setupSteamAccountModal;
const initialState = {
	isOpen: false
};

const settingsModal = (state = initialState, action: any) => {
	switch (action.type) {
		case 'SET_SETTINGS_MODAL':
			return {
				...state,
				isOpen: action.isOpen,
			};
		case 'HIDE_SETTINGS_MODAL':
			return {
				...state,
				isOpen: false,
			};
		case 'SHOW_SETTINGS_MODAL':
			return {
				...state,
				isOpen: true
			};
		default:
			return state;
	}
};

export default settingsModal;
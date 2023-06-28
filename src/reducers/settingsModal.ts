const settingsModal = (state = false, action: any) => {
	switch (action.type) {
		case 'SET_SETTINGS_MODAL':
			return action.isOpen;
		case 'HIDE_SETTINGS_MODAL':
			return false;
		case 'SHOW_SETTINGS_MODAL':
			return true;
		default:
			return state;
	}
};

export default settingsModal;
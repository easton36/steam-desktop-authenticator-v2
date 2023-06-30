const initialState = {
	isOpen: false
};

const setupEncryptionModal = (state = initialState, action: any) => {
	switch(action.type){
		case 'SET_SETUP_ENCRYPTION_MODAL':
			return {
				...state,
				isOpen: action.isOpen,
			};
		default:
			return state;
	}
};

export default setupEncryptionModal;
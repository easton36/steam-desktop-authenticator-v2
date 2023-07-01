const initialState = {
	isOpen: true
};

const importAccountModal = (state = initialState, action: any) => {
	switch(action.type){
		case 'SET_IMPORT_ACCOUNT_MODAL':
			return {
				...state,
				isOpen: action.isOpen,
			};
		default:
			return state;
	}
};

export default importAccountModal;
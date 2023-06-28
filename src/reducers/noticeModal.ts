const initialState = {
	isOpen: false,
	title: '',
	message: '',
};

const noticeModal = (state = initialState, action: any) => {
	switch(action.type){
		case 'SET_NOTICE_MODAL':
			return {
				...state,
				isOpen: action.isOpen,
				title: action.title,
				message: action.message,
			};
		case 'TOGGLE_NOTICE_MODAL':
			return {
				...state,
				isOpen: action.isOpen,
			};
		case 'HIDE_NOTICE_MODAL':
			return {
				...state,
				isOpen: false,
			};
		case 'SHOW_NOTICE_MODAL':
			return {
				...state,
				isOpen: true,
			};
		default:
			return state;
	}
};

export default noticeModal;
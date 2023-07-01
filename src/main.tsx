import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

// import { checkDataStorageFolder } from './utils/dataStorage.util';
import store from './store';
import { loadSettings } from './utils/dataStorage.util';

// checkDataStorageFolder();
import './translations/i18n';

import App from "./App";
import "./styles.css";
import 'tippy.js/dist/tippy.css';

const loadInitialSettingsToStore = async () => {
	const settings = await loadSettings();
	console.log('Settings loaded: ', settings);
	// will load settings into redux store but not write to disk, since we just loaded them from disk
	store.dispatch({ type: 'SET_SETTINGS', settings: settings, intialLoad: true });
};
loadInitialSettingsToStore();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);
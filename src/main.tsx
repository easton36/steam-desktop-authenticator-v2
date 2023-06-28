import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

import { checkDataStorageFolder } from './utils/dataStorage.util';

const store = configureStore({ reducer: rootReducer });
checkDataStorageFolder();
import './translations/i18n';

import App from "./App";
import "./styles.css";
import 'tippy.js/dist/tippy.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

import App from "./App";
import "./styles.css";
import 'tippy.js/dist/tippy.css';

const store = configureStore({ reducer: rootReducer });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
);

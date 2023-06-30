import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

// import { checkDataStorageFolder } from './utils/dataStorage.util';
import store from './store';

// checkDataStorageFolder();
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

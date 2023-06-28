import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Options from "./components/Options";
import SelectedAccount from "./components/SelectedAccount";

import SettingsModal from "./components/SettingsModal";

import TotpManager from "./components/TotpManager";
import ConfirmationsManager from "./components/ConfirmationsManager";
import AccountsList from "./components/AccountsList";

const App = () => {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	// useEffect(() => {
	// 	document.addEventListener('contextmenu', event => event.preventDefault());
	// }, []);

	return (
		<div className="container p-2 bg-gray-700 w-full h-full flex-1 flex flex-col gap-3">
			<div className="flex flex-row items-center gap-2">
				<Options />
				<SelectedAccount />
			</div>
			<div className="flex flex-row items-center gap-2 w-full">
				<button type="button" className="flex-1 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					Setup New Account
				</button>
				<button type="button" className="flex-1 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					Setup Encryption
				</button>
			</div>

			<TotpManager />
			<ConfirmationsManager />
			<AccountsList />

			<div className="flex flex-row items-center w-full justify-between m-0">
				<a href="https://github.com/easton36/steam-desktop-authenticator-v2/releases/latest" target="_blank" className="text-violet-500 text-xs underline">
					Download latest version
				</a>

				<p className="text-gray-400 text-xs">v0.0.0</p>
			</div>

			<SettingsModal />
		</div>
	);
};

export default App;
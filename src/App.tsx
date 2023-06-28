import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { connect } from "react-redux";
import { useEffect } from "react";

import Options from "./components/Options";
import SelectedAccount from "./components/SelectedAccount";

import SettingsModal from "./components/SettingsModal";

const App = () => {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		document.addEventListener('contextmenu', event => event.preventDefault());
	}, []);

	return (
		<div className="container p-2 bg-gray-700 w-full h-full flex-1">
			<div className="flex flex-row items-center gap-2">
				<Options />
				<SelectedAccount />
			</div>

			<SettingsModal />
		</div>
	);
};

export default App;
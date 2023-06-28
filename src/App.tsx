import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import Options from "./components/Options";
import SelectedAccount from "./components/SelectedAccount";

const App = () => {
	const [greetMsg, setGreetMsg] = useState("");
	const [name, setName] = useState("");

	async function greet() {
		// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
		setGreetMsg(await invoke("greet", { name }));
	}

	return (
		<div className="container p-2 bg-gray-700 w-full h-full flex-1">
			<div className="flex flex-row items-center gap-2">
				<Options />
				<SelectedAccount />
			</div>
		</div>
	);
};

export default App;
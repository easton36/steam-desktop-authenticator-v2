import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { loadSettings } from './utils/dataStorage.util';

import Options from "./components/Dropdowns/Options";
import SelectedAccount from "./components/Dropdowns/SelectedAccount";

import SettingsModal from "./components/Modals/SettingsModal";
import NoticeModal from "./components/Modals/NoticeModal";
import ImportAccountModal from "./components/Modals/ImportAccountModal";
import SetupSteamAccountModal from "./components/Modals/SetupSteamAccountModal";
import SetupEncryptionModal from "./components/Modals/SetupEncryptionModal";

import TotpManager from "./components/TotpManager";
import ConfirmationsManager from "./components/ConfirmationsManager";
import AccountsList from "./components/AccountsList";
import ThemeToggle from "./components/ThemeToggle";

const VERSION = "v0.0.0";

const App = ({ setupNewAccount, setupEncryption, setSettings }: {
	setupNewAccount: () => void,
	setupEncryption: () => void,
	setSettings: (settings: any) => void
}) => {
	const { t } = useTranslation();

	const [greetMsg, setGreetMsg] = useState("");

	const loadInitialSettingsToStore = async () => {
		const settings = await loadSettings();
		console.log('Settings loaded: ', settings);
		// will load settings into redux store but not write to disk, since we just loaded them from disk
		setSettings(settings);
	};

	useEffect(() => {
		loadInitialSettingsToStore();
	}, []);

	// useEffect(() => {
	// 	document.addEventListener('contextmenu', event => event.preventDefault());
	// }, []);

	return (
		<div className="container p-2 bg-gray-700 w-full h-full flex-1 flex flex-col gap-2">
			<div className="flex flex-row items-center gap-2">
				<Options />
				<SelectedAccount />
				<ThemeToggle />
			</div>
			<div className="flex flex-row items-center gap-2 w-full">
				<button type="button" className="flex-1 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={() => {
					setupNewAccount();
				}}>
					{t('Setup New Account')}
				</button>
				<button type="button" className="flex-1 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" onClick={() => {
					setupEncryption();
				}}>
					{t('Setup Encryption')}
				</button>
			</div>

			<TotpManager />
			<ConfirmationsManager />
			<AccountsList />

			<div className="flex flex-row items-center w-full justify-between m-0">
				<a href="https://github.com/easton36/steam-desktop-authenticator-v2/releases/latest" target="_blank" className="text-violet-500 text-xs underline">
					{t('Download latest version')}
				</a>

				<p className="text-gray-400 text-xs">{VERSION}</p>
			</div>

			<SettingsModal />
			<NoticeModal />
			<ImportAccountModal />
			<SetupSteamAccountModal />
			<SetupEncryptionModal />
		</div>
	);
};

const mapDispatchToProps = (dispatch: any) => ({
	setupNewAccount: () => dispatch({ type: 'SET_SETUP_STEAM_ACCOUNT_MODAL', isOpen: true }),
	setupEncryption: () => dispatch({ type: 'SET_SETUP_ENCRYPTION_MODAL', isOpen: true }),
	triggerNotice: (notice: { title: string, message: string }) => dispatch({ type: 'SET_NOTICE_MODAL', isOpen: true, title: notice.title, message: notice.message }),
	setSettings: (settings: any) => dispatch({ type: 'SET_SETTINGS', settings: settings, intialLoad: true })
});

export default connect(null, mapDispatchToProps)(App);
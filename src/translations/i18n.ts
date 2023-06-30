import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

//import en_US from './en_US.json';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: {
					/*
					 Commented out translations are because there are duplicate keys.
					 They are staying in the English translation to keep developers aware that the text is in this file,
					 but the keys do not need to be included in the other translations.
					*/

					// App.tsx
					"Setup New Account": "Setup New Account",
					"Setup Encryption": "Setup Encryption",
					"Download latest version": "Download latest version",

					// components/Dropdowns/Options.tsx
					"Options": "Options",
					"Import Account": "Import Account",
					"Settings": "Settings",
					"Quit": "Quit",

					// components/Dropdowns/SelectAccount.tsx
					"Selected Account": "Selected Account",
					"Login again": "Login again",
					"Force session refresh": "Force session refresh",
					"Remove from manifest": "Remove from manifest",
					"Deactivate authenticator": "Deactivate authenticator",

					// components/Modals/ImportAccountModal.tsx
					// "Import Account": "Import Account",
					"Enter encryption passkey": "Enter your encryption passkey if your .maFile is encrypted",
					"Notice": "Notice",
					"Compatibility Notice": "Old ENCRYPTED .maFiles are not compatible with this version of the app. You will need to decrypt your .maFile with the original SDA and re-encrypt it with this version of the app. Non-encrypted .maFiles are fully compatible.",
					"Select .maFile to Import": "Select .maFile to Import",
					"Cancel": "Cancel",

					// components/Modals/NoticeModal.tsx
					"OK": "OK",

					// components/Modals/SettingsModal.tsx
					// "Settings": "Settings",
					"checkForNewConfirmationsDesc": "Periodically check for new confirmations and send a notification when they arrive",
					"secondsBetweenChecksDesc": "Seconds between checking for confirmations",
					"checkAllAccountsDesc": "Check all Steam accounts for confirmations",
					"autoConfirmMarketDesc": "Auto-confirm Steam community market listings",
					"autoConfirmTradesDesc": "Auto-confirm Steam trades",
					"minimalModeDesc": "Minimal UI Mode (Feels more like original SDA)",
					"Save Settings": "Save Settings",

					// components/Modals/SetupSteamAccountModal.tsx
					// "Setup New Account": "Setup New Account",
					"SetupAccountModalDesc": "This will activate Steam Desktop Authenticator v2 on your Steam account. This process requires a phone number that can receive SMS messages.",
					"Login": "Login",
					// "Cancel": "Cancel",

					// components/Modals/SetupEncryptionModal.tsx
					// "Setup Encryption": "Setup Encryption",
					"passwordDescription": "Your password will be used to encrypt your data. You will need this password to access your data in the future. If you forget this password, you will not be able to access your data.",
					"WARNING": "WARNING",
					"noEncryptWarning": "You chose not to encrypt your files. Doing so imposes a security risk for yourself. If an attacker were to gain access to your computer, they could completely lock you out of your account and steal all of your items.",
					"Accept": "Accept",
					// "Cancel": "Cancel",

					// components/AccountsList.tsx
					"Account": "Account",
					"View Confirmations": "View Confirmations",

					// components/TotpManager.tsx
					"Login Token": "Login Token",
					"Copy": "Copy",
					"seconds remaining": "seconds remaining",
					"Copied": "Copied",
				}
			}
		},
		fallbackLng: 'en',
		debug: true
	});

export default i18n;
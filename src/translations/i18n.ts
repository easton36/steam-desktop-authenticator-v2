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
					"Enter encryption passkey": "Enter your encryption passkey",
					"Notice": "Notice",
					"Select .maFile to Import": "Select .maFile to Import",
					"Cancel": "Cancel",
					"accountIsEncryptedDesc": ".maFile is encrypted",
					"encryptedImportNotice": "If you are importing an old SDA .maFile, you will need to select the .maFile AND the manifest.json file that goes with it.",
					"Invalid File Type": "Invalid File Type",
					"Invalid File Type Desc": "You must select a .maFile to import.",
					"Invalid maFile": "Invalid maFile",
					"Invalid maFile Desc": "The selected file is not a valid maFile.",
					"Missing Passkey": "Missing Passkey",
					"Missing Passkey Desc": "You must enter the passkey for the encrypted maFile.",
					"Missing Manifest Data": "Missing Manifest Data",
					"Missing Manifest Data Desc": "The manifest data for this account is missing or corrupted.\nIn order to decrypt this maFile, we need the encryption_iv and encryption_salt from the manifest.json file.",
					"Invalid Passkey": "Invalid Passkey",
					"Invalid Passkey Desc": "The passkey you entered failed to decrypt the maFile.",
					"cantImportBecauseEncryptedError": "You cannot import an maFile right now because encryption is currently enabled. Please disable encryption and try again.",

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
					"passwordStrengthWeakDesc": "Weak. Should contain at least 8 characters.",
					"passwordStrengthFairDesc": "So-so. Should contain both uppercase and lowercase characters, and a number.",
					"passwordStrengthGoodDesc": "Almost. Should be 10 characters long and contain special symbols for extra security.",
					"passwordStrengthStrongDesc": "Awesome! You have a secure password.",
					"passwordNotMatch": "Passwords do not match",
					
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
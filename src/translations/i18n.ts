import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translations: {
					// App.tsx
					"Setup New Account": "Setup New Account",
					"Setup Encryption": "Setup Encryption",
					"Download latest version": "Download latest version",

					// components/Modals/Dropdowns/Options.tsx
					"Options": "Options",
					"Import Account": "Import Account",
					"Settings": "Settings",
					"Quit": "Quit",

					// components/Modals/Dropdowns/SelectAccount.tsx
					"Selected Account": "Selected Account",
					"Login again": "Login again",
					"Force session refresh": "Force session refresh",
					"Remove from manifest": "Remove from manifest",
					"Deactivate authenticator": "Deactivate authenticator",
				}
			}
		},
		fallbackLng: 'en',
		debug: true
	});

export default i18n;
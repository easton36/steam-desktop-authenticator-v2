<h1 align="center">
  <img  src="https://raw.githubusercontent.com/easton36/steam-desktop-authenticator-v2/master/src-tauri/icons/icon.png" height="64" width="64" />
  <br/>
  Steam Desktop Authenticator v2
</h1>

<p align="center">
  A desktop implementation of Steam's mobile authenticator app.<br/>
  Completely rebuilt version of the original <a href="https://github.com/Jessecar96/SteamDesktopAuthenticator" target="_blank">SteamDesktopAuthenticator<a/> by <a href="https://github.com/Jessecar96" target="_blank">Jessecar96</a>, using Tauri and React.
</p>

<h3 align="center" style="margin-bottom:0">
  <a href="https://github.com/easton36/steam-desktop-authenticator-v2/releases">Download here</a>
</h3>
<p align="center">Currently only built for Windows, but MacOS and Linux builds should be coming soon.</p>
<br>

**REMEMBER: Always make backups of your `maFiles` directory! If you lose your encryption key or delete `maFiles` by accident AND you didn't save your revocation code, you are screwed.**

**FINALLY: Using this application is a bad idea, because it COMPLETELY DEFEATS THE PURPOSE of two-factor authentication! If your desktop is infected with a virus, it will be able to hijack the authenticator app and completely subvert the protection. THIS APPLICATION DOES NOT PROTECT YOUR ACCOUNT; IT ONLY ALLOWS YOU TO USE STEAM FEATURES THAT REQUIRE THE AUTHENTICATOR WITHOUT HAVING A PHONE. If you have a phone that supports the Mobile Authenticator, you really shouldn't use this application!**

IF you lost your `maFiles` OR lost your encryption key, go [here](https://store.steampowered.com/twofactor/manage) and click "Remove Authenticator" then enter your revocation code that you wrote down when you first added your account to SDA.

If you did not follow the directions and did not write your revocation code down, you're well and truly screwed. The only option is beg to [Steam Support](https://support.steampowered.com/) and say you lost your mobile authenticator and the revocation code.

## Compatibility Notice
 - Iconic "maFiles" are now just "JSON" files, but will still be referred to as "maFiles" in the app
 - Original SDA maFiles are able to be imported into SDA v2, but will be converted to the new format
	- This means that you will not be able to use the original SDA with the maFiles that were converted to the new format

## Features
 - Manage many Steam accounts at once
 - View and confirm all pending Steam trades and market listings
 - Add and remove Steam Guard Mobile Authenticator
 - Generate Steam Guard 2FA codes
 - AES 256-bit encryption of Steam Account `maFiles` directory
	- Password strength meter
 - Multiple language support
 - Auto-updater
 - Cross-platform (Windows, MacOS, Linux)
 - Light and dark themes
 - Custom accent colors
 - Tray icon with context menu
 - Auto-start on system login
 - Exit and stay running in system tray

## Contributing
If you want to contribute to the project, please read the [Contributing](https://github.com/easton36/steam-desktop-authenticator-v2/blob/master/CONTRIBUTING.md) document first.

## License
This project is licensed under the [MIT License](https://github.com/easton36/steam-desktop-authenticator-v2/blob/master/LICENSE).

## Credits
 - [Jessecar96](https://github.com/Jessecar96) for creating the original [SteamDesktopAuthenticator](https://github.com/Jessecar96/SteamDesktopAuthenticator)
 - [DoctorMckay](https://github.com/DoctorMcKay) for creating all of the Steam libraries used in this project
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use tauri::{SystemTray, SystemTrayMenu, SystemTrayMenuItem, CustomMenuItem};

fn main() {
	// let tray_menu = SystemTrayMenu::new()
	// 	.add_item(CustomMenuItem::new("open", "Restore"))
	// 	.add_item(CustomMenuItem::new("quit".to_string(), "Quit"))
	// 	.add_native_item(SystemTrayMenuItem::Separator)
	// 	.add_item(CustomMenuItem::new("hide".to_string(), "Hide"));

	// let system_tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
		// .system_tray(system_tray)
        .build(tauri::generate_context!())
        .expect("error while running tauri application");
}
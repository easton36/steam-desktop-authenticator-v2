// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{ SystemTrayMenu, SystemTray, CustomMenuItem, SystemTrayMenuItem, SystemTrayEvent, Manager };
use std::fs::{ OpenOptions, remove_file };
use std::io::ErrorKind;
use dirs::config_local_dir;
use rfd;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

static LOCK_FILE: &str = "steam-desktop-authenticator-v2.lock";

fn main() {
	// Attempt to create a lock file
	let lock_path = config_local_dir().unwrap().join(LOCK_FILE);

	let file = OpenOptions::new()
		.write(true)
		.create_new(true)
		.open(lock_path);

	// Check if the file is already created (meaning another instance is running)
	if let Err(ref error) = file {
		if error.kind() == ErrorKind::AlreadyExists {
			rfd::MessageDialog::new()
				.set_title("Steam Desktop Authenticator v2")
				.set_description("The application is already running in the system tray.
					\nLeft-click the icon to restore the window. Or right-click and select Restore Window.
					\nIf you can't see it, try clicking the arrow button in the system tray to show hidden icons.
				")
				.set_level(rfd::MessageLevel::Warning)
				.set_buttons(rfd::MessageButtons::Ok)
				.show();
			
			// Exit the application immediately
			std::process::exit(1);
		}
	}

	let tray_menu = SystemTrayMenu::new()
		.add_item(CustomMenuItem::new("restore".to_string(), "Restore Window"))
		// .add_item(CustomMenuItem::new("trade_confirms".to_string(), "Trade Confirmations"))
		// .add_item(CustomMenuItem::new("copy_code".to_string(), "Copy Steam Guard Code"))
		.add_native_item(SystemTrayMenuItem::Separator)
		.add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
 	let system_tray = SystemTray::new()
    	.with_menu(tray_menu);

    tauri::Builder::default()
		.system_tray(system_tray)
		.on_system_tray_event(|app, event| match event {
			SystemTrayEvent::LeftClick {
				position: _,
				size: _,
				..
			} => {
				// restore the window, if it's closed
				if let Some(window) = app.get_window("main") {
					window.show().unwrap();
					window.set_focus().unwrap();
				}
			}
			SystemTrayEvent::MenuItemClick { id, .. } => {
				match id.as_str() {
					"restore" => {
						// restore the window, if it's closed
						if let Some(window) = app.get_window("main") {
							window.show().unwrap();
							window.set_focus().unwrap();
						}
					}
					"quit" => {
						// remove the lock file
						let lock_path = config_local_dir().unwrap().join(LOCK_FILE);
						let _ = remove_file(lock_path);

						std::process::exit(0);
					}
						_ => {}
					}
				}
			_ => {}
		})
		.on_window_event(|event| match event.event() {
			tauri::WindowEvent::CloseRequested { api, .. } => {
				event.window().hide().unwrap();
				api.prevent_close();
			}
			_ => {}
		})
        .invoke_handler(tauri::generate_handler![greet])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
		.run(|_app_handle, event| match event {
			tauri::RunEvent::ExitRequested { api, .. } => {
			  api.prevent_exit();
			}
			// destroy the lock file when the application exits
			tauri::RunEvent::Exit => {
				let lock_path = config_local_dir().unwrap().join(LOCK_FILE);
				let _ = remove_file(lock_path);
			}
			_ => {}
		});
}
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{ SystemTrayMenu, SystemTray, CustomMenuItem, SystemTrayMenuItem, SystemTrayEvent, Manager };

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
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
			_ => {}
		});
}
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use md5;
use crypto_hash::{Algorithm, hex_digest};

#[tauri::command]
fn md5_hash(text: &str) -> String {
    let hash = md5::compute(text);
    format!("{:x}", hash)
}

#[tauri::command]
fn sha1_hash(text:&str) -> String{
    hex_digest(Algorithm::SHA1, text.as_bytes())
  
}
#[tauri::command]
fn sha256_hash(text:&str) -> String{
    hex_digest(Algorithm::SHA256, text.as_bytes())

}
#[tauri::command]
fn sha512_hash(text:&str) -> String{
    hex_digest(Algorithm::SHA512, text.as_bytes())

}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![md5_hash,sha1_hash,sha256_hash,sha512_hash])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

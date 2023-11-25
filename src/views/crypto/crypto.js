 
import CryptoJS from "crypto-js";
 
// 加密
export function cbcEncrypt(pwd, key, iv) {
  pwd = CryptoJS.enc.Utf8.parse(pwd) // 解析明文
  key = CryptoJS.enc.Utf8.parse(key) // 解析密钥
  iv = CryptoJS.enc.Utf8.parse(iv)
  const encrypted = CryptoJS.AES.encrypt(pwd, key, {
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7, // 填充方式
    iv // 向量
  })
  return encrypted.toString() // 加密后的结果是对象，要转为文本

}
 
// 解密
export function cbcDecrypt(encryptedPwd, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key); // 解析密钥
  iv = CryptoJS.enc.Utf8.parse(iv); // 解析向量
  const decrypted = CryptoJS.AES.decrypt(encryptedPwd, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC, // 解密模式
    padding: CryptoJS.pad.Pkcs7 // 填充方式
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // 解密后的结果转为文本
}

// ECB 模式加密
export function ecbEncrypt(pwd, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const encrypted = CryptoJS.AES.encrypt(pwd, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

// ECB 模式解密
export function ecbDecrypt(encryptedPwd, key) {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const decrypted = CryptoJS.AES.decrypt(encryptedPwd, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}


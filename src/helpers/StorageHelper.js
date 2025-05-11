import { decrypt, encrypt } from "./encryptionHelper";

export function setLocalStorageData(key, data) {
  let encryptData = encrypt(data);
  localStorage.setItem(key, encryptData);
}

export function getLocalStoragedata(key) {
  let data = localStorage.getItem(key);

  try {
    return JSON.parse(data);
  } catch (e) {
    try {
      const decryptedData = decrypt(data);
      return JSON.parse(decryptedData);
    } catch (decryptError) {
      return null;
    }
  }
}

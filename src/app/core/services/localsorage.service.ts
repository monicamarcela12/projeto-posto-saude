import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";

const SECRET_KEY = "secret_key";

@Injectable()
export class StorageService {

  constructor() {}

    setLocalStorage(key: string, value: any){
      return localStorage.setItem(window.btoa(key), this.encrypt(value))
    }

    getLocalStorage(key: string){
      if(localStorage.getItem(window.btoa(key))){
        let itemKey = localStorage.getItem(window.btoa(key))
        return this.decrypt(itemKey)
      }else{
        return false
      }
    }

    removeLocalStorage(key:string){
      if(localStorage.getItem(window.btoa(key))){
        return localStorage.removeItem(window.btoa(key))
      }else{
        return false
      }
    }

    private encrypt(data){
      data = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
      return data;
    }
    
    private decrypt(data){
      let decryptedData
      let bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
      if(bytes.toString(CryptoJS.enc.Utf8)) decryptedData =  JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    }
}

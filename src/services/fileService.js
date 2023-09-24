import axios from "axios";
import sha1 from 'crypto-js/sha1';

class FileService {
    static uploadImage(imgFile) {
        const formData = new FormData();
        formData.append("file", imgFile);
        formData.append('upload_preset', 'ohg5krtr');

        return axios.post("https://api-ap.cloudinary.com/v1_1/dzq57irpw/image/upload", formData);
    }
    static destroyAvatar(file) {
        console.log('file', file);
        const timestamp = new Date().getTime();
        const public_id = file;
        const api_key = "341629959664223";
        const api_secret_key = "R-qJrfusG9HoV-mLwBU6U7p8RWg";
        const shaString = `public_id=${public_id}&timestamp=${timestamp}&api_key${api_secret_key}`;
        var sha1 = require("crypto-js/sha1");
        const signature = sha1(shaString)

        console.log('s: ', signature);
        const formData = new FormData();
        formData.append("public_id", public_id);
        formData.append("signature", signature);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp);
        return axios.post('https://api-ap.cloudinary.com/v1_1/dtxyz2s1g/image/destroy', formData);
    }
}

export default FileService;

// cloud_name: dzq57irpw
// api_key: 341629959664223
// api_secret_key: R-qJrfusG9HoV-mLwBU6U7p8RWg
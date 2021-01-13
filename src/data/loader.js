import {addHTTPS} from './utils';
const SERVER_URL = `https://swapi.dev/api/people`;

const checkStatus = (response) => {
    if (response.ok) {
        return response;
    } else {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
};

const toJSON = (res) => res.json();

export default class Loader {
    static async loadData(queryObject) {
        let stringRequest = ``;
        if (queryObject) {
            let searchParams = new URLSearchParams(); 
            searchParams.append(`search`, queryObject);
            stringRequest = `/?${searchParams.toString()}`;
        }
        let result;
        try {
            const response = checkStatus(await fetch(`${SERVER_URL}${stringRequest}`));
            result = toJSON(response);
        }
        catch (e) {
            throw new Error(e.message);
        }
        return result;
    }
    static async load(url) {
        const urlWithHTTPS = addHTTPS(url);
        let result;
        try {
            const response = checkStatus(await fetch(urlWithHTTPS));            
            result = toJSON(response);
        }
        catch (e) {
            throw new Error(e.message);
        }
        return result;
    }
}
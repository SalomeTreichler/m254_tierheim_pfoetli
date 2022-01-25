import axios from 'axios';

const url = 'http://localhost:3002/api'

export function getAnimals(callback, errorCallback) {
    axios.get(url + '/get')
        .then(res => {
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            if(errorCallback != null) {
                errorCallback(err);
            }
        })
}

export function getAnimalById(id, callback, errorCallback) {
    axios.get(url + '/getById/' + id)
        .then(res => {
            if (callback != null) {
                callback(res);
            }
        })
        .catch(err => {
            if(errorCallback != null) {
                errorCallback(err);
            }
        })
}
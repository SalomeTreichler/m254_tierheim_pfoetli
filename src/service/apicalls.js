import axios from 'axios';

const url = 'http://localhost:3002/api'

export function getAnimals(callback, errorCallback) {
    axios.get(url + '/animals')
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

export function addAnimal(animal) {
    axios.post(url + '/animal', {
        name: animal.name,
        species: animal.species,
        breed: animal.breed,
        comment: animal.comment,
        status: animal.status
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
}

export function updateAnimal(id, animal) {
    axios.post(url + '/animal/' + id, {
        name: animal.name,
        species: animal.species,
        breed: animal.breed,
        comment: animal.comment,
        status: animal.status
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })
}
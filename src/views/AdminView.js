import React, {useState, useEffect} from 'react';
import { getAnimals } from '../service/apicalls';

const AdminView=()=> {
    const [animalsList, setAnimalList] = useState([]);

    useEffect(() => {
        getAnimals((res) => {
            setAnimalList(res)
        }, (err) => {
            console.error(err)
        });
    }, [animalsList])

    return (
        <h1>Hi Admin</h1>
    );
}

export default AdminView;
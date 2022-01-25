import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const AdminView=()=> {
    const [animalsList, setAnimalList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3002/api/get").then((res)=>{
            setAnimalList(res.data);
        });
    }, []);

    console.log(animalsList);
    return (
        <h1>Hi Admin</h1>
    );
}

export default AdminView;
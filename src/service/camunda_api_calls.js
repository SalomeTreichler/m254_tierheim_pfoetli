import axios from 'axios';
import {wait} from "@testing-library/user-event/dist/utils";

const url = 'http://localhost:8080/engine-rest'

export function startAdminTask(callback, errorCallback) {
    axios.get(url + '/process-definition/key/Tierheim_Besucher/start')
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

export function startVisitorTask(animalsAreAvailable) {
    const data = JSON.stringify({
        "variables": {
            "animals_available": {
                "value": animalsAreAvailable,
                "type": "boolean"
            }
        }
    });

    const config = {
        method: 'post',
        url: 'http://localhost:8080/engine-rest/process-definition/key/Tierheim_Besucher/start',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}

async function getNextTaskByTaskId(taskDefinitionKey) {
    const config = {
        method: 'get',
        url: 'http://localhost:8080/engine-rest/task',
        headers: { }
    };

    return axios(config)
        .then(function (response) {
            return response.data.filter(task => task.taskDefinitionKey === taskDefinitionKey)
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function completeTask(taskDefinitionKey, requestBody){
    const tasks = await getNextTaskByTaskId(taskDefinitionKey)
    const data = requestBody ? requestBody : JSON.stringify({});

    const config = {
        method: 'post',
        url: 'http://localhost:8080/engine-rest/task/'+ tasks[0].id +'/complete',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}
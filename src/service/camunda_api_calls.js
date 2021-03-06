import axios from 'axios';

export function startAdminTask() {
    var data = JSON.stringify({});

    var config = {
        method: 'post',
        url: 'http://localhost:8080/engine-rest/process-definition/key/Tierheim_Administration/start',
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
    const data = requestBody ? JSON.stringify(requestBody) : JSON.stringify({});

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
// import axios from 'axios';

const axios = require('axios');
const url = "https://jsonplaceholder.typicode.com/users";


axios.get(url).then(({data}) =>
{
    data.forEach(element => {
        console.log(element.username)
    })
}
)

axios.post(url, {
    username:"foo",
    mail: "foo@foo.com"
}).then(response => {
    if(response.status === 201 ){
       console.log("Registro completo"); 
    }
})
// test.js
import axios from 'axios';

axios.get('http://localhost:8000/users', {
    params: {
        job: 'Professor'
    }
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
});


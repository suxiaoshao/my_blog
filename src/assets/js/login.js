import axios from 'axios'
axios.defaults.withCredentials = true;
function is_login(next) {
    axios
        .post('http://122.51.194.238:5000/api/blog/home/is_login')
        .then(response => {
            if (response.data.success) {
                next()
            }
            else {
                next({ name: 'Home' })
            }
        })
        .catch(error => {
            console.log(error)
            next({ name: 'Home' })
        })
}
export {
    is_login
}
import axios from 'axios'
let service=axios.create({
    baseURL:'https://netease-cloud-music-api-iota-fawn.vercel.app',
    timeout:5000
})
export default service
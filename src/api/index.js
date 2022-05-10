import axios from 'axios'
import key from '../../key.json'

export default () => {
    return axios.create({
        baseURL:'https://opendata.resas-portal.go.jp',
        headers:{
            'X-API-KEY': key['resasu-key']
        }
    })
}
import { baseURL } from 'assets/constants'

const axios = require('axios').default.create({
    baseURL: baseURL,
    headers: {'Content-Type' : 'application/json'}
  });

export function login(login: string, password : string) {
    axios.post('auth/login',  {
        login: login,
        password: password
      })
        .then(function (resp: any) {
          return {'access_token': resp.data.access_token};
        })
        .catch(function (error: any) {
          return {'error': error.response.data.message};
        });
    }


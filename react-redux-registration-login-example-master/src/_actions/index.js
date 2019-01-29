//export * from './alert.actions';
//export * from './user.actions';
//const API_ROOT = 

const Auth = {
    current: () =>
      requests.get('/user'),
    login: (username, password) =>
      requests.post('/users/login', { user: { username, password } }),
    register: (firstname,lastname,username, password) =>
      requests.post('/users', { user: { firstname,lastname,username, password } }),
    save: user =>
      requests.put('/user', { user })
  };
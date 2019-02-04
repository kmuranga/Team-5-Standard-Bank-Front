const users = {
    1: {firstName:"KB",lastName:"Morake",username:"kbmorake",password:"test1234",salt:null},
    2: {firstName:"Jack",lastName:"Wilson",username:"j_w",password:"wilsononthej",salt:null},
  };
  
  export default function request(url) {
    return new Promise((resolve, reject) => {
      const userID = parseInt(url.substr('/users/'.length), 10);
      process.nextTick(() =>
        users[userID]
          ? resolve(users[userID])
          : reject({
              error: 'User with ' + userID + ' not found.',
            }),
      );
    });
  }
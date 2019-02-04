const userService = require('../_services/user.service');

jest.mock('../request');

import * as user from '../user';

// The assertion for a promise must be returned from mock.
it('works with promises', () => {
    return user.getUserName(1).then(data => expect(data).toEqual('KB'));
    expect.assertions(1);
  });

  it('works with resolves', () => {
    return expect(user.getUserName(2)).resolves.toEqual('Jack');
    expect.assertions(1);
  });  

//from actual API
// it('Should return a user', () => {
//     return userService.userService.getById(1).then(data => expect(data.firstName).toEqual("KB"));
//     expect.assertions(1);
//   });
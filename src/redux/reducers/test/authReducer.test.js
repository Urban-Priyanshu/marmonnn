import { ActionTypes } from '../../constants/action-types';
import reducer from '../authReducer';

import expect from 'expect';

describe('Authenticate  Users  reducer  state', () => {
  const payload = {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifSx7ImF1dGhvcml0eSI6IlJPTEVfU0FMRVNfVVNFUiJ9XSwiaWF0IjoxNjYxMTYxOTA5LCJleHAiOjE2NjExODM1MDl9.Eoi4Ycb7DaGX5m0vPQYKjgt94RVOAiYdIBHZ0lxOsPA'
  };

  const token = {
    token:
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifSx7ImF1dGhvcml0eSI6IlJPTEVfU0FMRVNfVVNFUiJ9XSwiaWF0IjoxNjYxMTYxOTA5LCJleHAiOjE2NjExODM1MDl9.Eoi4Ycb7DaGX5m0vPQYKjgt94RVOAiYdIBHZ0lxOsPA'
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('Authenticate user and return token', () => {
    const type = ActionTypes.AUTHENTICATE_USER;
    expect(reducer(undefined, { type, payload })).toEqual({ token });
  });
});

describe('Get Auth User', () => {
  const payload = {
    id: 71,
    firstName: 'Rajeev1',
    lastName: 'Singh1',
    email: 'hail.rajeev@gmail.com',
    lastLogin: '2022-08-22T01:58:00.264+00:00',
    jobTitle: null,
    createdBy: 'peter.parker@invaliddomain.som',
    createdDate: '2022-08-22T01:54:29.900+00:00',
    updatedBy: 'hail.rajeev@gmail.com',
    updatedDate: '2022-08-22T02:01:14.182+00:00',
    roles: [
      {
        id: 1,
        code: 'ROLE_SUPER_ADMIN',
        description: 'Super Admin',
        authority: 'ROLE_SUPER_ADMIN'
      }
    ],
    type: {
      id: 1,
      code: 'I',
      description: 'Internal'
    },
    status: {
      id: 3,
      code: 'RS',
      description: 'Request Sent'
    }
  };

  const authUserData = {
    id: 71,
    firstName: 'Rajeev1',
    lastName: 'Singh1',
    email: 'hail.rajeev@gmail.com',
    lastLogin: '2022-08-22T01:58:00.264+00:00',
    jobTitle: null,
    createdBy: 'peter.parker@invaliddomain.som',
    createdDate: '2022-08-22T01:54:29.900+00:00',
    updatedBy: 'hail.rajeev@gmail.com',
    updatedDate: '2022-08-22T02:01:14.182+00:00',
    roles: [
      {
        id: 1,
        code: 'ROLE_SUPER_ADMIN',
        description: 'Super Admin',
        authority: 'ROLE_SUPER_ADMIN'
      }
    ],
    type: {
      id: 1,
      code: 'I',
      description: 'Internal'
    },
    status: {
      id: 3,
      code: 'RS',
      description: 'Request Sent'
    }
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.GET_AUTH_USER;
    expect(reducer(undefined, { type, payload })).toEqual({ authUserData });
  });
});

describe('Verify user  reducer', () => {
  const payload = 'User exists!';

  const verifyUser = 'User exists!';

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should verify user', () => {
    const type = ActionTypes.GET_VERIFY_USER;
    expect(reducer(undefined, { type, payload })).toEqual({ verifyUser });
  });
});

describe('Logout  reducer', () => {
  const payload = 'OK';

  const state = undefined;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type = ActionTypes.LOGOUT;
    expect(reducer(undefined, { type, payload })).toEqual({ state });
  });
});

describe('Get specific User By Roles  reducer', () => {
  const payload = [
    {
      id: 71,
      firstName: 'Rajeev1',
      lastName: 'Singh1',
      email: 'hail.rajeev@gmail.com',
      lastLogin: '2022-08-22T01:58:00.264+00:00',
      jobTitle: null,
      createdBy: 'peter.parker@invaliddomain.som',
      createdDate: '2022-08-22T01:54:29.900+00:00',
      updatedBy: 'hail.rajeev@gmail.com',
      updatedDate: '2022-08-22T02:01:14.182+00:00',
      roles: [
        {
          id: 1,
          code: 'ROLE_SUPER_ADMIN',
          description: 'Super Admin',
          authority: 'ROLE_SUPER_ADMIN'
        }
      ],
      type: {
        id: 1,
        code: 'I',
        description: 'Internal'
      },
      status: {
        id: 3,
        code: 'RS',
        description: 'Request Sent'
      }
    }
  ];

  const usersByRole = [
    {
      id: 71,
      firstName: 'Rajeev1',
      lastName: 'Singh1',
      email: 'hail.rajeev@gmail.com',
      lastLogin: '2022-08-22T01:58:00.264+00:00',
      jobTitle: null,
      createdBy: 'peter.parker@invaliddomain.som',
      createdDate: '2022-08-22T01:54:29.900+00:00',
      updatedBy: 'hail.rajeev@gmail.com',
      updatedDate: '2022-08-22T02:01:14.182+00:00',
      roles: [
        {
          id: 1,
          code: 'ROLE_SUPER_ADMIN',
          description: 'Super Admin',
          authority: 'ROLE_SUPER_ADMIN'
        }
      ],
      type: {
        id: 1,
        code: 'I',
        description: 'Internal'
      },
      status: {
        id: 3,
        code: 'RS',
        description: 'Request Sent'
      }
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  // it('should return UsersData', () => {
  //   const type =ActionTypes.GET_SPECIFIC_USERS_BY_ROLE;
  //   expect(reducer(undefined, {type , payload })).toEqual({usersByRole});
  // });
});


describe('Get Auth User Detail reducer', () => {
  const payload = {
   
      id: 10,
      firstName: 'deepanshu',
      lastName: 'Tyagi',
      email: 'Deepanshu.Tyagi@compunneldigital.com',
      status: 'Request Sent',
      type: 'Internal',
      jobTitle: '',
      jobType: null
   
}

  const userData = {
    id: 10,
    firstName: 'deepanshu',
    lastName: 'Tyagi',
    email: 'Deepanshu.Tyagi@compunneldigital.com',
    status: 'Request Sent',
    type: 'Internal',
    jobTitle: '',
    jobType: null
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should return UsersData', () => {
    const type =ActionTypes.GET_AUTH_USER_DETAIL;
    expect(reducer(undefined, {type , payload })).toEqual({userData});
  });
});

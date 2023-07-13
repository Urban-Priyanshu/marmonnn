

import { ActionTypes } from '../../constants/action-types';
import reducer from '../userReducer';

// import { UPDATE_POST_SUCCESS } from '../actions/posts/updatePost';
import expect from 'expect';


describe('Get Users  reducer  state', () => {

    
    const payload= [
        {
          id:71,
          firstName:"Rajeev1",
          lastName:"Singh1",
          email:"hail.rajeev@gmail.com",
          lastLogin:"2022-08-22T01:58:00.264+00:00",
          jobTitle:null,
          createdBy:"peter.parker@invaliddomain.som",
          createdDate:"2022-08-22T01:54:29.900+00:00",
          updatedBy:"hail.rajeev@gmail.com",
          updatedDate:"2022-08-22T02:01:14.182+00:00",
          roles:[
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          type:{
            id:1,
            code:"I",
            description:"Internal"
          },
          status:{
            id:3,
            code:"RS",
            description:"Request Sent"
          }
        }
      ]


      const usersData =[
        {
          id:71,
          firstName:"Rajeev1",
          lastName:"Singh1",
          email:"hail.rajeev@gmail.com",
          lastLogin:"2022-08-22T01:58:00.264+00:00",
          jobTitle:null,
          createdBy:"peter.parker@invaliddomain.som",
          createdDate:"2022-08-22T01:54:29.900+00:00",
          updatedBy:"hail.rajeev@gmail.com",
          updatedDate:"2022-08-22T02:01:14.182+00:00",
          roles:[
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          type:{
            id:1,
            code:"I",
            description:"Internal"
          },
          status:{
            id:3,
            code:"RS",
            description:"Request Sent"
          }
        }
      ]
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_USERS;
    expect(reducer(undefined, {type , payload })).toEqual({usersData});
  });


  


});

describe('Get single user  reducer  state', () => {

    
    const payload= 
        {
          id:71,
          firstName:"Rajeev1",
          lastName:"Singh1",
          email:"hail.rajeev@gmail.com",
          lastLogin:"2022-08-22T01:58:00.264+00:00",
          jobTitle:null,
          createdBy:"peter.parker@invaliddomain.som",
          createdDate:"2022-08-22T01:54:29.900+00:00",
          updatedBy:"hail.rajeev@gmail.com",
          updatedDate:"2022-08-22T02:01:14.182+00:00",
          roles:[
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          type:{
            id:1,
            code:"I",
            description:"Internal"
          },
          status:{
            id:3,
            code:"RS",
            description:"Request Sent"
          }
        }
      


      const userData =
        {
          id:71,
          firstName:"Rajeev1",
          lastName:"Singh1",
          email:"hail.rajeev@gmail.com",
          lastLogin:"2022-08-22T01:58:00.264+00:00",
          jobTitle:null,
          createdBy:"peter.parker@invaliddomain.som",
          createdDate:"2022-08-22T01:54:29.900+00:00",
          updatedBy:"hail.rajeev@gmail.com",
          updatedDate:"2022-08-22T02:01:14.182+00:00",
          roles:[
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          type:{
            id:1,
            code:"I",
            description:"Internal"
          },
          status:{
            id:3,
            code:"RS",
            description:"Request Sent"
          }
        }
      
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_USER;
    expect(reducer(undefined, {type , payload })).toEqual({userData});
  });


  


});



describe('Get Roles  reducer', () => {

    
    const payload=[
    {
        id:1,
        code:"ROLE_SUPER_ADMIN",
        description:"Super Admin",
        authority:"ROLE_SUPER_ADMIN"
    },
    {
        id:2,
        code:"ROLE_SYSTEM_ADMIN",
        description:"System Admin",
        authority:"ROLE_SYSTEM_ADMIN"
    }
    ,{
        id:3,
        code:"ROLE_SALES_USER",
        description:"Sales Use",
        authority:"ROLE_SALES_USER"
    }
]
      


      const roles =[
        {
        id:1,
        code:"ROLE_SUPER_ADMIN",
        description:"Super Admin",
        authority:"ROLE_SUPER_ADMIN"
    },
    {
        id:2,
        code:"ROLE_SYSTEM_ADMIN",
        description:"System Admin",
        authority:"ROLE_SYSTEM_ADMIN"
    },
    {
        id:3,
        code:"ROLE_SALES_USER",
        description:"Sales Use",
        authority:"ROLE_SALES_USER"
    }
]
      
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_ROLES;
    expect(reducer(undefined, {type , payload })).toEqual({roles});
  });


  


});



describe('Get specific User By Roles  reducer', () => {

    
    const payload=[
        {
            id:71,
            firstName:"Rajeev1",
            lastName:"Singh1",
            email:"hail.rajeev@gmail.com",
            lastLogin:"2022-08-22T01:58:00.264+00:00",
            jobTitle:null,
            createdBy:"peter.parker@invaliddomain.som",
            createdDate:"2022-08-22T01:54:29.900+00:00",
            updatedBy:"hail.rajeev@gmail.com",
            updatedDate:"2022-08-22T02:01:14.182+00:00",
            roles:[
              {
                id: 1,
                code: 'ROLE_SUPER_ADMIN',
                description: 'Super Admin',
                authority: 'ROLE_SUPER_ADMIN'
              }
            ],
            type:{
              id:1,
              code:"I",
              description:"Internal"
            },
            status:{
              id:3,
              code:"RS",
              description:"Request Sent"
            }
          }
   
]
      


      const usersByRole =[

        {
            id:71,
            firstName:"Rajeev1",
            lastName:"Singh1",
            email:"hail.rajeev@gmail.com",
            lastLogin:"2022-08-22T01:58:00.264+00:00",
            jobTitle:null,
            createdBy:"peter.parker@invaliddomain.som",
            createdDate:"2022-08-22T01:54:29.900+00:00",
            updatedBy:"hail.rajeev@gmail.com",
            updatedDate:"2022-08-22T02:01:14.182+00:00",
            roles:[
              {
                id: 1,
                code: 'ROLE_SUPER_ADMIN',
                description: 'Super Admin',
                authority: 'ROLE_SUPER_ADMIN'
              }
            ],
            type:{
              id:1,
              code:"I",
              description:"Internal"
            },
            status:{
              id:3,
              code:"RS",
              description:"Request Sent"
            }
          }
   
     
]
      
    

      
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });


  it('should return UsersData', () => {
    const type =ActionTypes.GET_SPECIFIC_USERS_BY_ROLE;
    expect(reducer(undefined, {type , payload })).toEqual({usersByRole});
  });


  


});



describe('Get Resend Email   reducer', () => {

    
  const payload=[
      {
          id:71,
          firstName:"Rajeev1",
          lastName:"Singh1",
          email:"hail.rajeev@gmail.com",
          lastLogin:"2022-08-22T01:58:00.264+00:00",
          jobTitle:null,
          createdBy:"peter.parker@invaliddomain.som",
          createdDate:"2022-08-22T01:54:29.900+00:00",
          updatedBy:"hail.rajeev@gmail.com",
          updatedDate:"2022-08-22T02:01:14.182+00:00",
          roles:[
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          type:{
            id:1,
            code:"I",
            description:"Internal"
          },
          status:{
            id:3,
            code:"RS",
            description:"Request Sent"
          }
        }
 
]
    


    const usersByRole =[

      {
          id:71,
          firstName:"Rajeev1",
          lastName:"Singh1",
          email:"hail.rajeev@gmail.com",
          lastLogin:"2022-08-22T01:58:00.264+00:00",
          jobTitle:null,
          createdBy:"peter.parker@invaliddomain.som",
          createdDate:"2022-08-22T01:54:29.900+00:00",
          updatedBy:"hail.rajeev@gmail.com",
          updatedDate:"2022-08-22T02:01:14.182+00:00",
          roles:[
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          type:{
            id:1,
            code:"I",
            description:"Internal"
          },
          status:{
            id:3,
            code:"RS",
            description:"Request Sent"
          }
        }
 
   
]
    
  

    
it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({});
});


it('should return UsersData', () => {
  const type =ActionTypes.GET_SPECIFIC_USERS_BY_ROLE;
  expect(reducer(undefined, {type , payload })).toEqual({usersByRole});
});





});







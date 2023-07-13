import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { fireEvent, screen } from '@testing-library/jest-dom';
import EditForm from '../EditForm';
import { getUser, getUserRoles } from '../../../../redux/actions/userActions';
// import { useEffect } from 'react';

import { BrowserRouter, useLocation } from 'react-router-dom';


import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from '../shallow';

import * as reactRedux from 'react-redux';

import { unmountComponentAtNode } from 'react-dom';

import thunk from 'redux-thunk';
import EditUser from '../index';

const mockStore = configureMockStore([thunk]);

jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
  useEffect: jest.fn()
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));

describe('EditUser', () => {
  let wrapper;
  const store = mockStore({
    users: {
      userData: [
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
        },
        {
          id: 74,
          firstName: 'test user 10',
          lastName: 'new test',
          email: 'test123@gmailyahoo.com',
          lastLogin: null,
          jobTitle: null,
          createdBy: 'peter.parker@invaliddomain.som',
          createdDate: '2022-08-22T10:03:31.017+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-08-22T13:45:58.149+00:00',
          type: {
            id: 1,
            code: 'I',
            description: 'Internal'
          },
          roles: [
            {
              id: 1,
              code: 'ROLE_SUPER_ADMIN',
              description: 'Super Admin',
              authority: 'ROLE_SUPER_ADMIN'
            }
          ],
          status: {
            id: 3,
            code: 'RS',
            description: 'Request Sent'
          }
        }
      ],

      roles: [
        {
          id: 1,
          code: 'ROLE_SUPER_ADMIN',
          description: 'Super Admin',
          authority: 'ROLE_SUPER_ADMIN'
        },
        {
          id: 2,
          code: 'ROLE_SYSTEM_ADMIN',
          description: 'System Admin',
          authority: 'ROLE_SYSTEM_ADMIN'
        }
      ]
    },
    auth: {
      token: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
      }
    }
  });

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = mount(ShallowMock(<BrowserRouter><EditUser /></BrowserRouter>, store));
  });

  afterEach(() => {
    // wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component Edituser', () => {
    expect(wrapper.find('EditUser')).toBeTruthy();
  });

  it('render component EditForm', () => {
    expect(wrapper.find('EditForm')).toBeTruthy();
  });

  it('mount html', () => { });

  it('renders one time edit form', () => {
    const EditForm = wrapper.find('EditForm');
    expect(EditForm.length).toEqual(1);
  });

  it('Breadcrumb is there', () => {
    const Breadcrumb = wrapper.find('Breadcrumb');
    expect(Breadcrumb.length).toEqual(1);
  });

  // it('dispatch get user action', () => {
  //   store.dispatch = jest.fn();
  //   // Arrange

  //   store.dispatch(
  //     getUser(
  //       1,
  //       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
  //     )
  //   );
  // });

  // it('dispatch get userRole action', () => {
  //   // Arrange
  //   store.dispatch = jest.fn();
  //   store.dispatch(
  //     getUserRoles(
  //       'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
  //     )
  //   );
  // });
});

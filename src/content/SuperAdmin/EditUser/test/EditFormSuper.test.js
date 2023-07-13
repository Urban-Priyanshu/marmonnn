import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { fireEvent, screen } from '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import { getUser, getUserRoles } from '../../../../redux/actions/userActions';
// import { useEffect } from 'react';

import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from '../shallow';

import * as reactRedux from 'react-redux';

import { unmountComponentAtNode } from 'react-dom';

import thunk from 'redux-thunk';
import EditForm from '../EditForm';

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

  const useSelectorMock = reactRedux.useSelector;

  const userData = {
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
  const rolesData = [
    [
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
  ];
  const authToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0';

  beforeEach(() => {
    wrapper = mount(
      ShallowMock(
        <EditForm
          userData={userData}
          rolesData={rolesData}
          authToken={authToken}
        />
      )
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component EditForm', () => {
    expect(wrapper.find('EditForm')).toBeTruthy();
  });

  it('mount html', () => { });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(0).props().onChange());

    act(() => button.at(0).props().onBlur());
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(1).props().onChange());

    act(() => button.at(1).props().onBlur());
  });

  it('Handle onclick  on Button', () => {
    const button = wrapper.find('ForwardRef(Button)');
    act(() => button.at(0).props().onClick());
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(2).props().onChange());

    act(() => button.at(2).props().onBlur());
  });

  it('Handle Select tag 1', () => {
    const button = wrapper.find('Select');
    act(() => button.at(0).props().onChange());
  });

  it('HandleEditClick', () => {
    const button = wrapper.find('div');
    act(() => button.at(0).props().onClick());
  });
});

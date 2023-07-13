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
import UserHistory from '../UserHistory';

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

  beforeEach(() => {
    wrapper = mount(ShallowMock(<UserHistory userData={userData} />));
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component UserHistory', () => {
    expect(wrapper.find('UserHistory')).toBeTruthy();
  });

  it('mount html', () => {});
});

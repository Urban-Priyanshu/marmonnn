import React from 'react';
import ResetPassword from './index';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, screen } from '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import Enzyme, { shallow, configure, mount, sel } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import * as reactRedux from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';
import thunk from 'redux-thunk';
import { useLocation } from 'react-router';
import { Router } from 'react-router';
import * as router from 'react-router';

import clsx from 'clsx';
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
  useNavigate: () => mockedUsedNavigate,
  useEffect: () => mockedUsedNavigate,
  useLocation: () => ({
    pathname: '/',
    search: '',
    type: ''
  })
}));

describe('ResetPassword', () => {
  let wrapper;

  const store = mockStore({
    auth: {
      authUserData: {
        id: 10,
        firstName: 'deepanshu',
        lastName: 'Tyagi',
        email: 'Deepanshu.Tyagi@compunneldigital.com',
        roles: [
          {
            id: 1,
            code: 'ROLE_CUSTOMER',
           
          }
         
        ],
        status: {
          id: 1,
          code: 'A',
          description: 'Active'
        },
        type: {
          id: 1,
          code: 'I',
          description: 'Internal'
        },
        features: [],
        lastLogin: '2023-02-02T05:56:38.085+00:00',
        jobTitle: '',
        jobType: null,
        createdBy: 'System',
        createdDate: '2022-09-28T06:13:31.000+00:00',
        updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
        updatedDate: '2023-02-02T05:56:38.087+00:00',
        associateCustomerId: null
      }
    
    }
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = mount(ShallowMock(<ResetPassword />, store));
  });

  afterEach(() => {
    //   wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component ResetPassword', () => {
    expect(wrapper.find('ResetPassword')).toBeTruthy();
  });

 

  it('Handle click on custom Button', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    button.at(0).props().onBlur();
    button.at(0).props().onChange();
  });

  it('Handle click on custom Button', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    button.at(1).props().onBlur();
    button.at(1).props().onChange();
  });

  // it('Handle click on custom Button', () => {
  //   const button = wrapper.find('ForwardRef(Box)');

  //   button.at(0).props().onSubmit();
  // });

});

describe('ResetPassword', () => {
  let wrapper;

  const store = mockStore({
    auth: {
      authUserData: {
        id: 10,
        firstName: 'deepanshu',
        lastName: 'Tyagi',
        email: 'Deepanshu.Tyagi@compunneldigital.com',
        roles: [
          {
            id: 2,
            code: 'ROLE_CUSTOMER',
           
          }
         
        ],
        status: {
          id: 1,
          code: 'A',
          description: 'Active'
        },
        type: {
          id: 1,
          code: 'I',
          description: 'Internal'
        },
        features: [],
        lastLogin: '2023-02-02T05:56:38.085+00:00',
        jobTitle: '',
        jobType: null,
        createdBy: 'System',
        createdDate: '2022-09-28T06:13:31.000+00:00',
        updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
        updatedDate: '2023-02-02T05:56:38.087+00:00',
        associateCustomerId: null
      }
    
    }
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = mount(ShallowMock(<ResetPassword />, store));
  });

  afterEach(() => {
    //   wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component ResetPassword', () => {
    expect(wrapper.find('ResetPassword')).toBeTruthy();
  });

  

  it('Handle click on custom Button', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    button.at(0).props().onBlur();
    button.at(0).props().onChange();
  });

  it('Handle click on custom Button', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    button.at(1).props().onBlur();
    button.at(1).props().onChange();
  });

  // it('Handle click on custom Button', () => {
  //   const button = wrapper.find('ForwardRef(Box)');

  //   button.at(0).props().onSubmit();
  // });

});

describe('ResetPassword', () => {
  let wrapper;

  const store = mockStore({
    auth: {
      authUserData: {
        id: 10,
        firstName: 'deepanshu',
        lastName: 'Tyagi',
        email: 'Deepanshu.Tyagi@compunneldigital.com',
        roles: [
          {
            id: 3,
            code: 'ROLE_CUSTOMER',
           
          }
         
        ],
        status: {
          id: 1,
          code: 'A',
          description: 'Active'
        },
        type: {
          id: 1,
          code: 'I',
          description: 'Internal'
        },
        features: [],
        lastLogin: '2023-02-02T05:56:38.085+00:00',
        jobTitle: '',
        jobType: null,
        createdBy: 'System',
        createdDate: '2022-09-28T06:13:31.000+00:00',
        updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
        updatedDate: '2023-02-02T05:56:38.087+00:00',
        associateCustomerId: null
      }
    
    }
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = mount(ShallowMock(<ResetPassword />, store));
  });

  afterEach(() => {
    //   wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component ResetPassword', () => {
    expect(wrapper.find('ResetPassword')).toBeTruthy();
  });


  it('Handle click on custom Button', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    button.at(0).props().onBlur();
    button.at(0).props().onChange();
  });

  it('Handle click on custom Button', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    button.at(1).props().onBlur();
    button.at(1).props().onChange();
  });

  // it('Handle click on custom Button', () => {
  //   const button = wrapper.find('ForwardRef(Box)');

  //   button.at(0).props().onSubmit();
  // });

});
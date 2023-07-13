import React from 'react';
import ProductDetail from './index';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, screen } from '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import Enzyme, { shallow, configure, mount, sel } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import * as reactRedux from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter, useLocation} from 'react-router-dom';
const mockStore = configureMockStore([thunk]);

jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
  useEffect: jest.fn(),
  useNavigate: jest.fn()
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

describe('EditUser', () => {
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
    },
 
  });

  const useSelectorMock = reactRedux.useSelector;
  const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
    wrapper = mount(<BrowserRouter><ProductDetail/></BrowserRouter>);
  });

  afterEach(() => {
      // wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component ProductDetail', () => {
    expect(wrapper.find('ProductDetail')).toBeTruthy();
  });



});

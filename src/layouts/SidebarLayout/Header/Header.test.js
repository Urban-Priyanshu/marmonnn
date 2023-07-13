import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Header from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useHref } from 'react-router';
import * as reactRedux from 'react-redux';

const ShallowMock = (Component, props) => {
    return React.cloneElement(
	    Component, 
	    props
    );
};

jest.mock('react-redux', () => ({
    connect: () => jest.fn(),
    useSelector: jest.fn((fn) => fn()),
    useDispatch: () => jest.fn(),
    useEffect: jest.fn(),
    useContext:() => jest.fn()
   
  }));
  
  const mockedUsedNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    useEffect: ()=> mockedUsedNavigate,
    useLocation: () => ({
      pathname: '/',
      search: '',
      type: ''
    })
   
  }));
  

describe('Header', () => {
    let wrapper;

  const store = mockStore({
    auth: {
      authUserData: {
        id: 8,
        firstName: 'Bob',

        lastName: 'Cat',
        email: 'ls.adith@compunneldigital.com',

        jobType: null,
        jobTitle: null,
        lastLogin: '2022-08-27T10:45:08.069+00:00',
        customerNumber: 200,
        createdBy: 'peter.parker@invaliddomain.som',
        createdDate: '2022-08-26T11:52:57.366+00:00',
        updatedBy: 'ls.adith@compunneldigital.com',
        updatedDate: '2022-08-27T10:45:08.136+00:00',
        type: {
          id: 1,
          code: 'I',
          description: 'Internal'
        },
        roles: [
          {
            id: 1,
            code: 'ROLE_SALES_USER',
            description: 'Sales User',
            authority: 'ROLE_SALES_USER'
          }
        ],
        features: [],

        status: {
          id: 3,
          code: 'RS',
          description: 'Request Sent'
        }
      }
    }
  });
 const useSelectorMock = reactRedux.useSelector;
  
    
    beforeEach(() => {
      
      useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
  
     
    );
    
      wrapper = shallow(ShallowMock(<Header />, store));
  
     
  
  
      
    });
  
    afterEach(() => {
      wrapper.unmount();
      useSelectorMock.mockClear();
     
    });
  
    it('render component Header', () => {
      expect(wrapper.find('Header')).toBeTruthy();
    });
});

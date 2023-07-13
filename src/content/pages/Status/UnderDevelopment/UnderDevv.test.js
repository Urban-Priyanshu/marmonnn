import React from 'react';
import UnderDevv from './underDevv';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow, configure, mount, sel } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import * as reactRedux from 'react-redux';
import thunk from 'redux-thunk';
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
    useEffect: ()=> mockedUsedNavigate,
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
      wrapper = shallow(ShallowMock(<UnderDevv/>, store));
    });
  
    afterEach(() => {
      //   wrapper.unmount();
      useSelectorMock.mockClear();
    });
  
    it('render component UnderDevv', () => {
      expect(wrapper.find('UnderDevv')).toBeTruthy();
    });
  });
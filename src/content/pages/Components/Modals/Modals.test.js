import React from 'react';
import Modals from './index';
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
import { BrowserRouter, useLocation } from 'react-router-dom';
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
    },
    token: {
      username: 'ls.adith@compunneldigital.com',
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJscy5hZGl0aEBjb21wdW5uZWxkaWdpdGFsLmNvbSIsImp0aSI6IjkwNjczZjk4LTkzNDAtNDVhZi1hMzE1LWQyZWVkMTQyZDZkNiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1NVUEVSX0FETUlOIn0seyJhdXRob3JpdHkiOiJST0xFX1NZU1RFTV9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TQUxFU19VU0VSIn1dLCJpYXQiOjE2NzM1MDc0NzgsImV4cCI6MTY5NTEwNzQ3OH0.JJwO6yDxq1V76nLbQzHCsjpjJTjCUnce8XdxcdR2KK4'
    },
    customers: {
      customerData: {
        id: 4,
        groupCode: 556,
        customerNumber: 200,
        firstName: "Bush",
        lastName: "Hog 1",
        parentCustomerId: null,
        status: {
          id: 1,
          code: 'A',
          description: 'Active'
        },
        associatedUsers: [
          {
            customerId: 4,
            email: 'mayank.saxena@compunneldigital.com',
            firstName: 'Mayank',
            id: 267,
            lastName: 'Saxena',
            userId: 9
          }
        ],
        preferredUOM: 'Sta',
        inventoryROS: 21,
        timeZone: 'time',
        branchNumber: 24,
        containerProgram: 'container program',
        containerDefaultReceiveFromLocation: '22B Street, Atlanta 77234',
        containerHomeLocation: '22B Street, Atlanta 77234',
        containerDefaultShipToLocation: 'Pune',
        visibleContainerLocations: 'Pune',
        createdBy: 'System',
        createdDate: '2022-08-11T12:00:00.000+00:00',
        logo: null,
        updatedBy: 'peter.parker@invaliddomain.som',
        updatedDate: '2022-08-18T12:44:52.581+00:00',

        shippingLocations: [
          {
            id: 1,
            customerID: 1,
            address: '22B Street, Atlanta 77234',
            priorityNumber: 1,
            primary: true
          }
        ],
        associatedCustomers: [
          {
            branchNumber: 891,
            customerId: 4,
            customerNumber: 200,
            firstName: 'Bush',
            lastName: 'Hog 1',
            primary: true
          }
        ],
        features: [],
        truckSchedules: [
          {
            customerId: 4,
            day: '08-11-2022',
            id: 486,
            time: '05:00 PM'
          }
        ]
      },
      getBlanketPoData: {
        customerNumber: 200,
        firstDateColumn: 5,
        firstRow: 2,
        partNumber: 1,
        quantity: 6,
        poNumber: 8,
        endDate: 10,
        bpoAdditionalFields: [{
          id: 1,
          customerNumber: 200,
          headerName: "partname",
          headerDataType: "String",
          value: "Nut"
        }

        ]
      }

    },
  });

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
    wrapper = mount(<Modals />);
  });

  afterEach(() => {
    // wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component Modals', () => {
    expect(wrapper.find('Modals')).toBeTruthy();
  });



  it('onClose on handleClose', () => {
    const button = wrapper.find('SimpleDialog')
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleClose', () => {
    const button = wrapper.find('ForwardRef(Dialog)')
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleClose', () => {
    const button = wrapper.find('ForwardRef(Modal)')
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleClose', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)')
    act(() => button.at(0).props().onClose());
  });


  it('onClick on handleClickOpen ', () => {
    const button = wrapper.find('ForwardRef(Modal)')
    act(() => button.at(0).props().onClick());
  });

  it('onClick on handleClickOpen ', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)')
    act(() => button.at(0).props().onClick());
  });

  // it('onClick on handleClickOpen ', () => {
  //   const button = wrapper.find('ForwardRef(ButtonBase)')
  //   act(() => button.at(0).props().onClick());
  // });

});
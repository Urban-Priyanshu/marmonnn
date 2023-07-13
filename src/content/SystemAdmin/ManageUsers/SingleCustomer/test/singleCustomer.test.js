import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { act } from '@testing-library/react';

let component = null;

let agGridReact = null;

import { getAllFeatures, getCustomer } from 'src/redux/actions/sysAdminActions';
import { getSpecificUsersByRole } from 'src/redux/actions/userActions';
// import { getAllFeatures } from 'src/redux/actions/sysAdminActions';

import { GridOptions } from 'ag-grid-community';
import * as reactRedux from 'react-redux';

import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

import { unmountComponentAtNode } from 'react-dom';

import thunk from 'redux-thunk';
import EditCustomer from '../index';

const mockStore = configureMockStore([thunk]);

const ShallowMock = (Component, props) => {
  return React.cloneElement(Component, props);
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  Link: (props) => {
    return <a {...props} href={props.to} />;
  },
  useLocation: () => ({
    pathname: '/',
    search: '',
    type: ''
  })
}));

jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn()
}));

describe('singleCustomer', () => {
  let wrapper;

  const store = mockStore({
    customers: {

      customerData: {
        id: 8,
        groupCode: {
          id: 25,
          code: 17
        },
        branch: {
          id: 1,
          branchNumber: 1,
          branchName: 'Monterrey'
        },
        customerNumber: 46030,
        customerName: 'JOHN DEERE MEXICO, SARL',
        parentCustomerId: null,
        shippingLocations: [
          {
            id: 99,
            customerId: 7,
            shipToNumber: 5,
            address1: 'E LAFAYETTE ST PORTLAND, IN 47371',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: true,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.636+00:00',
            customerNumber: 45772
          },
          {
            id: 95,
            customerId: 7,
            shipToNumber: 1,
            address1: 'TBU BUILDING KK DOCK 06 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.598+00:00',
            customerNumber: 45772
          },
          {
            id: 96,
            customerId: 7,
            shipToNumber: 2,
            address1: 'TBU BUILDING KK DOCK 57 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.608+00:00',
            customerNumber: 45772
          },
          {
            id: 97,
            customerId: 7,
            shipToNumber: 3,
            address1: '1271 E.289TH ST WICKLIFFE, OH 44092',
            address2: 'PICK UP @ SPRING VALLEY, IL',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61404',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.618+00:00',
            customerNumber: 45772
          },
          {
            id: 98,
            customerId: 7,
            shipToNumber: 4,
            address1: '2410 N. 5TH ST CHAPAIGN, IL 61822',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.627+00:00',
            customerNumber: 45772
          },
          {
            id: 100,
            customerId: 7,
            shipToNumber: 6,
            address1: '500 WALLACE WAY YORK, SC  29745',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.646+00:00',
            customerNumber: 45772
          },
          {
            id: 101,
            customerId: 7,
            shipToNumber: 7,
            address1: '1532 E OKLAHOMA MILWAUKEE, WI 53207',
            address2: 'WILL CALL AT SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.659+00:00',
            customerNumber: 45772
          },
          {
            id: 102,
            customerId: 7,
            shipToNumber: 8,
            address1: '7105 BESSEMER CLEVELAND, OH 44125',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.668+00:00',
            customerNumber: 45772
          },
          {
            id: 103,
            customerId: 7,
            shipToNumber: 9,
            address1: '5481 S. PACKARD CUDAHY  WI 53110',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.679+00:00',
            customerNumber: 45772
          },
          {
            id: 104,
            customerId: 7,
            shipToNumber: 10,
            address1: '1832 PLEASEANT ST  DEKALB,  IL',
            address2: '** WILL CALL IN SPRING VALLY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.689+00:00',
            customerNumber: 45772
          },
          {
            id: 105,
            customerId: 7,
            shipToNumber: 11,
            address1: '322 S CUCUMBER ST JEFFERSON OH 440',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.698+00:00',
            customerNumber: 45772
          },
          {
            id: 106,
            customerId: 7,
            shipToNumber: 12,
            address1: '1903 S 62ND ST WEST ALLIS WI 53219',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.707+00:00',
            customerNumber: 45772
          },
          {
            id: 107,
            customerId: 7,
            shipToNumber: 13,
            address1: '2800 E CEDAR HILL DR',
            address2: 'CHILLICOTHE,  IL    61523',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.717+00:00',
            customerNumber: 45772
          },
          {
            id: 108,
            customerId: 7,
            shipToNumber: 14,
            address1: 'WILL CALL',
            address2: '',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.726+00:00',
            customerNumber: 45772
          },
          {
            id: 109,
            customerId: 7,
            shipToNumber: 15,
            address1: 'TBU BUILDING KK DOCK 00 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'EAST PEORIA',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.736+00:00',
            customerNumber: 45772
          },
          {
            id: 110,
            customerId: 7,
            shipToNumber: 16,
            address1: '2800 E CEDAR HILLS DR CHILLICOTHE, IL 61523',
            address2: 'WILL CALL IN SPRING VALLEY, IL',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.745+00:00',
            customerNumber: 45772
          },
          {
            id: 111,
            customerId: 7,
            shipToNumber: 17,
            address1: '2800 E CEDAR HILLS DR CHILLICOTHE, IL 61523',
            address2: 'WILL CALL IN SPRING VALLEY, IL',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.758+00:00',
            customerNumber: 45772
          },
          {
            id: 112,
            customerId: 7,
            shipToNumber: 18,
            address1: 'TBU BUILDING KK DOCK 56 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.768+00:00',
            customerNumber: 45772
          },
          {
            id: 113,
            customerId: 7,
            shipToNumber: 19,
            address1: 'BUILDING DD DOCK 74 DOOR 7, ROUTE 29 & OLD GALENA',
            address2: 'MOSSVILLE, IL 61522 \u001a WILL CALL SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.777+00:00',
            customerNumber: 45772
          },
          {
            id: 114,
            customerId: 7,
            shipToNumber: 99,
            address1: 'DEBIT MEMO HANDLING CHARGES',
            address2: '',
            city: 'EAST PEORIA',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.788+00:00',
            customerNumber: 45772
          },
          {
            id: 115,
            customerId: 8,
            shipToNumber: 1,
            address1: 'BLVD DIAZ ORDAZ 500 DESVARADORAS',
            address2: 'RFC IJD840224QD2',
            city: 'SAN PEDRO GARZA GARCIA',
            stateCode: 'NL',
            country: 'MEX',
            postalCode: '66210',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.876+00:00',
            customerNumber: 46030
          },
          {
            id: 116,
            customerId: 8,
            shipToNumber: 2,
            address1: 'BLVD SANTA MARIA 1301 , PARQUE INDUSTRIAL SANTA',
            address2: 'MARIA L701 LOADERS RFC IJD840224QD2',
            city: 'RAMOS ARIZPE COAHUIL',
            stateCode: 'CL',
            country: 'MEX',
            postalCode: '25903',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.888+00:00',
            customerNumber: 46030
          },
          {
            id: 117,
            customerId: 8,
            shipToNumber: 3,
            address1: 'BOULEVARD DIAZ ORDAZ 500 Y801 IMPLEMENTOS',
            address2: 'RFC IJD840224QD2',
            city: 'SAN PEDRO GARZA GARC',
            stateCode: 'NL',
            country: 'MEX',
            postalCode: '66210',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.901+00:00',
            customerNumber: 46030
          },
          {
            id: 118,
            customerId: 8,
            shipToNumber: 4,
            address1: 'JENARO SEPULVEDA BODEGA 11. X201 COMP MTY',
            address2: 'RFC IJD840224QD2',
            city: 'SANTA CATARINA',
            stateCode: 'NL',
            country: 'MEX',
            postalCode: '66350',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.912+00:00',
            customerNumber: 46030
          },
          {
            id: 119,
            customerId: 8,
            shipToNumber: 5,
            address1: 'BLVD VALDEZ SANCHEZ 470 X301 COMP. SALTILLO',
            address2: 'RFC IJD840224QD2',
            city: 'SALTILLO',
            stateCode: 'CL',
            country: 'MEX',
            postalCode: '25000',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.925+00:00',
            customerNumber: 46030
          },
          {
            id: 120,
            customerId: 8,
            shipToNumber: 6,
            address1: 'BLVD SANTA MARIA 1301 X401 COMP RAMOS',
            address2: 'RFC IJD840224QD2',
            city: 'RAMOS ARIZPE COAHUIL',
            stateCode: 'CL',
            country: 'MEX',
            postalCode: '25903',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.938+00:00',
            customerNumber: 46030
          }
        ],
        status: {
          id: 1,
          code: 'A',
          description: 'Active'
        },
        associatedUsers: [
          {
            id: 31,
            customerId: 8,
            userId: 40,
            email: 'asd@gmail.com',
            firstName: 'dscdc',
            lastName: 'fhufyh',
            userType: 'CE'
          },
          {
            id: 32,
            customerId: 8,
            userId: 42,
            email: 'cewatof316@ceoshub.com',
            firstName: 'ramu',
            lastName: 'ram',
            userType: 'CE'
          },
          {
            id: 37,
            customerId: 8,
            userId: 45,
            email: 'niseric104@fanneat.com',
            firstName: 'renuuu',
            lastName: 'nascn',
            userType: 'CE'
          },
          {
            id: 39,
            customerId: 8,
            userId: 46,
            email: 'gijate1058@bitvoo.com',
            firstName: 'vishuuu',
            lastName: 'dzda',
            userType: 'CE'
          },
          {
            id: 40,
            customerId: 8,
            userId: 47,
            email: 'potof81018@nazyno.com',
            firstName: 'binod',
            lastName: 'dsvsv',
            userType: 'CE'
          },
          {
            id: 48,
            customerId: 8,
            userId: 48,
            email: 'detit94656@nazyno.com',
            firstName: 'New',
            lastName: 'User',
            userType: 'CE'
          },
          {
            id: 49,
            customerId: 8,
            userId: 49,
            email: 'dwqd@gmail.com',
            firstName: 'dwqd',
            lastName: 'dwqd',
            userType: 'CE'
          },
          {
            id: 83,
            customerId: 8,
            userId: 50,
            email: 'sad@gmail.com',
            firstName: 'dede',
            lastName: 'fbgbgb',
            userType: 'CE'
          },
          {
            id: 96,
            customerId: 8,
            userId: 51,
            email: 'sdvksn@gmail.com',
            firstName: 'sharma ji',
            lastName: 'yoih',
            userType: 'CE'
          },
          {
            id: 110,
            customerId: 8,
            userId: 10,
            email: 'Deepanshu.Tyagi@compunneldigital.com',
            firstName: 'deepanshu',
            lastName: 'Tyagi',
            userType: 'I'
          },
          {
            id: 111,
            customerId: 8,
            userId: 8,
            email: 'Raj.Gatkul@compunneldigital.com',
            firstName: 'Raj',
            lastName: 'Gatkul',
            userType: 'I'
          },
          {
            id: 112,
            customerId: 8,
            userId: 11,
            email: 'serih98709@pahed.com',
            firstName: 'deep',
            lastName: 'sharma',
            userType: 'I'
          }
        ],
        preferredUOM: 'PARTS',
        inventoryROS: '1.000',
        features: [
          {
            id: 1580,
            customerId: 8,
            featureId: 2,
            featureCode: 'BO',
            featureDescription: 'Bulk Order'
          },
          {
            id: 1581,
            customerId: 8,
            featureId: 3,
            featureCode: 'FC',
            featureDescription: 'Forecast'
          },
          {
            id: 1582,
            customerId: 8,
            featureId: 4,
            featureCode: 'BPO',
            featureDescription: 'Blanket POs'
          },
          {
            id: 1583,
            customerId: 8,
            featureId: 5,
            featureCode: 'BCS',
            featureDescription: 'Bar Code Scanners'
          },
          {
            id: 1584,
            customerId: 8,
            featureId: 6,
            featureCode: 'DB',
            featureDescription: 'Dashboard'
          },
          {
            id: 1585,
            customerId: 8,
            featureId: 1,
            featureCode: 'BF',
            featureDescription: 'Base Feature'
          },
          {
            id: 1586,
            customerId: 8,
            featureId: 7,
            featureCode: 'PO',
            featureDescription: 'Place Order'
          }
        ],
        timeZone: 'PT',
        truckSchedules: [],
        containerProgram: '',
        containerDefaultReceiveFromLocation: '',
        containerHomeLocation: '',
        containerDefaultShipToLocation: '',
        visibleContainerLocations: '',
        logo: 'Marmon/Customer/46030/LOGO/01-05-2023-09-30-MicrosoftTeams-image (1).JPEG',
        createdBy: 'peter.parker@invaliddomain.som',
        createdDate: '2022-12-05T00:06:16.705+00:00',
        updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
        updatedDate: '2023-01-06T12:24:42.418+00:00',
        associatedCustomers: [
          {
            customerId: 8,
            customerNumber: 46030,
            customerName: 'JOHN DEERE MEXICO, SARL',
            branchNumber: 1,
            primary: true
          },
          {
            customerId: 7,
            customerNumber: 45772,
            customerName: 'CATERPILLAR INC (BAR PROGRAM)',
            branchNumber: 61,
            primary: false
          }
        ]
      }

    },
    auth: {
      token: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
      },

      authUserData: {
        id: 9,
        firstName: 'Adithditha',
        lastName: 'QATestID',
        email: 'adithditha20@gmail.com',
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
          },
          {
            id: 3,
            code: 'ROLE_SALES_USER',
            description: 'Sales User',
            authority: 'ROLE_SALES_USER'
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
        lastLogin: '2023-01-11T04:54:11.519+00:00',
        jobTitle: null,
        jobType: null,
        createdBy: 'peter.parker@invaliddomain.som',
        createdDate: '2022-09-19T13:35:36.528+00:00',
        updatedBy: 'adithditha20@gmail.com',
        updatedDate: '2023-01-11T04:54:11.520+00:00',
        associateCustomerId: null
      }

    }
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(async () => {
    // const onClick = jest.fn();

    wrapper = mount(ShallowMock(<EditCustomer />, store));

    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });

  it('render  Helmet text', () => {
    // expect(wrapper.find('title').text()).toBe('Super Admin Dashboard');
    expect(wrapper.find('singleCustomer')).toBeTruthy();
  });

  it('console mount', () => {
   
  });

  it('TabItem', () => {
    act(() => expect(wrapper.find('TabItem')).toBeDefined());
  });

  it('Tab items to be called', () => {
    const button = wrapper.find('#TEST');
    act(() => button.at(0).props().onClick());
  });

  it('Tab items to be called', () => {
    const button = wrapper.find('#TEST4');
    act(() => button.at(0).props().onClick());
  });

});

describe('singleCustomer Role', () => {
  let wrapper;

  const store = mockStore({
    customers: {

      customerData: {
        id: 8,
        groupCode: {
          id: 25,
          code: 17
        },
        branch: {
          id: 1,
          branchNumber: 1,
          branchName: 'Monterrey'
        },
        customerNumber: 46030,
        customerName: 'JOHN DEERE MEXICO, SARL',
        parentCustomerId: null,
        shippingLocations: [
          {
            id: 99,
            customerId: 7,
            shipToNumber: 5,
            address1: 'E LAFAYETTE ST PORTLAND, IN 47371',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: true,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.636+00:00',
            customerNumber: 45772
          },
          {
            id: 95,
            customerId: 7,
            shipToNumber: 1,
            address1: 'TBU BUILDING KK DOCK 06 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.598+00:00',
            customerNumber: 45772
          },
          {
            id: 96,
            customerId: 7,
            shipToNumber: 2,
            address1: 'TBU BUILDING KK DOCK 57 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.608+00:00',
            customerNumber: 45772
          },
          {
            id: 97,
            customerId: 7,
            shipToNumber: 3,
            address1: '1271 E.289TH ST WICKLIFFE, OH 44092',
            address2: 'PICK UP @ SPRING VALLEY, IL',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61404',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.618+00:00',
            customerNumber: 45772
          },
          {
            id: 98,
            customerId: 7,
            shipToNumber: 4,
            address1: '2410 N. 5TH ST CHAPAIGN, IL 61822',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.627+00:00',
            customerNumber: 45772
          },
          {
            id: 100,
            customerId: 7,
            shipToNumber: 6,
            address1: '500 WALLACE WAY YORK, SC  29745',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.646+00:00',
            customerNumber: 45772
          },
          {
            id: 101,
            customerId: 7,
            shipToNumber: 7,
            address1: '1532 E OKLAHOMA MILWAUKEE, WI 53207',
            address2: 'WILL CALL AT SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.659+00:00',
            customerNumber: 45772
          },
          {
            id: 102,
            customerId: 7,
            shipToNumber: 8,
            address1: '7105 BESSEMER CLEVELAND, OH 44125',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.668+00:00',
            customerNumber: 45772
          },
          {
            id: 103,
            customerId: 7,
            shipToNumber: 9,
            address1: '5481 S. PACKARD CUDAHY  WI 53110',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.679+00:00',
            customerNumber: 45772
          },
          {
            id: 104,
            customerId: 7,
            shipToNumber: 10,
            address1: '1832 PLEASEANT ST  DEKALB,  IL',
            address2: '** WILL CALL IN SPRING VALLY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.689+00:00',
            customerNumber: 45772
          },
          {
            id: 105,
            customerId: 7,
            shipToNumber: 11,
            address1: '322 S CUCUMBER ST JEFFERSON OH 440',
            address2: 'WILL CALL @ SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.698+00:00',
            customerNumber: 45772
          },
          {
            id: 106,
            customerId: 7,
            shipToNumber: 12,
            address1: '1903 S 62ND ST WEST ALLIS WI 53219',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.707+00:00',
            customerNumber: 45772
          },
          {
            id: 107,
            customerId: 7,
            shipToNumber: 13,
            address1: '2800 E CEDAR HILL DR',
            address2: 'CHILLICOTHE,  IL    61523',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.717+00:00',
            customerNumber: 45772
          },
          {
            id: 108,
            customerId: 7,
            shipToNumber: 14,
            address1: 'WILL CALL',
            address2: '',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.726+00:00',
            customerNumber: 45772
          },
          {
            id: 109,
            customerId: 7,
            shipToNumber: 15,
            address1: 'TBU BUILDING KK DOCK 00 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'EAST PEORIA',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.736+00:00',
            customerNumber: 45772
          },
          {
            id: 110,
            customerId: 7,
            shipToNumber: 16,
            address1: '2800 E CEDAR HILLS DR CHILLICOTHE, IL 61523',
            address2: 'WILL CALL IN SPRING VALLEY, IL',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.745+00:00',
            customerNumber: 45772
          },
          {
            id: 111,
            customerId: 7,
            shipToNumber: 17,
            address1: '2800 E CEDAR HILLS DR CHILLICOTHE, IL 61523',
            address2: 'WILL CALL IN SPRING VALLEY, IL',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.758+00:00',
            customerNumber: 45772
          },
          {
            id: 112,
            customerId: 7,
            shipToNumber: 18,
            address1: 'TBU BUILDING KK DOCK 56 EAST PEORIA',
            address2: 'WILL CALL IN SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.768+00:00',
            customerNumber: 45772
          },
          {
            id: 113,
            customerId: 7,
            shipToNumber: 19,
            address1: 'BUILDING DD DOCK 74 DOOR 7, ROUTE 29 & OLD GALENA',
            address2: 'MOSSVILLE, IL 61522 \u001a WILL CALL SPRING VALLEY',
            city: 'SPRING VALLEY',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61362',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.777+00:00',
            customerNumber: 45772
          },
          {
            id: 114,
            customerId: 7,
            shipToNumber: 99,
            address1: 'DEBIT MEMO HANDLING CHARGES',
            address2: '',
            city: 'EAST PEORIA',
            stateCode: 'IL',
            country: 'USA',
            postalCode: '61630',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:40.788+00:00',
            customerNumber: 45772
          },
          {
            id: 115,
            customerId: 8,
            shipToNumber: 1,
            address1: 'BLVD DIAZ ORDAZ 500 DESVARADORAS',
            address2: 'RFC IJD840224QD2',
            city: 'SAN PEDRO GARZA GARCIA',
            stateCode: 'NL',
            country: 'MEX',
            postalCode: '66210',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.876+00:00',
            customerNumber: 46030
          },
          {
            id: 116,
            customerId: 8,
            shipToNumber: 2,
            address1: 'BLVD SANTA MARIA 1301 , PARQUE INDUSTRIAL SANTA',
            address2: 'MARIA L701 LOADERS RFC IJD840224QD2',
            city: 'RAMOS ARIZPE COAHUIL',
            stateCode: 'CL',
            country: 'MEX',
            postalCode: '25903',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.888+00:00',
            customerNumber: 46030
          },
          {
            id: 117,
            customerId: 8,
            shipToNumber: 3,
            address1: 'BOULEVARD DIAZ ORDAZ 500 Y801 IMPLEMENTOS',
            address2: 'RFC IJD840224QD2',
            city: 'SAN PEDRO GARZA GARC',
            stateCode: 'NL',
            country: 'MEX',
            postalCode: '66210',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.901+00:00',
            customerNumber: 46030
          },
          {
            id: 118,
            customerId: 8,
            shipToNumber: 4,
            address1: 'JENARO SEPULVEDA BODEGA 11. X201 COMP MTY',
            address2: 'RFC IJD840224QD2',
            city: 'SANTA CATARINA',
            stateCode: 'NL',
            country: 'MEX',
            postalCode: '66350',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.912+00:00',
            customerNumber: 46030
          },
          {
            id: 119,
            customerId: 8,
            shipToNumber: 5,
            address1: 'BLVD VALDEZ SANCHEZ 470 X301 COMP. SALTILLO',
            address2: 'RFC IJD840224QD2',
            city: 'SALTILLO',
            stateCode: 'CL',
            country: 'MEX',
            postalCode: '25000',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.925+00:00',
            customerNumber: 46030
          },
          {
            id: 120,
            customerId: 8,
            shipToNumber: 6,
            address1: 'BLVD SANTA MARIA 1301 X401 COMP RAMOS',
            address2: 'RFC IJD840224QD2',
            city: 'RAMOS ARIZPE COAHUIL',
            stateCode: 'CL',
            country: 'MEX',
            postalCode: '25903',
            primary: false,
            createdBy: null,
            createdDate: null,
            updatedBy: 'peter.parker@invaliddomain.som',
            updatedDate: '2022-12-13T23:25:36.938+00:00',
            customerNumber: 46030
          }
        ],
        status: {
          id: 1,
          code: 'A',
          description: 'Active'
        },
        associatedUsers: [
          {
            id: 31,
            customerId: 8,
            userId: 40,
            email: 'asd@gmail.com',
            firstName: 'dscdc',
            lastName: 'fhufyh',
            userType: 'CE'
          },
          {
            id: 32,
            customerId: 8,
            userId: 42,
            email: 'cewatof316@ceoshub.com',
            firstName: 'ramu',
            lastName: 'ram',
            userType: 'CE'
          },
          {
            id: 37,
            customerId: 8,
            userId: 45,
            email: 'niseric104@fanneat.com',
            firstName: 'renuuu',
            lastName: 'nascn',
            userType: 'CE'
          },
          {
            id: 39,
            customerId: 8,
            userId: 46,
            email: 'gijate1058@bitvoo.com',
            firstName: 'vishuuu',
            lastName: 'dzda',
            userType: 'CE'
          },
          {
            id: 40,
            customerId: 8,
            userId: 47,
            email: 'potof81018@nazyno.com',
            firstName: 'binod',
            lastName: 'dsvsv',
            userType: 'CE'
          },
          {
            id: 48,
            customerId: 8,
            userId: 48,
            email: 'detit94656@nazyno.com',
            firstName: 'New',
            lastName: 'User',
            userType: 'CE'
          },
          {
            id: 49,
            customerId: 8,
            userId: 49,
            email: 'dwqd@gmail.com',
            firstName: 'dwqd',
            lastName: 'dwqd',
            userType: 'CE'
          },
          {
            id: 83,
            customerId: 8,
            userId: 50,
            email: 'sad@gmail.com',
            firstName: 'dede',
            lastName: 'fbgbgb',
            userType: 'CE'
          },
          {
            id: 96,
            customerId: 8,
            userId: 51,
            email: 'sdvksn@gmail.com',
            firstName: 'sharma ji',
            lastName: 'yoih',
            userType: 'CE'
          },
          {
            id: 110,
            customerId: 8,
            userId: 10,
            email: 'Deepanshu.Tyagi@compunneldigital.com',
            firstName: 'deepanshu',
            lastName: 'Tyagi',
            userType: 'I'
          },
          {
            id: 111,
            customerId: 8,
            userId: 8,
            email: 'Raj.Gatkul@compunneldigital.com',
            firstName: 'Raj',
            lastName: 'Gatkul',
            userType: 'I'
          },
          {
            id: 112,
            customerId: 8,
            userId: 11,
            email: 'serih98709@pahed.com',
            firstName: 'deep',
            lastName: 'sharma',
            userType: 'I'
          }
        ],
        preferredUOM: 'PARTS',
        inventoryROS: '1.000',
        features: [
          {
            id: 1580,
            customerId: 8,
            featureId: 2,
            featureCode: 'BO',
            featureDescription: 'Bulk Order'
          },
          {
            id: 1581,
            customerId: 8,
            featureId: 3,
            featureCode: 'FC',
            featureDescription: 'Forecast'
          },
          {
            id: 1582,
            customerId: 8,
            featureId: 4,
            featureCode: 'BPO',
            featureDescription: 'Blanket POs'
          },
          {
            id: 1583,
            customerId: 8,
            featureId: 5,
            featureCode: 'BCS',
            featureDescription: 'Bar Code Scanners'
          },
          {
            id: 1584,
            customerId: 8,
            featureId: 6,
            featureCode: 'DB',
            featureDescription: 'Dashboard'
          },
          {
            id: 1585,
            customerId: 8,
            featureId: 1,
            featureCode: 'BF',
            featureDescription: 'Base Feature'
          },
          {
            id: 1586,
            customerId: 8,
            featureId: 7,
            featureCode: 'PO',
            featureDescription: 'Place Order'
          }
        ],
        timeZone: 'PT',
        truckSchedules: [],
        containerProgram: '',
        containerDefaultReceiveFromLocation: '',
        containerHomeLocation: '',
        containerDefaultShipToLocation: '',
        visibleContainerLocations: '',
        logo: 'Marmon/Customer/46030/LOGO/01-05-2023-09-30-MicrosoftTeams-image (1).JPEG',
        createdBy: 'peter.parker@invaliddomain.som',
        createdDate: '2022-12-05T00:06:16.705+00:00',
        updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
        updatedDate: '2023-01-06T12:24:42.418+00:00',
        associatedCustomers: [
          {
            customerId: 8,
            customerNumber: 46030,
            customerName: 'JOHN DEERE MEXICO, SARL',
            branchNumber: 1,
            primary: true
          },
          {
            customerId: 7,
            customerNumber: 45772,
            customerName: 'CATERPILLAR INC (BAR PROGRAM)',
            branchNumber: 61,
            primary: false
          }
        ]
      }

    },
    auth: {
      token: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
      },

      authUserData: {
        id: 9,
        firstName: 'Adithditha',
        lastName: 'QATestID',
        email: 'adithditha20@gmail.com',
        roles: [

          {
            id: 2,
            code: 'ROLE_SYSTEM_ADMIN',
            description: 'System Admin',
            authority: 'ROLE_SYSTEM_ADMIN'
          },
          {
            id: 3,
            code: 'ROLE_SALES_USER',
            description: 'Sales User',
            authority: 'ROLE_SALES_USER'
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
        lastLogin: '2023-01-11T04:54:11.519+00:00',
        jobTitle: null,
        jobType: null,
        createdBy: 'peter.parker@invaliddomain.som',
        createdDate: '2022-09-19T13:35:36.528+00:00',
        updatedBy: 'adithditha20@gmail.com',
        updatedDate: '2023-01-11T04:54:11.520+00:00',
        associateCustomerId: null
      }

    }
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(async () => {
    // const onClick = jest.fn();

    wrapper = mount(ShallowMock(<EditCustomer />, store));

    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });

  it('render  Helmet text', () => {
    // expect(wrapper.find('title').text()).toBe('Super Admin Dashboard');
    expect(wrapper.find('singleCustomer')).toBeTruthy();
  });

  it('console mount', () => {
    
  });

  it('TabItem', () => {
    expect(wrapper.find('TabItem')).toBeDefined();
  });

  it('Tab items to be called', () => {
    const button = wrapper.find('#TEST');
    act(() => button.at(0).props().onClick());
  });

  it('Tab items to be called', () => {
    const button = wrapper.find('#TEST4');
    act(() => button.at(0).props().onClick());
  });

  it('dispatch get Customer action', () => {
    store.dispatch = jest.fn();
    // Arrange

    store.dispatch(
      getCustomer(
        8,
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
      )
    );
  });

  it('dispatch get Customer action', () => {
    store.dispatch = jest.fn();
    // Arrange

    store.dispatch(
      getSpecificUsersByRole('ROLE_SALES_USER', 'A', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
      )
    );
  });

  // it('dispatch get Customer action', () => {
  //   store.dispatch = jest.fn();
  //   // Arrange

  //   store.dispatch(
  //     getSpecificUsersByRole('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
  //     )
  //   );
  // });


});


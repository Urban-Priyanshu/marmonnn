import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { fireEvent, screen } from '@testing-library/jest-dom';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { act } from '@testing-library/react';
let component = null;
let agGridReact = null;
import { GridOptions } from 'ag-grid-community';
import * as reactRedux from 'react-redux';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import { unmountComponentAtNode } from 'react-dom';
import thunk from 'redux-thunk';
import SalesCustomerTable from '..';

const mockStore = configureMockStore([thunk]);

export const ensureGridApiHasBeenSet = (component) => {
  return waitForAsyncCondition(() => {
    return component.instance().api === null;
  }, 5);
};

export const waitForAsyncCondition = (condition, maxAttempts, attempts = 0) =>
  new Promise(function (resolve, reject) {
    (function waitForCondition() {
      // we need to wait for the gridReady event before we can start interacting with the grid
      // in this case we're looking at the api property in our App component, but it could be
      // anything (ie a boolean flag)
      if (condition()) {
        // once our condition has been met we can start the tests
        return resolve();
      }

      attempts++;

      if (attempts >= maxAttempts) {
        reject('Max timeout waiting for condition');
      }

      // not set - wait a bit longer
      setTimeout(waitForCondition, 5000);
    })();
  });

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
}));

jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn()
}));

describe('EditUser', () => {
  let wrapper;
  const store = mockStore({
    customers: {
      
        customersById: [
          {
            id: 8,
            groupCode: null,
            customerNumber: 46030,
            customerName: 'JOHN DEERE MEXICO, SARL',
            status: {
              id: 1,
              code: 'A',
              description: 'Active'
            },
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
                id: 66,
                customerId: 3,
                shipToNumber: 1,
                address1: '7601 IMPERIAL DR',
                address2: '',
                city: 'WACO',
                stateCode: 'TX',
                country: 'USA',
                postalCode: '76712',
                primary: false,
                createdBy: null,
                createdDate: null,
                updatedBy: 'peter.parker@invaliddomain.som',
                updatedDate: '2022-12-13T23:25:39.186+00:00',
                customerNumber: 21908
              },
              {
                id: 67,
                customerId: 3,
                shipToNumber: 2,
                address1: '2504 FRANKLIN AVE',
                address2: '',
                city: 'WACO',
                stateCode: 'TX',
                country: 'USA',
                postalCode: '76702',
                primary: false,
                createdBy: null,
                createdDate: null,
                updatedBy: 'peter.parker@invaliddomain.som',
                updatedDate: '2022-12-13T23:25:39.195+00:00',
                customerNumber: 21908
              },
              {
                id: 68,
                customerId: 3,
                shipToNumber: 3,
                address1: '514 WEST RUNK',
                address2: '',
                city: 'SHINER',
                stateCode: 'TX',
                country: 'USA',
                postalCode: '77984',
                primary: false,
                createdBy: null,
                createdDate: null,
                updatedBy: 'peter.parker@invaliddomain.som',
                updatedDate: '2022-12-13T23:25:39.204+00:00',
                customerNumber: 21908
              },
              {
                id: 69,
                customerId: 3,
                shipToNumber: 10,
                address1: 'WILL CALL',
                address2: '',
                city: 'FORT WORTH',
                stateCode: 'TX',
                country: 'USA',
                postalCode: '76111',
                primary: false,
                createdBy: null,
                createdDate: null,
                updatedBy: 'peter.parker@invaliddomain.som',
                updatedDate: '2022-12-13T23:25:39.215+00:00',
                customerNumber: 21908
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
            customerFeatures: [
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
            associatedCustomerNumbers: '45772, 21908'
          }
        ]
      
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
      
    },
    loaderStatus: {
      showLoading: false
    }
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(async () => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = mount(ShallowMock(<SalesCustomerTable />, store));

    agGridReact = wrapper.find(AgGridReact).instance();

    ensureGridApiHasBeenSet(wrapper.find(AgGridReact)).then(() => done());
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });


  it('mount html', () => {

 });


  it('Aggrid Api', () => {
    expect(agGridReact.api).toBeTruthy();
  });
 

  it('AgGrid table', () => {
    expect(wrapper.find('AgGridReact')).toBeDefined();
  });

  it('SalesCustomerTable are there', () => {
    expect('SalesCustomerTable').toBeTruthy();
  });
  it('Status  ForwardRef(TextField)', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    button.at(0).props().onInput();
  });


  it('console', () => {});

  it('Handle click on custom Button', () => {
    const button = wrapper.find('ForwardRef(Button)');

    button.at(0).props().onClick();
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    button.at(0).props().onClose();
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(ButtonBase)');
    button.at(0).props().onClick();
  });

  it('Handle close on SortingCount', () => {
    const button = wrapper.find('SortingCount');
    button.at(0).props().onChange();
  });

  it('Handle close on SortingCount', () => {
    const button = wrapper.find('ForwardRef(Pagination)');
    button.at(0).props().onChange();
  });

  

  it('on onFirstDataRendered ', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().onFirstDataRendered();
  });

  it('Handle click on onGridSizeChanged', () => {
    const button = wrapper.find('AgGridReact');
    act(() => button.at(0).props().onGridSizeChanged());
  });

  it('LinkComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.LinkComponent({ data: { id: 1 }, value: 2 });
  });

  it('Status Component Active', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.StatusComponent({ value: 'Active' });
  });

  it('Status Component Deactivate', () => {
    const button = wrapper.find('AgGridReact');

    button
      .at(0)
      .props()
      .frameworkComponents.StatusComponent({ value: 'Deactivated' });
  });

  it('Status Component Deactivate', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.StatusComponent({ value: 'Request Sent' });
  });

  it('Status AssociateCusNoComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.AssociateCusNoComponent({ value: 'R' });
  });

  it('Status ACtionComponent', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().frameworkComponents.ActionComponent({ value: 'R' });
  });

  // it('onFirstDataRendered', () =>
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(0).props().onFirstDataRendered());
  // });

  it('hancle click', () => {
    const event = {
      target: { name: 'hi' }
    };

    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(0).props().onClick());
  });

  it('usesector', () => {
    const button = wrapper.find('customersData');
  });
});


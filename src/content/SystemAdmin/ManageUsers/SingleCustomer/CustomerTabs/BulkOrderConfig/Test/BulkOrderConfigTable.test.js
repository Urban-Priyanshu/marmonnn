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
import BulkOrderHistoryTable from '../Table/index';

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

describe('EditUser', () => {
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
      ,

      getBOUploadHistory: [
        {
          id: 185,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-13-02/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-09-2023-11-04-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-09-2023-11-04-13.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:13:02.232+00:00',
          createdDate: '2023-01-04T05:13:02.232+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-09T11:04:13.373+00:00'
        },
        {
          id: 184,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-12-38/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-05-12-38.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-05-12-38.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:12:38.709+00:00',
          createdDate: '2023-01-04T05:12:38.709+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:12:38.709+00:00'
        },
        {
          id: 183,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-12-15/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-05-12-15.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-05-12-15.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:12:15.795+00:00',
          createdDate: '2023-01-04T05:12:15.795+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:12:15.795+00:00'
        },
        {
          id: 182,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-11-50/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-06-2023-08-46-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-06-2023-08-46-13.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:11:50.789+00:00',
          createdDate: '2023-01-04T05:11:50.789+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-06T08:46:13.547+00:00'
        },
        {
          id: 181,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-11-21/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-05-2023-05-19-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-05-2023-05-19-33.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:11:21.782+00:00',
          createdDate: '2023-01-04T05:11:21.782+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T05:19:33.559+00:00'
        },
        {
          id: 180,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-10-40/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-05-10-40.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-05-10-40.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:10:40.671+00:00',
          createdDate: '2023-01-04T05:10:40.671+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:10:40.671+00:00'
        },
        {
          id: 179,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-09-56/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-10-13-06.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-10-13-06.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:09:56.612+00:00',
          createdDate: '2023-01-04T05:09:56.612+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-04T10:13:06.237+00:00'
        },
        {
          id: 178,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/13-23-35/Bulk Order Single Test.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-05-2023-09-08-57.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-05-2023-09-08-57.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile01-05-2023-09-09-53.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:23:35.351+00:00',
          createdDate: '2022-12-23T13:23:35.351+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:09:55.756+00:00'
        },
        {
          id: 177,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/13-21-47/Bulk Order Single Test.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-06-2023-08-46-29.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-06-2023-08-46-29.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:21:47.554+00:00',
          createdDate: '2022-12-23T13:21:47.554+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-06T08:46:29.200+00:00'
        },
        {
          id: 176,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/13-21-25/Bulk Order Single Test.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-03-2023-03-58-37.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-03-2023-03-58-37.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:21:26.097+00:00',
          createdDate: '2022-12-23T13:21:26.097+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-03T03:58:37.600+00:00'
        },
        {
          id: 175,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/11-02-54/Marmon_Customer_46030_Orders_BO_12-22-2022_16-21-30_Marmon_Customer_46030_Orders_BO_12-22-2022_15-55-11_Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-23-2022-11-02-55.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-23-2022-11-02-55.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-23-2022-11-04-21.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-23T03:02:55.159+00:00',
          createdDate: '2022-12-23T11:02:55.159+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-23T11:04:23.638+00:00'
        },
        {
          id: 173,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/16-21-30/Marmon_Customer_46030_Orders_BO_12-22-2022_15-55-11_Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-16-21-30.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-16-21-30.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-16-21-35.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-22T08:21:30.759+00:00',
          createdDate: '2022-12-22T16:21:30.759+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-22T16:21:38.098+00:00'
        },
        {
          id: 172,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/15-55-11/Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-23-2022-04-55-12.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-23-2022-04-55-12.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-23-2022-04-55-39.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-22T07:55:11.208+00:00',
          createdDate: '2022-12-22T15:55:11.208+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-23T04:55:42.201+00:00'
        },
        {
          id: 171,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/15-54-49/Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-54-49.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-54-49.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-54-59.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-22T07:54:49.678+00:00',
          createdDate: '2022-12-22T15:54:49.678+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-22T15:55:01.621+00:00'
        },
        {
          id: 170,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/11-48-36/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-12-13.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-12-13.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-13-06.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T03:48:36.678+00:00',
          createdDate: '2022-12-22T11:48:36.678+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-22T15:13:08.855+00:00'
        },
        {
          id: 169,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/11-35-32/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-16-00.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-16-00.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-17-00.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T03:35:32.640+00:00',
          createdDate: '2022-12-22T11:35:32.640+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-22T15:17:01.925+00:00'
        },
        {
          id: 168,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/11-35-19/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-23-12.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-23-12.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-43-42.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T03:35:19.653+00:00',
          createdDate: '2022-12-22T11:35:19.653+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-22T15:43:44.833+00:00'
        },
        {
          id: 167,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/09-28-26/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-23-2022-09-02-53.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-23-2022-09-02-53.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T01:28:27.101+00:00',
          createdDate: '2022-12-22T09:28:27.101+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T09:02:53.646+00:00'
        },
        {
          id: 166,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-03-28/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-03-28.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-03-28.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:03:28.346+00:00',
          createdDate: '2022-12-22T08:03:28.346+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:03:28.346+00:00'
        },
        {
          id: 165,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-02-53/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-02-53.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-02-53.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:02:53.439+00:00',
          createdDate: '2022-12-22T08:02:53.439+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:02:53.439+00:00'
        },
        {
          id: 164,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-01-46/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-01-47.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-01-47.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:01:47.185+00:00',
          createdDate: '2022-12-22T08:01:47.185+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:01:47.185+00:00'
        },
        {
          id: 163,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-00-21/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-00-21.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-00-21.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:00:22.091+00:00',
          createdDate: '2022-12-22T08:00:22.091+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:00:22.091+00:00'
        },
        {
          id: 140,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/09-20-09/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-07-34-20.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-07-34-21.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T01:20:10.071+00:00',
          createdDate: '2022-12-20T09:20:10.071+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T07:34:21.105+00:00'
        },
        {
          id: 139,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/09-07-03/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-09-07-03.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-09-07-03.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T01:07:03.648+00:00',
          createdDate: '2022-12-20T09:07:03.648+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T09:07:03.648+00:00'
        },
        {
          id: 138,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/09-04-26/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-09-04-26.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-09-04-26.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-20-2022-09-05-09.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T01:04:26.580+00:00',
          createdDate: '2022-12-20T09:04:26.580+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T09:05:09.276+00:00'
        },
        {
          id: 137,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-59-44/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-09-03-34.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-09-03-34.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:59:45.035+00:00',
          createdDate: '2022-12-20T08:59:45.035+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T09:03:34.807+00:00'
        },
        {
          id: 136,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-42-58/Marmon_Customer_46030_Orders_BPO_12-14-2022-10-51-47BlanketPO_TestFile.xlsx',
          uploadedFileCount: 6,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-42-59.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-42-59.xlsx',
          invalidOrdersFileCount: 6,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:42:59.184+00:00',
          createdDate: '2022-12-20T08:42:59.184+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:42:59.184+00:00'
        },
        {
          id: 135,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-41-58/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-41-59.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-41-59.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:41:59.408+00:00',
          createdDate: '2022-12-20T08:41:59.408+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:41:59.408+00:00'
        },
        {
          id: 134,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-31-57/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-31-57.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-31-57.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:31:57.897+00:00',
          createdDate: '2022-12-20T08:31:57.897+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:31:57.897+00:00'
        },
        {
          id: 133,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-10-30/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-10-30.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-10-30.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:10:30.980+00:00',
          createdDate: '2022-12-20T08:10:30.980+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:10:30.980+00:00'
        },
        {
          id: 132,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-09-41/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-09-41.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-09-42.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:09:42.088+00:00',
          createdDate: '2022-12-20T08:09:42.088+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:09:42.088+00:00'
        },
        {
          id: 131,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-09-10/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-09-10.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-09-10.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:09:10.241+00:00',
          createdDate: '2022-12-20T08:09:10.241+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:09:10.241+00:00'
        },
        {
          id: 130,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-08-54/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-08-54.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-08-55.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:08:55.066+00:00',
          createdDate: '2022-12-20T08:08:55.066+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:08:55.066+00:00'
        },
        {
          id: 129,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-08-17/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-08-17.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-08-17.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:08:17.611+00:00',
          createdDate: '2022-12-20T08:08:17.611+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:08:17.611+00:00'
        },
        {
          id: 128,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-07-04/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-07-04.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-07-04.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:07:04.491+00:00',
          createdDate: '2022-12-20T08:07:04.491+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:07:04.491+00:00'
        },
        {
          id: 127,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-05-30/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-08-03.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-08-03.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:05:31.142+00:00',
          createdDate: '2022-12-20T08:05:31.142+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:08:03.631+00:00'
        },
        {
          id: 126,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-05-10/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-05-10.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-05-10.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:05:10.451+00:00',
          createdDate: '2022-12-20T08:05:10.451+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:05:10.451+00:00'
        },
        {
          id: 125,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-44-34/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-07-33.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-07-33.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T23:44:35.119+00:00',
          createdDate: '2022-12-20T07:44:35.119+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:07:33.836+00:00'
        },
        {
          id: 124,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-40-33/Marmon_Customer_46030_Orders_BO_12-15-2022-15-02-24Marmon_Customer_46720_Orders_BO_12-13-2022-10-08-11Marmon_Customer_46720_Orders_BO_12-07-2022-13-57-55Bobcat Raw Open Order File.xls',
          uploadedFileCount: 930,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-40-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-40-34.xlsx',
          invalidOrdersFileCount: 930,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T23:40:34.780+00:00',
          createdDate: '2022-12-20T07:40:34.780+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T07:40:34.780+00:00'
        },
        {
          id: 123,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-14-37/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-17-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-17-13.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:14:38.044+00:00',
          createdDate: '2022-12-20T07:14:38.044+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:17:13.750+00:00'
        },
        {
          id: 122,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-14-03/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-17-24.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-17-24.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-20-2022-07-17-36.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:14:03.978+00:00',
          createdDate: '2022-12-20T07:14:03.978+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:17:36.652+00:00'
        },
        {
          id: 121,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-12-51/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-12-51.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-12-52.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:12:52.095+00:00',
          createdDate: '2022-12-20T07:12:52.095+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:12:52.095+00:00'
        },
        {
          id: 120,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-11-44/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-11-44.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-11-44.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-20-2022-07-11-56.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:11:44.322+00:00',
          createdDate: '2022-12-20T07:11:44.322+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:11:56.333+00:00'
        },
        {
          id: 119,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/05-34-31/BulkOrder-221.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-34-31.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-34-32.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-19T21:34:32.185+00:00',
          createdDate: '2022-12-20T05:34:32.185+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:34:32.185+00:00'
        },
        {
          id: 118,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/05-33-35/BulkOrder-221.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-33-36.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-33-36.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-19T21:33:36.159+00:00',
          createdDate: '2022-12-20T05:33:36.159+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:33:36.159+00:00'
        },
        {
          id: 117,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022-05-04-28BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-04-28.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-04-28.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-19T21:04:28.970+00:00',
          createdDate: '2022-12-20T05:04:28.970+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T05:04:28.970+00:00'
        },
        {
          id: 116,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022-05-03-24BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-04-20.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-04-20.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-19T21:03:24.267+00:00',
          createdDate: '2022-12-20T05:03:24.267+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:04:20.876+00:00'
        },
        {
          id: 115,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022-05-00-18Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-00-18.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-00-18.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T21:00:18.328+00:00',
          createdDate: '2022-12-20T05:00:18.328+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:00:18.328+00:00'
        },
        {
          id: 114,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-08-43.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-08-43.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-18T19:14:24.318+00:00',
          createdDate: '2022-12-19T03:14:24.318+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:08:44.050+00:00'
        },
        {
          id: 112,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-16-2022-08-57-19BulkOrder-221.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-08-57-37.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-08-57-37.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-16T00:57:19.799+00:00',
          createdDate: '2022-12-16T08:57:19.799+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T08:57:38.005+00:00'
        },
        {
          id: 111,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-16-2022-04-18-54Book1-Copy.xlsx',
          uploadedFileCount: 0,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-07-34-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-07-34-02.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-15T20:18:54.901+00:00',
          createdDate: '2022-12-16T04:18:54.901+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-16T07:34:02.673+00:00'
        },
        {
          id: 110,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-15-02-24Marmon_Customer_46720_Orders_BO_12-13-2022-10-08-11Marmon_Customer_46720_Orders_BO_12-07-2022-13-57-55Bobcat Raw Open Order File.xls',
          uploadedFileCount: 930,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-39-56.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-39-57.xlsx',
          invalidOrdersFileCount: 930,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-15T07:02:26.124+00:00',
          createdDate: '2022-12-15T15:02:26.124+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T07:39:58.014+00:00'
        },
        {
          id: 109,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-14-13-59Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-14-13-59.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-14-13-59.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-15T06:13:59.301+00:00',
          createdDate: '2022-12-15T14:13:59.301+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T14:13:59.301+00:00'
        },
        {
          id: 98,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-08-40-01Marmon_Customer_46030_Orders_BO_12-13-2022-05-17-47Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1) (1).xlsx',
          uploadedFileCount: 70,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-08-54-23.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-08-54-23.xlsx',
          invalidOrdersFileCount: 66,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-15T00:40:01.945+00:00',
          createdDate: '2022-12-15T08:40:01.945+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T08:54:23.453+00:00'
        },
        {
          id: 95,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-05-31-47Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-08-39-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-08-39-02.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T21:31:47.531+00:00',
          createdDate: '2022-12-15T05:31:47.531+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T08:39:02.535+00:00'
        },
        {
          id: 94,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-05-30-44Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-05-30-44.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-05-30-44.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T21:30:44.423+00:00',
          createdDate: '2022-12-15T05:30:44.423+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:30:44.423+00:00'
        },
        {
          id: 88,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-10-06-33Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-08-39-36.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-08-39-37.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T02:06:34.221+00:00',
          createdDate: '2022-12-14T10:06:34.221+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T08:39:37.666+00:00'
        },
        {
          id: 87,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-47-40Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-02-40-33.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-02-40-33.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-15-2022-02-40-37.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:47:40.607+00:00',
          createdDate: '2022-12-14T08:47:40.607+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T02:40:37.696+00:00'
        },
        {
          id: 86,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-44-09Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-05-36-52.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-05-36-52.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-15-2022-05-37-13.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:44:09.573+00:00',
          createdDate: '2022-12-14T08:44:09.573+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:37:13.353+00:00'
        },
        {
          id: 85,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-43-50Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-43-50.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-43-50.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-14-2022-08-44-02.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:43:51.028+00:00',
          createdDate: '2022-12-14T08:43:51.028+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-14T08:44:02.057+00:00'
        },
        {
          id: 84,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-43-39Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-43-39.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-43-39.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-14-2022-08-43-44.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:43:39.755+00:00',
          createdDate: '2022-12-14T08:43:39.755+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-14T08:43:44.767+00:00'
        },
        {
          id: 83,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-37-53Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-43-21.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-43-21.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-14-2022-08-43-28.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:37:53.871+00:00',
          createdDate: '2022-12-14T08:37:53.871+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-14T08:43:28.794+00:00'
        },
        {
          id: 80,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-04-41Marmon_Customer_46030_Orders_BO_12-12-2022-11-16-27Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-02-40-50.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-02-40-50.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-15-2022-02-41-00.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T00:04:41.624+00:00',
          createdDate: '2022-12-14T08:04:41.624+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T02:41:00.967+00:00'
        },
        {
          id: 79,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-04-18Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-09-03-45.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-09-03-45.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T00:04:18.310+00:00',
          createdDate: '2022-12-14T08:04:18.310+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:03:45.321+00:00'
        },
        {
          id: 78,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-07-08-58Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-09-03-57.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-09-03-57.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-13T23:08:59.228+00:00',
          createdDate: '2022-12-14T07:08:59.228+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:03:57.708+00:00'
        },
        {
          id: 77,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-13-2022-08-41-05Marmon_Customer_46030_Orders_BO_12-13-2022-05-17-47Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 70,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-08-42-30.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-08-42-30.xlsx',
          invalidOrdersFileCount: 66,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-08-42-47.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-13T00:41:05.460+00:00',
          createdDate: '2022-12-13T08:41:05.460+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-13T08:42:47.871+00:00'
        },
        {
          id: 76,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-13-2022-05-17-47Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 70,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-08-43-02.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-08-43-02.xlsx',
          invalidOrdersFileCount: 66,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-08-43-17.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T21:17:47.996+00:00',
          createdDate: '2022-12-13T05:17:47.996+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-13T08:43:17.751+00:00'
        },
        {
          id: 75,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-13-2022-04-54-29Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-04-54-29.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-04-54-29.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-04-55-05.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T20:54:29.978+00:00',
          createdDate: '2022-12-13T04:54:29.978+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T04:55:05.222+00:00'
        },
        {
          id: 74,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-27-02Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-29-00.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-29-00.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-29-52.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:27:02.464+00:00',
          createdDate: '2022-12-12T11:27:02.464+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:29:52.467+00:00'
        },
        {
          id: 73,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-22-59Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-12-33-47.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-12-33-47.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-12-34-13.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:22:59.317+00:00',
          createdDate: '2022-12-12T11:22:59.317+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:34:13.963+00:00'
        },
        {
          id: 72,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-22-10Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-22-10.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-22-10.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-22-33.xlsx',
          orderPlacedFileCount: 4,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:22:10.748+00:00',
          createdDate: '2022-12-12T11:22:10.748+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:22:34.013+00:00'
        },
        {
          id: 71,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-20-35Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-20-35.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-20-35.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-20-53.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:20:35.330+00:00',
          createdDate: '2022-12-12T11:20:35.330+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:20:53.228+00:00'
        },
        {
          id: 70,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-16-27Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-16-27.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-16-27.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-16-38.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:16:27.541+00:00',
          createdDate: '2022-12-12T11:16:27.541+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:16:38.471+00:00'
        },
        {
          id: 69,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-14-44Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-14-44.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-14-44.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-14-55.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:14:44.789+00:00',
          createdDate: '2022-12-12T11:14:44.789+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:14:55.802+00:00'
        },
        {
          id: 68,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-13-03Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-09-04-16.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-09-04-17.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:13:04.125+00:00',
          createdDate: '2022-12-12T11:13:04.125+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:04:17.090+00:00'
        },
        {
          id: 63,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-56-33Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-56-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-56-33.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:56:33.508+00:00',
          createdDate: '2022-12-12T09:56:33.508+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:56:33.508+00:00'
        },
        {
          id: 62,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-53-52Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 750,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-03-09.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-03-10.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:53:52.474+00:00',
          createdDate: '2022-12-12T09:53:52.474+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T08:03:10.212+00:00'
        },
        {
          id: 61,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-52-43Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 750,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-52-43.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-52-43.xlsx',
          invalidOrdersFileCount: 750,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:52:43.447+00:00',
          createdDate: '2022-12-12T09:52:43.447+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:52:43.447+00:00'
        },
        {
          id: 60,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-48-21Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-48-21.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-48-22.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:48:22.261+00:00',
          createdDate: '2022-12-12T09:48:22.261+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:48:22.261+00:00'
        },
        {
          id: 59,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-09-07Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-09-07.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-09-07.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:09:07.606+00:00',
          createdDate: '2022-12-12T09:09:07.606+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:09:07.606+00:00'
        },
        {
          id: 58,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-08-15Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-07-35-08.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-07-35-08.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:08:15.540+00:00',
          createdDate: '2022-12-12T09:08:15.540+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T07:35:08.993+00:00'
        },
        {
          id: 57,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-08-00-14Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-07-38.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-07-39.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T00:00:16.907+00:00',
          createdDate: '2022-12-12T08:00:16.907+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:07:39.952+00:00'
        },
        {
          id: 56,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-06-58-48Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-07-19-56.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-07-19-56.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-11T22:58:48.930+00:00',
          createdDate: '2022-12-12T06:58:48.930+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T07:19:56.181+00:00'
        },
        {
          id: 55,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-06-57-01Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-06-57-01.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-06-57-01.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-11T22:57:01.483+00:00',
          createdDate: '2022-12-12T06:57:01.483+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T06:57:01.483+00:00'
        },
        {
          id: 54,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-06-55-25Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-06-55-26.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-06-55-26.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-11T22:55:26.257+00:00',
          createdDate: '2022-12-12T06:55:26.257+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T06:55:26.257+00:00'
        }
      ],
      getBulkExcelData: [
        {
          id: 185,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-13-02/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-09-2023-11-04-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-09-2023-11-04-13.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:13:02.232+00:00',
          createdDate: '2023-01-04T05:13:02.232+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-09T11:04:13.373+00:00'
        },
        {
          id: 184,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-12-38/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-05-12-38.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-05-12-38.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:12:38.709+00:00',
          createdDate: '2023-01-04T05:12:38.709+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:12:38.709+00:00'
        },
        {
          id: 183,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-12-15/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-05-12-15.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-05-12-15.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:12:15.795+00:00',
          createdDate: '2023-01-04T05:12:15.795+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:12:15.795+00:00'
        },
        {
          id: 182,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-11-50/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-06-2023-08-46-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-06-2023-08-46-13.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:11:50.789+00:00',
          createdDate: '2023-01-04T05:11:50.789+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-06T08:46:13.547+00:00'
        },
        {
          id: 181,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-11-21/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-05-2023-05-19-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-05-2023-05-19-33.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:11:21.782+00:00',
          createdDate: '2023-01-04T05:11:21.782+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T05:19:33.559+00:00'
        },
        {
          id: 180,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-10-40/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-05-10-40.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-05-10-40.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:10:40.671+00:00',
          createdDate: '2023-01-04T05:10:40.671+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:10:40.671+00:00'
        },
        {
          id: 179,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/01-04-2023/05-09-56/Bulk Order Single Test.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-04-2023-10-13-06.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-04-2023-10-13-06.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:09:56.612+00:00',
          createdDate: '2023-01-04T05:09:56.612+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-04T10:13:06.237+00:00'
        },
        {
          id: 178,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/13-23-35/Bulk Order Single Test.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-05-2023-09-08-57.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-05-2023-09-08-57.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile01-05-2023-09-09-53.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:23:35.351+00:00',
          createdDate: '2022-12-23T13:23:35.351+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:09:55.756+00:00'
        },
        {
          id: 177,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/13-21-47/Bulk Order Single Test.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-06-2023-08-46-29.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-06-2023-08-46-29.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:21:47.554+00:00',
          createdDate: '2022-12-23T13:21:47.554+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-06T08:46:29.200+00:00'
        },
        {
          id: 176,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/13-21-25/Bulk Order Single Test.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders01-03-2023-03-58-37.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders01-03-2023-03-58-37.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:21:26.097+00:00',
          createdDate: '2022-12-23T13:21:26.097+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-03T03:58:37.600+00:00'
        },
        {
          id: 175,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-23-2022/11-02-54/Marmon_Customer_46030_Orders_BO_12-22-2022_16-21-30_Marmon_Customer_46030_Orders_BO_12-22-2022_15-55-11_Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-23-2022-11-02-55.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-23-2022-11-02-55.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-23-2022-11-04-21.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-23T03:02:55.159+00:00',
          createdDate: '2022-12-23T11:02:55.159+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-23T11:04:23.638+00:00'
        },
        {
          id: 173,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/16-21-30/Marmon_Customer_46030_Orders_BO_12-22-2022_15-55-11_Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-16-21-30.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-16-21-30.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-16-21-35.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-22T08:21:30.759+00:00',
          createdDate: '2022-12-22T16:21:30.759+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-22T16:21:38.098+00:00'
        },
        {
          id: 172,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/15-55-11/Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-23-2022-04-55-12.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-23-2022-04-55-12.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-23-2022-04-55-39.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-22T07:55:11.208+00:00',
          createdDate: '2022-12-22T15:55:11.208+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-23T04:55:42.201+00:00'
        },
        {
          id: 171,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/15-54-49/Marmon_Customer_46030_Orders_BO_12-22-2022_09-28-26_BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-54-49.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-54-49.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-54-59.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-22T07:54:49.678+00:00',
          createdDate: '2022-12-22T15:54:49.678+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-22T15:55:01.621+00:00'
        },
        {
          id: 170,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/11-48-36/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-12-13.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-12-13.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-13-06.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T03:48:36.678+00:00',
          createdDate: '2022-12-22T11:48:36.678+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-22T15:13:08.855+00:00'
        },
        {
          id: 169,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/11-35-32/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-16-00.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-16-00.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-17-00.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T03:35:32.640+00:00',
          createdDate: '2022-12-22T11:35:32.640+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-22T15:17:01.925+00:00'
        },
        {
          id: 168,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/11-35-19/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-15-23-12.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-15-23-12.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-22-2022-15-43-42.xlsx',
          orderPlacedFileCount: 3,
          orderStatus: {
            id: 3,
            code: 'OP',
            description: 'Placed'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T03:35:19.653+00:00',
          createdDate: '2022-12-22T11:35:19.653+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-22T15:43:44.833+00:00'
        },
        {
          id: 167,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/09-28-26/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-23-2022-09-02-53.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-23-2022-09-02-53.xlsx',
          invalidOrdersFileCount: 2,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T01:28:27.101+00:00',
          createdDate: '2022-12-22T09:28:27.101+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T09:02:53.646+00:00'
        },
        {
          id: 166,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-03-28/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-03-28.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-03-28.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:03:28.346+00:00',
          createdDate: '2022-12-22T08:03:28.346+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:03:28.346+00:00'
        },
        {
          id: 165,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-02-53/BO Test File.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-02-53.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-02-53.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:02:53.439+00:00',
          createdDate: '2022-12-22T08:02:53.439+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:02:53.439+00:00'
        },
        {
          id: 164,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-01-46/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-01-47.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-01-47.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:01:47.185+00:00',
          createdDate: '2022-12-22T08:01:47.185+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:01:47.185+00:00'
        },
        {
          id: 163,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-22-2022/08-00-21/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-08-00-21.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-08-00-21.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T00:00:22.091+00:00',
          createdDate: '2022-12-22T08:00:22.091+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T08:00:22.091+00:00'
        },
        {
          id: 140,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/09-20-09/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-07-34-20.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-07-34-21.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T01:20:10.071+00:00',
          createdDate: '2022-12-20T09:20:10.071+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T07:34:21.105+00:00'
        },
        {
          id: 139,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/09-07-03/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-09-07-03.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-09-07-03.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T01:07:03.648+00:00',
          createdDate: '2022-12-20T09:07:03.648+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T09:07:03.648+00:00'
        },
        {
          id: 138,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/09-04-26/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-09-04-26.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-09-04-26.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-20-2022-09-05-09.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T01:04:26.580+00:00',
          createdDate: '2022-12-20T09:04:26.580+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T09:05:09.276+00:00'
        },
        {
          id: 137,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-59-44/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-09-03-34.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-09-03-34.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:59:45.035+00:00',
          createdDate: '2022-12-20T08:59:45.035+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T09:03:34.807+00:00'
        },
        {
          id: 136,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-42-58/Marmon_Customer_46030_Orders_BPO_12-14-2022-10-51-47BlanketPO_TestFile.xlsx',
          uploadedFileCount: 6,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-42-59.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-42-59.xlsx',
          invalidOrdersFileCount: 6,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:42:59.184+00:00',
          createdDate: '2022-12-20T08:42:59.184+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:42:59.184+00:00'
        },
        {
          id: 135,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-41-58/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-41-59.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-41-59.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:41:59.408+00:00',
          createdDate: '2022-12-20T08:41:59.408+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:41:59.408+00:00'
        },
        {
          id: 134,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-31-57/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-31-57.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-31-57.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:31:57.897+00:00',
          createdDate: '2022-12-20T08:31:57.897+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:31:57.897+00:00'
        },
        {
          id: 133,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-10-30/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-10-30.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-10-30.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:10:30.980+00:00',
          createdDate: '2022-12-20T08:10:30.980+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:10:30.980+00:00'
        },
        {
          id: 132,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-09-41/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-09-41.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-09-42.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:09:42.088+00:00',
          createdDate: '2022-12-20T08:09:42.088+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:09:42.088+00:00'
        },
        {
          id: 131,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-09-10/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-09-10.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-09-10.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:09:10.241+00:00',
          createdDate: '2022-12-20T08:09:10.241+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:09:10.241+00:00'
        },
        {
          id: 130,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-08-54/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-08-54.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-08-55.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:08:55.066+00:00',
          createdDate: '2022-12-20T08:08:55.066+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:08:55.066+00:00'
        },
        {
          id: 129,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-08-17/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-08-17.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-08-17.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:08:17.611+00:00',
          createdDate: '2022-12-20T08:08:17.611+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:08:17.611+00:00'
        },
        {
          id: 128,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-07-04/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-07-04.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-07-04.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:07:04.491+00:00',
          createdDate: '2022-12-20T08:07:04.491+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:07:04.491+00:00'
        },
        {
          id: 127,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-05-30/BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-08-03.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-08-03.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-20T00:05:31.142+00:00',
          createdDate: '2022-12-20T08:05:31.142+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:08:03.631+00:00'
        },
        {
          id: 126,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/08-05-10/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-05-10.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-05-10.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-20T00:05:10.451+00:00',
          createdDate: '2022-12-20T08:05:10.451+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T08:05:10.451+00:00'
        },
        {
          id: 125,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-44-34/Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-07-33.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-07-33.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T23:44:35.119+00:00',
          createdDate: '2022-12-20T07:44:35.119+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:07:33.836+00:00'
        },
        {
          id: 124,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-40-33/Marmon_Customer_46030_Orders_BO_12-15-2022-15-02-24Marmon_Customer_46720_Orders_BO_12-13-2022-10-08-11Marmon_Customer_46720_Orders_BO_12-07-2022-13-57-55Bobcat Raw Open Order File.xls',
          uploadedFileCount: 930,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-40-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-40-34.xlsx',
          invalidOrdersFileCount: 930,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T23:40:34.780+00:00',
          createdDate: '2022-12-20T07:40:34.780+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T07:40:34.780+00:00'
        },
        {
          id: 123,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-14-37/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-17-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-17-13.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:14:38.044+00:00',
          createdDate: '2022-12-20T07:14:38.044+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:17:13.750+00:00'
        },
        {
          id: 122,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-14-03/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-17-24.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-17-24.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-20-2022-07-17-36.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:14:03.978+00:00',
          createdDate: '2022-12-20T07:14:03.978+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:17:36.652+00:00'
        },
        {
          id: 121,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-12-51/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-12-51.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-12-52.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:12:52.095+00:00',
          createdDate: '2022-12-20T07:12:52.095+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:12:52.095+00:00'
        },
        {
          id: 120,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/07-11-44/Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-11-44.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-11-44.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-20-2022-07-11-56.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:11:44.322+00:00',
          createdDate: '2022-12-20T07:11:44.322+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:11:56.333+00:00'
        },
        {
          id: 119,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/05-34-31/BulkOrder-221.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-34-31.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-34-32.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-19T21:34:32.185+00:00',
          createdDate: '2022-12-20T05:34:32.185+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:34:32.185+00:00'
        },
        {
          id: 118,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022/05-33-35/BulkOrder-221.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-33-36.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-33-36.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-19T21:33:36.159+00:00',
          createdDate: '2022-12-20T05:33:36.159+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:33:36.159+00:00'
        },
        {
          id: 117,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022-05-04-28BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-04-28.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-04-28.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-19T21:04:28.970+00:00',
          createdDate: '2022-12-20T05:04:28.970+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T05:04:28.970+00:00'
        },
        {
          id: 116,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022-05-03-24BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 1,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-08-04-20.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-08-04-20.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-19T21:03:24.267+00:00',
          createdDate: '2022-12-20T05:03:24.267+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2022-12-20T08:04:20.876+00:00'
        },
        {
          id: 115,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-20-2022-05-00-18Marmon_Customer_46030_Orders_BO_12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-00-18.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-00-18.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T21:00:18.328+00:00',
          createdDate: '2022-12-20T05:00:18.328+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:00:18.328+00:00'
        },
        {
          id: 114,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-19-2022-03-14-23BulkOrder_TestFile_1.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-05-08-43.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-05-08-43.xlsx',
          invalidOrdersFileCount: 1,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2022-12-18T19:14:24.318+00:00',
          createdDate: '2022-12-19T03:14:24.318+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:08:44.050+00:00'
        },
        {
          id: 112,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-16-2022-08-57-19BulkOrder-221.xlsx',
          uploadedFileCount: 3,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-08-57-37.xlsx',
          validOrdersFileCount: 3,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-08-57-37.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-16T00:57:19.799+00:00',
          createdDate: '2022-12-16T08:57:19.799+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T08:57:38.005+00:00'
        },
        {
          id: 111,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-16-2022-04-18-54Book1-Copy.xlsx',
          uploadedFileCount: 0,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-07-34-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-07-34-02.xlsx',
          invalidOrdersFileCount: 0,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-15T20:18:54.901+00:00',
          createdDate: '2022-12-16T04:18:54.901+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-16T07:34:02.673+00:00'
        },
        {
          id: 110,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-15-02-24Marmon_Customer_46720_Orders_BO_12-13-2022-10-08-11Marmon_Customer_46720_Orders_BO_12-07-2022-13-57-55Bobcat Raw Open Order File.xls',
          uploadedFileCount: 930,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-20-2022-07-39-56.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-20-2022-07-39-57.xlsx',
          invalidOrdersFileCount: 930,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-15T07:02:26.124+00:00',
          createdDate: '2022-12-15T15:02:26.124+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T07:39:58.014+00:00'
        },
        {
          id: 109,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-14-13-59Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-14-13-59.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-14-13-59.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-15T06:13:59.301+00:00',
          createdDate: '2022-12-15T14:13:59.301+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T14:13:59.301+00:00'
        },
        {
          id: 98,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-08-40-01Marmon_Customer_46030_Orders_BO_12-13-2022-05-17-47Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1) (1).xlsx',
          uploadedFileCount: 70,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-08-54-23.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-08-54-23.xlsx',
          invalidOrdersFileCount: 66,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-15T00:40:01.945+00:00',
          createdDate: '2022-12-15T08:40:01.945+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T08:54:23.453+00:00'
        },
        {
          id: 95,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-05-31-47Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-08-39-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-08-39-02.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T21:31:47.531+00:00',
          createdDate: '2022-12-15T05:31:47.531+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T08:39:02.535+00:00'
        },
        {
          id: 94,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-15-2022-05-30-44Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-05-30-44.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-05-30-44.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T21:30:44.423+00:00',
          createdDate: '2022-12-15T05:30:44.423+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:30:44.423+00:00'
        },
        {
          id: 88,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-10-06-33Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-08-39-36.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-08-39-37.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T02:06:34.221+00:00',
          createdDate: '2022-12-14T10:06:34.221+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T08:39:37.666+00:00'
        },
        {
          id: 87,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-47-40Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-02-40-33.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-02-40-33.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-15-2022-02-40-37.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:47:40.607+00:00',
          createdDate: '2022-12-14T08:47:40.607+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T02:40:37.696+00:00'
        },
        {
          id: 86,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-44-09Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-05-36-52.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-05-36-52.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-15-2022-05-37-13.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:44:09.573+00:00',
          createdDate: '2022-12-14T08:44:09.573+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:37:13.353+00:00'
        },
        {
          id: 85,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-43-50Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-43-50.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-43-50.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-14-2022-08-44-02.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:43:51.028+00:00',
          createdDate: '2022-12-14T08:43:51.028+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-14T08:44:02.057+00:00'
        },
        {
          id: 84,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-43-39Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-43-39.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-43-39.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-14-2022-08-43-44.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:43:39.755+00:00',
          createdDate: '2022-12-14T08:43:39.755+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-14T08:43:44.767+00:00'
        },
        {
          id: 83,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-37-53Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-43-21.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-43-21.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-14-2022-08-43-28.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-14T00:37:53.871+00:00',
          createdDate: '2022-12-14T08:37:53.871+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-14T08:43:28.794+00:00'
        },
        {
          id: 80,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-04-41Marmon_Customer_46030_Orders_BO_12-12-2022-11-16-27Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-15-2022-02-40-50.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-15-2022-02-40-50.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-15-2022-02-41-00.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T00:04:41.624+00:00',
          createdDate: '2022-12-14T08:04:41.624+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T02:41:00.967+00:00'
        },
        {
          id: 79,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-08-04-18Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-09-03-45.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-09-03-45.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T00:04:18.310+00:00',
          createdDate: '2022-12-14T08:04:18.310+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:03:45.321+00:00'
        },
        {
          id: 78,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-14-2022-07-08-58Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-09-03-57.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-09-03-57.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-13T23:08:59.228+00:00',
          createdDate: '2022-12-14T07:08:59.228+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:03:57.708+00:00'
        },
        {
          id: 77,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-13-2022-08-41-05Marmon_Customer_46030_Orders_BO_12-13-2022-05-17-47Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 70,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-08-42-30.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-08-42-30.xlsx',
          invalidOrdersFileCount: 66,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-08-42-47.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-13T00:41:05.460+00:00',
          createdDate: '2022-12-13T08:41:05.460+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-13T08:42:47.871+00:00'
        },
        {
          id: 76,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-13-2022-05-17-47Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 70,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-08-43-02.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-08-43-02.xlsx',
          invalidOrdersFileCount: 66,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-08-43-17.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T21:17:47.996+00:00',
          createdDate: '2022-12-13T05:17:47.996+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-13T08:43:17.751+00:00'
        },
        {
          id: 75,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-13-2022-04-54-29Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-04-54-29.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-04-54-29.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-04-55-05.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T20:54:29.978+00:00',
          createdDate: '2022-12-13T04:54:29.978+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T04:55:05.222+00:00'
        },
        {
          id: 74,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-27-02Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-29-00.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-29-00.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-29-52.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:27:02.464+00:00',
          createdDate: '2022-12-12T11:27:02.464+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:29:52.467+00:00'
        },
        {
          id: 73,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-22-59Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-13-2022-12-33-47.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-13-2022-12-33-47.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-13-2022-12-34-13.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:22:59.317+00:00',
          createdDate: '2022-12-12T11:22:59.317+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:34:13.963+00:00'
        },
        {
          id: 72,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-22-10Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-22-10.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-22-10.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-22-33.xlsx',
          orderPlacedFileCount: 4,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:22:10.748+00:00',
          createdDate: '2022-12-12T11:22:10.748+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:22:34.013+00:00'
        },
        {
          id: 71,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-20-35Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 20,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-20-35.xlsx',
          validOrdersFileCount: 4,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-20-35.xlsx',
          invalidOrdersFileCount: 16,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-20-53.xlsx',
          orderPlacedFileCount: 2,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:20:35.330+00:00',
          createdDate: '2022-12-12T11:20:35.330+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:20:53.228+00:00'
        },
        {
          id: 70,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-16-27Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-16-27.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-16-27.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-16-38.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:16:27.541+00:00',
          createdDate: '2022-12-12T11:16:27.541+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:16:38.471+00:00'
        },
        {
          id: 69,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-14-44Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-11-14-44.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-11-14-44.xlsx',
          invalidOrdersFileCount: 3,
          orderPlacedFile: 'Marmon/Customer/46030/Orders/BO/OrderFile12-12-2022-11-14-55.xlsx',
          orderPlacedFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PO',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:14:44.789+00:00',
          createdDate: '2022-12-12T11:14:44.789+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:14:55.802+00:00'
        },
        {
          id: 68,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-11-13-03Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-16-2022-09-04-16.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-16-2022-09-04-17.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:13:04.125+00:00',
          createdDate: '2022-12-12T11:13:04.125+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:04:17.090+00:00'
        },
        {
          id: 63,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-56-33Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-56-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-56-33.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:56:33.508+00:00',
          createdDate: '2022-12-12T09:56:33.508+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:56:33.508+00:00'
        },
        {
          id: 62,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-53-52Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 750,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-14-2022-08-03-09.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-14-2022-08-03-10.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:53:52.474+00:00',
          createdDate: '2022-12-12T09:53:52.474+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T08:03:10.212+00:00'
        },
        {
          id: 61,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-52-43Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 750,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-52-43.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-52-43.xlsx',
          invalidOrdersFileCount: 750,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:52:43.447+00:00',
          createdDate: '2022-12-12T09:52:43.447+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:52:43.447+00:00'
        },
        {
          id: 60,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-48-21Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-48-21.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-48-22.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:48:22.261+00:00',
          createdDate: '2022-12-12T09:48:22.261+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:48:22.261+00:00'
        },
        {
          id: 59,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-09-07Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-09-07.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-09-07.xlsx',
          invalidOrdersFileCount: 5,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:09:07.606+00:00',
          createdDate: '2022-12-12T09:09:07.606+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:09:07.606+00:00'
        },
        {
          id: 58,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-09-08-15Book1-Copy.xlsx',
          uploadedFileCount: 5,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-22-2022-07-35-08.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-22-2022-07-35-08.xlsx',
          invalidOrdersFileCount: 4,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T01:08:15.540+00:00',
          createdDate: '2022-12-12T09:08:15.540+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T07:35:08.993+00:00'
        },
        {
          id: 57,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-08-00-14Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-09-07-38.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-09-07-39.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T00:00:16.907+00:00',
          createdDate: '2022-12-12T08:00:16.907+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:07:39.952+00:00'
        },
        {
          id: 56,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-06-58-48Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-07-19-56.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-07-19-56.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-11T22:58:48.930+00:00',
          createdDate: '2022-12-12T06:58:48.930+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T07:19:56.181+00:00'
        },
        {
          id: 55,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-06-57-01Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-06-57-01.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-06-57-01.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-11T22:57:01.483+00:00',
          createdDate: '2022-12-12T06:57:01.483+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T06:57:01.483+00:00'
        },
        {
          id: 54,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BO/12-12-2022-06-55-25Untouched Bobcat Order Extaction Spreadsheet.xls',
          uploadedFileCount: 756,
          validOrdersFile: 'Marmon/Customer/46030/Orders/BO/ValidOrders12-12-2022-06-55-26.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFile: 'Marmon/Customer/46030/Orders/BO/InvalidOrders12-12-2022-06-55-26.xlsx',
          invalidOrdersFileCount: 756,
          orderPlacedFile: null,
          orderPlacedFileCount: null,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-11T22:55:26.257+00:00',
          createdDate: '2022-12-12T06:55:26.257+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T06:55:26.257+00:00'
        }
      ],
      getBulkHistoryId: {
        id: 45
      }


    },
    auth: {
      token: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
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

    wrapper = mount(ShallowMock(<BulkOrderHistoryTable openTableModal={true} />, store));

    agGridReact = wrapper.find(AgGridReact).instance();

    ensureGridApiHasBeenSet(wrapper.find(AgGridReact)).then(() => done());
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });
  it('mount html', () => {
    console.log(wrapper.debug() , "mountthth")
    
  });

  it('Aggrid Api', () => {
    expect(agGridReact.api).toBeTruthy();
  });

  it('AgGrid table', () => {
    expect(wrapper.find('AgGridReact')).toBeDefined();
  });

  it('BulkOrderHistoryTable are there', () => {
    expect('BulkOrderHistoryTable').toBeTruthy();
  });

  it('Handle click on custom Button', () => {
    const button = wrapper.find('ForwardRef(Button)');

    act(() => { button.at(0).props().onClick() });
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    act(() => { button.at(0).props().onClose() });
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('MuiPopoverRoot');
    act(() => { button.at(0).props().onClose() });
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    act(() => { button.at(0).props().onClose() });
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    act(() => { button.at(0).props().onClose() });
  });
  it('Handle close on SortingCount', () => {
    const button = wrapper.find('SortingCount');
    button.at(0).props().onChange();
  });

  it('Handle close on SortingCount', () => {
    const button = wrapper.find('select');
    button.at(0).props().onChange('e');
  });

  it('Handle click on onGridSizeChanged', () => {
    const button = wrapper.find('AgGridReact');
    act(() => button.at(0).props().onGridSizeChanged());
  });
  

  // it('Handle click on onGridSizeChanged', () => {
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(1).props().onSelectionChanged());
  // });

  

  it('Handle click on onFirstDataRendered', () => {
    const button = wrapper.find('AgGridReact');
    act(() => button.at(0).props().onFirstDataRendered());
  });

  it('LinkComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.LinkComponent({ data: { id: 1 }, value: 2 });
  });

 
  
  

  it('validateComponent pending', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.validateComponent({ data: { orderStatus: 'Pending' }, value: 2 });
  });

  it('validateComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.validateComponent({ data: { orderStatus: 'Processing' }, value: 2 });
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
    act(() => { button.at(0).props().frameworkComponents.ActionComponent({ value: 'R' }) });
  });

  // it('onFirstDataRendered', () =>
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(0).props().onFirstDataRendered());
  // });

  it('handleOpen', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(0).props().onClick());
  });

  it('hancleClick', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(1).props().onClick());
  });

  it('hancleClick', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(1).props().onClick());
  });

  it('deleteBPO', () => {
    const button = wrapper.find('ForwardRef(ButtonBase)');
    act(() => button.at(0).props().onClick());
  });

  it('handleOpen', () => {
    const button = wrapper.find('input');
    act(() => button.at(0).props().onClick());
  });

  it('handleOpen', () => {
    const button = wrapper.find('input');
    act(() => button.at(1).props().onClick());
  });

  it('handleOpen', () => {
    const button = wrapper.find('input');
    act(() => button.at(2).props().onClick());
  });

  it('onChange on handleChange', () => {
    const button = wrapper.find('WithStyles(ForwardRef(Pagination))');
    act(() => button.at(0).props().onChange());
  });

  it('onClose on handleModleClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleModleClose', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleTableModalClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    act(() => button.at(1).props().onClose());
  });

  it('onClose on handleTableModalClose', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    act(() => button.at(1).props().onClose());
  });

  it('onClose on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Dialog)');
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleModalClose', () => {
    const button = wrapper.find('MuiDialogRoot');
    act(() => button.at(0).props().onClose());
  });

  it('onClose on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    act(() => button.at(1).props().onClose());
  });

  it('onClose on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    act(() => button.at(1).props().onClose());
  });

});

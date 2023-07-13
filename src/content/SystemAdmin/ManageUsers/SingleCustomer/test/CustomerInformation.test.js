import React from 'react';
import Example from '../CustomerTabs/CustomerInformation/CustomerInformation';
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
            },
            getUomData: [
                {
                    uomCode: 'FT',
                    uomName: 'Feet'
                },
                {
                    uomCode: 'IN',
                    uomName: 'Inches'
                },
                {
                    uomCode: 'PCS',
                    uomName: 'Pieces'
                },
                {
                    uomCode: 'LBS',
                    uomName: 'Pounds'
                },
                {
                    uomCode: 'M',
                    uomName: 'Meters'
                },
                {
                    uomCode: 'MM',
                    uomName: 'MilliMeters'
                },
                {
                    uomCode: 'KG',
                    uomName: 'Kilograms'
                },
                {
                    uomCode: 'TON',
                    uomName: 'Tons'
                },
                {
                    uomCode: 'PARTS',
                    uomName: 'Parts'
                }
            ],
            getTimezoneData :[
  
                {
                  timezoneName: 'Pacific Time',
                  timezoneCode: 'PT'
                },
                {
                  timezoneName: 'Mountain Time',
                  timezoneCode: 'MT'
                },
                {
                  timezoneName: 'Central Time',
                  timezoneCode: 'CT'
                },
                {
                  timezoneName: 'Eastern Time',
                  timezoneCode: 'ET'
                },
                {
                  timezoneName: 'UTC',
                  timezoneCode: 'UTC'
                }
              ],
              
              getLogo: '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'
              ,
              customerTableData :{
                id: 1,
                groupCode: {
                  id: 7,
                  code: 7
                },
                branch: {
                  id: 39,
                  branchNumber: 80,
                  branchName: 'Butler'
                },
                customerNumber: 46655,
                customerName: 'CATERPILLAR INC (BAR PROGRAM)',
                parentCustomerId: null,
            
                shippingLocations: [
                  {
                    id: 8,
                    customerId: 8,
                    address: '22B St, Jacksonville, 32244',
                    primary: true,
                    priorityNumber: 1,
                    customerNumber: 400
                  }
                ],
                preferredUOM: 'In',
                inventoryROS: '87',
                features: [],
                timeZone: 'PT',
                truckSchedules: [],
                branchNumber: 895,
                containerProgram: 'Container Program 10',
                containerDefaultReceiveFromLocation: 'Container Receive From Location 8',
                containerHomeLocation: 'Container Home Location 8',
                containerDefaultShipToLocation: 'Container Default Shipto Location 8',
                visibleContainerLocations: 'Visible Container Locations 8',
                logo: null,
                createdBy: 'System',
                createdDate: '2022-08-11T12:00:00.000+00:00',
                updatedBy: 'peter.parker@invaliddomain.som',
                updatedDate: '2022-08-23T04:50:45.281+00:00',
                associatedUsers: {
                  customerId: 8,
                  userId: 6,
                  email: 'lionel@gmail.com',
                  firstName: 'messi12',
                  lastName: 'leo'
                },
                associatedCustomers: [
                  {
                    customerId: 7,
                    customerNumber: 46655,
                    customerName: 'CATERPILLAR INC (BAR PROGRAM)',
                    branchNumber: 80,
                    primary: true
                  }
                ]
              }

          
        },
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

        wrapper = shallow(ShallowMock(<Example />, store));
    });

    afterEach(() => {
        //   wrapper.unmount();
        useSelectorMock.mockClear();
    });

    it('render component Example', () => {
        expect(wrapper.find('Example')).toBeTruthy();
    });

    it("mount html", () => {
       
    })

    it("test function handleOpen", () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');
        button.at(0).props().onClick();
    })

    it("test function onFormSubmit", () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');
        button.at(1).props().onClick();
    })

    

    it("test function handleOpen", () => {
        const button = wrapper.find('ForwardRef(Modal)');
        button.at(0).props().onClose();
    })
});


describe('EditUser', () => {
    let wrapper;

    const store = mockStore({
        customers: {
            customerData: {
                id: 1,
                groupCode: 55,
                customerNumber: 2341,
                firstName: 'Raj',
                lastName: 'Gatkul',
                parentCustomerID: 2,
                shippingLocations: 1,
                status: {
                    id: 1,
                    code: 'A',
                    description: 'Active'
                },
                associatedUsers: 122,
                preferredUOM: 'Sta',
                inventoryROS: 21,
                features: 1,
                timeZone: 'time',
                truckSchedule: null,
                branch_number: 24,
                containerProgram: 'container program',
                containerDefaultReceiveFromLocation: '22B Street, Atlanta 77234',
                containerHomeLocation: '22B Street, Atlanta 77234',
                vontainerDefaultShiptolocation: 'Pune',
                visibleContainerLocations: 'Pune',
                logo: null,
                customerShippingLocation: [
                    {
                        id: 1,
                        customerID: 1,
                        address: '22B Street, Atlanta 77234',
                        priorityNumber: 1,
                        primary: true
                    }
                ],
                associatedCustomerUser: [
                    {
                        id: 1,
                        customerID: 1,
                        associatedUserID: 1
                    }
                ],
                customerFeatures: [
                    {
                        id: 1,
                        customerID: 1,
                        featureID: 1
                    }
                ],
                customerTruckSchedule: [
                    {
                        id: 1,
                        customerID: 1
                    }
                ]
            }
        },
        auth: {
            token: {
                token:
                    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
            }
        }
    });
    const useSelectorMock = reactRedux.useSelector;

    beforeEach(async () => {
        const onClick = jest.fn();

        wrapper = mount(ShallowMock(<Example />, store));
        

        useSelectorMock.mockImplementation((selector) =>
            selector(store?.getState())
        );
    });

    afterEach(() => {
        wrapper.unmount();
        useSelectorMock.mockClear();
    });

    it('Example', () => {
        expect('Example').toBeTruthy();
    });
    // it('button on login click', () => {
    //     const button = wrapper.find('Styled(ForwardRef(FormControlLabel))');

    //     button.at(0).props().onChange();
    // });
});


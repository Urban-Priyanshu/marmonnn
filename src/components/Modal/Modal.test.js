import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Modal from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';

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

describe("Modal", () => {

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

        users: {
            usersData: [
                {
                    id: 56,
                    firstName: 'temp3',
                    lastName: 'temp3',
                    email: 'namokil366@dentaltz.com',
                    roles: [
                        {
                            id: 1,
                            code: 'ROLE_SUPER_ADMIN',
                            description: 'Super Admin',
                            authority: 'ROLE_SUPER_ADMIN'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2023-01-06T02:51:11.554+00:00',
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'peter.parker@invaliddomain.som',
                    createdDate: '2023-01-06T02:04:48.107+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2023-01-09T11:14:57.443+00:00',
                    associateCustomerId: null
                },
                {
                    id: 54,
                    firstName: 'rajeev1',
                    lastName: 'singh1',
                    email: 'namokil366a@dentaltz.com',
                    roles: [
                        {
                            id: 1,
                            code: 'ROLE_SUPER_ADMIN',
                            description: 'Super Admin',
                            authority: 'ROLE_SUPER_ADMIN'
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
                    lastLogin: '2023-01-06T03:06:03.239+00:00',
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'peter.parker@invaliddomain.som',
                    createdDate: '2023-01-03T20:26:53.745+00:00',
                    updatedBy: 'namokil366@dentaltz.com',
                    updatedDate: '2023-01-06T03:06:03.240+00:00',
                    associateCustomerId: null
                },
                {
                    id: 53,
                    firstName: 'Rammbj',
                    lastName: 'Charmnnn2',
                    email: 'userty@mailinator.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
                    createdDate: '2023-01-02T12:40:56.178+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2023-01-04T05:15:39.133+00:00',
                    associateCustomerId: null
                },
                {
                    id: 52,
                    firstName: 'Amit',
                    lastName: 'Thakur',
                    email: 'amit.thakur@compunneldigital.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'LS.Adith@compunneldigital.com',
                    createdDate: '2022-12-23T05:14:03.851+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2023-01-03T13:04:17.332+00:00',
                    associateCustomerId: null
                },
                {
                    id: 41,
                    firstName: 'faffnkbdds',
                    lastName: 'adcavvsnfbbvdsvsvd',
                    email: 'ccxrsharma@gmail.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2022-12-09T06:10:07.267+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2023-01-04T03:55:25.465+00:00',
                    associateCustomerId: null
                },
                {
                    id: 38,
                    firstName: 'Amit',
                    lastName: 'Kumar',
                    email: 'akagrwal1812@gmail.com',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Nisha.Kumari@compunneldigital.com',
                    createdDate: '2022-12-06T08:42:02.862+00:00',
                    updatedBy: 'Nisha.Kumari@compunneldigital.com',
                    updatedDate: '2022-12-06T08:43:34.988+00:00',
                    associateCustomerId: null
                },
                {
                    id: 37,
                    firstName: 'Priyanshu',
                    lastName: 'Mishra',
                    email: 'pm@cd.com',
                    roles: [
                        {
                            id: 1,
                            code: 'ROLE_SUPER_ADMIN',
                            description: 'Super Admin',
                            authority: 'ROLE_SUPER_ADMIN'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'LS.Adith@compunneldigital.com',
                    createdDate: '2022-12-05T07:35:05.113+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2022-12-05T07:35:05.113+00:00',
                    associateCustomerId: null
                },
                {
                    id: 31,
                    firstName: 'hjabjhq',
                    lastName: 'dad',
                    email: 'swhg@gmail.com',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'LS.Adith@compunneldigital.com',
                    createdDate: '2022-11-10T13:12:49.977+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2022-11-10T13:12:49.977+00:00',
                    associateCustomerId: null
                },
                {
                    id: 30,
                    firstName: 'priynshu',
                    lastName: 'mishra',
                    email: 'pm@gmail.com',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'LS.Adith@compunneldigital.com',
                    createdDate: '2022-11-09T08:47:51.295+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2022-11-09T08:47:51.295+00:00',
                    associateCustomerId: null
                },
                {
                    id: 29,
                    firstName: 'fgba',
                    lastName: 'dsdsfs',
                    email: 'wdqdq@gmail.com',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'LS.Adith@compunneldigital.com',
                    createdDate: '2022-11-09T06:58:00.816+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2022-11-09T06:58:00.816+00:00',
                    associateCustomerId: null
                },
                {
                    id: 27,
                    firstName: 'naveen',
                    lastName: 'sasasa',
                    email: 'naveensg47@gmail.com',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [
                        {
                            id: 17,
                            userId: 27,
                            featureId: 3,
                            featureCode: null,
                            featureDescription: null
                        },
                        {
                            id: 18,
                            userId: 27,
                            featureId: 6,
                            featureCode: null,
                            featureDescription: null
                        }
                    ],
                    lastLogin: '2022-12-20T11:16:59.947+00:00',
                    jobTitle: 'enginner',
                    jobType: {
                        code: 'C',
                        description: 'Customer'
                    },
                    createdBy: 'deepanshu.tyagi@compunneldigital.com',
                    createdDate: '2022-10-28T07:57:23.343+00:00',
                    updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
                    updatedDate: '2022-12-20T11:16:59.947+00:00',
                    associateCustomerId: null
                },
                {
                    id: 26,
                    firstName: 'ffsfsdjf ks.djfl ksd',
                    lastName: 'DJ CKLXJVCKLS DJVLKJ',
                    email: 'FSFSFSFSFSD@GMAIOL.COMUOIUOIUOIUOIUOIUOIUOUOIUOUOU',
                    roles: [
                        {
                            id: 1,
                            code: 'ROLE_SUPER_ADMIN',
                            description: 'Super Admin',
                            authority: 'ROLE_SUPER_ADMIN'
                        }
                    ],
                    status: {
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'peter.parker@invaliddomain.som',
                    createdDate: '2022-10-28T06:09:15.927+00:00',
                    updatedBy: 'peter.parker@invaliddomain.som',
                    updatedDate: '2022-10-28T06:09:15.927+00:00',
                    associateCustomerId: null
                },
                {
                    id: 21,
                    firstName: 'Nisha',
                    lastName: 'Kumari',
                    email: 'Nisha.Kumari@compunneldigital.com',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 2,
                        code: 'D',
                        description: 'Deactivated'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2022-12-06T08:59:24.522+00:00',
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'peter.parker@invaliddomain.som',
                    createdDate: '2022-10-28T05:26:43.657+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2023-01-06T05:00:00.899+00:00',
                    associateCustomerId: null
                },
                {
                    id: 19,
                    firstName: 'Ankit',
                    lastName: 'Danwar',
                    email: 'Ankit.Danwar@compunneldigital.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2022-12-21T14:56:15.672+00:00',
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'peter.parker@invaliddomain.som',
                    createdDate: '2022-10-22T04:57:13.646+00:00',
                    updatedBy: 'Ankit.Danwar@compunneldigital.com',
                    updatedDate: '2022-12-21T14:56:15.673+00:00',
                    associateCustomerId: null
                },
                {
                    id: 15,
                    firstName: 'test-user',
                    lastName: 'Test',
                    email: 'xawin94745@orlydns.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2022-09-28T08:05:43.632+00:00',
                    updatedBy: 'xawin94745@orlydns.com',
                    updatedDate: '2022-09-28T08:06:56.041+00:00',
                    associateCustomerId: null
                },
                {
                    id: 14,
                    firstName: 'yup',
                    lastName: 'sharma',
                    email: 'yemepo8482@pahed.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2022-09-28T08:02:51.460+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2022-09-28T08:02:51.460+00:00',
                    associateCustomerId: null
                },
                {
                    id: 13,
                    firstName: 'testPassword',
                    lastName: 'sharma',
                    email: 'cocagaw221@orlydns.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2022-09-28T06:59:22.162+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2022-09-28T06:59:22.162+00:00',
                    associateCustomerId: null
                },
                {
                    id: 12,
                    firstName: 'binod',
                    lastName: 'sharma',
                    email: 'kapowa4387@ploneix.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2022-09-28T06:55:47.011+00:00',
                    updatedBy: 'kapowa4387@ploneix.com',
                    updatedDate: '2022-09-28T06:57:45.670+00:00',
                    associateCustomerId: null
                },
                {
                    id: 11,
                    firstName: 'deep',
                    lastName: 'sharma',
                    email: 'serih98709@pahed.com',
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
                        id: 3,
                        code: 'RS',
                        description: 'Request Sent'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: null,
                    jobTitle: null,
                    jobType: null,
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2022-09-28T06:50:59.042+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2022-09-28T06:50:59.042+00:00',
                    associateCustomerId: null
                },
                {
                    id: 10,
                    firstName: 'deepanshu',
                    lastName: 'Tyagi',
                    email: 'Deepanshu.Tyagi@compunneldigital.com',
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
                    lastLogin: '2023-01-12T07:05:15.095+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T06:13:31.000+00:00',
                    updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    updatedDate: '2023-01-12T07:05:15.096+00:00',
                    associateCustomerId: null
                },
                {
                    id: 9,
                    firstName: 'LS',
                    lastName: 'Adith',
                    email: 'LS.Adith@compunneldigital.com',
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
                    lastLogin: '2023-01-12T07:11:18.998+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T06:13:31.000+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2023-01-12T07:11:18.999+00:00',
                    associateCustomerId: null
                },
                {
                    id: 8,
                    firstName: 'Raj',
                    lastName: 'Gatkul',
                    email: 'Raj.Gatkul@compunneldigital.com',
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
                        id: 2,
                        code: 'D',
                        description: 'Deactivated'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2022-10-03T04:34:10.782+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T06:13:31.000+00:00',
                    updatedBy: 'System',
                    updatedDate: '2022-11-08T12:49:53.090+00:00',
                    associateCustomerId: null
                },
                {
                    id: 7,
                    firstName: 'Naveen',
                    lastName: 'Alehonnappanavar',
                    email: 'Naveen.Alehonnappanavar@compunneldigital.com',
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
                    lastLogin: '2023-01-12T06:26:53.502+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T06:13:31.000+00:00',
                    updatedBy: 'System',
                    updatedDate: '2023-01-12T06:26:53.503+00:00',
                    associateCustomerId: null
                },
                {
                    id: 6,
                    firstName: 'Owais',
                    lastName: 'Naim',
                    email: 'Owais.Naim@compunneldigital.com',
                    roles: [
                        {
                            id: 1,
                            code: 'ROLE_SUPER_ADMIN',
                            description: 'Super Admin',
                            authority: 'ROLE_SUPER_ADMIN'
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
                    lastLogin: '2023-01-11T07:12:34.281+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T06:08:37.000+00:00',
                    updatedBy: 'Owais.Naim@compunneldigital.com',
                    updatedDate: '2023-01-11T07:12:34.289+00:00',
                    associateCustomerId: null
                },
                {
                    id: 17,
                    firstName: 'Sumeet',
                    lastName: 'Parker',
                    email: 'Sumeet.Patel@compunneldigital.com',
                    roles: [
                        {
                            id: 1,
                            code: 'ROLE_SUPER_ADMIN',
                            description: 'Super Admin',
                            authority: 'ROLE_SUPER_ADMIN'
                        }
                    ],
                    status: {
                        id: 2,
                        code: 'D',
                        description: 'Deactivated'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2022-12-01T18:43:07.149+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T05:58:20.000+00:00',
                    updatedBy: 'System',
                    updatedDate: '2023-01-01T05:01:23.022+00:00',
                    associateCustomerId: null
                },
                {
                    id: 3,
                    firstName: 'Clark',
                    lastName: 'Kent',
                    email: 'clark.kent@invaliddomain.som',
                    roles: [
                        {
                            id: 3,
                            code: 'ROLE_SALES_USER',
                            description: 'Sales User',
                            authority: 'ROLE_SALES_USER'
                        }
                    ],
                    status: {
                        id: 2,
                        code: 'D',
                        description: 'Deactivated'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2022-09-28T05:58:20.000+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T05:58:20.000+00:00',
                    updatedBy: 'System',
                    updatedDate: '2022-10-29T05:00:00.621+00:00',
                    associateCustomerId: null
                },
                {
                    id: 2,
                    firstName: 'Mega',
                    lastName: 'Tron',
                    email: 'mega.tron@invaliddomain.som',
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
                        }
                    ],
                    status: {
                        id: 2,
                        code: 'D',
                        description: 'Deactivated'
                    },
                    type: {
                        id: 1,
                        code: 'I',
                        description: 'Internal'
                    },
                    features: [],
                    lastLogin: '2022-09-28T05:58:20.000+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T05:58:20.000+00:00',
                    updatedBy: 'System',
                    updatedDate: '2022-10-29T05:00:00.525+00:00',
                    associateCustomerId: null
                },
                {
                    id: 1,
                    firstName: 'Peter',
                    lastName: 'Parker',
                    email: 'peter.parker@invaliddomain.som',
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
                    lastLogin: '2023-01-12T06:14:22.418+00:00',
                    jobTitle: '',
                    jobType: null,
                    createdBy: 'System',
                    createdDate: '2022-09-28T05:58:20.000+00:00',
                    updatedBy: 'System',
                    updatedDate: '2023-01-12T06:14:22.420+00:00',
                    associateCustomerId: null
                }
            ]
        },
        auth: {
            token: {
                token: {
                    username: 'ls.adith@compunneldigital.com',
                    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJscy5hZGl0aEBjb21wdW5uZWxkaWdpdGFsLmNvbSIsImp0aSI6IjkwNjczZjk4LTkzNDAtNDVhZi1hMzE1LWQyZWVkMTQyZDZkNiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1NVUEVSX0FETUlOIn0seyJhdXRob3JpdHkiOiJST0xFX1NZU1RFTV9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TQUxFU19VU0VSIn1dLCJpYXQiOjE2NzM1MDc0NzgsImV4cCI6MTY5NTEwNzQ3OH0.JJwO6yDxq1V76nLbQzHCsjpjJTjCUnce8XdxcdR2KK4'
                }
            }
        }
    })

    beforeEach(() => {
        wrapper = mount(ShallowMock(<Modal />, store));
    });

    test("Testing rendering of Modal Component", () => {
        expect(wrapper.find("Modal")).toBeTruthy();
    });

    

});
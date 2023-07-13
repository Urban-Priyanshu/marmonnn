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
import UserTable from '../index';
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
  useNavigate: () => mockedUsedNavigate
}));

jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn()
}));

describe('EditUser', () => {
  let wrapper;
  const store = mockStore({
    users: {
      
        usersData: [
          {
            id: 57,
            firstName: 'Swati',
            lastName: 'Bisht',
            email: 'swati.bisht@compunneldigital.com',
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
            lastLogin: '2023-01-23T15:37:18.451+00:00',
            jobTitle: null,
            jobType: null,
            createdBy: 'peter.parker@invaliddomain.som',
            createdDate: '2023-01-23T15:34:47.369+00:00',
            updatedBy: 'swati.bisht@compunneldigital.com',
            updatedDate: '2023-01-23T15:37:18.452+00:00',
            associateCustomerId: null
          },
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
            lastLogin: '2023-01-06T03:06:03.239+00:00',
            jobTitle: null,
            jobType: null,
            createdBy: 'peter.parker@invaliddomain.som',
            createdDate: '2023-01-03T20:26:53.745+00:00',
            updatedBy: 'namokil366@dentaltz.com',
            updatedDate: '2023-02-05T05:03:11.644+00:00',
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
            lastLogin: '2023-02-14T09:43:16.460+00:00',
            jobTitle: '',
            jobType: null,
            createdBy: 'System',
            createdDate: '2022-09-28T06:13:31.000+00:00',
            updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
            updatedDate: '2023-02-14T09:43:16.461+00:00',
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
            lastLogin: '2023-02-08T09:06:46.431+00:00',
            jobTitle: '',
            jobType: null,
            createdBy: 'System',
            createdDate: '2022-09-28T06:13:31.000+00:00',
            updatedBy: 'LS.Adith@compunneldigital.com',
            updatedDate: '2023-02-08T09:06:46.432+00:00',
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
            lastLogin: '2023-02-14T05:25:42.342+00:00',
            jobTitle: '',
            jobType: null,
            createdBy: 'System',
            createdDate: '2022-09-28T06:13:31.000+00:00',
            updatedBy: 'System',
            updatedDate: '2023-02-14T05:25:42.343+00:00',
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
            lastLogin: '2023-02-06T15:23:55.516+00:00',
            jobTitle: '',
            jobType: null,
            createdBy: 'System',
            createdDate: '2022-09-28T06:08:37.000+00:00',
            updatedBy: 'Owais.Naim@compunneldigital.com',
            updatedDate: '2023-02-06T15:23:55.518+00:00',
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
            lastLogin: '2023-02-14T08:17:56.945+00:00',
            jobTitle: '',
            jobType: null,
            createdBy: 'System',
            createdDate: '2022-09-28T05:58:20.000+00:00',
            updatedBy: 'System',
            updatedDate: '2023-02-14T08:17:56.963+00:00',
            associateCustomerId: null
          }
        ]
      
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
    const handleFilter = jest.fn();

    wrapper = mount(ShallowMock(<UserTable />, store));
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    agGridReact = wrapper.find(AgGridReact).instance();
    ensureGridApiHasBeenSet(wrapper.find(AgGridReact)).then(() => done());
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });

  it('Aggrid Api', () => {
    expect(agGridReact.api).toBeTruthy();
  });

  it('AgGrid table', () => {
    expect(wrapper.find('AgGridReact')).toBeDefined();
  });

  it('mount table', () => {
   
  });

  it('UserTable are there', () => {
    expect('UserTable').toBeTruthy();
  });

  it('Handle click on custom Button', () => {
    const button = wrapper.find('ForwardRef(Button)');

    button.at(0).props().onClick();
  });
  it('on onFirstDataRendered ', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().onFirstDataRendered();
  });

  it('Handle click on onGridSizeChanged', () => {
    const button = wrapper.find('AgGridReact');
    act(() => button.at(0).props().onGridSizeChanged());
  });

  it('Handle click on Pagination Button', () => {
    const button = wrapper.find('ForwardRef(Pagination)');

    button.at(0).props().onChange();
  });



  // it('Handle click on pagination', () => {

  //   const button = wrapper.find('ForwardRef(Pagination)');

  //    button.at(0).props().onChange("hi");

  // });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    button.at(0).props().onClose();
  });

  // it('Handle click on onGridSizeChanged', () => {
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(0).props().onGridSizeChanged());
  // });

  it('Handle close on SortingCount', () => {
    const button = wrapper.find('SortingCount');
    button.at(0).props().onChange();
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

  it('Email  Component ', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.EmailComponent({ value: 'Active' });
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

  it('Role Component function', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.RoleComponent({ value: [{ id: 1 }, { id: 2 }] });
  });

  //   it('Status AssociateCusNoComponent', () => {
  //     const button = wrapper.find('AgGridReact');
  //     button
  //       .at(0)
  //       .props()
  //       .frameworkComponents.AssociateCusNoComponent({ value: 'R' });
  //   });

  it('Status ACtionComponent', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().frameworkComponents.ActionComponent({ value: 'R' });
  });

  // it('onFirstDataRendered', () => {
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(0).props().onFirstDataRendered());
  // });

  it('handle button click', () => {
    const event = {
      target: {
        value: '1'
      }
    };
    const button = wrapper.find('ForwardRef(Button)');
    act(() => button.at(0).props().onClick(event));
  });

  it('usesector', () => {
    const button = wrapper.find('customersData');
  });
});

describe('Testin rendering for auth user', () => {
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
    wrapper = shallow(ShallowMock(<UserTable />, store));
  });

  afterEach(() => {
    //   wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component UserTable', () => {
    expect(wrapper.find('UserTable')).toBeTruthy();
  });
});

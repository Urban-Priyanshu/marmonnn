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
import BPOHistoryTable from '../Table/index';

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
    customers: {
      customersData: [
        {
          associatedCustomerNumbers: '',
          customerNumber: 400,
          firstName: 'Bob',
          groupCode: null,
          id: 8,
          lastName: 'Cat',
          shippingLocations: [
            {
              address: '22B St, Jacksonville, 32244',
              customerId: 8,
              customerNumber: 400,
              id: 120,
              primary: true,
              priorityNumber: 1
            }
          ],
          status: { id: 1, code: 'A', description: 'Active' }
        }
      ],
      getBPOUploadHistory: [
        {
          id: 62,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-06-2023/06-41-53/Test_1.xlsx',
          uploadedFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-09-2023-10-47-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-09-2023-10-47-33.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'peter.parker@invaliddomain.som',
          uploadDate: '2023-01-05T22:41:53.452+00:00',
          createdDate: '2023-01-06T06:41:53.452+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-09T10:47:33.496+00:00'
        },
        {
          id: 61,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-05-2023/09-45-54/BlanketPO_TestFile (3).xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-05-2023-09-45-54.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-05-2023-09-45-54.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2023-01-05T01:45:55.000+00:00',
          createdDate: '2023-01-05T09:45:55.000+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:46:37.775+00:00'
        },
        {
          id: 60,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-05-2023/09-44-00/BlanketPO_TestFile (3).xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-06-2023-06-39-45.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-06-2023-06-39-45.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2023-01-05T01:44:00.527+00:00',
          createdDate: '2023-01-05T09:44:00.527+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2023-01-06T06:39:45.388+00:00'
        },
        {
          id: 59,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-05-2023/09-42-59/BlanketPO_TestFile (3).xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-06-2023-06-39-53.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-06-2023-06-39-53.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2023-01-05T01:42:59.564+00:00',
          createdDate: '2023-01-05T09:42:59.564+00:00',
          updatedBy: 'peter.parker@invaliddomain.som',
          updatedDate: '2023-01-06T06:39:53.869+00:00'
        },
        {
          id: 58,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-05-2023/09-41-38/Marmon_Customer_46030_Orders_BPO_12-23-2022_13-22-46_BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-05-2023-09-41-38.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-05-2023-09-41-38.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2023-01-05T01:41:38.829+00:00',
          createdDate: '2023-01-05T09:41:38.829+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:41:38.829+00:00'
        },
        {
          id: 57,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-05-2023/05-07-06/Marmon_Customer_46030_Orders_BPO_12-23-2022_13-21-08_BlanketPO_TestFile (1).xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-05-2023-05-16-21.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-05-2023-05-16-21.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2023-01-04T21:07:06.398+00:00',
          createdDate: '2023-01-05T05:07:06.398+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T05:16:21.445+00:00'
        },
        {
          id: 56,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-05-2023/05-06-39/Marmon_Customer_46030_Orders_BPO_12-23-2022_13-21-08_BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-05-2023-05-06-39.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-05-2023-05-06-39.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2023-01-04T21:06:39.350+00:00',
          createdDate: '2023-01-05T05:06:39.350+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T05:06:39.350+00:00'
        },
        {
          id: 55,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-04-2023/05-32-02/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-05-2023-05-03-45.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-05-2023-05-03-45.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:32:03.037+00:00',
          createdDate: '2023-01-04T05:32:03.037+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T05:03:45.738+00:00'
        },
        {
          id: 54,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-04-2023/05-14-04/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-04-2023-05-14-04.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-04-2023-05-14-04.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:14:04.804+00:00',
          createdDate: '2023-01-04T05:14:04.804+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:14:04.804+00:00'
        },
        {
          id: 53,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/01-04-2023/05-13-33/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-04-2023-05-13-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-04-2023-05-13-33.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2023-01-03T21:13:33.985+00:00',
          createdDate: '2023-01-04T05:13:33.985+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:13:33.985+00:00'
        },
        {
          id: 52,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-23-2022/13-22-46/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-23-2022-13-22-46.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-23-2022-13-22-46.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:22:46.426+00:00',
          createdDate: '2022-12-23T13:22:46.426+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-23T13:22:56.798+00:00'
        },
        {
          id: 51,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-23-2022/13-21-08/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-23-2022-13-21-08.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-23-2022-13-21-08.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-23T05:21:08.912+00:00',
          createdDate: '2022-12-23T13:21:08.912+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-23T13:21:13.523+00:00'
        },
        {
          id: 50,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-22-2022/13-23-08/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-23-2022-09-03-23.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-23-2022-09-03-24.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-22T05:23:08.388+00:00',
          createdDate: '2022-12-22T13:23:08.388+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T09:03:24.100+00:00'
        },
        {
          id: 49,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-22-2022/09-20-03/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-22-2022-09-20-03.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-22-2022-09-20-03.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-22T01:20:04.025+00:00',
          createdDate: '2022-12-22T09:20:04.025+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-22T09:20:10.864+00:00'
        },
        {
          id: 48,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-22-2022/07-17-52/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-22-2022-13-22-49.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-22-2022-13-22-49.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-21T23:17:53.403+00:00',
          createdDate: '2022-12-22T07:17:53.403+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T13:22:50.012+00:00'
        },
        {
          id: 47,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-20-2022/07-42-05/Marmon_Customer_46030_Orders_BPO_12-14-2022-10-51-47BlanketPO_TestFile.xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-20-2022-07-42-05.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-20-2022-07-42-05.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          uploadDate: '2022-12-19T23:42:05.507+00:00',
          createdDate: '2022-12-20T07:42:05.506+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T07:42:05.507+00:00'
        },
        {
          id: 46,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-20-2022/07-00-15/BlanketPO_TestFile.xlsx',
          uploadedFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-20-2022-07-00-15.xlsx',
          validOrdersFileCount: 2,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-20-2022-07-00-15.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T23:00:15.828+00:00',
          createdDate: '2022-12-20T07:00:15.828+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-20T07:00:33.480+00:00'
        },
        {
          id: 45,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-20-2022/05-38-02/BPO-TestFile.xlsx',
          uploadedFileCount: 12,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-20-2022-05-38-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-20-2022-05-38-02.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-19T21:38:02.610+00:00',
          createdDate: '2022-12-20T05:38:02.610+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:38:02.610+00:00'
        },
        {
          id: 43,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-08-59-16BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-19-2022-08-59-16.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-19-2022-08-59-16.xlsx',
          invalidOrdersFileCount: 1,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T00:59:16.366+00:00',
          createdDate: '2022-12-19T08:59:16.366+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-19T08:59:38.729+00:00'
        },
        {
          id: 42,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-08-58-57BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-19-2022-08-58-57.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-19-2022-08-58-57.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T00:58:57.807+00:00',
          createdDate: '2022-12-19T08:58:57.807+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-19T08:59:06.111+00:00'
        },
        {
          id: 41,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-08-57-25BlanketPO_TestFile.xlsx',
          uploadedFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-03-2023-03-59-32.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-03-2023-03-59-32.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-19T00:57:26.157+00:00',
          createdDate: '2022-12-19T08:57:26.157+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-03T03:59:32.753+00:00'
        },
        {
          id: 40,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-07-18-37BlanketPO_TestFile.xlsx',
          uploadedFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-19-2022-07-18-37.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-19-2022-07-18-37.xlsx',
          invalidOrdersFileCount: 4,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-18T23:18:37.864+00:00',
          createdDate: '2022-12-19T07:18:37.864+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-19T07:18:45.859+00:00'
        },
        {
          id: 39,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-07-17-50BlanketPO_TestFile.xlsx',
          uploadedFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-19-2022-07-17-50.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-19-2022-07-17-50.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-18T23:17:50.417+00:00',
          createdDate: '2022-12-19T07:17:50.417+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-19T07:17:50.417+00:00'
        },
        {
          id: 38,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-07-16-15BlanketPO_TestFile.xlsx',
          uploadedFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-19-2022-07-16-15.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-19-2022-07-16-15.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-18T23:16:15.531+00:00',
          createdDate: '2022-12-19T07:16:15.531+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-19T07:16:15.531+00:00'
        },
        {
          id: 37,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-19-2022-07-15-07BlanketPO_TestFile.xlsx',
          uploadedFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-19-2022-07-15-07.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-19-2022-07-15-07.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          uploadDate: '2022-12-18T23:15:07.978+00:00',
          createdDate: '2022-12-19T07:15:07.978+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2022-12-19T07:15:07.978+00:00'
        },
        {
          id: 33,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-15-2022-05-36-07Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-16-2022-09-58-41.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-16-2022-09-58-41.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-14T21:36:07.991+00:00',
          createdDate: '2022-12-15T05:36:07.991+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-16T09:58:41.824+00:00'
        },
        {
          id: 32,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-15-2022-04-58-07BlanketPO_TestFile.xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-15-2022-05-18-36.xlsx',
          validOrdersFileCount: 1,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-15-2022-05-18-36.xlsx',
          invalidOrdersFileCount: 9,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-14T20:58:07.264+00:00',
          createdDate: '2022-12-15T04:58:07.264+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:18:38.514+00:00'
        },
        {
          id: 30,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-14-2022-10-51-47BlanketPO_TestFile.xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-15-2022-05-39-39.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-15-2022-05-39-39.xlsx',
          invalidOrdersFileCount: 10,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-14T02:51:47.856+00:00',
          createdDate: '2022-12-14T10:51:47.856+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:39:44.568+00:00'
        },
        {
          id: 29,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-14-2022-07-45-13BlanketPO_TestFile (2).xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders01-02-2023-10-44-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders01-02-2023-10-44-02.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-13T23:45:13.279+00:00',
          createdDate: '2022-12-14T07:45:13.279+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2023-01-02T10:44:02.501+00:00'
        },
        {
          id: 28,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-14-2022-07-45-06BlanketPO_TestFile (2).xlsx',
          uploadedFileCount: 10,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-14-2022-07-45-07.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-14-2022-07-45-07.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-13T23:45:07.475+00:00',
          createdDate: '2022-12-14T07:45:07.475+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T07:45:07.475+00:00'
        },
        {
          id: 27,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-13-2022-08-43-33Marmon_Customer_46030_Orders_BPO_12-13-2022-04-56-17Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-13-2022-08-43-33.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-13-2022-08-43-33.xlsx',
          invalidOrdersFileCount: 10,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          uploadDate: '2022-12-13T00:43:33.933+00:00',
          createdDate: '2022-12-13T08:43:33.933+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-13T08:44:01.217+00:00'
        },
        {
          id: 26,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-13-2022-04-56-17Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-13-2022-12-41-13.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-13-2022-12-41-13.xlsx',
          invalidOrdersFileCount: 10,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T20:56:18.252+00:00',
          createdDate: '2022-12-13T04:56:18.252+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:41:16.248+00:00'
        },
        {
          id: 25,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-12-2022-11-27-35Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-14-2022-09-35-54.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-14-2022-09-35-54.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:27:35.665+00:00',
          createdDate: '2022-12-12T11:27:35.665+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T09:35:54.389+00:00'
        },
        {
          id: 24,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-12-2022-11-09-20BlanketPO_TestFile.xlsx',
          uploadedFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-13-2022-12-41-03.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-13-2022-12-41-03.xlsx',
          invalidOrdersFileCount: 0,
          orderStatus: {
            id: 1,
            code: 'PE',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          uploadDate: '2022-12-12T03:09:20.436+00:00',
          createdDate: '2022-12-12T11:09:20.436+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:41:03.481+00:00'
        },
        {
          id: 23,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-12-2022-11-00-20Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-12-2022-11-00-21.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-12-2022-11-00-21.xlsx',
          invalidOrdersFileCount: 10,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T03:00:21.232+00:00',
          createdDate: '2022-12-12T11:00:21.232+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T11:02:25.991+00:00'
        },
        {
          id: 22,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-12-2022-10-43-19Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-12-2022-10-43-19.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-12-2022-10-43-19.xlsx',
          invalidOrdersFileCount: 10,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T02:43:19.441+00:00',
          createdDate: '2022-12-12T10:43:19.441+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T10:43:28.607+00:00'
        },
        {
          id: 21,
          customerNumber: 46030,
          uploadedFileUrl: 'Marmon/Customer/46030/Orders/BPO/12-12-2022-10-37-07Maxon_Blanket_PO_csv_422779_b.csv',
          uploadedFileCount: 215,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/ValidOrders12-12-2022-10-58-02.xlsx',
          validOrdersFileCount: 0,
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/BPO/InvalidOrders12-12-2022-10-58-02.xlsx',
          invalidOrdersFileCount: 10,
          orderStatus: {
            id: 2,
            code: 'PR',
            description: 'Processing'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          uploadDate: '2022-12-12T02:37:07.989+00:00',
          createdDate: '2022-12-12T10:37:07.989+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T10:58:38.990+00:00'
        }
      ]

    },
    loaderStatus: {
      showLoading: false
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
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = mount(ShallowMock(<BPOHistoryTable />, store));

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

  it('BPOHistoryTable are there', () => {
    expect('BPOHistoryTable').toBeTruthy();
  });

  it('HTMl', () => {
   
  });

  it('Handle click on custom Button', () => {
    const button = wrapper.find('ForwardRef(Button)');

    button.at(0).props().onClick();
  });

  

  

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    button.at(0).props().onClose();
  });

  
  it('LinkComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.LinkComponent({ data: { id: 1 }, value: 2 });
  });

  it('paginationNumberFormatter', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .paginationNumberFormatter();
  });

  it('Status Component Active', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.StatusComponent({ value: 'Active' });
  });
  it('Handle close on SortingCount', () => {
    const button = wrapper.find('SortingCount');
    button.at(0).props().onChange();
  });

  it('Handle close on SortingCount', () => {
    const button = wrapper.find('select');
    button.at(0).props().onChange();
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

  it('Handle close on CancelButton ', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    button.at(0).props().onClose();
  });

  it('Handle close on CustomModal ', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    button.at(0).props().onClose();
  });

  it('Handle close on CustomModal ', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    button.at(0).props().onClose();
  });
  it('Handle close on CustomModal ', () => {
    const button = wrapper.find('WithStyles(ForwardRef(Pagination))');
    button.at(0).props().onChange();
  })

  it('Handle close on CustomModal ', () => {
    const button = wrapper.find('ForwardRef(Pagination)');
    button.at(0).props().onChange();
  })

  it('Handle close on AgGridReact ', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().onFirstDataRendered();
  })

  it('usesector', () => {
    const button = wrapper.find('customersData');
  });
});

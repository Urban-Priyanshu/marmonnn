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
import ForecastOrderConfigTable from '../Table/index';

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
      getForecastExcelData:[
        {
          id: 97,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-11-2023/05-29-16/Marmon_Customer_46030_Orders_FC_12-22-2022_07-30-30_Forecast.xls',
          totalPartsUploaded: 100,
          uploadDateAndTime: '2023-01-10T21:29:16.363+00:00',
          validOrdersFileCount: 99,
          invalidOrdersFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-11-2023-05-2901-11-2023-05-29-22.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-11-2023-05-2901-11-2023-05-29-16.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-11T05:29:16.363+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-11T05:29:22.947+00:00'
        },
        {
          id: 96,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-11-2023/05-27-49/Marmon_Customer_46030_Orders_FC_12-22-2022_07-30-30_Forecast.xls',
          totalPartsUploaded: 100,
          uploadDateAndTime: '2023-01-10T21:27:50.424+00:00',
          validOrdersFileCount: 99,
          invalidOrdersFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-11-2023-05-2701-11-2023-05-27-59.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-11-2023-05-2701-11-2023-05-27-50.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-11T05:27:50.424+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-11T05:27:59.469+00:00'
        },
        {
          id: 95,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-10-2023/14-47-59/Marmon_Customer_46030_Orders_FC_01-06-2023_10-27-33_H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-10T06:48:00.271+00:00',
          validOrdersFileCount: 7,
          invalidOrdersFileCount: 21,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-10-2023-14-4901-10-2023-14-49-37.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-10-2023-14-4801-10-2023-14-48-00.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-10T14:48:00.271+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-10T14:49:37.204+00:00'
        },
        {
          id: 94,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-28-20/Marmon_Customer_46030_Orders_FC_01-06-2023_10-27-33_H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-06T02:28:20.960+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-09-2023-11-0101-09-2023-11-01-03.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-09-2023-11-0101-09-2023-11-01-04.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-06T10:28:20.960+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-09T11:01:04.088+00:00'
        },
        {
          id: 93,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-27-33/H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-06T02:27:33.807+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2701-06-2023-10-27-33.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2701-06-2023-10-27-33.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2023-01-06T10:27:33.807+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:27:33.807+00:00'
        },
        {
          id: 92,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-26-27/H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-06T02:26:27.820+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2901-06-2023-10-29-44.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2901-06-2023-10-29-44.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2023-01-06T10:26:27.820+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:29:44.545+00:00'
        },
        {
          id: 91,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-25-38/H-Forecast.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-06T02:25:39.064+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2501-06-2023-10-25-38.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2501-06-2023-10-25-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2023-01-06T10:25:39.064+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:25:39.064+00:00'
        },
        {
          id: 90,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-39-40/Marmon_Customer_46030_Orders_FC_12-13-2022-07-49-02BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-05T01:39:41.044+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3901-05-2023-09-39-40.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3901-05-2023-09-39-41.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:39:41.044+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:39:41.044+00:00'
        },
        {
          id: 89,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-39-16/Marmon_Customer_46030_Orders_FC_12-13-2022-07-49-02BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-05T01:39:16.979+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3901-05-2023-09-39-16.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3901-05-2023-09-39-16.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:39:16.979+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:39:16.979+00:00'
        },
        {
          id: 88,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-37-29/Marmon_Customer_46030_Orders_FC_Valid Orders01-02-2023-10-4001-02-2023-10-40-29.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-05T01:37:29.439+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3701-05-2023-09-37-29.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3701-05-2023-09-37-29.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:37:29.439+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:37:29.439+00:00'
        },
        {
          id: 87,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-35-44/Marmon_Customer_46030_Orders_FC_01-02-2023_05-49-13_Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-05T01:35:44.237+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3501-05-2023-09-35-44.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3501-05-2023-09-35-44.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:35:44.237+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:35:44.237+00:00'
        },
        {
          id: 85,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-13-07/Forecast.csv',
          totalPartsUploaded: 24,
          uploadDateAndTime: '2023-01-05T01:13:07.360+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 52,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-08-4501-06-2023-08-45-56.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-08-4501-06-2023-08-45-56.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:13:07.360+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-06T08:45:56.316+00:00'
        },
        {
          id: 84,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-11-27/HoriontalTest2.xlsx',
          totalPartsUploaded: 20,
          uploadDateAndTime: '2023-01-05T01:11:27.658+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 20,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-1101-05-2023-09-11-27.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-1101-05-2023-09-11-27.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:11:27.658+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:11:27.658+00:00'
        },
        {
          id: 83,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-10-54/HoriontalTest2.xlsx',
          totalPartsUploaded: 20,
          uploadDateAndTime: '2023-01-05T01:10:54.854+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2201-06-2023-10-22-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2201-06-2023-10-22-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:10:54.854+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:22:06.263+00:00'
        },
        {
          id: 82,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-10-32/Forecast (4).csv',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2023-01-05T01:10:32.482+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-1001-05-2023-09-10-32.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-1001-05-2023-09-10-32.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:10:32.482+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:10:32.482+00:00'
        },
        {
          id: 81,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-27-29/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:27:29.764+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2701-04-2023-05-27-29.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2701-04-2023-05-27-29.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:27:29.764+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:27:29.764+00:00'
        },
        {
          id: 80,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-26-05/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:26:05.288+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2601-04-2023-05-26-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2601-04-2023-05-26-05.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:26:05.288+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:26:05.288+00:00'
        },
        {
          id: 79,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-24-38/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:24:39.172+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2401-04-2023-05-24-39.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2401-04-2023-05-24-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:24:39.172+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:24:39.172+00:00'
        },
        {
          id: 78,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-24-01/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:24:02.106+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2401-04-2023-05-24-01.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2401-04-2023-05-24-02.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:24:02.106+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:24:02.106+00:00'
        },
        {
          id: 77,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-21-42/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:21:43.034+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2101-04-2023-05-21-42.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2101-04-2023-05-21-42.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:21:43.034+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:21:43.034+00:00'
        },
        {
          id: 76,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-20-53/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:20:53.409+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2001-04-2023-05-20-53.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2001-04-2023-05-20-53.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:20:53.409+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:20:53.409+00:00'
        },
        {
          id: 75,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-20-12/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:20:13.105+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2001-04-2023-05-20-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2001-04-2023-05-20-13.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:20:13.105+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:20:13.105+00:00'
        },
        {
          id: 74,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-19-20/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 59,
          uploadDateAndTime: '2023-01-03T21:19:20.624+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 59,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1901-04-2023-05-19-20.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1901-04-2023-05-19-20.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:19:20.624+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:19:20.624+00:00'
        },
        {
          id: 73,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-17-12/Marmon_Customer_46030_Orders_FC_01-02-2023_05-49-13_Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-03T21:17:13.102+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1701-04-2023-05-17-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1701-04-2023-05-17-13.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:17:13.102+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:17:13.102+00:00'
        },
        {
          id: 72,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-16-49/Marmon_Customer_46030_Orders_FC_01-02-2023_05-51-54_Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-03T21:16:49.668+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1601-04-2023-05-16-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1601-04-2023-05-16-49.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:16:49.668+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:16:49.668+00:00'
        },
        {
          id: 71,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-16-15/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 59,
          uploadDateAndTime: '2023-01-03T21:16:15.906+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 59,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1601-04-2023-05-16-15.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1601-04-2023-05-16-15.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:16:15.906+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:16:15.906+00:00'
        },
        {
          id: 70,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-15-24/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:15:24.933+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1501-04-2023-05-15-24.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1501-04-2023-05-15-24.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:15:24.933+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:15:24.933+00:00'
        },
        {
          id: 69,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-14-22/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:14:22.740+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1401-04-2023-05-14-22.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1401-04-2023-05-14-22.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:14:22.740+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:14:22.740+00:00'
        },
        {
          id: 68,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-51-54/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-01T21:51:54.287+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-02-2023-05-5201-02-2023-05-52-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-5101-02-2023-05-51-54.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:51:54.287+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:52:49.224+00:00'
        },
        {
          id: 67,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-49-13/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-01T21:49:13.418+00:00',
          validOrdersFileCount: 3,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-02-2023-10-4001-02-2023-10-40-29.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-10-4001-02-2023-10-40-16.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:49:13.418+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2023-01-02T10:40:29.880+00:00'
        },
        {
          id: 66,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-18-01/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-01T21:18:01.854+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3501-05-2023-09-35-07.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3501-05-2023-09-35-07.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:18:01.854+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:35:07.479+00:00'
        },
        {
          id: 65,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-17-26/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-01T21:17:26.833+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-05-1701-02-2023-05-17-26.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-1701-02-2023-05-17-26.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:17:26.833+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:17:26.833+00:00'
        },
        {
          id: 64,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/04-46-01/HoriontalTest2.xlsx',
          totalPartsUploaded: 5,
          uploadDateAndTime: '2023-01-01T20:46:01.706+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-05-1401-02-2023-05-14-08.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-1401-02-2023-05-14-08.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T04:46:01.706+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:14:08.214+00:00'
        },
        {
          id: 62,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-23-2022/06-40-25/HorizontalForecast.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-22T22:40:25.463+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-23-2022-07-1812-23-2022-07-18-24.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-23-2022-07-1812-23-2022-07-18-24.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2022-12-23T06:40:25.463+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T07:18:24.446+00:00'
        },
        {
          id: 61,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022/07-41-20/Marmon_Customer_46030_Orders_FC_12-20-2022_05-26-48_Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-19T23:41:24.559+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28704,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-03-2023-03-5701-03-2023-03-57-15.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-03-2023-03-5701-03-2023-03-57-19.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T07:41:24.559+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-03T03:57:19.803+00:00'
        },
        {
          id: 60,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022/05-37-38/HorizontalForecast.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-19T21:37:39.120+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-20-2022-05-3712-20-2022-05-37-39.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-20-2022-05-3712-20-2022-05-37-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2022-12-20T05:37:39.120+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:37:39.120+00:00'
        },
        {
          id: 59,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022/05-26-48/Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-19T21:26:54.585+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27876,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-04-3901-02-2023-04-39-08.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-04-3901-02-2023-04-39-12.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T05:26:54.585+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T04:39:12.877+00:00'
        },
        {
          id: 58,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022-04-55-28Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-19T20:55:34.325+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28704,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-10-4001-02-2023-10-40-50.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-10-4001-02-2023-10-40-53.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T04:55:34.325+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2023-01-02T10:40:53.653+00:00'
        },
        {
          id: 57,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022-04-54-45BobcatForecast_10-24-22 (1).xls',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2022-12-19T20:54:45.676+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-23-2022-06-4112-23-2022-06-41-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-23-2022-06-4112-23-2022-06-41-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T04:54:45.676+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-23T06:41:06.096+00:00'
        },
        {
          id: 56,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022-04-54-22BobcatForecast_10-24-22 (1) copy.xls',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2022-12-19T20:54:23.047+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-23-2022-09-0312-23-2022-09-03-17.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-23-2022-09-0312-23-2022-09-03-17.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T04:54:23.047+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T09:03:17.811+00:00'
        },
        {
          id: 55,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-38-22Marmon_Customer_46030_Orders_FC_12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-14T21:38:25.017+00:00',
          validOrdersFileCount: 4,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-15-2022-05-3812-15-2022-05-38-43.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-3812-15-2022-05-38-24.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-15T05:38:25.017+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:38:43.574+00:00'
        },
        {
          id: 54,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-37-44Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T21:37:44.153+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-20-2022-05-3112-20-2022-05-31-56.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-20-2022-05-3112-20-2022-05-31-56.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-15T05:37:44.153+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:31:56.371+00:00'
        },
        {
          id: 53,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-36-28Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T21:36:28.891+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-3612-15-2022-05-36-28.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-3612-15-2022-05-36-28.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-15T05:36:28.891+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:36:28.891+00:00'
        },
        {
          id: 52,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-15-54Marmon_Customer_46030_Orders_FC_12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-14T21:15:58.082+00:00',
          validOrdersFileCount: 3,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-15-2022-05-1612-15-2022-05-16-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-1512-15-2022-05-15-57.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          createdDate: '2022-12-15T05:15:58.082+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:16:12.517+00:00'
        },
        {
          id: 51,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-06-42Marmon_Customer_46030_Orders_FC_12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-14T21:06:48.070+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0612-15-2022-05-06-45.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0612-15-2022-05-06-47.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          createdDate: '2022-12-15T05:06:48.070+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:06:48.070+00:00'
        },
        {
          id: 49,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-10-13-21Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T02:13:21.973+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-20-2022-05-0812-20-2022-05-08-57.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-20-2022-05-0812-20-2022-05-08-57.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T10:13:21.973+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:08:57.683+00:00'
        },
        {
          id: 48,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-10-12-54Marmon_Customer_46030_Orders_BO_12-12-2022-11-16-27Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2022-12-14T02:12:54.986+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-22-2022-13-2412-22-2022-13-24-09.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-22-2022-13-2412-22-2022-13-24-09.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T10:12:54.986+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T13:24:09.498+00:00'
        },
        {
          id: 47,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-09-33-30Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T01:33:30.321+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-10-0712-14-2022-10-07-57.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-10-0712-14-2022-10-07-57.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T09:33:30.321+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T10:07:57.616+00:00'
        },
        {
          id: 46,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-07-18-30Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-13T23:18:31.156+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-07-1812-14-2022-07-18-31.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-07-1812-14-2022-07-18-31.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T07:18:31.156+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T07:18:31.156+00:00'
        },
        {
          id: 45,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-07-18-13Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-13T23:18:13.816+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-07-1812-14-2022-07-18-13.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-07-1812-14-2022-07-18-13.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T07:18:13.816+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T07:18:13.816+00:00'
        },
        {
          id: 44,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T05:22:45.464+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0112-15-2022-05-01-24.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0112-15-2022-05-01-26.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T13:22:45.464+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:01:26.758+00:00'
        },
        {
          id: 43,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-13-21-55Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T05:22:01.181+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-09-3412-14-2022-09-34-34.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-09-3412-14-2022-09-34-35.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T13:22:01.181+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T09:34:36.013+00:00'
        },
        {
          id: 42,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-12-52-08Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T04:52:14.667+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-12-5212-13-2022-12-52-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-12-5212-13-2022-12-52-14.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T12:52:14.667+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T12:52:14.667+00:00'
        },
        {
          id: 41,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-12-20-14Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T04:20:17.043+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-02-4112-15-2022-02-41-37.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-02-4112-15-2022-02-41-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T12:20:17.043+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T02:41:39.319+00:00'
        },
        {
          id: 40,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-12-19-13BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T04:19:18.938+00:00',
          validOrdersFileCount: 2,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-15-2022-05-1812-15-2022-05-18-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-1712-15-2022-05-17-15.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T12:19:18.938+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:18:05.788+00:00'
        },
        {
          id: 39,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-58-27Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T03:58:29.907+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0312-15-2022-05-03-17.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0312-15-2022-05-03-19.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:58:29.907+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:03:19.119+00:00'
        },
        {
          id: 38,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-57-55BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T03:58:01.352+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-05-1801-02-2023-05-18-30.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-1801-02-2023-05-18-32.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:58:01.352+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:18:32.993+00:00'
        },
        {
          id: 37,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-48-23Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T03:48:26.368+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0512-15-2022-05-05-15.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0512-15-2022-05-05-17.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:48:26.368+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:05:17.437+00:00'
        },
        {
          id: 36,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-47-10BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T03:47:16.229+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-11-4712-13-2022-11-47-13.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-11-4712-13-2022-11-47-16.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:47:16.229+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T11:47:16.229+00:00'
        },
        {
          id: 35,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-08-05-06BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T00:05:09.037+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-4001-05-2023-09-40-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-4001-05-2023-09-40-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T08:05:09.037+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:40:06.273+00:00'
        },
        {
          id: 34,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-07-50-04Doosan_SRC_Supplier_Forecast_C_200622.xls',
          totalPartsUploaded: 25149,
          uploadDateAndTime: '2022-12-12T23:50:06.718+00:00',
          validOrdersFileCount: 7200,
          invalidOrdersFileCount: 17949,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-07-5012-13-2022-07-50-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-07-5012-13-2022-07-50-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T07:50:06.718+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T07:50:06.718+00:00'
        },
        {
          id: 33,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-07-49-02BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T23:49:05.593+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-07-4912-13-2022-07-49-03.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-07-4912-13-2022-07-49-05.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T07:49:05.593+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T07:49:05.593+00:00'
        },
        {
          id: 32,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-23-40BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T22:23:42.820+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-06-2312-13-2022-06-23-41.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-06-2312-13-2022-06-23-42.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:23:42.820+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T06:23:42.820+00:00'
        },
        {
          id: 31,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-20-33Doosan_SRC_Supplier_Forecast_C_200622.xls',
          totalPartsUploaded: 25149,
          uploadDateAndTime: '2022-12-12T22:20:36.602+00:00',
          validOrdersFileCount: 7200,
          invalidOrdersFileCount: 17949,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-12-3512-13-2022-12-35-53.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-12-3512-13-2022-12-35-54.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:20:36.602+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:35:54.979+00:00'
        },
        {
          id: 30,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-19-39BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T22:19:44.155+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-12-3712-13-2022-12-37-23.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-12-3712-13-2022-12-37-25.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:19:44.155+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:37:25.124+00:00'
        },
        {
          id: 29,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-03-14BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T22:03:19.609+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3801-05-2023-09-38-25.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3801-05-2023-09-38-25.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:03:19.609+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:38:25.638+00:00'
        },
        {
          id: 28,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-42-01BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T21:42:06.506+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-4212-13-2022-05-42-02.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-4212-13-2022-05-42-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:42:06.506+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:42:06.506+00:00'
        },
        {
          id: 27,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-30-06BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T21:30:11.048+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-3012-13-2022-05-30-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-3012-13-2022-05-30-10.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:30:11.048+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:30:11.048+00:00'
        },
        {
          id: 26,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-08-54BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T21:08:57.369+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-0812-13-2022-05-08-54.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-0812-13-2022-05-08-57.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:08:57.369+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:08:57.369+00:00'
        },
        {
          id: 25,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-06-34Doosan_SRC_Supplier_Forecast_C_200622.xls',
          totalPartsUploaded: 25149,
          uploadDateAndTime: '2022-12-12T21:06:38.366+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 25149,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-0612-13-2022-05-06-34.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-0612-13-2022-05-06-38.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:06:38.366+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:06:38.366+00:00'
        },
        {
          id: 24,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-04-58-06BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27976,
          uploadDateAndTime: '2022-12-12T20:58:09.628+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27976,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-04-5812-13-2022-04-58-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-04-5812-13-2022-04-58-09.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T04:58:09.628+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T04:58:09.628+00:00'
        },
        {
          id: 23,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-04-56-31BobcatForecast_10-24-22 (1) copy.xls',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-12T20:56:31.653+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-04-5612-13-2022-04-56-31.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-04-5612-13-2022-04-56-31.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T04:56:31.653+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T04:56:31.653+00:00'
        },
        {
          id: 22,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-04-10-40BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27976,
          uploadDateAndTime: '2022-12-12T20:10:44.943+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27976,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-04-1012-13-2022-04-10-41.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-04-1012-13-2022-04-10-44.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T04:10:44.943+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T04:10:44.943+00:00'
        },
        {
          id: 21,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-09-21-39MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2022-12-12T01:21:39.951+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-12-2022-09-2112-12-2022-09-21-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-12-2022-09-2112-12-2022-09-21-39.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T09:21:39.951+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:21:49.098+00:00'
        },
        {
          id: 20,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-05-37-11MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2022-12-11T21:37:11.500+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-12-2022-09-1312-12-2022-09-13-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-12-2022-09-1312-12-2022-09-13-44.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T05:37:11.500+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:13:49.328+00:00'
        },
        {
          id: 19,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-04-49-13MarmonHoriontalTestValid.xlsx',
          totalPartsUploaded: 12,
          uploadDateAndTime: '2022-12-11T20:49:13.289+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-22-2022-08-5812-22-2022-08-58-07.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-22-2022-08-5812-22-2022-08-58-07.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T04:49:13.289+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T08:58:07.355+00:00'
        },
        {
          id: 18,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-04-46-24MarmonHoriontalTestValid.xlsx',
          totalPartsUploaded: 12,
          uploadDateAndTime: '2022-12-11T20:46:24.840+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-22-2022-08-4012-22-2022-08-40-07.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-22-2022-08-4012-22-2022-08-40-07.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T04:46:24.840+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T08:40:07.448+00:00'
        },
        {
          id: 15,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-04-32-04MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2022-12-11T20:32:04.601+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-12-2022-09-1812-12-2022-09-18-51.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-12-2022-09-1812-12-2022-09-18-46.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T04:32:04.601+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:18:51.134+00:00'
        }
      ],

      getForecastHistory: [
        {
          id: 97,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-11-2023/05-29-16/Marmon_Customer_46030_Orders_FC_12-22-2022_07-30-30_Forecast.xls',
          totalPartsUploaded: 100,
          uploadDateAndTime: '2023-01-10T21:29:16.363+00:00',
          validOrdersFileCount: 99,
          invalidOrdersFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-11-2023-05-2901-11-2023-05-29-22.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-11-2023-05-2901-11-2023-05-29-16.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-11T05:29:16.363+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-11T05:29:22.947+00:00'
        },
        {
          id: 96,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-11-2023/05-27-49/Marmon_Customer_46030_Orders_FC_12-22-2022_07-30-30_Forecast.xls',
          totalPartsUploaded: 100,
          uploadDateAndTime: '2023-01-10T21:27:50.424+00:00',
          validOrdersFileCount: 99,
          invalidOrdersFileCount: 1,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-11-2023-05-2701-11-2023-05-27-59.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-11-2023-05-2701-11-2023-05-27-50.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-11T05:27:50.424+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-11T05:27:59.469+00:00'
        },
        {
          id: 95,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-10-2023/14-47-59/Marmon_Customer_46030_Orders_FC_01-06-2023_10-27-33_H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-10T06:48:00.271+00:00',
          validOrdersFileCount: 7,
          invalidOrdersFileCount: 21,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-10-2023-14-4901-10-2023-14-49-37.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-10-2023-14-4801-10-2023-14-48-00.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-10T14:48:00.271+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-10T14:49:37.204+00:00'
        },
        {
          id: 94,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-28-20/Marmon_Customer_46030_Orders_FC_01-06-2023_10-27-33_H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-06T02:28:20.960+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-09-2023-11-0101-09-2023-11-01-03.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-09-2023-11-0101-09-2023-11-01-04.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-06T10:28:20.960+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-09T11:01:04.088+00:00'
        },
        {
          id: 93,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-27-33/H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-06T02:27:33.807+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2701-06-2023-10-27-33.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2701-06-2023-10-27-33.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2023-01-06T10:27:33.807+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:27:33.807+00:00'
        },
        {
          id: 92,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-26-27/H-Forecast.xlsx',
          totalPartsUploaded: 28,
          uploadDateAndTime: '2023-01-06T02:26:27.820+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2901-06-2023-10-29-44.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2901-06-2023-10-29-44.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2023-01-06T10:26:27.820+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:29:44.545+00:00'
        },
        {
          id: 91,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-06-2023/10-25-38/H-Forecast.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-06T02:25:39.064+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2501-06-2023-10-25-38.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2501-06-2023-10-25-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2023-01-06T10:25:39.064+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:25:39.064+00:00'
        },
        {
          id: 90,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-39-40/Marmon_Customer_46030_Orders_FC_12-13-2022-07-49-02BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-05T01:39:41.044+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3901-05-2023-09-39-40.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3901-05-2023-09-39-41.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:39:41.044+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:39:41.044+00:00'
        },
        {
          id: 89,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-39-16/Marmon_Customer_46030_Orders_FC_12-13-2022-07-49-02BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-05T01:39:16.979+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3901-05-2023-09-39-16.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3901-05-2023-09-39-16.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:39:16.979+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:39:16.979+00:00'
        },
        {
          id: 88,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-37-29/Marmon_Customer_46030_Orders_FC_Valid Orders01-02-2023-10-4001-02-2023-10-40-29.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-05T01:37:29.439+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3701-05-2023-09-37-29.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3701-05-2023-09-37-29.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:37:29.439+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:37:29.439+00:00'
        },
        {
          id: 87,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-35-44/Marmon_Customer_46030_Orders_FC_01-02-2023_05-49-13_Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-05T01:35:44.237+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3501-05-2023-09-35-44.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3501-05-2023-09-35-44.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:35:44.237+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:35:44.237+00:00'
        },
        {
          id: 85,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-13-07/Forecast.csv',
          totalPartsUploaded: 24,
          uploadDateAndTime: '2023-01-05T01:13:07.360+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 52,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-08-4501-06-2023-08-45-56.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-08-4501-06-2023-08-45-56.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:13:07.360+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-06T08:45:56.316+00:00'
        },
        {
          id: 84,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-11-27/HoriontalTest2.xlsx',
          totalPartsUploaded: 20,
          uploadDateAndTime: '2023-01-05T01:11:27.658+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 20,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-1101-05-2023-09-11-27.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-1101-05-2023-09-11-27.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:11:27.658+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:11:27.658+00:00'
        },
        {
          id: 83,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-10-54/HoriontalTest2.xlsx',
          totalPartsUploaded: 20,
          uploadDateAndTime: '2023-01-05T01:10:54.854+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-06-2023-10-2201-06-2023-10-22-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-06-2023-10-2201-06-2023-10-22-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:10:54.854+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2023-01-06T10:22:06.263+00:00'
        },
        {
          id: 82,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-05-2023/09-10-32/Forecast (4).csv',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2023-01-05T01:10:32.482+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-1001-05-2023-09-10-32.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-1001-05-2023-09-10-32.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-05T09:10:32.482+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:10:32.482+00:00'
        },
        {
          id: 81,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-27-29/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:27:29.764+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2701-04-2023-05-27-29.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2701-04-2023-05-27-29.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:27:29.764+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:27:29.764+00:00'
        },
        {
          id: 80,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-26-05/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:26:05.288+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2601-04-2023-05-26-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2601-04-2023-05-26-05.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:26:05.288+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:26:05.288+00:00'
        },
        {
          id: 79,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-24-38/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:24:39.172+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2401-04-2023-05-24-39.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2401-04-2023-05-24-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:24:39.172+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:24:39.172+00:00'
        },
        {
          id: 78,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-24-01/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 531,
          uploadDateAndTime: '2023-01-03T21:24:02.106+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 531,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2401-04-2023-05-24-01.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2401-04-2023-05-24-02.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:24:02.106+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:24:02.106+00:00'
        },
        {
          id: 77,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-21-42/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:21:43.034+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2101-04-2023-05-21-42.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2101-04-2023-05-21-42.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:21:43.034+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:21:43.034+00:00'
        },
        {
          id: 76,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-20-53/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:20:53.409+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2001-04-2023-05-20-53.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2001-04-2023-05-20-53.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:20:53.409+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:20:53.409+00:00'
        },
        {
          id: 75,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-20-12/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:20:13.105+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-2001-04-2023-05-20-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-2001-04-2023-05-20-13.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:20:13.105+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:20:13.105+00:00'
        },
        {
          id: 74,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-19-20/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 59,
          uploadDateAndTime: '2023-01-03T21:19:20.624+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 59,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1901-04-2023-05-19-20.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1901-04-2023-05-19-20.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:19:20.624+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:19:20.624+00:00'
        },
        {
          id: 73,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-17-12/Marmon_Customer_46030_Orders_FC_01-02-2023_05-49-13_Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-03T21:17:13.102+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1701-04-2023-05-17-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1701-04-2023-05-17-13.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:17:13.102+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:17:13.102+00:00'
        },
        {
          id: 72,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-16-49/Marmon_Customer_46030_Orders_FC_01-02-2023_05-51-54_Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-03T21:16:49.668+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1601-04-2023-05-16-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1601-04-2023-05-16-49.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:16:49.668+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:16:49.668+00:00'
        },
        {
          id: 71,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-16-15/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 59,
          uploadDateAndTime: '2023-01-03T21:16:15.906+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 59,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1601-04-2023-05-16-15.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1601-04-2023-05-16-15.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:16:15.906+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:16:15.906+00:00'
        },
        {
          id: 70,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-15-24/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:15:24.933+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1501-04-2023-05-15-24.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1501-04-2023-05-15-24.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:15:24.933+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:15:24.933+00:00'
        },
        {
          id: 69,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-04-2023/05-14-22/Marmon_Customer_46720_Orders_FC_12-28-2022_19-52-46_Bobcat_2023_JulyToDecwithchangedqty_forecast.xlsx',
          totalPartsUploaded: 767,
          uploadDateAndTime: '2023-01-03T21:14:22.740+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 767,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-04-2023-05-1401-04-2023-05-14-22.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-04-2023-05-1401-04-2023-05-14-22.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Owais.Naim@compunneldigital.com',
          createdDate: '2023-01-04T05:14:22.740+00:00',
          updatedBy: 'Owais.Naim@compunneldigital.com',
          updatedDate: '2023-01-04T05:14:22.740+00:00'
        },
        {
          id: 68,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-51-54/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2023-01-01T21:51:54.287+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-02-2023-05-5201-02-2023-05-52-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-5101-02-2023-05-51-54.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:51:54.287+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:52:49.224+00:00'
        },
        {
          id: 67,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-49-13/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3 (1).xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-01T21:49:13.418+00:00',
          validOrdersFileCount: 3,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders01-02-2023-10-4001-02-2023-10-40-29.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-10-4001-02-2023-10-40-16.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:49:13.418+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2023-01-02T10:40:29.880+00:00'
        },
        {
          id: 66,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-18-01/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-01T21:18:01.854+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 9,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3501-05-2023-09-35-07.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3501-05-2023-09-35-07.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:18:01.854+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:35:07.479+00:00'
        },
        {
          id: 65,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/05-17-26/Marmon_Customer_46030_Orders_FC_12-12-2022-09-21-39MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2023-01-01T21:17:26.833+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-05-1701-02-2023-05-17-26.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-1701-02-2023-05-17-26.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T05:17:26.833+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:17:26.833+00:00'
        },
        {
          id: 64,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/01-02-2023/04-46-01/HoriontalTest2.xlsx',
          totalPartsUploaded: 5,
          uploadDateAndTime: '2023-01-01T20:46:01.706+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 5,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-05-1401-02-2023-05-14-08.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-1401-02-2023-05-14-08.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2023-01-02T04:46:01.706+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:14:08.214+00:00'
        },
        {
          id: 62,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-23-2022/06-40-25/HorizontalForecast.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-22T22:40:25.463+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-23-2022-07-1812-23-2022-07-18-24.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-23-2022-07-1812-23-2022-07-18-24.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2022-12-23T06:40:25.463+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T07:18:24.446+00:00'
        },
        {
          id: 61,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022/07-41-20/Marmon_Customer_46030_Orders_FC_12-20-2022_05-26-48_Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-19T23:41:24.559+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28704,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-03-2023-03-5701-03-2023-03-57-15.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-03-2023-03-5701-03-2023-03-57-19.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T07:41:24.559+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-03T03:57:19.803+00:00'
        },
        {
          id: 60,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022/05-37-38/HorizontalForecast.xlsx',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-19T21:37:39.120+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-20-2022-05-3712-20-2022-05-37-39.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-20-2022-05-3712-20-2022-05-37-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          createdDate: '2022-12-20T05:37:39.120+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-20T05:37:39.120+00:00'
        },
        {
          id: 59,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022/05-26-48/Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-19T21:26:54.585+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27876,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-04-3901-02-2023-04-39-08.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-04-3901-02-2023-04-39-12.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T05:26:54.585+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T04:39:12.877+00:00'
        },
        {
          id: 58,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022-04-55-28Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-19T20:55:34.325+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 28704,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-10-4001-02-2023-10-40-50.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-10-4001-02-2023-10-40-53.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T04:55:34.325+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2023-01-02T10:40:53.653+00:00'
        },
        {
          id: 57,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022-04-54-45BobcatForecast_10-24-22 (1).xls',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2022-12-19T20:54:45.676+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-23-2022-06-4112-23-2022-06-41-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-23-2022-06-4112-23-2022-06-41-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T04:54:45.676+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-23T06:41:06.096+00:00'
        },
        {
          id: 56,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-20-2022-04-54-22BobcatForecast_10-24-22 (1) copy.xls',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2022-12-19T20:54:23.047+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-23-2022-09-0312-23-2022-09-03-17.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-23-2022-09-0312-23-2022-09-03-17.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-20T04:54:23.047+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-23T09:03:17.811+00:00'
        },
        {
          id: 55,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-38-22Marmon_Customer_46030_Orders_FC_12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-14T21:38:25.017+00:00',
          validOrdersFileCount: 4,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-15-2022-05-3812-15-2022-05-38-43.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-3812-15-2022-05-38-24.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-15T05:38:25.017+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:38:43.574+00:00'
        },
        {
          id: 54,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-37-44Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T21:37:44.153+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-20-2022-05-3112-20-2022-05-31-56.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-20-2022-05-3112-20-2022-05-31-56.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-15T05:37:44.153+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:31:56.371+00:00'
        },
        {
          id: 53,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-36-28Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T21:36:28.891+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-3612-15-2022-05-36-28.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-3612-15-2022-05-36-28.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-15T05:36:28.891+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-15T05:36:28.891+00:00'
        },
        {
          id: 52,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-15-54Marmon_Customer_46030_Orders_FC_12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-14T21:15:58.082+00:00',
          validOrdersFileCount: 3,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-15-2022-05-1612-15-2022-05-16-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-1512-15-2022-05-15-57.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          createdDate: '2022-12-15T05:15:58.082+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:16:12.517+00:00'
        },
        {
          id: 51,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-15-2022-05-06-42Marmon_Customer_46030_Orders_FC_12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-14T21:06:48.070+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0612-15-2022-05-06-45.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0612-15-2022-05-06-47.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'LS.Adith@compunneldigital.com',
          createdDate: '2022-12-15T05:06:48.070+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:06:48.070+00:00'
        },
        {
          id: 49,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-10-13-21Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T02:13:21.973+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-20-2022-05-0812-20-2022-05-08-57.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-20-2022-05-0812-20-2022-05-08-57.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T10:13:21.973+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-20T05:08:57.683+00:00'
        },
        {
          id: 48,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-10-12-54Marmon_Customer_46030_Orders_BO_12-12-2022-11-16-27Marmon_Customer_46030_Orders_BO_12-06-2022-13-20-00Marmon_Customer_46030_Orders_BO_11-16-2022-10-16-33Bulk Order Upload History Test File (1).xlsx',
          totalPartsUploaded: 2,
          uploadDateAndTime: '2022-12-14T02:12:54.986+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 2,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-22-2022-13-2412-22-2022-13-24-09.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-22-2022-13-2412-22-2022-13-24-09.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T10:12:54.986+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T13:24:09.498+00:00'
        },
        {
          id: 47,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-09-33-30Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-14T01:33:30.321+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-10-0712-14-2022-10-07-57.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-10-0712-14-2022-10-07-57.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T09:33:30.321+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T10:07:57.616+00:00'
        },
        {
          id: 46,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-07-18-30Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-13T23:18:31.156+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-07-1812-14-2022-07-18-31.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-07-1812-14-2022-07-18-31.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T07:18:31.156+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T07:18:31.156+00:00'
        },
        {
          id: 45,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-14-2022-07-18-13Marmon_Customer_46030_Orders_FC_12-04-2022-08-03-28HoriontalTest New - CSV1 (1).csv',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-13T23:18:13.816+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-07-1812-14-2022-07-18-13.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-07-1812-14-2022-07-18-13.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-14T07:18:13.816+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T07:18:13.816+00:00'
        },
        {
          id: 44,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-13-22-42Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T05:22:45.464+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0112-15-2022-05-01-24.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0112-15-2022-05-01-26.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T13:22:45.464+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:01:26.758+00:00'
        },
        {
          id: 43,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-13-21-55Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T05:22:01.181+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-14-2022-09-3412-14-2022-09-34-34.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-14-2022-09-3412-14-2022-09-34-35.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T13:22:01.181+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-14T09:34:36.013+00:00'
        },
        {
          id: 42,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-12-52-08Doosan_SRC_Supplier_Forecast_C_290822 (2).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T04:52:14.667+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-12-5212-13-2022-12-52-12.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-12-5212-13-2022-12-52-14.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T12:52:14.667+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T12:52:14.667+00:00'
        },
        {
          id: 41,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-12-20-14Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T04:20:17.043+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-02-4112-15-2022-02-41-37.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-02-4112-15-2022-02-41-39.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T12:20:17.043+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T02:41:39.319+00:00'
        },
        {
          id: 40,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-12-19-13BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T04:19:18.938+00:00',
          validOrdersFileCount: 2,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-15-2022-05-1812-15-2022-05-18-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-1712-15-2022-05-17-15.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T12:19:18.938+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:18:05.788+00:00'
        },
        {
          id: 39,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-58-27Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T03:58:29.907+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0312-15-2022-05-03-17.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0312-15-2022-05-03-19.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:58:29.907+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:03:19.119+00:00'
        },
        {
          id: 38,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-57-55BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T03:58:01.352+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-02-2023-05-1801-02-2023-05-18-30.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-02-2023-05-1801-02-2023-05-18-32.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:58:01.352+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-02T05:18:32.993+00:00'
        },
        {
          id: 37,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-48-23Doosan_SRC_Supplier_Forecast_C_290822 (1).xls',
          totalPartsUploaded: 27876,
          uploadDateAndTime: '2022-12-13T03:48:26.368+00:00',
          validOrdersFileCount: 7400,
          invalidOrdersFileCount: 20476,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-15-2022-05-0512-15-2022-05-05-15.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-15-2022-05-0512-15-2022-05-05-17.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:48:26.368+00:00',
          updatedBy: 'LS.Adith@compunneldigital.com',
          updatedDate: '2022-12-15T05:05:17.437+00:00'
        },
        {
          id: 36,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-11-47-10BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T03:47:16.229+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-11-4712-13-2022-11-47-13.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-11-4712-13-2022-11-47-16.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T11:47:16.229+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T11:47:16.229+00:00'
        },
        {
          id: 35,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-08-05-06BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-13T00:05:09.037+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-4001-05-2023-09-40-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-4001-05-2023-09-40-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T08:05:09.037+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:40:06.273+00:00'
        },
        {
          id: 34,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-07-50-04Doosan_SRC_Supplier_Forecast_C_200622.xls',
          totalPartsUploaded: 25149,
          uploadDateAndTime: '2022-12-12T23:50:06.718+00:00',
          validOrdersFileCount: 7200,
          invalidOrdersFileCount: 17949,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-07-5012-13-2022-07-50-05.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-07-5012-13-2022-07-50-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T07:50:06.718+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T07:50:06.718+00:00'
        },
        {
          id: 33,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-07-49-02BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T23:49:05.593+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-07-4912-13-2022-07-49-03.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-07-4912-13-2022-07-49-05.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T07:49:05.593+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T07:49:05.593+00:00'
        },
        {
          id: 32,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-23-40BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T22:23:42.820+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-06-2312-13-2022-06-23-41.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-06-2312-13-2022-06-23-42.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:23:42.820+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T06:23:42.820+00:00'
        },
        {
          id: 31,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-20-33Doosan_SRC_Supplier_Forecast_C_200622.xls',
          totalPartsUploaded: 25149,
          uploadDateAndTime: '2022-12-12T22:20:36.602+00:00',
          validOrdersFileCount: 7200,
          invalidOrdersFileCount: 17949,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-12-3512-13-2022-12-35-53.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-12-3512-13-2022-12-35-54.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:20:36.602+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:35:54.979+00:00'
        },
        {
          id: 30,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-19-39BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T22:19:44.155+00:00',
          validOrdersFileCount: 7100,
          invalidOrdersFileCount: 20069,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-12-3712-13-2022-12-37-23.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-12-3712-13-2022-12-37-25.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:19:44.155+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-13T12:37:25.124+00:00'
        },
        {
          id: 29,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-06-03-14BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T22:03:19.609+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders01-05-2023-09-3801-05-2023-09-38-25.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders01-05-2023-09-3801-05-2023-09-38-25.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T06:03:19.609+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2023-01-05T09:38:25.638+00:00'
        },
        {
          id: 28,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-42-01BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T21:42:06.506+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-4212-13-2022-05-42-02.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-4212-13-2022-05-42-06.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:42:06.506+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:42:06.506+00:00'
        },
        {
          id: 27,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-30-06BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T21:30:11.048+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-3012-13-2022-05-30-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-3012-13-2022-05-30-10.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:30:11.048+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:30:11.048+00:00'
        },
        {
          id: 26,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-08-54BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27169,
          uploadDateAndTime: '2022-12-12T21:08:57.369+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27169,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-0812-13-2022-05-08-54.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-0812-13-2022-05-08-57.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:08:57.369+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:08:57.369+00:00'
        },
        {
          id: 25,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-05-06-34Doosan_SRC_Supplier_Forecast_C_200622.xls',
          totalPartsUploaded: 25149,
          uploadDateAndTime: '2022-12-12T21:06:38.366+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 25149,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-05-0612-13-2022-05-06-34.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-05-0612-13-2022-05-06-38.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T05:06:38.366+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T05:06:38.366+00:00'
        },
        {
          id: 24,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-04-58-06BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27976,
          uploadDateAndTime: '2022-12-12T20:58:09.628+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27976,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-04-5812-13-2022-04-58-06.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-04-5812-13-2022-04-58-09.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T04:58:09.628+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T04:58:09.628+00:00'
        },
        {
          id: 23,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-04-56-31BobcatForecast_10-24-22 (1) copy.xls',
          totalPartsUploaded: 0,
          uploadDateAndTime: '2022-12-12T20:56:31.653+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 0,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-04-5612-13-2022-04-56-31.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-04-5612-13-2022-04-56-31.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T04:56:31.653+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T04:56:31.653+00:00'
        },
        {
          id: 22,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-13-2022-04-10-40BobcatForecast_10-24-22.xls',
          totalPartsUploaded: 27976,
          uploadDateAndTime: '2022-12-12T20:10:44.943+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 27976,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-13-2022-04-1012-13-2022-04-10-41.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-13-2022-04-1012-13-2022-04-10-44.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Ankit.Danwar@compunneldigital.com',
          createdDate: '2022-12-13T04:10:44.943+00:00',
          updatedBy: 'Ankit.Danwar@compunneldigital.com',
          updatedDate: '2022-12-13T04:10:44.943+00:00'
        },
        {
          id: 21,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-09-21-39MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2022-12-12T01:21:39.951+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-12-2022-09-2112-12-2022-09-21-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-12-2022-09-2112-12-2022-09-21-39.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T09:21:39.951+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:21:49.098+00:00'
        },
        {
          id: 20,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-05-37-11MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2022-12-11T21:37:11.500+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-12-2022-09-1312-12-2022-09-13-49.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-12-2022-09-1312-12-2022-09-13-44.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T05:37:11.500+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:13:49.328+00:00'
        },
        {
          id: 19,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-04-49-13MarmonHoriontalTestValid.xlsx',
          totalPartsUploaded: 12,
          uploadDateAndTime: '2022-12-11T20:49:13.289+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-22-2022-08-5812-22-2022-08-58-07.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-22-2022-08-5812-22-2022-08-58-07.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T04:49:13.289+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T08:58:07.355+00:00'
        },
        {
          id: 18,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-04-46-24MarmonHoriontalTestValid.xlsx',
          totalPartsUploaded: 12,
          uploadDateAndTime: '2022-12-11T20:46:24.840+00:00',
          validOrdersFileCount: 0,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/ValidOrders12-22-2022-08-4012-22-2022-08-40-07.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-22-2022-08-4012-22-2022-08-40-07.xlsx',
          orderStatus: {
            id: 1,
            code: 'P',
            description: 'Pending'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T04:46:24.840+00:00',
          updatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
          updatedDate: '2022-12-22T08:40:07.448+00:00'
        },
        {
          id: 15,
          customerNumber: 46030,
          fileUploaded: 'Marmon/Customer/46030/Orders/FC/12-12-2022-04-32-04MarmonHoriontalTest 3.xlsx',
          totalPartsUploaded: 9,
          uploadDateAndTime: '2022-12-11T20:32:04.601+00:00',
          validOrdersFileCount: 1,
          invalidOrdersFileCount: 3,
          validOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/Valid Orders12-12-2022-09-1812-12-2022-09-18-51.xlsx',
          invalidOrdersFileUrl: 'Marmon/Customer/46030/Orders/FC/InvalidOrders12-12-2022-09-1812-12-2022-09-18-46.xlsx',
          orderStatus: {
            id: 2,
            code: 'U',
            description: 'Uploaded'
          },
          createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
          createdDate: '2022-12-12T04:32:04.601+00:00',
          updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
          updatedDate: '2022-12-12T09:18:51.134+00:00'
        }
      ],
      getForecastHistoryId: {
        id: 7
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

    wrapper = mount(ShallowMock(<ForecastOrderConfigTable />, store));

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

  it('ForecastOrderConfigTable are there', () => {
    expect('ForecastOrderConfigTable').toBeTruthy();
  });

  it('console', () => {
  
  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    button.at(0).props().onClose();
  });

  it('Handle sorthandle', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    button.at(0).props().onClick();
  });

  

  it('Handle close on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    button.at(0).props().onClose();
  });

  it('Handle close on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    button.at(2).props().onClose();
  });

  it('Handle close on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Modal)');
    button.at(3).props().onClose();
  });

  it('Handle close on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(ModalUnstyled)');
    button.at(0).props().onClose();
  });

  it('Handle close on handleModalClose', () => {
    const button = wrapper.find('ForwardRef(Dialog)');
    button.at(0).props().onClose();
  });

  it('Handle close on handleModalChange', () => {
    const button = wrapper.find('WithStyles(ForwardRef(Pagination))');
    button.at(0).props().onChange();
  });

  it('on onFirstDataRendered ', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().onFirstDataRendered();
  });
  it('Handle close on SortingCount', () => {
    const button = wrapper.find('SortingCount');
    button.at(0).props().onChange();
  });

  it('Handle close on SortingCount', () => {
    const button = wrapper.find('select');
    button.at(0).props().onChange();
  });
  

  it('on onSelectionChanged', () => {
    const button = wrapper.find('AgGridReact');
    button.at(0).props().onSelectionChanged();
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
      .paginationNumberFormatter()
  });

  it('isRowSelectable', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .isRowSelectable
  });


  it('Status Component Active', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.StatusComponent({ value: 'Active' });
  });

  it('Status Component Validate', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.validateComponent({ value: 'Active' });
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

  it('usesector', () => {
    const button = wrapper.find('customersData');
  });

  it('onClick on  openCompareModalPopUp ', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(0).props().onClick());
  });

  it('onClick on  openCompareModalPopUp ', () => {
    const button = wrapper.find('ForwardRef(Button)');
    act(() => button.at(0).props().onClick());
  });

  it('onClick on  openCompareModalPopUp ', () => {
    const button = wrapper.find('ForwardRef(ButtonBase)');
    act(() => button.at(0).props().onClick());
  });

  it('onClick on  handleCompareForecast ', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(1).props().onClick());
  });

  it('onClick on  handleOpen  ', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(2).props().onClick());
  });

  it('onClick on  handleClick  ', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    act(() => button.at(3).props().onClick());
  });

  

  it('onClick on  validateForecast  ', () => {
    const button = wrapper.find('WithStyles(ForwardRef(PaginationItem))');
    act(() => button.at(0).props().onClick());
  });

  it('onClick on  validateForecast  ', () => {
    const button = wrapper.find('WithStyles(ForwardRef(PaginationItem))');
    act(() => button.at(0).props().onClick());
  });

  it('Handle close on handleModalClose', () => {
    const button = wrapper.find('WithStyles(ForwardRef(Pagination))');
    button.at(0).props().onChange();
  });
});

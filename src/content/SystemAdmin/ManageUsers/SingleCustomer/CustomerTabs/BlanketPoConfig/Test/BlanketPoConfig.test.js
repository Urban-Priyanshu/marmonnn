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
import BlanketPoConfig from '../index';

const mockStore = configureMockStore([thunk]);

const ShallowMock = (Component, props) => {
  return React.cloneElement(Component, props);
};

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
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

describe('BlanketPoConfig', () => {
  let wrapper;
  const store = mockStore({
    customers: {
      customerData: {
        id: 4,
        groupCode: 556,
        customerNumber: 200,
        firstName: 'Bush',
        lastName: 'Hog 1',
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
        bpoAdditionalFields: [
          {
            id: 1,
            customerNumber: 200,
            headerName: 'partname',
            headerDataType: 'String',
            value: 'Nut'
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
        id: 10,
        firstName: 'deepanshu',
        lastName: 'Tyagi',
        email: 'Deepanshu.Tyagi@compunneldigital.com',
        roles: [
          {
            id: 1,
            code: 'ROLE_CUSTOMER',
           
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
        lastLogin: '2023-02-02T05:56:38.085+00:00',
        jobTitle: '',
        jobType: null,
        createdBy: 'System',
        createdDate: '2022-09-28T06:13:31.000+00:00',
        updatedBy: 'Deepanshu.Tyagi@compunneldigital.com',
        updatedDate: '2023-02-02T05:56:38.087+00:00',
        associateCustomerId: null
      }
    
    },
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(async () => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = await mount(ShallowMock(<BlanketPoConfig />, store));
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });

  it('BlanketPoConfig are there', () => {
    expect('BlanketPoConfig').toBeTruthy();
  });

  it('mounthtml', () => {
    
  });

 

  it('Handle onchange on Input', () => {
    const event = {
      target: { name: 'hi' }
    };
    const button = wrapper.find('.basic-multi-select2');
    act(() => button.at(0).props().onChange(event));
  });

  it('Handle onchange on Input', () => {
    const event = {
      target: { name: 'hi' }
    };
    const button = wrapper.find('.basic-multi-select3');
    act(() => button.at(0).props().onChange(event));
  });

  it('Handle onchange on Input', () => {
    const event = {
      target: { name: 'hi' }
    };
    const button = wrapper.find('.basic-multi-select4');
    act(() => button.at(0).props().onChange(event));
  });

  it('Handle onchange on Input', () => {
    const event = {
      target: { name: 'hi' }
    };
    const button = wrapper.find('.basic-multi-select5');
    act(() => button.at(0).props().onChange(event));
  });

  it('Handle onchange on Input', () => {
    const event = {
      target: { name: 'hi' }
    };
    const button = wrapper.find('.basic-multi-select6');
    act(() => button.at(0).props().onChange(event));
  });

  it('Handle onchange on Input', () => {
    const event = {
      target: { name: 'hi' }
    };
    const button = wrapper.find('.basic-multi-select7');
    act(() => button.at(0).props().onChange(event));
  });


  it('Handle save button onFormSubmit', () => {

    const button = wrapper.find('.save-Button');
    act(() => button.at(0).props().onClick());
  });

  it('Handle custom model onFormSubmit', () => {

    const button = wrapper.find('.custom-model');
    act(() => button.at(0).props().onClose());
  });

  it('Handle handleClickOpen ', () => {

    const button = wrapper.find('.Img');
    act(() => button.at(0).props().onClick());
  });

  it('Handle bulkUpload data onchange ', () => {

    const button = wrapper.find('.Bulk-order');
    act(() => button.at(0).props().onChange());
  });

  it('Handle `Addmore` button  ', () => {

    const button = wrapper.find('.Add-more');
    act(() => button.at(0).props().onClick());
  });

  it('Handle `Addmore` button  ', () => {

    const button = wrapper.find('ForwardRef(Dialog)');
    button.at(0).props().onClose();
  });

 
});

describe('BlanketPoConfig', () => {
  let wrapper;
  const store = mockStore({
    customers: {
      getBlanketPoData: {
        customerNumber: 46030,
        firstDateColumn: 7,
        firstRow: 7,
        partNumber: 1,
        quantity: 4,
        poNumber: 6,
        endDate: 8,
        uom: 3,
        price: 5,
        bpoAdditionalFields: [],
        exportData: [
          {
            dataName: 'First Date Column',
            dataValue: 7
          },
          {
            dataName: 'First Row',
            dataValue: 7
          },
          {
            dataName: 'Part Number',
            dataValue: 1
          },
          {
            dataName: 'Quantity',
            dataValue: 4
          },
          {
            dataName: 'PO Number',
            dataValue: 6
          },
          {
            dataName: 'End Date',
            dataValue: 8
          },
          {
            dataName: 'Price',
            dataValue: 5
          },
          {
            dataName: 'UOM',
            dataValue: 3
          }
        ]
      }

    },

    auth: {
      token: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
      }
    },
  });
  const useSelectorMock = reactRedux.useSelector;

  beforeEach(async () => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

    wrapper = await mount(ShallowMock(<BlanketPoConfig />, store));
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });

  it('BlanketPoConfig are there', () => {
    expect('BlanketPoConfig').toBeTruthy();
  });

  it('mounthtml', () => { });

});

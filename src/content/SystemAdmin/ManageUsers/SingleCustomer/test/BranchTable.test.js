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
import BranchTable from '../CustomerTabs/CustomerInformation/BranchTable';

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
      customerData: {
        id: 1,
        groupCode: 55,
        customerNumber: 2341,
        firstName: 'Raj',
        lastName: 'Gatkul',
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
        features: [
          {
            customerId: 4,
            featureCode: 'FC',
            featureDescription: 'Forecast',
            featureId: 3,
            id: 371
          }
        ],
        truckSchedules: [
          {
            customerId: 4,
            day: '08-11-2022',
            id: 486,
            time: '05:00 PM'
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

    useSelectorMock.mockImplementation((selector) =>
      selector(store.getState())
    );

    wrapper = mount(ShallowMock(<BranchTable />, store));

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

  it('Handle click on onGridSizeChanged', () => {
    const button = wrapper.find('AgGridReact');
    act(() => button.at(0).props().onGridSizeChanged());
  });

  
  it('Handle click on onFirstDataRendered', () => {
    const button = wrapper.find('AgGridReact');
    act(() => button.at(0).props().onFirstDataRendered());
  });

  it('mount html', () => {
   
  });

  it('AgGrid table', () => {
    expect(wrapper.find('AgGridReact')).toBeDefined();
  });

  it('BranchTable are there', () => {
    expect('BranchTable').toBeTruthy();
  });

  it('LinkComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.LinkComponent({ data: { id: 1 }, value: 2 });
  });

  it('AssociateCusNoComponent ', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.AssociateCusNoComponent({
        data: { id: 1 },
        value: 2
      });
  });

  it('Action component ', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.ActionComponent({
        data: { id: 1 },
        value: 2
      });
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

  it('onClose handleClose', () => {
    const button = wrapper.find('ForwardRef(Dialog)');
    button.at(0).props().onClose();
  });

});

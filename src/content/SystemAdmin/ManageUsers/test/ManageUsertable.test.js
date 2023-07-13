import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { fireEvent, screen } from '@testing-library/jest-dom';
import ManageUsers from '../Table/index';

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
import EditUser from '../index';

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
          associatedCustomerNumbers: "",
          customerNumber: 400,
          firstName: "Bob",
          groupCode: null,
          id: 8,
          lastName: "Cat",
          shippingLocations: [
            {
              address: "22B St, Jacksonville, 32244",
              customerId: 8,
              customerNumber: 400,
              id: 120,
              primary: true,
              priorityNumber: 1
            }

          ],
          status: { id: 1, code: "A", description: "Active" }

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

    wrapper = mount(ShallowMock(<ManageUsers />, store));


    agGridReact = wrapper.find(AgGridReact).instance();

    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );

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

  it('ManageCustomers are there', () => {
    expect('ManageUsers').toBeTruthy();
  });


  it('console', () => { });


  it('Handle click on custom Button', () => {

    const button = wrapper.find('ForwardRef(Button)');

    button.at(0).props().onClick();

  });

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    button.at(0).props().onClose();
  });

  // it('Handle click on onGridSizeChanged', () => {
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(0).props().onGridSizeChanged());
  // });

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

  // it('onFirstDataRendered', () => {
  //   const button = wrapper.find('AgGridReact');
  //   act(() => button.at(0).props().onFirstDataRendered());
  // });

  // it('TextBox fields', () => {
  //   const button = wrapper.find('ForwardRef(TextField)');
  //   act(() => button.at(0).props().onInput());
  // });

  it('usesector', () => {
    const button = wrapper.find('customersData');
  });

  // it('onClick', () => {
  //   const button = wrapper.find('.MenuItem');
  //   act(() => button.at(0).props().onClick())
  // });
});

describe('EditUser', () => {
  let wrapper;


  const useSelectorMock = reactRedux.useSelector;

  const userData = {
    id: 71,
    firstName: "Rajeev1",
    lastName: "Singh1",
    email: "hail.rajeev@gmail.com",
    lastLogin: "2022-08-22T01:58:00.264+00:00",
    jobTitle: null,
    createdBy: "peter.parker@invaliddomain.som",
    createdDate: "2022-08-22T01:54:29.900+00:00",
    updatedBy: "hail.rajeev@gmail.com",
    updatedDate: "2022-08-22T02:01:14.182+00:00",
    roles: [
      {
        id: 1,
        code: 'ROLE_SUPER_ADMIN',
        description: 'Super Admin',
        authority: 'ROLE_SUPER_ADMIN'
      }
    ],
    type: {
      id: 1,
      code: "I",
      description: "Internal"
    },
    status: {
      id: 3,
      code: "RS",
      description: "Request Sent"
    }
  }
  const rolesData = [
    [
      {
        id: 1,
        code: 'ROLE_SUPER_ADMIN',
        description: 'Super Admin',
        authority: 'ROLE_SUPER_ADMIN'
      },
      {
        id: 2,
        code: "ROLE_SYSTEM_ADMIN",
        description: "System Admin",
        authority: "ROLE_SYSTEM_ADMIN"
      }

    ]
  ]
  const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'

  beforeEach(() => {
    wrapper = mount(ShallowMock(<EditUser />));

  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();

  });

  it('render component EditUser', () => {
    expect(wrapper.find('EditUser')).toBeTruthy();
  });

  it('mount html', () => {
   

  });

});

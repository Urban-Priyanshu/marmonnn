import React from 'react';
import Register from '..';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, screen } from '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import Enzyme, { shallow, configure, mount, sel } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import * as reactRedux from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter, useLocation } from 'react-router-dom';
const mockStore = configureMockStore([thunk]);

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

describe('EditUser', () => {
  let wrapper;
  
  //   customers: {
  //     customerData: {
  //       id: 4,
  //       groupCode: 556,
  //       customerNumber: 200,
  //       firstName: "Bush",
  //       lastName: "Hog 1",
  //       parentCustomerId: null,
  //       status: {
  //         id: 1,
  //         code: 'A',
  //         description: 'Active'
  //       },
  //       associatedUsers: [
  //         {
  //           customerId: 4,
  //           email: 'mayank.saxena@compunneldigital.com',
  //           firstName: 'Mayank',
  //           id: 267,
  //           lastName: 'Saxena',
  //           userId: 9
  //         }
  //       ],
  //       preferredUOM: 'Sta',
  //       inventoryROS: 21,
  //       timeZone: 'time',
  //       branchNumber: 24,
  //       containerProgram: 'container program',
  //       containerDefaultReceiveFromLocation: '22B Street, Atlanta 77234',
  //       containerHomeLocation: '22B Street, Atlanta 77234',
  //       containerDefaultShipToLocation: 'Pune',
  //       visibleContainerLocations: 'Pune',
  //       createdBy: 'System',
  //       createdDate: '2022-08-11T12:00:00.000+00:00',
  //       logo: null,
  //       updatedBy: 'peter.parker@invaliddomain.som',
  //       updatedDate: '2022-08-18T12:44:52.581+00:00',

  //       shippingLocations: [
  //         {
  //           id: 1,
  //           customerID: 1,
  //           address: '22B Street, Atlanta 77234',
  //           priorityNumber: 1,
  //           primary: true
  //         }
  //       ],
  //       associatedCustomers: [
  //         {
  //           branchNumber: 891,
  //           customerId: 4,
  //           customerNumber: 200,
  //           firstName: 'Bush',
  //           lastName: 'Hog 1',
  //           primary: true
  //         }
  //       ],
  //       features: [],
  //       truckSchedules: [
  //         {
  //           customerId: 4,
  //           day: '08-11-2022',
  //           id: 486,
  //           time: '05:00 PM'
  //         }
  //       ]
  //     },
  //     getBlanketPoData: {
  //       customerNumber: 200,
  //       firstDateColumn: 5,
  //       firstRow: 2,
  //       partNumber: 1,
  //       quantity: 6,
  //       poNumber: 8,
  //       endDate: 10,
  //       bpoAdditionalFields: [{
  //         id: 1,
  //         customerNumber: 200,
  //         headerName: "partname",
  //         headerDataType: "String",
  //         value: "Nut"
  //       }

  //       ]
  //     }

  //   },
  //   auth: {
  //     token: {
  //       token:
  //         'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
  //     }
  //   }


  // });
  const store = mockStore({
    auth: {
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
    
    }
  });

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
    wrapper = mount(<BrowserRouter><Register /></BrowserRouter>);
  });

  afterEach(() => {
    // wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('Register are there', () => {
    expect('Register').toBeTruthy();
  });



  it('button on click', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');

    act(() => button.at(0).props().onClick());
  });

  it('button onlogin click', () => {
    const button = wrapper.find('ForwardRef(ButtonBase)');

    act(() => button.at(0).props().onClick());
  });

  it('button on login click', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    act(() => button.at(0).props().onBlur());
  });

  it('button on login click', () => {
    const button = wrapper.find('ForwardRef(OutlinedInput)');

    act(() => button.at(0).props().onBlur());

  });


});
describe('EditUser', () => {
  let wrapper;
  
  //     customerData: {
  //       id: 4,
  //       groupCode: 556,
  //       customerNumber: 200,
  //       firstName: "Bush",
  //       lastName: "Hog 1",
  //       parentCustomerId: null,
  //       status: {
  //         id: 1,
  //         code: 'A',
  //         description: 'Active'
  //       },
  //       associatedUsers: [
  //         {
  //           customerId: 4,
  //           email: 'mayank.saxena@compunneldigital.com',
  //           firstName: 'Mayank',
  //           id: 267,
  //           lastName: 'Saxena',
  //           userId: 9
  //         }
  //       ],
  //       preferredUOM: 'Sta',
  //       inventoryROS: 21,
  //       timeZone: 'time',
  //       branchNumber: 24,
  //       containerProgram: 'container program',
  //       containerDefaultReceiveFromLocation: '22B Street, Atlanta 77234',
  //       containerHomeLocation: '22B Street, Atlanta 77234',
  //       containerDefaultShipToLocation: 'Pune',
  //       visibleContainerLocations: 'Pune',
  //       createdBy: 'System',
  //       createdDate: '2022-08-11T12:00:00.000+00:00',
  //       logo: null,
  //       updatedBy: 'peter.parker@invaliddomain.som',
  //       updatedDate: '2022-08-18T12:44:52.581+00:00',

  //       shippingLocations: [
  //         {
  //           id: 1,
  //           customerID: 1,
  //           address: '22B Street, Atlanta 77234',
  //           priorityNumber: 1,
  //           primary: true
  //         }
  //       ],
  //       associatedCustomers: [
  //         {
  //           branchNumber: 891,
  //           customerId: 4,
  //           customerNumber: 200,
  //           firstName: 'Bush',
  //           lastName: 'Hog 1',
  //           primary: true
  //         }
  //       ],
  //       features: [],
  //       truckSchedules: [
  //         {
  //           customerId: 4,
  //           day: '08-11-2022',
  //           id: 486,
  //           time: '05:00 PM'
  //         }
  //       ]
  //     },
  //     getBlanketPoData: {
  //       customerNumber: 200,
  //       firstDateColumn: 5,
  //       firstRow: 2,
  //       partNumber: 1,
  //       quantity: 6,
  //       poNumber: 8,
  //       endDate: 10,
  //       bpoAdditionalFields: [{
  //         id: 1,
  //         customerNumber: 200,
  //         headerName: "partname",
  //         headerDataType: "String",
  //         value: "Nut"
  //       }

  //       ]
  //     }

  //   },
  //   auth: {
  //     token: {
  //       token:
  //         'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
  //     }
  //   }


  // });
  const store = mockStore({
    auth: {
      authUserData: {
        id: 10,
        firstName: 'deepanshu',
        lastName: 'Tyagi',
        email: 'Deepanshu.Tyagi@compunneldigital.com',
        roles: [
          {
            id: 2,
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
    
    }
  });

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
    wrapper = mount(<BrowserRouter><Register /></BrowserRouter>);
  });

  afterEach(() => {
    // wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('Register are there', () => {
    expect('Register').toBeTruthy();
  });

  

  it('button on click', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');

    act(() => button.at(0).props().onClick());
  });

  it('button onlogin click', () => {
    const button = wrapper.find('ForwardRef(ButtonBase)');

    act(() => button.at(0).props().onClick());
  });

  it('button on login click', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');

    act(() => button.at(0).props().onBlur());
  });

  it('button on login click', () => {
    const button = wrapper.find('ForwardRef(OutlinedInput)');

    act(() => button.at(0).props().onBlur());

  });


});

describe('EditUser', () => {
  let wrapper;
  
  const store = mockStore({
    auth: {
      authUserData: {
        id: 10,
        firstName: 'deepanshu',
        lastName: 'Tyagi',
        email: 'Deepanshu.Tyagi@compunneldigital.com',
        roles: [
          {
            id: 3,
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
    
    }
  });

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
    wrapper = mount(<BrowserRouter><Register /></BrowserRouter>);
  });

  afterEach(() => {
    // wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('Register are there', () => {
    expect('Register').toBeTruthy();
  });

  it('Mount Html', () => {
    console.log(wrapper.debug() , "mountt");
  });
  

  it('button on click', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');

    act(() => button.at(0).props().onClick());
  });

  it('button onlogin click', () => {
    const button = wrapper.find('ForwardRef(ButtonBase)');

    act(() => button.at(0).props().onClick());
  });

  

  it('button on login click', () => {
    const button = wrapper.find('ForwardRef(OutlinedInput)');

    act(() => button.at(0).props().onBlur());

  });


});

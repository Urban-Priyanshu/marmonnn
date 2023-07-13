import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, screen } from '@testing-library/jest-dom';
import { act, render } from '@testing-library/react';
import Enzyme, { shallow, configure, mount, sel } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import OverallDashboard from './index';
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
    },
    dashboard:{
      
        dashboardTableData: [
          {
            customerNumber: 46655,
            customerName: 'CATERPILLAR INC (BAR PROGRAM)',
            placedOrdersCount: 10,
            orderPlacedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
            dueDate: '2023-02-11T00:00:00',
            orderCreatedBy: 'Naveen.Alehonnappanavar@compunneldigital.com',
            orderCreatedAt: '2023-02-07T05:44:01.112',
            orderSource: 'Portal',
            orderStatus: 'PL'
          }
        ]
      
    }
  });

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
    wrapper = shallow(<OverallDashboard />);
  });

  afterEach(() => {
    //   wrapper.unmount();
    useSelectorMock.mockClear();
  });

  it('render component OverallDashboard', () => {
    expect(wrapper.find('OverallDashboard')).toBeTruthy();
  });

  it('LinkComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.LinkComponent({ data: { id: 1 }, value: 2 });
  });
  it('LinkComponent', () => {
    const button = wrapper.find('AgGridReact');
    button
      .at(0)
      .props()
      .frameworkComponents.inventoryComponent({ data: { id: 1 }, value: 2 });
  });


 

  it('Handle close on Popover', () => {
    const button = wrapper.find('ForwardRef(Popover)');
    button.at(0).props().onClose();
  });

  

  it(' onChange on DatePicker', () => {
    const button = wrapper.find('ForwardRef(DatePicker)');
    button.at(0).props().onChange();
  });

  it(' onChange on DatePicker', () => {
    const button = wrapper.find('ForwardRef');
    button.at(0).props().onChange();
  });

  // it('onClick on onBtnExport', () => {
  //   const button = wrapper.find('Styled(ForwardRef(Button))');
  //   button.at(0).props().onClick();
  // });

  it('onClick on handleRefresh', () => {
    const button = wrapper.find('Styled(ForwardRef(Button))');
    button.at(1).props().onClick();
  });

  

});
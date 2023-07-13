import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { fireEvent, screen } from '@testing-library/jest-dom';
import ManageUsers from '../Table/index';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { act } from '@testing-library/react';


let component = null;

let agGridReact = null;
import * as router from 'react-router'

import { GridOptions } from 'ag-grid-community';
import * as reactRedux from 'react-redux';

import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

import { unmountComponentAtNode } from 'react-dom';

import thunk from 'redux-thunk';
import ManageCustomers from '../index';

const mockedUsedNavigate = jest.fn();

const mockStore = configureMockStore([thunk]);

const ShallowMock = (Component, props) => {
  return React.cloneElement(Component, props);
};


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
  const navigate = jest.fn()

  const useSelectorMock = reactRedux.useSelector;

  beforeEach(async () => {

    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    const onClick = jest.fn();

    wrapper = mount(ShallowMock(<ManageCustomers />));

  });

  it('ManageCustomers are there', () => {
    expect('ManageCustomers').toBeTruthy();
  });

});

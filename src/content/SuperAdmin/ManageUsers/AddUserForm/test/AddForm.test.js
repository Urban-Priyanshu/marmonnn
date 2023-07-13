import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { fireEvent, screen } from '@testing-library/jest-dom';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import { act, getByTestId, render } from '@testing-library/react';

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
import UserForm from '../index';

const mockStore = configureMockStore([thunk]);

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
  let mockFn = jest.fn();

  const handleSaveClick = jest.fn();

  const store = mockStore({
    users: {
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
    const onClose = jest.fn();

    wrapper = mount(ShallowMock(<UserForm close={onClose} onClick={mockFn} />, store));

    useSelectorMock.mockImplementation((selector) =>
      selector(store?.getState())
    );
  });

  afterEach(() => {
    wrapper.unmount();
    useSelectorMock.mockClear();
    agGridReact = null;
  });

  it('AddExtUserForm is there', () => {
    expect(wrapper.find('AddExtUserForm')).toBeDefined();
  });



  it('mounthtml', () => {
   console.log(wrapper.debug() , "mounntnt")
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(0).props().onChange());

    act(() => button.at(0).props().onBlur());
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(1).props().onChange());

    act(() => button.at(1).props().onBlur());
  });

  it('Handle onchange  on Select', () => {
    const button = wrapper.find('Select');
    act(() => button.at(0).props().onChange());

    
  });
  

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(2).props().onChange());

    act(() => button.at(2).props().onBlur());
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(InputBase)');
    act(() => button.at(0).props().onChange());

    act(() => button.at(0).props().onBlur());
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('Styled(ForwardRef(TextField))');
    act(() => button.at(0).props().onChange());

    act(() => button.at(0).props().onBlur());
  });


  it('Handle save button handleCancelClick ', () => {

    const button = wrapper.find('ForwardRef(Button)');
    button.at(0).props().onClick();
  });

  it('Handle save button handleCancelClick ', () => {

    const button = wrapper.find('Styled(ForwardRef(Button))');
    button.at(0).props().onClick();
  });
});


// describe("onClick", () => {
//   it('onClick', () => {
//     const { queryByText } = render(<UserForm />)
//     const button = queryByText('Add');
//     fireEvent.click(button);

//     expect(handleSaveClick).toHaveBeenCalledTimes(1);
//   });
// });

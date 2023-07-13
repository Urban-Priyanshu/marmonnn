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
import AddExtUserForm from '../index';

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
  const store = mockStore({
    customers: {
      jobTitles: [
        {
          code: 'A',
          description: 'Alpha'
        },
        {
          code: 'B',
          description: 'Bravo'
        }
      ],
      usersType: [
        {
          id: 1,
          code: 'I',
          description: 'Internal'
        },
        {
          id: 2,
          code: 'CI',
          description: 'Customer Internal'
        }
      ],
      externalUsers: [
        {
          email: 'lionel@gmail.com',
          firstName: 'messi12',
          lastName: 'leo',
          jobTitle: null
        },
        {
          email: 'lionel@gmail.com',
          firstName: 'messi12',
          lastName: 'leo',
          jobTitle: null
        }
      ],
      featuresData: [
        {
          id: 1,
          code: 'BF',
          description: 'Base Feature'
        },
        {
          id: 2,
          code: 'BO',
          description: 'Bulk Order'
        }
      ],
      customerNumbers: []
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

    wrapper = mount(
      ShallowMock(<AddExtUserForm close={onClose} edit={true} />, store)
    );

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

  it('mounthtml', () => {});

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

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(2).props().onChange());
    act(() => button.at(2).props().onBlur());
  });
  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(3).props().onChange());
    act(() => button.at(3).props().onBlur());
  });

  it('Handle Select tag 1', () => {
    const button = wrapper.find('Select');
    act(() => button.at(0).props().onChange());
  });

  it('Handle Select tag 2', () => {
    const button = wrapper.find('Select');
    act(() => button.at(1).props().onChange());
  });

  it('Handle Select tag 3', () => {
    const button = wrapper.find('Select');
    act(() => button.at(2).props().onChange());
  });
});

describe('EditUser with edit false', () => {
  let wrapper;
  const store = mockStore({
    customers: {
      jobTitles: [
        {
          code: 'A',
          description: 'Alpha'
        },
        {
          code: 'B',
          description: 'Bravo'
        }
      ],
      usersType: [
        {
          id: 1,
          code: 'I',
          description: 'Internal'
        },
        {
          id: 2,
          code: 'CI',
          description: 'Customer Internal'
        }
      ],
      externalUsers: [
        {
          email: 'lionel@gmail.com',
          firstName: 'messi12',
          lastName: 'leo',
          jobTitle: null
        },
        {
          email: 'lionel@gmail.com',
          firstName: 'messi12',
          lastName: 'leo',
          jobTitle: null
        }
      ],
      featuresData: [
        {
          id: 1,
          code: 'BF',
          description: 'Base Feature'
        },
        {
          id: 2,
          code: 'BO',
          description: 'Bulk Order'
        }
      ],
      customerNumbers: []
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

    wrapper = mount(
      ShallowMock(<AddExtUserForm close={onClose} edit={false} />, store)
    );

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

  it('mounthtml', () => {});

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

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(2).props().onChange());
    act(() => button.at(2).props().onBlur());
  });

  it('Handle onchange  on textfield', () => {
    const button = wrapper.find('ForwardRef(TextField)');
    act(() => button.at(3).props().onChange());
    act(() => button.at(3).props().onBlur());
  });

  it('Handle Select tag 1', () => {
    const button = wrapper.find('Select');
    act(() => button.at(0).props().onChange());
  });

  it('Handle Select tag 2', () => {
    const button = wrapper.find('Select');
    act(() => button.at(1).props().onChange());
  });

  it('Handle Select tag 3', () => {
    const button = wrapper.find('Select');
    act(() => button.at(2).props().onChange());
  });
});

import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Buttons from './index';

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

describe('Button', () => {
  it('Render button test', () => {
    let wrapper = shallow(<Buttons />);
    expect(wrapper).toBeTruthy();
  });
});

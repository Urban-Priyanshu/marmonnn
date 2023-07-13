import React from 'react';
import { SidebarContext } from './SidebarContext';
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

describe('<SidebarContext/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BrowserRouter><SidebarContext /></BrowserRouter>);
  });

  it('render component SidebarContext', () => {
    expect(wrapper.find('SidebarContext')).toBeTruthy();
  });

  it('HTMl', () => {
   
  });


});
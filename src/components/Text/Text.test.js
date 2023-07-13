import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Text from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';

describe('Text', () => {
  test('Testing rendering of Text Component', () => {
    let wrapper = shallow(<Text />);
    expect(wrapper).toBeTruthy();
  });
});

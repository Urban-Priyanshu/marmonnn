import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Footer from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';



describe("Footer", () => {
    test("Testing rendering of Footer Component", () => {
        let wrapper = mount(<Footer />);
        expect(wrapper.find('Footer')).toBeDefined()
    });
});
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Forms from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';



describe("Forms", () => {
    test("Testing rendering of Forms Component", () => {
        let wrapper = shallow(<Forms />);
        expect(wrapper).toBeTruthy();

    });

});
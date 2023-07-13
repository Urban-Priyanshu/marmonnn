import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Maintenance from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';



describe("Maintenance", () => {
    test("Testing rendering of Maintenance Component", () => {
        let wrapper = mount(<Maintenance />);
        expect(wrapper).toBeTruthy();

    });

});
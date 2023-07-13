import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AppPagination from './appPagination';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';



describe("AppPagination", () => {
    test("Testing rendering of AppPagination Component", () => {
        const wrapper = mount(<AppPagination />);
        expect(wrapper).toBeTruthy();
    });

    test("Testing rendering of AppPagination Component", () => {
        const wrapper = mount(<AppPagination />);
        
    });

   

});
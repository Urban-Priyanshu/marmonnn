import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Badges from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import { act } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);



describe("Badges", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Badges />,);
    });

    test("Testing rendering of Badges Component", () => {
        expect(wrapper.find("Badges")).toBeTruthy();
    });

 

    it('onChange on handleBadgeVisibility ', () => {
        const button = wrapper.find('ForwardRef(Switch)');
        button.at(0).props().onChange();
    });




});
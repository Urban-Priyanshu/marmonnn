import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Status500 from './index';
import { act, screen } from '@testing-library/react';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';



describe("Status500", () => {
    let wrapper;

    beforeEach(() => {

        wrapper = mount(<Status500 />)
    });

    test("Testing rendering of Status500 Component", () => {
        expect(wrapper.find(Status500)).toBeTruthy();

    });

    it('HTMl', () => {
       
    });

    it('onClick on handleClick', () => {
        const button = wrapper.find('ForwardRef(LoadingButton)');
        button.at(0).props().onClick();
    });

});
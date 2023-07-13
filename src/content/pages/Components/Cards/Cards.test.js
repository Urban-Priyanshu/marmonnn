import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Cards from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';



describe("Cards", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Cards />);

    });
    it("Testing rendering of Cards Component", () => {
        expect(wrapper.find("Cards")).toBeTruthy();
    });

   
    it('Handle close on handleExpandClick', () => {
        const button = wrapper.find('Styled(Component)');
        button.at(0).props().onClick();
    });
});
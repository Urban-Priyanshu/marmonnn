import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import HeaderNotifications from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);



describe("HeaderNotifications", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<HeaderNotifications />);

    });

    test('HeaderNotifications are there', () => {
        expect(wrapper.find('HeaderNotifications')).toBeTruthy();
    });

    test('mounthtml', () => {
       
    });

    it('Handle `IconButton ` button  ', () => {

        const button = wrapper.find('ForwardRef(IconButton)');
        button.at(0).props().onClick();
    });

    it('Handle `IconButton ` button  ', () => {

        const button = wrapper.find('ForwardRef(Popover)');
        button.at(0).props().onClose();
    });

});
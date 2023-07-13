import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Status404 from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';


describe("Status404", () => {

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Status404 />);
    });

    test("Testing rendering of Status404 Component", () => {
        expect(wrapper.find("Status404")).toBeTruthy();

    });

    it('HTMl', () => {
  
    });

});
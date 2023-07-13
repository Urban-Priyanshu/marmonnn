import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Butons from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);

describe("AccoButonsrdion", ()=>{
    test("Testing rendering of Butons Component", ()=> {
        let wrapper = shallow( <Butons/>);
        expect(wrapper).toBeTruthy();
    
    });

});
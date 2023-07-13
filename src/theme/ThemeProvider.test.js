import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ThemeProvider from './ThemeProvider';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';



describe("ThemeProvider", ()=>{
    test("Testing rendering of ThemeProvider Component", ()=> {
        let wrapper = render( < ThemeProvider/>);
        expect(wrapper).toBeTruthy();
    
    });

});
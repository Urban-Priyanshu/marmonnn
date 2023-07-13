import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import getAllCustomers from './sysAdminActions';
import addExternalUser from './sysAdminActions';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';




jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
  useEffect: jest.fn()
}));


const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate
}));



describe("getAllCustomers", ()=>{
    test("Testing rendering of getAllCustomers Component", ()=> {
        let wrapper = render( <getAllCustomers/>);
        expect(wrapper).toBeTruthy();
    
    });

});

describe("addExternalUser", ()=>{
    test("Testing rendering of addExternalUser Component", ()=> {
        let wrapper = render( <addExternalUser/>);
        expect(wrapper).toBeTruthy();
    
    });

});
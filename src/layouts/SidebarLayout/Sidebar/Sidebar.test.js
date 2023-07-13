import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Sidebar from './index';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);

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


describe("Sidebar", () => {
  test("Testing rendering of Sidebar Component", () => {
    let wrapper = shallow(<Sidebar />);
    expect(wrapper.find("Sidebar")).toBeTruthy();

  });

});
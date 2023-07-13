import SERVER_BASE_URL from '../config';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from '@testing-library/react';
import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
Enzyme.configure({ adapter: new Adapter() });
import thunk from 'redux-thunk';
const mockStore = configureMockStore([thunk]);
import { render } from '@testing-library/react';

describe("s3Config", () => {
    it("config", () => {
        let wrapper = shallow(<SERVER_BASE_URL />);
    })
})
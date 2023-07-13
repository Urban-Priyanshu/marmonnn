import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { fireEvent, screen } from '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import Enzyme, { shallow, configure, mount, sel } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import * as reactRedux from 'react-redux';
import { unmountComponentAtNode } from 'react-dom';
import thunk from 'redux-thunk';
import { useLocation } from 'react-router';
import { Router } from 'react-router';
import * as router from 'react-router';

import clsx from 'clsx';
import BasicCard from '../card';
const mockStore = configureMockStore([thunk]);



describe('BasicCard', () => {
    let wrapper;
    wrapper = shallow(ShallowMock(<BasicCard chartName='Features Usage Trending' />));

    

    it('render component BasicCard', () => {
        expect(wrapper.find('BasicCard')).toBeTruthy();
    });

    it('mount html', () => { });

});

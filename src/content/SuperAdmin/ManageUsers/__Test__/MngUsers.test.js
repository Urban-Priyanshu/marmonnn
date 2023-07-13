import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Enzyme, { shallow, mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import ManageUsers from '..';

describe('ManageUsers', () => {
    let wrapper;
    wrapper = shallow(ShallowMock(<ManageUsers />));
    it('render component ManageUsers', () => {
        expect(wrapper.find('ManageUsers')).toBeTruthy();
    });

    it('mount html', () => { });
});


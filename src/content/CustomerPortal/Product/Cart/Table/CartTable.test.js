import React from 'react';
import CartTable from './index';
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
    useNavigate: () => mockedUsedNavigate,
    useEffect: () => mockedUsedNavigate,
    useLocation: () => ({
        pathname: '/',
        search: '',
        type: ''
    })
}));

describe('EditUser', () => {
    let wrapper;

    const store = mockStore({
        customerPortal: {
            getCustomerCartDetails: [
                {
                    id: 108,
                    partNumber: 'W55698',
                    partDescription: 'VAP',
                    customerId: 8,
                    customerNumber: 46030,
                    quantity: 1,
                    uom: 'PCS',
                    dueDate: '01/27/2023',
                    shippingLocationId: 95,
                    purchaseOrderNumber: 12,
                    specialRemarks: 'qwer',
                    createdBy: 'Deepanshu.Tyagi@compunneldigital.com',
                    createdDate: '2023-01-06T12:10:14.430+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2023-01-06T12:49:02.781+00:00',
                    errorsMap: null,
                    isBPO: false,
                    partId: 1465
                }
            ]
        },
        customers: {
            getUomData: [
                {
                    uomCode: 'FT',
                    uomName: 'Feet'
                },
                {
                    uomCode: 'IN',
                    uomName: 'Inches'
                },
                {
                    uomCode: 'PCS',
                    uomName: 'Pieces'
                },
                {
                    uomCode: 'LBS',
                    uomName: 'Pounds'
                },
                {
                    uomCode: 'M',
                    uomName: 'Meters'
                },
                {
                    uomCode: 'MM',
                    uomName: 'MilliMeters'
                },
                {
                    uomCode: 'KG',
                    uomName: 'Kilograms'
                },
                {
                    uomCode: 'TON',
                    uomName: 'Tons'
                },
                {
                    uomCode: 'PARTS',
                    uomName: 'Parts'
                }
            ]

        },
        auth: {
            token: {
                token:
                    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
            }
        }
    }); const useSelectorMock = reactRedux.useSelector;

    beforeEach(() => {
        useSelectorMock.mockImplementation((selector) =>
            selector(store?.getState())

        );

        wrapper = mount(ShallowMock(<CartTable />, store));
        const EmailComponent = jest.fn();
    });

    afterEach(() => {
        //   wrapper.unmount();
        useSelectorMock.mockClear();


    });

    it('render component CartTable', () => {
        expect(wrapper.find('CartTable')).toBeTruthy();
    });



    it('button on Update all click', () => {
        const button = wrapper.find('ForwardRef(Button)');
        act(() => button.at(0).props().onClick());
    });

   

    it('button on Cancel click', () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');
        act(() => button.at(1).props().onClick());
    });

    it('onClick button on goBack', () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');
        act(() => button.at(2).props().onClick());
    });

    it('button on DatePicker click', () => {
        const button = wrapper.find('ForwardRef(DatePicker)');
        act(() => button.at(0).props().onFocus());
    });

    it('button on DatePicker click', () => {
        const button = wrapper.find('ForwardRef(DatePicker)');
        act(() => button.at(0).props().onChange());
    });

    it('button on DatePicker click', () => {
        const button = wrapper.find('ForwardRef(PureDateInput)');
        act(() => button.at(0).props().onChange());
    });

   

   

    it('button on goBack', () => {
        const button = wrapper.find('ForwardRef(Button)');
        const event = {
            target: { name: 'Cancel' }
        };

        act(() => button.at(0).props().onClick(event));
    });

    it('button on goBack', () => {
        const button = wrapper.find('ForwardRef(ButtonBase)');
        act(() => button.at(0).props().onClick());
    });

});


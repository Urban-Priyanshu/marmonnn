import React from 'react';
import useFormControls from '../CustomerTabs/Validations';
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
        auth: {
            authUserData: {
                id: 8,
                firstName: 'Bob',

                lastName: 'Cat',
                email: 'ls.adith@compunneldigital.com',

                jobType: null,
                jobTitle: null,
                lastLogin: '2022-08-27T10:45:08.069+00:00',
                customerNumber: 200,
                createdBy: 'peter.parker@invaliddomain.som',
                createdDate: '2022-08-26T11:52:57.366+00:00',
                updatedBy: 'ls.adith@compunneldigital.com',
                updatedDate: '2022-08-27T10:45:08.136+00:00',
                type: {
                    id: 1,
                    code: 'I',
                    description: 'Internal'
                },
                roles: [
                    {
                        id: 1,
                        code: 'ROLE_SALES_USER',
                        description: 'Sales User',
                        authority: 'ROLE_SALES_USER'
                    }
                ],
                features: [],

                status: {
                    id: 3,
                    code: 'RS',
                    description: 'Request Sent'
                }
            }
        }
    });
    const useSelectorMock = reactRedux.useSelector;

    const authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'

    beforeEach(() => {
        useSelectorMock.mockImplementation((selector) =>
            selector(store?.getState())
        );

        wrapper = shallow(ShallowMock(<useFormControls />, store));
    });

    afterEach(() => {
        //   wrapper.unmount();
        useSelectorMock.mockClear();
    });

    it('render component useFormControls', () => {
        expect(wrapper.find('useFormControls')).toBeTruthy();
    });
});


describe('EditUser', () => {
    let wrapper;

    const store = mockStore({
        customers: {
            customerData: {
                id: 1,
                groupCode: 55,
                customerNumber: 2341,
                firstName: 'Raj',
                lastName: 'Gatkul',
                parentCustomerID: 2,
                shippingLocations: 1,
                status: {
                    id: 1,
                    code: 'A',
                    description: 'Active'
                },
                associatedUsers: 122,
                preferredUOM: 'Sta',
                inventoryROS: 21,
                features: 1,
                timeZone: 'time',
                truckSchedule: null,
                branch_number: 24,
                containerProgram: 'container program',
                containerDefaultReceiveFromLocation: '22B Street, Atlanta 77234',
                containerHomeLocation: '22B Street, Atlanta 77234',
                vontainerDefaultShiptolocation: 'Pune',
                visibleContainerLocations: 'Pune',
                logo: null,
                customerShippingLocation: [
                    {
                        id: 1,
                        customerID: 1,
                        address: '22B Street, Atlanta 77234',
                        priorityNumber: 1,
                        primary: true
                    }
                ],
                associatedCustomerUser: [
                    {
                        id: 1,
                        customerID: 1,
                        associatedUserID: 1
                    }
                ],
                customerFeatures: [
                    {
                        id: 1,
                        customerID: 1,
                        featureID: 1
                    }
                ],
                customerTruckSchedule: [
                    {
                        id: 1,
                        customerID: 1
                    }
                ]
            }
        },
        auth: {
            token: {
                token:
                    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
            }
        }
    });
    const useSelectorMock = reactRedux.useSelector;

    beforeEach(async () => {
        const onClick = jest.fn();

        wrapper = mount(ShallowMock(<useFormControls />, store));
     

        useSelectorMock.mockImplementation((selector) =>
            selector(store?.getState())
        );
    });

    afterEach(() => {
        wrapper.unmount();
        useSelectorMock.mockClear();
    });

    it('console', () => {

    });


    it('useFormControls', () => {
        expect('useFormControls').toBeTruthy();
    });
});


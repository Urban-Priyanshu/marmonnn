import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
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
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import ShallowMock from 'src/content/SuperAdmin/EditUser/shallow';
import HeaderMenu from './index';


jest.mock('react-redux', () => ({
    connect: () => jest.fn(),
    useSelector: jest.fn((fn) => fn()),
    useDispatch: () => jest.fn(),
    useEffect: jest.fn(),
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



describe("Menu", () => {
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
        },

        auth: {
            token: {
                token:
                    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXRlci5wYXJrZXJAaW52YWxpZGRvbWFpbi5zb20iLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUl9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9TWVNURU1fQURNSU4ifV0sImlhdCI6MTY1OTU4OTE5NCwiZXhwIjoxNjU5NjEwNzk0fQ.tfCoR-8Mqd_YHJ8z_JZIUMEfSEY0-9yz1F0MPKroRS0'
            }
        },
        customers: {
            customerData: {
                id: 4,
                groupCode: 556,
                customerNumber: 200,
                firstName: "Bush",
                lastName: "Hog 1",
                parentCustomerId: null,
                status: {
                    id: 1,
                    code: 'A',
                    description: 'Active'
                },
                associatedUsers: [
                    {
                        customerId: 4,
                        email: 'mayank.saxena@compunneldigital.com',
                        firstName: 'Mayank',
                        id: 267,
                        lastName: 'Saxena',
                        userId: 9
                    }
                ],
                preferredUOM: 'Sta',
                inventoryROS: 21,
                timeZone: 'time',
                branchNumber: 24,
                containerProgram: 'container program',
                containerDefaultReceiveFromLocation: '22B Street, Atlanta 77234',
                containerHomeLocation: '22B Street, Atlanta 77234',
                containerDefaultShipToLocation: 'Pune',
                visibleContainerLocations: 'Pune',
                createdBy: 'System',
                createdDate: '2022-08-11T12:00:00.000+00:00',
                logo: null,
                updatedBy: 'peter.parker@invaliddomain.som',
                updatedDate: '2022-08-18T12:44:52.581+00:00',

                shippingLocations: [
                    {
                        id: 1,
                        customerID: 1,
                        address: '22B Street, Atlanta 77234',
                        priorityNumber: 1,
                        primary: true
                    }
                ],
                associatedCustomers: [
                    {
                        branchNumber: 891,
                        customerId: 4,
                        customerNumber: 200,
                        firstName: 'Bush',
                        lastName: 'Hog 1',
                        primary: true
                    }
                ],
                features: [],
                truckSchedules: [
                    {
                        customerId: 4,
                        day: '08-11-2022',
                        id: 486,
                        time: '05:00 PM'
                    }
                ]
            },
            getBlanketPoData: {
                customerNumber: 200,
                firstDateColumn: 5,
                firstRow: 2,
                partNumber: 1,
                quantity: 6,
                poNumber: 8,
                endDate: 10,
                bpoAdditionalFields: [{
                    id: 1,
                    customerNumber: 200,
                    headerName: "partname",
                    headerDataType: "String",
                    value: "Nut"
                }

                ]
            }

        },
        customerPortal: {
            getCustomerCartDetails: [
                {
                    id: 116,
                    partNumber: 'W55682',
                    partDescription: 'VAP',
                    customerId: 8,
                    customerNumber: 46030,
                    quantity: 5,
                    uom: 'PCS',
                    dueDate: '01/21/2023',
                    shippingLocationId: 99,
                    purchaseOrderNumber: '1234',
                    specialRemarks: 'qwer',
                    createdBy: 'LS.Adith@compunneldigital.com',
                    createdDate: '2023-01-09T12:58:28.493+00:00',
                    updatedBy: 'LS.Adith@compunneldigital.com',
                    updatedDate: '2023-01-09T12:58:28.493+00:00',
                    errorsMap: null,
                    isBPO: false,
                    partId: 1464
                }
            ]
        }
    });
    const useSelectorMock = reactRedux.useSelector;

    beforeEach(() => {
        useSelectorMock.mockImplementation((selector) =>
            selector(store?.getState())
        );

        // const onClick = jest.fn();
        // const onChange = jest.fn();
        // const onBlur = jest.fn();

        wrapper = shallow(ShallowMock(<HeaderMenu />, store));
    });

    it("Testing rendering of Menu Component", () => {
        let wrapper = shallow(<HeaderMenu />);
        expect(wrapper.find("HeaderMenu")).toBeTruthy();

    });

    it('HTMl', () => {
       
    });

    it('onClick on handleEditCart', () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');
        button.at(0).props().onClick();
    });

    it('onClick on handleSubmit', () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');
        button.at(1).props().onClick();
    });

    it('onClick on handleClose', () => {
        const button = wrapper.find('ForwardRef(Menu)');
        button.at(0).props().onClose();
    });

    it('onClick on handleClickClose', () => {
        const button = wrapper.find('Styled(ForwardRef(Dialog))');
        button.at(0).props().onClose();
    });

    it('onClick on handleClickClose', () => {
        const button = wrapper.find('BootstrapDialogTitle');
        button.at(0).props().onClose();
    });

    // it('onClick on handleClickOpen', () => {
    //     const button = wrapper.find('ForwardRef(List)');
    //     button.at(0).props().onClick();
    // });


});

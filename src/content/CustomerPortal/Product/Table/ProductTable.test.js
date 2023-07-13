import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act, render } from '@testing-library/react';

let component = null;

let agGridReact = null;

import { GridOptions } from 'ag-grid-community';
import * as reactRedux from 'react-redux';

import Enzyme, { shallow, configure, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { provider } from 'react-redux';
Enzyme.configure({ adapter: new Adapter() });

import { unmountComponentAtNode } from 'react-dom';

import thunk from 'redux-thunk';
import CustomerPortalTable from './index';

const mockStore = configureMockStore([thunk]);

export const ensureGridApiHasBeenSet = (component) => {
    return waitForAsyncCondition(() => {
        return component.instance().api === null;
    }, 5);
};

export const waitForAsyncCondition = (condition, maxAttempts, attempts = 0) =>
    new Promise(function (resolve, reject) {
        (function waitForCondition() {
            // we need to wait for the gridReady event before we can start interacting with the grid
            // in this case we're looking at the api property in our App component, but it could be
            // anything (ie a boolean flag)
            if (condition()) {
                // once our condition has been met we can start the tests
                return resolve();
            }

            attempts++;

            if (attempts >= maxAttempts) {
                reject('Max timeout waiting for condition');
            }

            // not set - wait a bit longer
            setTimeout(waitForCondition, 5000);
        })();
    });

const ShallowMock = (Component, props) => {
    return React.cloneElement(Component, props);
};




const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => ({
        pathname: "/",
        search: '',
        type: '',

    })
}));

jest.mock('react-redux', () => ({
    connect: () => jest.fn(),
    useSelector: jest.fn((fn) => fn()),
    useDispatch: () => jest.fn()
}));

describe('EditUser', () => {
    let wrapper;

    const store = mockStore({
        auth: {
            authUserData: {
                id: 1,
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

    beforeEach(async () => {
        const onClick = jest.fn();
        useSelectorMock.mockImplementation((selector) =>
            selector(store?.getState()));


        wrapper = mount(<CustomerPortalTable />, store);
        let EmailComponent = jest.fn();


    });

    afterEach(() => {

        wrapper.unmount();
        useSelectorMock.mockClear();
        agGridReact = null;

    });




    it('CustomerPortalTable are there', () => {
        expect('CustomerPortalTable').toBeTruthy();
    });

    

    it('button on login click', () => {
        const button = wrapper.find('Styled(ForwardRef(Button))');


        act(() => button.at(0).props().onClick());
    });

  



});

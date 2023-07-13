import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Breadcrumb from './index';
import { render } from '@testing-library/react';

describe('Breadcrumb', () => {
  test('Testing rendering of Breadcrumb component', () => {
    let wrapper = render(
      <Breadcrumb
        userData={{
          customerName: 'abcd',
          firstName: 'pqrs',
          lastName: 'abcdef'
        }}
      // location={[
      //   { location: 'Manage Customer', to: '/manage-sales-customers' }
      // ]}
      />
    );
    expect(wrapper).toBeTruthy();
  });
});

describe('Breadcrumb', () => {
  test('Testing rendering of Breadcrumb component', () => {
    let wrapper = render(
      <Breadcrumb
        userData={{
          firstName: 'pqrs',
          lastName: 'abcdef'
        }}
      // location={[
      //   { location: 'Manage Customer', to: '/manage-sales-customers' }
      // ]}
      />
    );
    expect(wrapper).toBeTruthy();
  });
});

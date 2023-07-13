import React from 'react';
import usePagination from './pagiantion';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });


describe('usePagination', () => {
  // it('Render usePagination test', () => {
  //   let wrapper = shallow(<usePagination data={{}} itemsPerPage={{}} currentPage={{}} setCurrentPage={{}} /> );
  //   expect(wrapper).toBeTruthy();
  // });
  it('Render usePagination test', () => {
    let currentPage = 1
    const handler = (data) => {
      currentPage = data
    }
    let wrapper = usePagination(['1','2','3','4','5'], 1, currentPage, handler)
    let data = wrapper.currentData()
    expect(data).toStrictEqual(['1'])
    wrapper.next()
    wrapper.prev()
    wrapper.jump()
    data = wrapper.currentData()
    expect(data).toStrictEqual(['1'])
  });
});

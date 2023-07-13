

import { ActionTypes } from '../../constants/action-types';
import reducer from '../loaderReducer';

// import { UPDATE_POST_SUCCESS } from '../actions/posts/updatePost';
import expect from 'expect';



describe('LOADER_STATUS reducer', () => {
    const payload = false;
    const showLoading = false;
  
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual({});
    });
  
    it('should return UsersData', () => {
      const type =ActionTypes.LOADER_STATUS;
      expect(reducer(undefined, {type , payload })).toEqual({showLoading});
    });
  });
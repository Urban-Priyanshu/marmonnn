import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import sysAdminReducer from './sysAdminReducer';
import customerPortalReducer from './customerPortalReducer';
import loaderReducer from './loaderReducer';
import dashboardReducer from './dashboardReducer';


const reducers = combineReducers({
  users: userReducer,
  auth: authReducer,
  customers: sysAdminReducer,
  customerPortal: customerPortalReducer,
  dashboard:dashboardReducer,
  loaderStatus:loaderReducer,
 
});

export default reducers;

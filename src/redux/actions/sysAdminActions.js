import axios from 'axios';
import { ActionTypes } from '../constants/action-types';
import SERVER_BASE_URL from '../../config/config';
import { toast } from 'react-toastify';
import store from '../store';

export const getAllCustomers = (authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
   
    const response = await axios.get(
      `${SERVER_BASE_URL}/customer/getAllCustomers`,
      config
    );

    dispatch({
      type: ActionTypes.GET_CUSTOMERS,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};
export const getAllCustomersforPortal = (authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
   
    const response = await axios.get(
      `${SERVER_BASE_URL}/dashboard/report/customers`,
      config
    );

    dispatch({
      type: ActionTypes.GET_CUSTOMERS_PORTAL,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};



export const addExternalUser =
  (values, customerNumber, authToken, reset) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };

      const obj = {
        ...values,
        features: values?.features?.map((d) => d?.value),
        jobType: values?.jobType?.value ?? '',
        associatedCustomerNumbers: values?.associatedCustomerNumbers?.map(
          (d) => d?.value
        )
      };
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/addExternalUser/${customerNumber}`,
        obj,
        config
      );

      const getExteranlCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/EU`,
        config
      );

      dispatch({
        type: ActionTypes.GET_EXTERNAL_USERS,
        payload: getExteranlCustomer.data
      });
      reset();

      toast.success('External user added successfully.');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getCustomer = (id, authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/customer/${id}`,
      config
    );

    dispatch({
      type: ActionTypes.GET_CUSTOMER,
      payload: response.data
    });

    dispatch({
      type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
      payload: response.data
    });
    return response
  } catch (e) {
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const getAllFeatures = (authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/feature/getAllFeature`,
      config
    );

    dispatch({
      type: ActionTypes.GET_FEATURES,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const getCustomerNumbers =
  (customerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/associatecustomer/${customerNumber}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER_NUMBERS,
        payload: response.data
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const updateCustomer =
  (customer, customerId, customerNumber, type, authToken) =>
  async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/updateCustomer`,
        customer,
        config
      );
      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerId}`,
        config
      );

      const getUnassociateCustomer = await axios.post(
        `${SERVER_BASE_URL}/customer/getAllUnAssociatedCustomers/${customerNumber}`,
        {},
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER,
        payload: getThisCustomer.data
      });

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });

      dispatch({
        type: ActionTypes.GET_ALL_UNASSOCIATED_CUSTOMERS,
        payload: getUnassociateCustomer.data
      });
      toast.success(`${type} updated successfully!`);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const cancelformValues =
  (values, customerId, customerNumber, authToken) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
      const response = await axios.post(
        `${SERVER_BASE_URL}/resetCustomer/${customerNumber}`,
        customer,
        config
      );
      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerId}`,
        config
      );
      dispatch({
        type: ActionTypes.GET_CUSTOMER,
        payload: getThisCustomer.data
      });
      toast.success(`${type} updated successfully!`);
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const updatePrimary =
  (e, id, customerID, authToken, mainID) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };

      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/updateShippingLocationPrimary`,
        { id: id, customerId: customerID, primary: e.target.checked },
        config
      );

      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${mainID}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });

      toast.success('Ship to location updated successfully!');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getExternalUser =
  (customerNumber, authToken) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/EU`,
        config
      );

      dispatch({
        type: ActionTypes.GET_EXTERNAL_USERS,
        payload: response.data
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };


export const getAllJobTypes = (authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    const response = await axios.get(
      `${SERVER_BASE_URL}/user/getAllJobTypes`,
      config
    );

    dispatch({
      type: ActionTypes.GET_ALL_USER_TYPES,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const UpdatedAssociatedCustomerPrimary =
  (
    e,
    customerNumber,
    firstName,
    lastName,
    branchNumber,
    customerId,
    authToken,
    id
  ) =>
  async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
    
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/updateAssociatedCustomerPrimary`,
        {
          customerNumber,
          customerId,
          firstName,
          lastName,
          branchNumber,
          primary: e.target.checked
        },
        config
      );
      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerId}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER,
        payload: getThisCustomer.data
      });

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });

      toast.success('Branches updated successfully!');
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getAssociatedCustomers = (id, authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    const response = await axios.get(
      `${SERVER_BASE_URL}/customer/associateCustomer/${id}`,
      config
    );

    dispatch({
      type: ActionTypes.GET_ASSOCIATE_CUSTOMERS,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};
// http://localhost:8181/enum/timezone
export const getPrefferedUom = (authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    const response = await axios.get(
      `${SERVER_BASE_URL}/enum/preferred-uom`,
      config
    );

    dispatch({
      type: ActionTypes.GET_PREFFERED_UOM,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};


export const getPrefferedTimeZone = (authToken) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    const response = await axios.get(
      `${SERVER_BASE_URL}/enum/timezone`,
      config
    );

    dispatch({
      type: ActionTypes.GET_PREFFERED_TIMEZONE,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const updateStatusByEmail =
  (customerNumber, email, status, authToken, type) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/updateStatusByEmail/${email}/${status}`,
        {},
        config
      );
      const externalCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/EU`,
        config
      );

      if (type === 'getAllExternalUsers') {
        dispatch({
          type: ActionTypes.GET_EXTERNAL_USERS,
          payload: externalCustomer.data
        });
      }

      if (status === 'I') {
        toast.success('User Inactive Successfully');
      }

      if (status === 'RS') {
        toast.success(REQUEST_SENT);
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const getAllCustomersById = (id, authToken) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` }
  };
  try {
    const response = await axios.get(
      `${SERVER_BASE_URL}/customer/getAllCustomersByUserId/${id}`,
      config
    );

    dispatch({
      type: ActionTypes.GET_CUSTOMERS_BY_ID,
      payload: response.data
    });
  } catch (e) {
    if (e?.response?.status === 401) {
      dispatch({
        type: ActionTypes.LOGOUT
      });
      
    }
    toast.error(e?.response?.data?.errorDescription);
  }
};

export const getAllUnAssociatedCustomers =
  (authToken, customerNumber) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/getAllUnAssociatedCustomers/${customerNumber}`,
        {},
        config
      );

      dispatch({
        type: ActionTypes.GET_ALL_UNASSOCIATED_CUSTOMERS,
        payload: response.data
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const unAssociateCustomer =
  (customerNumber, id, mainCustomerNumber, customerData, authToken) =>
  async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/unAssociateCustomer/${customerNumber}`,
        {},
        config
      );

      const getUnassociateCustomer = await axios.post(
        `${SERVER_BASE_URL}/customer/getAllUnAssociatedCustomers/${mainCustomerNumber}`,
        {},
        config
      );

      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${id}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER,
        payload: getThisCustomer.data
      });

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });

      dispatch({
        type: ActionTypes.GET_ALL_UNASSOCIATED_CUSTOMERS,
        payload: getUnassociateCustomer.data
      });

      if (response) {
        toast.success(e?.response?.data?.errorDescription);
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const UpdateExternalUser =
  (values, customerNumber, authToken, reset) => async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      };

      const response = await axios.post(
        `${SERVER_BASE_URL}/user/update/EU/${customerNumber}`,
        values,

        config
      );

      const getExteranlCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/EU`,

        config
      );

      dispatch({
        type: ActionTypes.GET_EXTERNAL_USERS,

        payload: getExteranlCustomer.data
      });

      toast.success('External user updated!');
      reset();
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const deleteLogo =
  (id, customerNumber, logoUrl, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.delete(
        `${SERVER_BASE_URL}/customer/${customerNumber}/deleteLogo?fileName=${logoUrl}`,
        config
      );

      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${id}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_LOGO_IMAGE,
        payload: null
      });

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const uploadLogo =
  (customerNumber, id, authToken, fd) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/customer/${customerNumber}/uploadLogo`,
        fd,
        config
      );

      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${id}`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });
      return response;
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
    }
  };

export const downloadLogo =
  (customerNumber, id, fileName, authToken, setFile) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {
      const getThisCustomer = await axios.get(
        `${SERVER_BASE_URL}/customer/${id}`,
        config
      );

      let response = await axios.get(
        `${SERVER_BASE_URL}/customer/${customerNumber}/downloadLogo?fileName=${fileName}`,
        config
      );

     

      dispatch({
        type: ActionTypes.GET_LOGO_IMAGE,
        payload: response.data
      });

      dispatch({
        type: ActionTypes.GET_CUSTOMER_TABLE_DATA,
        payload: getThisCustomer.data
      });
  
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      // toast.error(e?.response?.data?.errorDescription);
    }
  };


  export const addCustomers =
  (customerNumber,setOpen,setCustomerNumber, authToken) => async (dispatch) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };
    try {

      let addCustomers = await axios.post(
        `${SERVER_BASE_URL}/customer/load/${customerNumber}`,{},
        config
      );

      const response = await axios.get(
        `${SERVER_BASE_URL}/customer/getAllCustomers`,
        config
      );

      dispatch({
        type: ActionTypes.GET_CUSTOMERS,
        payload: response.data
      });
      toast.success('Customer Added');
      setCustomerNumber('')
      setOpen(false)
     
  
    } catch (e) {
      if (e?.response?.status === 401) {
        dispatch({
          type: ActionTypes.LOGOUT
        });
        
      }
      toast.error(e?.response?.data?.errorDescription);
      // toast.error(e?.response?.data?.errorDescription);
    }
  };





import * as React from 'react';
import {
  addExternalUser,
  UpdateExternalUser
} from 'src/redux/actions/sysAdminActions';
import UserForm from './index';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useFormControls = (edit, extUserData) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState();
  const [clearState, setClearState] = React.useState(false);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);
  const customerData = useSelector((state) => state?.customers?.customerData);
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (extUserData) {
      const initialFormValues = {
        firstName: extUserData?.firstName,
        lastName: extUserData?.lastName,
        email: extUserData?.email,
        jobType: extUserData?.jobType,
        features: extUserData?.features?.map((res) => res?.code),
        associatedCustomerNumbers: extUserData?.associatedCustomers?.map(
          (res) => res
        ),

        jobTitle: extUserData?.jobTitle
      };
      setValues(initialFormValues);
    }
    if (!edit) {
      const initialFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        jobType: '',
        features: [],
        jobTitle: '',
        associatedCustomerNumbers: []
      };
      setValues(initialFormValues);
    }
  }, []);

  const resetFields = () => {
    const initialFormValues = {
      firstName: '',
      lastName: '',
      email: '',
      jobType: '',
      jobTitle: '',
      features: [],
      associatedCustomerNumbers: []
    };
    setValues(initialFormValues);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? '' : 'This field is required.';

    if ('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? '' : 'This field is required.';

    if ('email' in fieldValues) {
      temp.email = fieldValues.email ? '' : 'This field is required.';
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ''
          : 'Email is not valid.';
    }

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e, type, nm) => {
    let obj = values;
    if (type === 'string') {
      obj = { ...obj, [e?.target.name]: e?.target.value };

      validate({ [e?.target.name]: e?.target.value });
    }

    if (type === 'select_string') {
      obj = { ...obj, [nm]: e?.value };
    }

    if (!edit) {
      if (type === 'select_object') {
        obj = {
          ...obj,
          [nm]: e
        };
      }
      if (type === 'array') {
        obj = {
          ...obj,
          [nm]: e?.map((item) => {
            return {
              label: item.label,
              value: item.value
            };
          })
        };
      }

      // validate({ ...obj, [nm]: e.map((item) => item.value) });
    }

    if (edit) {
      if (type === 'select_object') {
        obj = { ...obj, [nm]: e?.value };
      }
      if (type === 'array') {
        obj = { ...obj, [nm]: e?.map((item) => item.value) };
        // validate({ ...obj, [nm]: e.map((item) => item.value) });
      }
    }

    setValues(obj);
    //
  };

  const handleFormSubmit = async (e, reset) => {
    e?.preventDefault();
    if (edit) {
      if (formIsValid()) {
        dispatch(
          UpdateExternalUser(
            {...values ,jobType: values?.jobType == "N/A" ? '' :values?.jobType },
            customerData?.customerNumber,

            authToken,
            reset
          )
        );
      }
    }
    if (!edit) {
      if (formIsValid()) {
        dispatch(
          addExternalUser(
            values,
            customerData?.customerNumber,

            authToken,
            reset
          )
        );
      }
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues?.firstName &&
      fieldValues?.lastName &&
      fieldValues?.email &&
      Object.values(errors).every((x) => x === '');

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    resetFields,
    values,
    errors
  };
};

export default useFormControls;

import * as React from 'react';
import { addUser, getAllUsers, getUser } from 'src/redux/actions/userActions';
import UserForm from './index';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  roles: []
};
const useFormControls = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState(initialFormValues);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});

  const resetFields = () => {
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

    if ('roles' in fieldValues) {
      temp.roles = fieldValues.roles ? [] : 'This field is required.';
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

      // validate({ ...obj, [nm]: e.map((item) => item.value) });
    }
    setValues(obj);
  };

  const handleFormSubmit = async (e, reset) => {
    e?.preventDefault();
    if (formIsValid()) {
      await dispatch(
        addUser(
          {
            ...values,
            userTypeCode: 'I',
            createdBy: authUser.email
          },
          authToken,
          reset
        )
      );
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues?.firstName &&
      fieldValues?.lastName &&
      fieldValues?.email &&
      fieldValues.roles.length > 0 &&
      Object.values(errors).every((x) => x === '');

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
    resetFields,
    values
  };
};

export default useFormControls;

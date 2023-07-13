import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from 'src/redux/actions/userActions';

const useFormControls = ({ handleEditClick }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.users?.userData);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);

  let navigate = useNavigate();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState();
  const [isEmailChange, setisEmailChange] = React.useState(false);
  const [resendButtonDisabled, setresendButtonDisabled] = React.useState(true);

  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const initialFormValues = {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      roles: userData?.roles?.map((role) => role?.code),
      statusCode: userData?.status?.code
    };

    setValues(initialFormValues);
  }, [userData]);

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
      if (e?.target?.name === 'email') {
        setisEmailChange(true);
      }

      validate({ [e?.target.name]: e?.target.value });
    }

    if (type === 'array') {
      obj = { ...obj, [nm]: e?.map((item) => item.value) };
    }

    if (type === 'plug') {
      obj = {
        ...obj,
        [e?.target.name]: e?.target.checked === true ? 'A' : 'D'
      };
    }

    setValues(obj);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formIsValid()) {
      handleEditClick();
      await dispatch(
        editUser(
          {
            ...values,
            id: userData?.id,
            userTypeCode: 'I',
            updatedBy: authUser?.email
          },
          authToken,
          isEmailChange,
          setresendButtonDisabled
        )
      );
    }
    setValues(initialFormValues);
  };

  const formIsValid = (fieldValues = values) => {
    const isValid = Object.values(errors).every((x) => x === '');

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    resendButtonDisabled,
    setresendButtonDisabled,

    errors
  };
};

export default useFormControls;

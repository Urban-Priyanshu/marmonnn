import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAuthUser,
  registerUser,
  userAuthenticate,
  verifyUser,
  resetUser,
  userAuthenticateWeb
} from 'src/redux/actions/authActions';

const useFormControls = (type, token) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userData);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState({});
  const [password, setPassword] = React.useState();
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});
  const userVerified = useSelector((state) => state?.auth?.verifyUser);
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);

  React.useEffect(() => {
    if (type === 'Login') {
      const initialFormValues = {
        email: '',
        credential: ''
      };
      setValues(initialFormValues);
    }


    if (type === 'Forgot Password') {
      const initialFormValues = {
        email: ''
      };
      setValues(initialFormValues);
    }

    if (type == 'Reset Password') {
      const initialFormValues = {
        // firstName: '',
        // lastName: '',
        email: query.get('email'),
        credential: '',
        confirmPassword: ''
      };
      setValues(initialFormValues);
    }
  }, []);


  React.useEffect(() => {
    if (type === 'Register') {
      const initialFormValues = {
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        email: userData?.email,
        jobType: userData?.jobType,
        jobTitle: userData?.jobTitle,
        credential: '',
        confirmPassword: ''
      };
      setValues(initialFormValues);
    }

  }, [userData])


  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('email' in fieldValues) {
      temp.email = fieldValues.email ? '' : 'This field is required.';
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ''
          : 'Email is not valid.';
    }

    if (type === 'Register' || type === 'Reset Password') {
      if ('credential' in fieldValues) {
        temp.credential = fieldValues.credential
          ? ''
          : 'This field is required.';
        if (fieldValues.credential)
          temp.credential =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{16,})/.test(
              fieldValues.credential
            )
              ? ''
              : 'The password should be of min 16 characters with Alphabets, Uppercase, Lowercase Numbers & Special Characters. ';
      } else {
        if ('credential' in fieldValues) {
          temp.credential = fieldValues.credential
            ? ''
            : 'This field is required.';
        }
      }
    }

    if ('confirmPassword' in fieldValues) {
      temp.confirmPassword = fieldValues.confirmPassword
        ? ''
        : 'This field is required.';
    }

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e, type, nm) => {
    let obj = values;
    if (type === 'string') {

      obj = { ...obj, [e?.target.name]: e?.target.value };
      if (e?.target.name === 'credential') {
        setPassword(e.target.value);
      }
     
      setTimeout(() => {
        validate({ [e?.target.name]: e?.target.value });
      }, 3000);
      setValues(obj);
    }
    if (type === 'array') {
      obj = { ...obj, [nm]: e?.map((item) => item.value) };
    }
    setValues(obj);
  };

  let response;

  const handleFormSubmit = async (e, setDisable) => {
    e?.preventDefault();
    if (type === 'Login') {
      if (formIsValid()) {

        response = await dispatch(userAuthenticateWeb(values));
      }


      setValues(initialFormValues);
    }

    if (type === 'Register') {
      if (formIsValid()) {
        dispatch(registerUser(values, password, navigate, token));
      }
      setValues(initialFormValues);
    }

    if (type === 'Forgot Password') {
      if (formIsValid()) {
        const response = await dispatch(verifyUser(values));
        setDisable('disable');
        setTimeout(() => {
          setDisable('Resend');
        }, 60000);
      }
    }

    if (type === 'Reset Password') {
      if (formIsValid()) {
        dispatch(resetUser(values.email, values.credential, navigate, token));
      }
      setValues(initialFormValues);
      navigate('/auth/login');
    }
  };

  const formIsValid = (fieldValues = values) => {
    if (type === 'Register') {
      return (

        fieldValues.credential &&
        fieldValues.confirmPassword &&
        Object.values(errors).every((x) => x === '')
      );
    }
    if (type === 'Login') {
      return (
        fieldValues.email &&
        fieldValues.credential &&
        Object.values(errors).every((x) => x === '')
      );
    }

    if (type === 'Forgot Password') {
      return fieldValues.email && Object.values(errors).every((x) => x === '');
    }

    if (type === 'Reset Password') {
      return (
        // fieldValues.email &&
        fieldValues.credential &&
        fieldValues.confirmPassword &&
        Object.values(errors).every((x) => x === '')
      );
    }
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors
  };
};

export default useFormControls;

import * as React from 'react';
import { addUser, getAllUsers, getUser } from 'src/redux/actions/userActions';
import UserForm from './index';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCartFieldError
} from 'src/redux/actions/customerCartActions';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const useFormControls = (
  selectedData,
  handlePlaceOrderModalClose,
  handleDeselect,
  setSelectedData,
  setPage
) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState({});
  const authToken = useSelector((state) => state?.auth?.token?.token);
  const authUser = useSelector((state) => state?.auth?.authUserData);
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});
  const [submit, setSubmit] = React.useState(false);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const resetFields = () => { };

  
  React.useEffect(() => {
    const valuesObj = {};
    Object.keys(selectedData).forEach((page) => {
    
      valuesObj[page] = selectedData[page].map(
        ({ shippingLocationId, uom, partNumber, description, id }) => ({
          shippingLocationId,
          uom,
          partNumber,
          partId: id,
          customerId: customerData?.id,
          customerNumber: customerData?.customerNumber,
          partDescription: description,
          dueDate: moment(new Date()).format('MM/DD/YYYY')
        })
      );
    });
    setValues({ ...valuesObj });
  }, [selectedData]);

  

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('purchaseOrderNumber' in fieldValues)
      temp.purchaseOrderNumber = fieldValues.purchaseOrderNumber
        ? ''
        : 'This field is required.';

    if ('shippingLocationId' in fieldValues)
      temp.shippingLocationId = fieldValues.shippingLocationId
        ? ''
        : 'This field is required.';

    if ('dueDate' in fieldValues) {
      temp.dueDate = fieldValues.dueDate ? '' : 'This field is required.';
    }

    if ('qty' in fieldValues) {
      temp.qty = fieldValues.qty ? '' : 'This field is required.';
    }

    setErrors({
      ...temp
    });
  };

  
  const removeErrorOnChange = ({ id, partId }) => {
    dispatch(clearCartFieldError({ id, partId }));
    // call an action to clear the error of the field
  };

  const handleInputValue = (e, type, nm, i, j) => {
    
    let obj = values[i]?.[j];

    const partNumber = obj.partNumber;
    const partId = obj.partId;
   
    if (type === 'date') {
      removeErrorOnChange({ id: 'dueDate', partId });
      obj = {
        ...obj,
        dueDate: moment(e).format('MM/DD/YYYY')
      };
    }
    if (type === 'string') {
      removeErrorOnChange({ id: e.target.name, partId });
      obj = {
        ...obj,
        [e?.target.name]: e?.target.value
      };

    
    }

    if (nm === 'quantity') {
      removeErrorOnChange({ id: e.target.name, partId });
      e.target.value = Math.max(0, parseInt(e.target.value))
        .toString()
        .slice(0, 10);
      obj = {
        ...obj,
        [e?.target.name]: e?.target.value
      };

      validate({ [e?.target.name]: e?.target.value });
    }

    if (type === 'select_string') {
      obj = {
        ...obj,

        [nm]: e?.value
      };
    }
    values[i][j] = obj;
  
    setValues({ ...values });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formIsValid()) {
      dispatch(
        addToCart(
          Object.values(values)?.flat(),
          customerData?.id,
          authToken,
          handlePlaceOrderModalClose,
          handleDeselect,
          setSelectedData,
          setSubmit,
          setPage
        )
      );
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      //   fieldValues?.purchaseOrderNumber &&
      // //   fieldValues?.shippingLocationId &&
      //   fieldValues?.dueDate &&
      //   fieldValues?.qty &&

      Object.values(errors).every((x) => x === '');

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
    resetFields,
    values,
    setValues,
    submit,
    setSubmit
  };
};

export default useFormControls;

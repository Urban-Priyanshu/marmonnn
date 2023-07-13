import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateCustomer,
  cancelformValues
} from 'src/redux/actions/sysAdminActions';
import { editUser } from 'src/redux/actions/userActions';

const useFormControls = (schedule, status) => {
  const dispatch = useDispatch();

  const customerData = useSelector((state) => state?.customers?.customerData);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  let navigate = useNavigate();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState();
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    const initialFormValues = {
      customerId: customerData?.id,
      customerNumber: customerData?.customerNumber,
      preferredUOM: customerData?.preferredUOM,
      inventoryROS: customerData?.inventoryROS,

      timeZone: customerData?.timeZone,
      containerProgram: customerData?.containerProgram,
      containerDefaultReceiveFromLocation:
        customerData?.containerDefaultReceiveFromLocation,
      containerHomeLocation: customerData?.containerHomeLocation,
      containerDefaultShipToLocation:
        customerData?.containerDefaultShipToLocation,
      visibleContainerLocations: customerData?.visibleContainerLocations,
      associatedUsers: customerData?.associatedUsers?.map((d) => d?.userId),
      customersToAssociate: customerData?.associatedCustomers
        ?.filter((d) => !d?.primary)
        ?.map((d) => d?.customerId),

      truckSchedules: schedule
        ? schedule?.map((d) => {
            return { day: d?.day, time: d?.time };
          })
        : customerData?.truckSchedules?.map((d) => {
            return { day: d?.day, time: d?.time };
          }),
      features: customerData?.features?.map((d) => d?.featureId)
    };

    setValues(initialFormValues);
  }, [customerData, status]);

  const CancelFormValues = {
    customerId: '',
    customerNumber: '',
    preferredUOM: '',
    inventoryROS: '',
    timeZone: '',
    containerProgram: '',
    containerDefaultReceiveFromLocation: '',
    containerHomeLocation: '',
    containerDefaultShipToLocation: '',
    visibleContainerLocations: '',
    associatedUsers: [],
    associatedCustomers: [],
    customersToAssociate: [],

    truckSchedules: [],
    features: []
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('inventoryROS' in fieldValues)
      temp.inventoryROS =
        parseInt(fieldValues.inventoryROS, 10) >= 0 &&
        parseInt(fieldValues.inventoryROS, 10) < 100
          ? ''
          : 'Please Enter a Number between 0-100';

    setErrors({
      ...temp
    });
  };

  const handleInputValue = (e, type, nm) => {
    let obj = values;

    if (type === 'array') {
      obj = { ...obj, [nm]: e?.map((item) => item.value) };
    }
    if (type === 'string') {
      obj = { ...obj, [e?.target.name]: e?.target.value };

      validate({ [e?.target.name]: e?.target.value });
    }

    if (type === 'select_string') {
      obj = { ...obj, [nm]: e?.value };
    }

    if (type === 'string_logo') {
      obj = { ...obj, [nm]: e };
    }

    setValues(obj);
  };

  const handleFormSubmit = (e, type, logo, logoDelete, setLogoDelte) => {
    e?.preventDefault();

    if (formIsValid() && type != 'cancel button') {
      dispatch(
        updateCustomer(
          {
            ...values,
            truckSchedules: schedule
              ? schedule?.map((d) => {
                  return { day: d?.day, time: d?.time };
                })
              : customerData?.truckSchedules?.map((d) => {
                  return { day: d?.day, time: d?.time };
                }),

            inventoryROS: parseFloat(values?.inventoryROS).toFixed(3),

            customersToAssociate: [
              ...new Set([
                ...values?.customersToAssociate,
                ...customerData?.associatedCustomers
                  ?.filter((d) => !d?.primary)
                  ?.map((d) => d?.customerId)
              ])
            ],

            logo: logo,

            statusCode:
              (type === 'Status' && e?.target.checked === true && 'A') ||
              (e?.target.checked === false && 'IA') ||
              undefined
          },
          customerData?.id,
          customerData?.customerNumber,
          type,

          authToken
        )
      );

      setValues(...values, { customersToAssociate: null });
      setLogoDelte(false);
    }
  };

  const formIsValid = (fieldValues = values) => {
    const isValid = Object.values(errors).every((x) => x === '');

    return isValid;
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
    values
  };
};

export default useFormControls;

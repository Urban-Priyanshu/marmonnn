import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAuthUser,
  registerUser,
  userAuthenticate,
  verifyUser,
  resetUser
} from 'src/redux/actions/authActions';
import { saveBlanketPO } from 'src/redux/actions/BlanketPoActions';

import { saveBulkOrderData } from 'src/redux/actions/BulkOrderActions';
import { saveForecastConfig } from 'src/redux/actions/ForecastActions';

const useFormControls = (data, addData, type) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  // We'll update "values" as the form updates
  const [values, setValues] = React.useState();
  const [addValues, setAddValues] = React.useState();
  // "errors" is used to check the form for errors
  const [errors, setErrors] = React.useState({});
  const customerData = useSelector((state) => state?.customers?.customerData);
  const authToken = useSelector((state) => state?.auth?.token?.token);

  React.useEffect(() => {
    if (type === 'bulkOrder') {
      const initialFormValues = {
        asnNumber: data?.asnNumber,
        asnQuantity: data?.asnQuantity,
        dueDate: data?.dueDate,
        firstRow: data?.firstRow,
        partNumber: data?.partNumber,
        poLine: data?.poLine,
        poStatus: data?.poStatus,
        quantity: data?.quantity,
        uom: data?.uom,
        poNumber: data?.poNumber
      };
      setValues(initialFormValues);
    }

    if (type === 'blanketPO') {
      const initialFormValues = {
        firstDateColumn: data?.firstDateColumn,
        firstRow: data?.firstRow,
        partNumber: data?.partNumber,
        quantity: data?.quantity,
        poNumber: data?.poNumber,
        endDate: data?.endDate,
        uom: data?.uom,
        price: data?.price
      };

      setValues(initialFormValues);
    }

    if (type === 'forecast') {
      const initialFormValues = {
        customerNumber: data?.customerNumber,
        firstDateRow: data?.firstDateRow,
        firstDateColumn: data?.firstDateColumn,
        firstDataRow: data?.firstDataRow,
        partNumber: data?.partNumber,
        quantity: data?.quantity,
        direction: data?.direction ?? null,
        poNumber: data?.poNumber,
        uom: data?.uom
      };

      setValues(initialFormValues);
    }
  }, [data]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if (type === 'bulkOrder') {
      if ('asnNumber' in fieldValues) {
        temp.asnNumber =
          (parseInt(fieldValues.asnNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.asnNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '');
      }
      if ('asnQuantity' in fieldValues) {
        temp.asnQuantity =
          (parseInt(fieldValues.asnQuantity) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.asnQuantity.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '');
      }

      if ('dueDate' in fieldValues) {
        temp.dueDate =
          (parseInt(fieldValues.dueDate) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.dueDate.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.dueDate ? '' : 'This field is required.');
      }

      if ('firstRow' in fieldValues) {
        temp.firstRow =
          (parseInt(fieldValues.firstRow) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.firstRow.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.firstRow ? '' : 'This field is required.');
      }

      if ('partNumber' in fieldValues) {
        temp.partNumber =
          (parseInt(fieldValues.partNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.partNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.partNumber ? '' : 'This field is required.');
      }

      if ('poLine' in fieldValues) {
        temp.poLine =
          (parseInt(fieldValues.poLine) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.poLine.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '');
      }

      if ('poNumber' in fieldValues) {
        temp.poNumber =
          (parseInt(fieldValues.poNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.poNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '');
      }

      if ('poStatus' in fieldValues) {
        temp.poStatus =
          (parseInt(fieldValues.poStatus) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.poStatus.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '');
      }

      if ('quantity' in fieldValues) {
        temp.quantity =
          (parseInt(fieldValues.quantity) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.quantity.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.quantity ? '' : 'This field is required.');
      }

      if ('dueDate' in fieldValues) {
        temp.dueDate =
          (parseInt(fieldValues.dueDate) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.dueDate.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.dueDate ? '' : 'This field is required.');
      }
      if ('uom' in fieldValues) {
        temp.uom =
          (parseInt(fieldValues.uom) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.uom.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.uom ? '' : 'This field is required.');
      }
    }

    if (type === 'blanketPO') {
      if ('firstDateColumn' in fieldValues) {
        temp.firstDateColumn =
          (parseInt(fieldValues.firstDateColumn) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.firstDateColumn.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.firstDateColumn ? '' : 'This field is required.');
      }
      if ('firstRow' in fieldValues) {
        temp.firstRow =
          (parseInt(fieldValues.firstRow) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.firstRow.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.firstRow ? '' : 'This field is required.');
      }
      if ('partNumber' in fieldValues) {
        temp.partNumber =
          (parseInt(fieldValues.partNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.partNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.partNumber ? '' : 'This field is required.');
      }
      if ('quantity' in fieldValues) {
        temp.quantity =
          (parseInt(fieldValues.quantity) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.quantity.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.quantity ? '' : 'This field is required.');
      }
      if ('poNumber' in fieldValues) {
        temp.poNumber =
          (parseInt(fieldValues.poNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.poNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.poNumber ? '' : 'This field is required.');
      }
      if ('endDate' in fieldValues) {
        temp.endDate =
          (parseInt(fieldValues.endDate) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.endDate.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.endDate ? '' : 'This field is required.');
      }
      if ('uom' in fieldValues) {
        temp.uom =
          (parseInt(fieldValues.uom) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.uom.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.uom ? '' : 'This field is required.');
      }
      if ('price' in fieldValues) {
     
        temp.price =
          (parseInt(fieldValues.price) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.price.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.price ? '' : 'This field is required.');
      }
    }

    if (type === 'forecast') {
    
      if (values && values?.direction === 'V') {
        if ('firstDateRow' in fieldValues) {
        
          temp.firstDateRow =
            (parseInt(fieldValues.firstDateRow) <= 0
              ? 'No zero/negative values allowed'
              : '') ||
            (fieldValues.firstDateRow.indexOf('.') !== -1
              ? 'No decimal values allowed'
              : '') ||
            (fieldValues.firstDateRow ? '' : 'This field is required.');
        }
      }

      if (values && values?.direction === 'H') {
        if ('firstDateRow' in fieldValues) {
         
          temp.firstDateRow =
            (parseInt(fieldValues.firstDateRow) <= 0
              ? 'No zero/negative values allowed'
              : '') ||
            (fieldValues.firstDateRow.indexOf('.') !== -1
              ? 'No decimal values allowed'
              : '');
        }
      }

      if (values && !values?.direction) {
        if ('firstDateRow' in fieldValues) {
          
          temp.firstDateRow =
            (parseInt(fieldValues.firstDateRow) <= 0
              ? 'No zero/negative values allowed'
              : '') ||
            (fieldValues.firstDateRow.indexOf('.') !== -1
              ? 'No decimal values allowed'
              : '');
        }
      }

      if (values && !values?.direction) {
        if ('firstDataRow' in fieldValues) {
         
          temp.firstDataRow =
            (parseInt(fieldValues.firstDataRow) <= 0
              ? 'No zero/negative values allowed'
              : '') ||
            (fieldValues.firstDataRow.indexOf('.') !== -1
              ? 'No decimal values allowed'
              : '');
        }
      }

      if ('firstDateColumn' in fieldValues) {
        temp.firstDateColumn =
          (parseInt(fieldValues.firstDateColumn) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.firstDateColumn.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.firstDateColumn ? '' : 'This field is required.');
      }

      if ('partNumber' in fieldValues) {
       
        temp.partNumber =
          (parseInt(fieldValues.partNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.partNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.partNumber ? '' : 'This field is required.');
      }

      if ('quantity' in fieldValues) {
    
        temp.quantity =
          (parseInt(fieldValues.quantity) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.quantity.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.quantity ? '' : 'This field is required.');
      }

      if ('uom' in fieldValues) {
        temp.uom =
          (parseInt(fieldValues.uom) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.uom.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '') ||
          (fieldValues.uom ? '' : 'This field is required.');
      }

      if ('poNumber' in fieldValues) {
        temp.poNumber =
          (parseInt(fieldValues.poNumber) <= 0
            ? 'No zero/negative values allowed'
            : '') ||
          (fieldValues.poNumber.indexOf('.') !== -1
            ? 'No decimal values allowed'
            : '');
      }

      if (values && values?.direction === 'H') {
        if ('firstDataRow' in fieldValues) {
          temp.firstDataRow =
            (parseInt(fieldValues.firstDataRow) <= 0
              ? 'No zero/negative values allowed'
              : '') ||
            (fieldValues.firstDataRow.indexOf('.') !== -1
              ? 'No decimal values allowed'
              : '') ||
            (fieldValues.firstDataRow ? '' : 'This field is required.');
        }
      }
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
      obj = { ...obj, [nm]: e?.map((item) => item?.value) };
    }

    if (type === 'select_string') {
      obj = { ...obj, [nm]: e?.value };
    }
    setValues(obj);
  };

  let response;

  const handleFormSubmit = async (e, addOrUpdate) => {
    e?.preventDefault();

    if (type === 'bulkOrder') {
      let resp;
      if (addOrUpdate) {
        resp = addOrUpdate();
        if (resp) {
          dispatch(
            saveBulkOrderData(
              authToken,
              values,
              addData,
              customerData?.customerNumber
            )
          );
          return;
        }
      }
      if (formIsValid()) {
        dispatch(
          saveBulkOrderData(
            authToken,
            values,
            addData,
            customerData?.customerNumber
          )
        );
      }
    }

    if (type === 'blanketPO') {
      let resp;
      if (addOrUpdate) {
        resp = addOrUpdate();
        if (resp) {
          dispatch(
            saveBlanketPO(
              authToken,
              values,
              addData,
              customerData?.customerNumber
            )
          );
          return;
        }
      }
      if (formIsValid()) {
        dispatch(
          saveBlanketPO(
            authToken,
            values,
            addData,
            customerData?.customerNumber
          )
        );
      }
    }
    if (type === 'forecast') {
      let resp;
      if (addOrUpdate) {
        resp = addOrUpdate();
        if (resp) {
          dispatch(
            saveForecastConfig(
              authToken,
              values,
              addData,
              customerData?.customerNumber
            )
          );
          return;
        }
      }
      if (formIsValid()) {
        dispatch(
          saveForecastConfig(
            authToken,
            values,
            addData,
            customerData?.customerNumber
          )
        );
      }
    }
  };

  const formIsValid = (fieldValues = values) => {
    if (type === 'bulkOrder') {
      return (
        fieldValues?.uom &&
        fieldValues?.dueDate &&
        fieldValues?.quantity &&
        fieldValues?.partNumber &&
        fieldValues?.firstRow &&
        Object.values(errors).every((x) => x === '')
      );
    }
    if (type === 'blanketPO') {
      return (
        fieldValues?.partNumber &&
        fieldValues?.firstDateColumn &&
        fieldValues?.firstRow &&
        fieldValues?.quantity &&
        fieldValues?.poNumber &&
        fieldValues?.endDate &&
        fieldValues?.uom &&
        fieldValues?.price &&
        Object.values(errors).every((x) => x === '')
      );
    }

    if (type === 'forecast') {
      if (values && values.direction === 'H') {
        return (
          fieldValues?.direction &&
          fieldValues?.firstDataRow &&
          fieldValues?.firstDateColumn &&
          fieldValues?.quantity &&
          fieldValues?.partNumber &&
          fieldValues?.uom &&
          Object.values(errors).every((x) => x === '')
        );
      } else {
        return (
          fieldValues?.direction &&
          fieldValues?.firstDateRow &&
          fieldValues?.firstDateColumn &&
          fieldValues?.quantity &&
          fieldValues?.partNumber &&
          fieldValues?.uom &&
          Object.values(errors).every((x) => x === '')
        );
      }
    }
  };
  return {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    values,
    errors
  };
};

export default useFormControls;

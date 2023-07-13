import { useCallback, useEffect, useRef } from 'react';
import { Box, Button, styled, TextField, MenuItem, Grid } from '@mui/material';
import calenderIcon from '../../../../assets/Icons/calender.svg';
import DeleteIcon from 'src/assets/Icons/Delete.png';
import Select from 'react-select';
import { useState } from 'react';
import useFormControls from './validations';
import { useDispatch, useSelector } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getAllCustomerShippingLocations } from 'src/redux/actions/customerCartActions';
import { getPrefferedUom } from 'src/redux/actions/sysAdminActions';

const CustomInput = styled(TextField)(
  () => `
    .MuiInputBase-root {
      height: 40px;
      border-radius: 0px;
      background: #F4F7F9;
  
      border: 1px solid #B8C2C8;
      color: #15364A;
    }
  
          :after{
            border-bottom: unset !important;
            border: 1px solid #20A2F3 !important;
  
          }
          :before{
            border-bottom: unset !important;
            border: 1px solid #20A2F3 !important;
  
          }
  
          .Mui-disabled:after {
            border-bottom: unset !important;
            border-bottom-style: solid;
            background: white;
          }
          .Mui-disabled:before {
            border-bottom: unset;
            border-bottom-style: solid;
            background: white;
          }
          .Mui-disabled {
            background: white;
          }
          .css-trgup9-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
            // border-color: unset;
          }
        `
);

const CancelButton = styled(Button)(
  () => `
  color: white !important;
  background: #15364A  !important;
  border-radius: 3px  !important;
  height: 38px !important;
  width: 90px !important;

  :hover {
      background-color:  #022f53  !important;
    }
    :disabled {
      opacity: 0.8 !important;
      color: white
    }
  `
);

const LabelBox = styled(Box)(
  () => `
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    margin-bottom: 5px;
        `
);

const CustomSelect = styled(Select)(
  () => `
 
  .MuiInputBase-root {
    height: 40px;
    border-radius: 0px;
    background: #F4F7F9;

    border: 1px solid #B8C2C8;
    color: #15364A;
  }

        :after{
          border-bottom: unset !important;
          border: 1px solid #20A2F3 !important;

        }
        :before{
          border-bottom: unset !important;
          border: 1px solid #20A2F3 !important;

        }

        .Mui-disabled:after {
          border-bottom: unset !important;
          border-bottom-style: solid;
          background: white;
        }
        .Mui-disabled:before {
          border-bottom: unset;
          border-bottom-style: solid;
          background: white;
        }
        .Mui-disabled {
          background: white;
        }
        .css-trgup9-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline {
          // border-color: unset;
        }
      `
);

const PartNameText = styled(Box)(
  () => `
  
    font-weight: 700;
    font-size: 14px;
    `
);

const InputBox = styled(Box)(
  () => `
    background: #15364A;
    border: 1px solid #15364A;
    color: white;
    width: 52px;
  
    
    `
);

const ModalHeader = styled(Box)(
  () => `
      font-weight: 700;
       font-size: 20px;
      `
);

const PlaceOrderForm = ({
  selectedData,
  sd,
  shippingLocations,
  handlePlaceOrderModalClose,
  gridRef,
  setSelectedData,
  handleDeselect,
  page,
  setPage,
  handleModalClose
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const customerData = useSelector((state) => state?.customers?.customerData);
  const uomData = useSelector((state) => state?.customers?.getUomData);

  const authToken = useSelector((state) => state?.auth?.token?.token);
  const cartError = useSelector(
    (state) => state?.customerPortal?.getCustomerCartResponse
  );

  useEffect(() => {
    dispatch(getPrefferedUom(authToken));
  }, []);
  const {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors,
    resetFields,
    date,
    setValues,
    values,
    submit,
    setSubmit
  } = useFormControls(
    selectedData,
    handleModalClose,
    handleDeselect,
    setSelectedData,
    setPage
  );

  const uomResult = uomData?.map((d) => ({
    label: d?.uomName,
    value: d?.uomCode
  }));
  const quantityTypeOption = shippingLocations?.map((d) => {
    return { label: d?.city, value: d?.id };
  });

  

  useEffect(() => {
    if (submit === true) {
      setSelectedData({});
      handleModalClose();
      setSubmit(false);
    }
  }, [submit]);

  const deleteRecord = useCallback(
    (event, pageNo, ind, data) => {
   
      if (page != pageNo) {
        setPage(pageNo);
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      const select = gridRef.current.api.getSelectedNodes();

  
      const arr = [...sd[pageNo]]?.filter((f) => {
        return f?.id !== data?.id;
      });

     

      const arr2 = [...values[pageNo]]?.filter((f) => {
        return f?.partId !== data?.id;
      });
    

      select.forEach((s, index) => {
      
        if (s?.data?.id === data?.id) {
          s?.setSelected(false);
        }
      });
      

      if (Object.values(sd)?.flat()?.length === 1) {
        // setData([...arr]);
        setSelectedData({});
        gridRef.current.api.deselectAll();
        handleModalClose();
        return;
      }
     

      setSelectedData({ ...sd, [+pageNo]: [...arr] });
      setValues({ ...values, [+pageNo]: [...arr2] });
    },
    [sd, page, loading, values]
  );


  const uomOption = [
    {
      label: 'Feet',
      value: 'FT'
    },
    {
      label: 'Inches',
      value: 'IN'
    },
    {
      label: 'Pieces',
      value: 'PCS'
    },
    {
      label: 'Eaches',
      value: 'EA'
    },
    {
      label: 'Pounds',
      value: 'LBS'
    },
    {
      label: 'Meters',
      value: 'M'
    },
    {
      label: 'Millimetres',
      value: 'MM'
    },
    {
      label: 'Kilograms',
      value: 'KG'
    },

    {
      label: 'Tons',
      value: 'TON'
    },
    {
      label: 'Square Feet - for sheet products',
      value: 'SFT'
    },
    {
      label: 'Square Inches - for sheet products',
      value: 'SIN'
    },
    {
      label: 'Parts',
      value: 'PARTS'
    }
  ];
  const placeOrderForm = useCallback(() => {
    return (
      <>
       
        {sd &&
          Object?.keys(sd)?.map((page, i) =>
            sd[page]?.map((d, j) => (
              <div key={d?.id}>
                <div style={{ margin: '20px 0' }}>
                  <Grid sx={{ flexGrow: 1 }}>
                    <PartNameText>Part Number: {d?.partNumber}</PartNameText>{' '}
                    {cartError &&
                      cartError?.map((res) =>
                        res?.partId === d?.id ? res?.errorsMap?.partNumber : ''
                      )}
                  </Grid>
                </div>
                <Grid container>
                  <Grid xs={3}>
                 
                    <LabelBox>Quantity Requested</LabelBox>
                    <Box
                      sx={{
                        marginRight: '16px',
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <CustomInput
                        name="quantity"
                        autoComplete="none"
                        type="number"
                        onWheel={(e) => e.target.blur()}
                        {...(errors['qty'] && {
                          error: true,
                          helperText: errors['qty']
                        })}
                        value={parseInt(values[page]?.[j]?.quantity)}
                        maxLength={11}
                        onChange={(e) =>
                          handleInputValue(e, 'string', 'quantity', page, j)
                        }
                      />
                      <select
                        style={{
                          background: '#15364A',
                          color: 'white',
                          padding: '5px 0px'
                        }}
                        defaultValue={customerData?.preferredUOM}
                        name={'uom'}
                        onChange={(e) =>
                          handleInputValue(e, 'string', '', page, j)
                        }
                      >
                        <option
                          value={customerData?.preferredUOM}
                          selected
                          disabled
                        >
                          {customerData?.preferredUOM}
                        </option>
                        {uomResult &&
                          uomResult?.map((d) => (
                            <option key={d} value={d?.value}>
                              {d?.value}
                            </option>
                          ))}
                      </select>
                    </Box>
                    <span style={{ color: '#F61616' }}>
                      {cartError &&
                        cartError?.map((res) =>
                          res?.partId === d?.id ? res?.errorsMap?.quantity : ''
                        )}
                      {cartError &&
                        cartError?.map((res) =>
                          res?.partId === d?.id ? res?.errorsMap?.uom : ''
                        )}
                    </span>
                  </Grid>
                  <Grid xs={2}>
                    <LabelBox>Date Requested</LabelBox>
                    <Box
                      className="dueDate"
                      sx={{
                        display: 'flex',
                        marginRight: '16px',
                        flexDirection: 'row'
                      }}
                    >
                      <DesktopDatePicker
                        inputFormat="MM/dd/yyyy"
                        value={values && values[page]?.[j]?.dueDate}
                        onChange={(e) =>
                          handleInputValue(e, 'date', '', page, j)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                      {/* <CustomInput
              name="dueDate"
              autoComplete="none"
              type="date"
              {...(errors['dueDate'] && {
                error: true,
                helperText: errors['dueDate']
              })}
              onChange={(e) => handleInputValue(e, 'date', '', i)}
            /> */}
                      {/* <InputBox
            sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}
            >
            <img src={calenderIcon}></img>
            </InputBox> */}
                    </Box>
                    <span style={{ color: '#F61616' }}>
                      {cartError &&
                        cartError?.map((res) =>
                          res?.partId === d?.id ? res?.errorsMap?.dueDate : ''
                        )}
                    </span>
                  </Grid>
                  <Grid xs={2}>
                    <LabelBox>Delivery Location</LabelBox>
                    <Box
                      sx={{
                        display: 'flex',
                        marginRight: '16px',
                        flexDirection: 'row'
                      }}
                    >
                      <select
                        style={{
                          height: '40px',
                          borderRadius: '0px',
                          background: '#F4F7F9',
                          border: '1px solid #B8C2C8',
                          color: '#15364A',
                          width: '100%'
                        }}
                        {...(errors['shippingLocationId'] && {
                          error: true,
                          helperText: errors['shippingLocationId']
                        })}
                        defaultValue={shippingLocations?.map(
                          (d) => d?.primary && d?.city
                        )}
                        name="shippingLocationId"
                        onChange={(e) =>
                          handleInputValue(
                            e,
                            'string',
                            'shippingLocationId',
                            page,
                            j
                          )
                        }
                      >
                        <option
                          value={shippingLocations?.map(
                            (d) => d?.primary && d?.id
                          )}
                          selected
                        >
                          {shippingLocations?.map((d) => d?.primary && d?.city)}
                        </option>
                        {shippingLocations &&
                          shippingLocations
                            ?.filter((d) => !d?.primary)
                            .map((d) => {
                              return (
                                <option key={d} value={d?.id}>
                                  {d?.city}
                                </option>
                              );
                            })}
                      </select>
                    </Box>
                    <span style={{ color: '#F61616' }}>
                      {cartError &&
                        cartError?.map((res) =>
                          res?.partId === d?.id
                            ? res?.errorsMap?.shippingLocationId
                            : ''
                        )}
                    </span>
                  </Grid>
                  <Grid xs={2}>
                    <LabelBox>PO Number</LabelBox>
                    <Box
                      sx={{
                        display: 'flex',
                        marginRight: '16px',
                        flexDirection: 'row'
                      }}
                    >
                      <CustomInput
                        name="purchaseOrderNumber"
                        autoComplete="none"
                        type="text"
                        value={values[page]?.[j]?.purchaseOrderNumber ?? ''}
                        {...(errors['purchaseOrderNumber'] && {
                          error: true,
                          helperText: errors['purchaseOrderNumber']
                        })}
                        onChange={(e) =>
                          handleInputValue(e, 'string', '', page, j)
                        }
                      />
                    </Box>
                    <span style={{ color: '#F61616' }}>
                      {cartError &&
                        cartError?.map((res) =>
                          res?.partId === d?.id
                            ? res?.errorsMap?.purchaseOrderNumber
                            : ''
                        )}
                    </span>
                  </Grid>
                  <Grid xs={2}>
                    <LabelBox>Special Remarks</LabelBox>
                    <Box
                      sx={{
                        display: 'flex',
                        marginRight: '5px',
                        flexDirection: 'row'
                      }}
                    >
                      <CustomInput
                        name="specialRemarks"
                        autoComplete="none"
                        type="text"
                        value={values[page]?.[j]?.specialRemarks ?? ''}
                        onChange={(e) =>
                          handleInputValue(e, 'string', '', page, j)
                        }
                      />
                    </Box>
                  </Grid>
                  <Grid xs={1}>
                    {loading ? (
                      <div style={{ cursor: 'pointer', margin: '30px' }}>
                        ...
                      </div>
                    ) : (
                      <img
                        className="Img"
                        width="20px"
                        style={{ cursor: 'pointer', margin: '30px' }}
                        onClick={(e) => deleteRecord(e, page, j, d)}
                        src={DeleteIcon}
                      ></img>
                    )}
                  </Grid>
                </Grid>
              </div>
            ))
          )}
      </>
    );
  }, [sd, cartError, values, loading, page]);

 
  return (
    <>

      <ModalHeader>Enter Order Details</ModalHeader>
      <form onSubmit={handleFormSubmit}>
        {placeOrderForm()}
        <Box
          sx={{
            '& > :not(style)': { mr: 2, mt: 3 },
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right'
          }}
        >
          <Grid item xs={6} md={2}>
            <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
          </Grid>
          <Grid item xs={6} md={2}>
            <CancelButton disabled={!formIsValid()} type="submit">
              Add to Cart
            </CancelButton>
          </Grid>
        </Box>
      </form>
    </>
  );
};

export default PlaceOrderForm;

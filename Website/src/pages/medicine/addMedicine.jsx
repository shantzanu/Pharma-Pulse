import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import './table.css';
import axios from 'axios';
import qs from 'qs';
import { Tooltip } from 'antd';
import { formatRupee } from '../../utils/utils';
import { Field, FieldArray, Formik } from 'formik';

const AddMedicine = () => {
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const itemId = params.id;
  const navigate = useNavigate();

  const [itemsList, setItemsList] = useState([]);
  const [initialValues, setInitialValues] = useState({
    // invoiceNo: 'INV00001',
    billDate: new Date().toISOString().split('T')[0], // Today's date
    partyName: '',
    gstNo: '',
    data: [
      {
        _id: '',
        itemName: '',
        pack: '',
        batchNo: '',
        shelf: '',
        expiry: '',
        mrp: '',
        qty: 1,
        amount: 0
      }
    ]
  });

  // Navigate back
  const navigateTo = (path) => {
    navigate(path);
  };

  // Form submission
  const submit = async (values, { setSubmitting, setErrors, resetForm }) => {
    const isUpdate = Boolean(values._id);
    const apiUrl = isUpdate ? `http://localhost:4500/v1/sales/purchaseBill/${values._id}` : 'http://localhost:4500/v1/sales/purchaseBill';

    try {
      const response = isUpdate ? await axios.put(apiUrl, values) : await axios.post(apiUrl, values);

      if (response.status === 200 || response.status === 201) {
        // setMessage(response?.data?.result?.message || (isUpdate ? 'Item updated successfully' : 'Item created successfully'));
        resetForm();
        navigate('/medicine');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while processing your request';
      setErrors({ submit: errorMessage });
      // setMessage(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate Total Amount
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.qty || 0) * (item.mrp || 0), 0);
  };
  const masterData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/v1/sales/purchaseBill/MasterData');

      if (response.status === 200) {
        setItemsList(response?.data?.result?.item);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    if (itemId) {
      axios
        .get(`http://localhost:4500/v1/sales/purchaseBill/${itemId}`)
        .then((response) => {
          setInitialValues(response.data.result);
        })
        .catch((error) => {
          console.error('Error fetching item:', error);
        });
    }
  }, [itemId]);
  useEffect(() => {
    masterData();
  }, []);
  return (
    <Formik enableReinitialize initialValues={initialValues} onSubmit={submit}>
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className="card form-card">
            <div className="card-header">
              <div className="card-header-items">
                <div className="card-title m-0">
                  <h3 className="m-0">Create Invoice</h3>
                </div>
                <div>
                  <button className="btn add-btn" onClick={() => navigate('/medicine')}>
                    <ArrowLeftOutlined className="me-1" /> Back
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/* Invoice Details */}
              <div className="row">
                {/* <div className="col-md-4 mb-2">
                  <label className="form-label">
                    Bill No.
                    <span className="text-danger">*</span>
                  </label>
                  <Field name="invoiceNo" type="text" className="form-control" readOnly />
                </div> */}
                <div className="col-md-4 mb-2">
                  <label className="form-label">
                    Party Name
                    <span className="text-danger">*</span>
                  </label>
                  <Field name="partyName" type="text" className="form-control" />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">
                    GST No.
                    <span className="text-danger">*</span>
                  </label>
                  <Field name="gstNo" type="text" className="form-control" />
                </div>
                <div className="col-md-4 mb-2">
                  <label className="form-label">
                    Bill Date
                    <span className="text-danger">*</span>
                  </label>
                  <Field name="billDate" type="date" className="form-control" />
                </div>
              </div>

              {/* Items Table */}
              <FieldArray name="data">
                {({ remove, push }) => (
                  <>
                    <div className="row my-3">
                      <div className="table-container">
                        <div className="card table-card">
                          <div className="card-body p-3">
                            <div className="form-table-responsive">
                              <table className="table table-hover table-bordered">
                                <thead className="thead">
                                  <tr className="table-secondary">
                                    <th>#</th>
                                    <th>Item Name</th>
                                    <th>Pack</th>
                                    <th>Batch No.</th>
                                    <th>Shelf</th>
                                    <th>Expiry</th>
                                    <th>MRP</th>
                                    <th>Qty</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {values.data.map((item, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <Field
                                          as="select"
                                          name={`data[${index}]._id`}
                                          className="form-control"
                                          onChange={(e) => {
                                            e.stopPropagation();
                                            const selectedItem = itemsList.find((i) => i._id == e.target.value);
                                            if (selectedItem) {
                                              setFieldValue(`data[${index}]`, {
                                                ...selectedItem,
                                                qty: 1,
                                                amount: selectedItem.mrp * 1 // You can initialize qty or other fields as needed
                                              });
                                            }
                                          }}
                                          value={values.data[index]?._id || ''} // Ensure the value is never null
                                        >
                                          <option value="">Select Item</option>
                                          {itemsList.map((item) => (
                                            <option key={item._id} value={item._id}>
                                              {item.name}
                                            </option>
                                          ))}
                                        </Field>
                                      </td>
                                      <td>{item?.pack}</td>
                                      <td>{item?.batchNo}</td>
                                      <td>{item?.shelf}</td>
                                      <td>{item?.expiry}</td>
                                      <td>
                                        <Field name={`data[${index}].mrp`} type="number" readOnly className="form-control" />
                                      </td>
                                      <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                          <button
                                            disabled={item.qty <= 1}
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                              const newQty = item.qty - 1;
                                              setFieldValue(`data[${index}].qty`, newQty);
                                              setFieldValue(`data[${index}].amount`, newQty * item.mrp);
                                            }}
                                          >
                                            -
                                          </button>
                                          <input
                                            className="form-control w-25 mx-2"
                                            type="number"
                                            readOnly
                                            name={`data[${index}].qty`}
                                            value={item?.qty}
                                            
                                          />
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                              const newQty = item.qty + 1;
                                              setFieldValue(`data[${index}].qty`, newQty);
                                              setFieldValue(`data[${index}].amount`, newQty * item.mrp); // Recalculate amount
                                            }}
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td>{item.mrp * item.qty || 0}</td>
                                      <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => remove(index)}>
                                          <Tooltip placement="top" title="Delete">
                                            <DeleteOutlined />
                                          </Tooltip>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                              <div className="text-center">
                                <h3>Total: {formatRupee(calculateTotal(values.data))}</h3>
                              </div>
                              <button
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() =>
                                  push({
                                    _id: '',
                                    itemName: '',
                                    pack: '',
                                    batchNo: '',
                                    shelf: '',
                                    expiry: '',
                                    mrp: '',
                                    qty: 1,
                                    amount: 0
                                  })
                                }
                              >
                                Add New Row
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </FieldArray>

              {/* Submit Actions */}
              <div className="row my-3">
                <div className="col-12 d-flex justify-content-center">
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary me-3">
                    {!itemId ? 'Generate' : 'Update'} Invoice
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => navigateTo('/invoice-list')}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddMedicine;

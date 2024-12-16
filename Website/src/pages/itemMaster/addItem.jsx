import React, { useEffect, useState } from 'react';
import './itemMaster.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import { Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import qs from 'qs';
const ItemMaster = () => {
  const [message, setMessage] = useState('');
  const [initialValues, setInitialValues] = useState({
    name: '',
    category: '',
    pack: '',
    batchNo: '',
    shelf: '',
    expiryDate: '',
    qty: '',
    mrp: ''
  });
  const navigate = useNavigate();
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Item Name is required'),
    category: Yup.string().required('Category is required'),
    pack: Yup.number().typeError('Pack must be a number'),
    batchNo: Yup.string().required('Batch No is required'),
    shelf: Yup.string().required('Shelf is required'),
    expiryDate: Yup.date().required('Expiry Date is required'),
    qty: Yup.number().required('Quantity is required').positive('Quantity must be greater than 0'),
    mrp: Yup.number().required('MRP is required').positive('MRP must be greater than 0')
  });

  // const initialValues = {
  //   name: '',
  //   category: '',
  //   pack: '',
  //   batchNo: '',
  //   shelf: '',
  //   expDate: '',
  //   qty: '',
  //   mrp: ''
  // };

  const submit = async (values, { setSubmitting, setErrors, resetForm }) => {
    const isUpdate = Boolean(values._id);
    const apiUrl = isUpdate ? `http://localhost:4500/v1/sales/item/${values._id}` : 'http://localhost:4500/v1/sales/item';

    try {
      const response = isUpdate ? await axios.put(apiUrl, values) : await axios.post(apiUrl, values);

      console.log('response', response);

      if (response.status === 200 || response.status === 201) {
        setMessage(response?.data?.result?.message || (isUpdate ? 'Item updated successfully' : 'Item created successfully'));
        resetForm();
        navigate('/item-list');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred while processing your request';
      setErrors({ submit: errorMessage });
      setMessage(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const itemId = params.id;
  console.log("itemId",itemId);
  
  // const getById = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:4500/v1/sales/item/${id}`);
  //     console.log('response', response.data.result);

  //     if (response.status === 200) {
  //       // navigate('/dashboard/default');
  //       // setData(response.data.result.rows);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  useEffect(() => {
    if (itemId) {
      axios
        .get(`http://localhost:4500/v1/sales/item/${itemId}`)
        .then((response) => {
          console.log("response.data.result",response.data.result);
          
          setInitialValues(response.data.result); // Prefill form with fetched data
        })
        .catch((error) => {
          console.error('Error fetching item:', error);
        })
    }
  }, [itemId]);

  return (
    <div className="card form-card">
      <div className="card-header">
        <div className="card-header-items">
          <div className="card-title m-0">
            <h3 className="m-0">Item Master</h3>
          </div>
          <div>
            <button className="btn add-btn" onClick={() => navigate('/item-list')}>
              <ArrowLeftOutlined className="me-1" /> Back
            </button>
          </div>
        </div>
      </div>
      <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Item Name <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Item name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                  />
                  {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Category <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Category"
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.category && errors.category ? 'is-invalid' : ''}`}
                  />
                  {touched.category && errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Pack</label>
                  <input
                    placeholder="Pack"
                    type="number"
                    name="pack"
                    value={values.pack}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.pack && errors.pack ? 'is-invalid' : ''}`}
                  />
                  {touched.pack && errors.pack && <div className="invalid-feedback">{errors.pack}</div>}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Batch No <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Batch no."
                    type="text"
                    name="batchNo"
                    value={values.batchNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.batchNo && errors.batchNo ? 'is-invalid' : ''}`}
                  />
                  {touched.batchNo && errors.batchNo && <div className="invalid-feedback">{errors.batchNo}</div>}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Shelf <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Shelf"
                    type="text"
                    name="shelf"
                    value={values.shelf}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.shelf && errors.shelf ? 'is-invalid' : ''}`}
                  />
                  {touched.shelf && errors.shelf && <div className="invalid-feedback">{errors.shelf}</div>}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Expiry Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={values.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.expiryDate && errors.expiryDate ? 'is-invalid' : ''}`}
                  />
                  {touched.expiryDate && errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="25"
                    type="number"
                    name="qty"
                    value={values.qty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.qty && errors.qty ? 'is-invalid' : ''}`}
                  />
                  {touched.qty && errors.qty && <div className="invalid-feedback">{errors.qty}</div>}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    MRP <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="125.00"
                    type="number"
                    name="mrp"
                    value={values.mrp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.mrp && errors.mrp ? 'is-invalid' : ''}`}
                  />
                  {touched.mrp && errors.mrp && <div className="invalid-feedback">{errors.mrp}</div>}
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <div className="d-flex justify-content-center">
                    <button type="button" onClick={() => resetForm()} className="btn reset-btn btn-primary me-3">
                      <i className="fa-solid fa-arrows-rotate me-2"></i>
                      Reset
                    </button>
                    <button type="submit" disabled={isSubmitting} className="btn submit-btn btn-success">
                    {itemId ? 'Update' : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ItemMaster;

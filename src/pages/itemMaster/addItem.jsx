import React from 'react';
import './itemMaster.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const ItemMaster = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div>
      <div className="card form-card">
        <div className="card-header">
          <div className="card-header-items">
            <div className="card-title m-0">
              <h3 className="m-0">Item Master</h3>
            </div>
            <div>
              <button className="btn add-btn" onClick={() => navigateTo('/item-list')}>
                {' '}
                <ArrowLeftOutlined className="me-1" /> Back{' '}
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Item Name
                <span className="text-danger">*</span>
              </label>
              <input placeholder="Item name" type="text" className="form-control" />
              <div></div>
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Category
                <span className="text-danger">*</span>
              </label>
              <input placeholder="category" type="text" className="form-control" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label"> Pack </label>
              <input placeholder="pack" type="number" className="form-control" />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">
                Batch No
                <span className="text-danger">*</span>
              </label>
              <input placeholder="batch no." type="text" className="form-control" />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Shelf
                <span className="text-danger">*</span>
              </label>
              <input placeholder="shelf" type="text" className="form-control" />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Expiry Date
                <span className="text-danger">*</span>
              </label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">
                Quantity
                <span className="text-danger">*</span>
              </label>
              <input placeholder="25" type="number" className="form-control" />
            </div>
            <div className="col-md-6 mb-2">
              <label className="form-label">
                MRP
                <span className="text-danger">*</span>
              </label>
              <input placeholder="125.00" type="number" className="form-control" />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn reset-btn btn-primary">
                  <i className="fa-solid fa-arrows-rotate me-2"></i>
                  Reset
                </button>
                <button type="submit" className="btn submit-btn">
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemMaster;

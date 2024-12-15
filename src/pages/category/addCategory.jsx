import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react'
import { useNavigate } from 'react-router';

const AddCategory = () => {
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
            <h3 className='m-0'>Category</h3>
          </div>
          <div>
            <button className="btn add-btn" onClick={() => navigateTo('/category')}> <ArrowLeftOutlined className='me-1' /> Back </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-2">
            <label className="form-label">
              Name
              <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row my-3 border-top pt-3">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn submit-btn"
              >

                Create
              </button>
            </div>
          </div>
        </div >
      </div >
    </div >

  </div >
  )
}

export default AddCategory

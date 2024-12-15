import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './itemMaster.css';
import { Tooltip } from 'antd';

const ItemList = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className="table-container">
      <div className="card table-card">
        <div className="card-title">
          <h3>Item Master</h3>
        </div>
        <div className="card-header">
          <div className="row justify-content-between">
            <div className="col-4">
              <div className="input-icons">
                <div className="input-group input-group-sm">
                  <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
                    <OutlinedInput
                      size="small"
                      id="header-search"
                      startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                          <SearchOutlined />
                        </InputAdornment>
                      }
                      aria-describedby="header-search-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      placeholder="Search Item"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-3 text-right">
              <Button className="btn add-btn" onClick={() => navigateTo('/add-item')}> <PlusOutlined className='me-1' /> Add Item </Button>
            </div>
          </div>
        </div>

        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="thead">
                <tr className="table-secondary">
                  <th scope="col">#</th>
                  <th scope="col" className="text-start">
                    Item Name
                  </th>
                  <th scope="col" className="text-start">
                    Category
                  </th>
                  <th scope="col" className="text-start">
                    Pack
                  </th>
                  <th scope="col">Batch No.</th>
                  <th scope="col">Shelf</th>
                  <th scope="col">Expiry</th>
                  <th scope="col">Qty</th>
                  <th scope="col">MRP</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="tbody mt-3">
                <tr>
                  <td scope="row">1</td>
                  <td scope="row" className="text-start">
                    Ayush A
                  </td>
                  <td scope="row" className="text-start">
                    Antibiotics
                  </td>
                  <td scope="row" className="text-start">
                    a@gmail.com
                  </td>
                  <td scope="row">9999999999</td>
                  <td scope="row">88</td>
                  <td scope="row">88</td>
                  <td scope="row">444</td>
                  <td scope="row">222</td>
                  <td scope="row" className="text-center">
                    <button className="btn action-btn btn-sm mx-2" onClick={() => navigateTo('/add-item')}>
                      <Tooltip placement="top" title="Edit">
                        <FormOutlined />
                      </Tooltip>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;

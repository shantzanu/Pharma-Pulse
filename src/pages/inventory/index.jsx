import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './table.css';
import { Tooltip } from 'antd';

const Inventory = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState(0);
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className="table-container">
      <div className="card table-card">
        <div className="card-title">
          <h3>Inventory List</h3>
        </div>
        <div className="card-header">
          <div className="row">
            <div className="col-auto">
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
            <div className="col-auto">
              <select className="form-select" aria-label="Default select example">
                <option selected>Select Category</option>
                <option value="Analgesics">Analgesics</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Antacids">Antacids</option>
                <option value="Narcotics">Narcotics</option>
              </select>
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
                  <td scope="row">
                    <div className="d-flex justify-content-center align-items-center">
                      <button
                        disabled={qty > 1}
                        className="btn btn-primary btn-sm btn-outline-none py-0 border-0"
                        onClick={() => setQty((prev) => prev - 1)}
                      >
                        -
                      </button>
                      <input className="form-control w-25  mx-2" type="number" readOnly type="number" value={qty} />
                      <button className="btn btn-primary btn-sm btn-outline-none py-0 border-0" onClick={() => setQty((prev) => prev + 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td scope="row">
                    <div className="row justify-content-center">
                      <input
                        className="form-control text-center w-50"
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        value={amount}
                      />
                    </div>
                  </td>
                  <td scope="row" className="text-center">
                    <button className="btn action-btn btn-sm mx-2">
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

export default Inventory;

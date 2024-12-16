import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './table.css';
import { Tooltip } from 'antd';
import axios from 'axios';
import { formatRupee } from 'utils/utils';

export default function Medicine() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  const navigateWithId = (id) => {
    navigate(`/add-medicine?id=${id}`);
  };

  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:4500/v1/sales/purchaseBill');
      console.log('response', response.data.result.rows);

      if (response.status === 200) {
        // navigate('/dashboard/default');
        setData(response.data.result.rows);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const onDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4500/v1/sales/purchaseBill/${id}`);
      console.log('response', response.data.result);

      if (response.status === 200) {
        getAll();
        // navigate('/dashboard/default');
        // setData(response.data.result.rows);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <div className="table-container">
      <div className="card table-card">
        <div className="card-title">
          <h3>Purchase Bill</h3>
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
                      placeholder="Search Bill"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-3 text-right">
              <Button className="btn add-btn" onClick={() => navigateTo('/add-medicine')}>
                {' '}
                <PlusOutlined className="me-1" /> New Bill{' '}
              </Button>
            </div>
          </div>
        </div>

        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="thead">
                <tr className="table-secondary">
                  <th scope="col">#</th>
                  {/* <th scope="col" className="text-start">
                    Bill No.
                  </th> */}
                  <th scope="col" className="text-start">
                    Party Name
                  </th>
                  <th scope="col">Bill Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col" className="mx-auto text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="tbody mt-3">
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      {/* <td scope="row" className="text-start">{`INV0000${index + 1}`}</td> */}
                      <td scope="row" className="text-start">
                        {item?.partyName}
                      </td>
                      <td scope="row">{item?.billDate}</td>
                      <td scope="row">{formatRupee(item?.total)}</td>

                      <td scope="row" className="text-center">
                        <button className="btn action-btn btn-sm mx-2" onClick={() => navigateWithId(item._id)}>
                          <Tooltip placement="top" title="Edit">
                            <FormOutlined />
                          </Tooltip>
                        </button>

                        <button className="btn action-btn btn-sm" onClick={() => onDelete(item._id)}>
                          <Tooltip placement="top" title="Delete">
                            <DeleteOutlined />
                          </Tooltip>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

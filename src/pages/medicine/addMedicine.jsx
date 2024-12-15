import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ArrowLeftOutlined, DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './table.css';
import { Tooltip } from 'antd';
import {formatRupee} from "../../utils/utils"

const AddMedicine = () => {
  const [date, setDate] = useState(new Date());
  const itemsList = [
    {
      id: 1,
      itemName: 'Paracetamol',
      pack: 20,
      batchNo: 'PA12345',
      shelf: 'A-1',
      expiry: '12/2025',
      mrp: 45,
      qty: 1
    },
    {
      id: 2,
      itemName: 'Ibuprofen',
      pack: 15,
      batchNo: 'IB54321',
      shelf: 'B-2',
      expiry: '08/2026',
      mrp: 78,
      qty: 1
    },
    {
      id: 3,
      itemName: 'Amoxicillin',
      pack: 10,
      batchNo: 'AM98765',
      shelf: 'C-3',
      expiry: '03/2027',
      mrp: 125,
      qty: 1
    }
  ];
  const [crossRef, setCrossRef] = useState([]);
  const [savedInvoice, setSavedInvoice] = useState([]);
  const [total, setTotal] = useState();
  // const [data, setData] = useState([
  //   {
  //     id: 1,
  //     itemName: '',
  //     pack: 10,
  //     batchNo: 'BX702WQ',
  //     shelf: 'A-1',
  //     expriry: '03/2026',
  //     mrp: 126
  //   }
  // ]);
  const [data, setData] = useState([
    {
      id: 1,
      itemName: '',
      pack: null,
      batchNo: '',
      shelf: '',
      expiry: '',
      mrp: null,
      qty: 1
    }
  ]);
  const [displaySeries, setDisplaySeries] = useState([]);
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: 'none'
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#156ba8'
    }),

    option: (defaultStyles, state) => ({
      ...defaultStyles,
      fontWeight: '500',
      fontSize: '14px',
      padding: '11px 14px',
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '0.1px',
      color: '#156BA8'
      // "&:hover": {
      //   backgroundColor: "#d7d7d7",
      // },
    })
  };
  const indicatorSeparatorStyle = {
    display: 'none'
  };
  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };
  let manufacturerOptions = [];
  // if (crossRef && crossRef) {
  //   manufacturerOptions = crossRef.map((cross) => {
  //     return {
  //       value: cross,
  //       label: cross,
  //     };
  //   });
  // }
  const addNewItem = () => {
    const newId = data.length + 1;
    const newItem = {
      id: newId,
      itemName: '',
      pack: null,
      batchNo: '',
      shelf: '',
      expriry: '',
      mrp: null,
      qty: 1
    };

    setData((prev) => [...prev, newItem]);
  };
  const handleItemSelect = (itemId, rowIndex) => {
    const selectedItem = itemsList.find((item) => item.id === parseInt(itemId));
    if (selectedItem) {
      // Update the row in data
      const updatedData = data.map((row, index) => (index === rowIndex ? { ...selectedItem } : row));

      setData(updatedData);
    }
  };

  const handleQtyChange = (id, delta) => {
    setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)));
  };

  const handleQtyInputChange = (id, value) => {
    const newQty = Math.max(0, parseInt(value) || 0); // Ensure non-negative value
    setData((prevData) => prevData.map((item) => (item.id === id ? { ...item, qty: newQty } : item)));
  };
  const submit = () => {
    console.log('data', data);
    setSavedInvoice([...data]);
  };

  const totalAmount = () => {
    let total = data.reduce((acc, curr) => {
      return acc + curr.qty * curr.mrp;
    }, 0);
    setTotal(formatRupee(total));
    return total;
  };

  useEffect(() => {
    console.log('Updated savedInvoice:', savedInvoice);
  }, [savedInvoice]);
  useEffect(() => {
    totalAmount();
  }, [data]);
  return (
    <div>
      <div className="card form-card">
        <div className="card-header">
          <div className="card-header-items">
            <div className="card-title m-0">
              <h3 className="m-0">Purchase Bill</h3>
            </div>
            <div>
              <button className="btn add-btn" onClick={() => navigateTo('/medicine')}>
                {' '}
                <ArrowLeftOutlined className="me-1" /> Back{' '}
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-2">
              <label className="form-label">
                Bill No.
                <span className="text-danger">*</span>
              </label>
              <input placeholder="INV00001" readOnly type="text" className="form-control" />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label">
                Party Name
                <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>

            <div className="col-md-3 mb-2">
              <label className="form-label"> GST No. </label>
              <input placeholder="GST No." type="text" className="form-control" />
            </div>
            <div className="col-md-3 mb-2">
              <label className="form-label"> Bill Date </label>
              <input
                placeholder="Customer's Name"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.date)}
                className="form-control"
              />
            </div>
          </div>

          <div className="row my-3">
            <div className="table-container">
              <div className="card table-card">
                <div className="card-body p-3">
                  <div className="form-table-responsive">
                    <table className="table table-hover table-bordered">
                      <thead className="thead">
                        <tr className="table-secondary">
                          <th scope="col">#</th>
                          <th scope="col" className="text-start">
                            Item Name
                          </th>
                          <th scope="col" className="text-start">
                            Pack
                          </th>
                          <th scope="col">Batch No.</th>
                          <th scope="col">Shelf</th>
                          <th scope="col">Expiry</th>
                          <th scope="col">MRP</th>
                          <th scope="col">Qty</th>
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
                              <td scope="row" className="text-start">
                                {/* <Select
                                  openMenuOnFocus={true}
                                  styles={style}
                                  components={{ IndicatorSeparator }}
                                  options={manufacturerOptions}
                                  isClearable={true}
                                  isSearchable={true}
                                  // menuIsOpen={true}
                                  placeholder={<div className="select-placeholder-text">Select Drug</div>}
                                  value={displaySeries}
                                /> */}
                                <select onChange={(e) => handleItemSelect(e.target.value, index)} value={item.id || ''}>
                                  {itemsList.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.itemName}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td scope="row" className="text-start">
                                {item?.pack}
                              </td>
                              <td scope="row">{item?.batchNo}</td>
                              <td scope="row">{item?.shelf}</td>
                              <td scope="row">{item?.expiry}</td>
                              <td scope="row">{item?.mrp}</td>
                              <td scope="row">
                                <div className={item.mrp ? 'd-block' : 'd-none'}>
                                  <div className="d-flex justify-content-center align-items-center">
                                    <button
                                      disabled={item.qty <= 1}
                                      className="btn btn-primary btn-sm btn-outline-none py-0 border-0"
                                      onClick={() => {
                                        handleQtyChange(item.id, -1); // Decrease qty by 1
                                      }}
                                    >
                                      -
                                    </button>
                                    <input
                                      className="form-control w-25  mx-2"
                                      type="number"
                                      onChange={(e) => handleQtyInputChange(item.id, e.target.value)}
                                      value={item?.qty}
                                    />
                                    <button
                                      className="btn btn-primary btn-sm btn-outline-none py-0 border-0"
                                      onClick={() => {
                                        handleQtyChange(item.id, 1); // Increase qty by 1
                                      }}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td scope="row">
                                <div className={item.mrp ? 'd-block' : 'd-none'}>
                                  <div className="row justify-content-center">
                                    <input className="form-control text-center w-50" readOnly type="number" value={item.qty * item?.mrp} />
                                  </div>
                                </div>
                              </td>

                              <td scope="row" className="text-center">
                                <button className="btn action-btn btn-sm mx-2" onClick={() => navigateTo('/add-customer')}>
                                  <Tooltip placement="top" title="Edit">
                                    <FormOutlined />
                                  </Tooltip>
                                </button>

                                <button className="btn action-btn btn-sm">
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
                    <div className="w-100 text-center">
                      <h3>
                        Total : <span>{total || 0}</span>
                      </h3>
                    </div>
                    <button type="button" className="btn reset-btn btn-primary m-0 w-100 justify-content-center" onClick={addNewItem}>
                      Add new row
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <button type="button" className="btn reset-btn btn-primary" onClick={submit}>
                  <i className="fa-solid fa-arrows-rotate me-2"></i>
                  Save
                </button>
                <button type="submit" className="btn submit-btn">
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;

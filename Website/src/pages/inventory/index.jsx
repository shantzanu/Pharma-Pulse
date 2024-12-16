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

const Inventory = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [itemsList, setItemsList] = useState([]);
  const navigateTo = (path) => {
    navigate(path);
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === '') {
      setFilteredItems(itemsList); // Show all items
    } else {
      const filtered = itemsList.filter((item) => item.category === selectedCategory);
      setFilteredItems(filtered); // Update filtered list
    }
  };
  const getAll = async () => {
    try {
      const response = await axios.get('http://localhost:4500/v1/sales/item');
      console.log('response', response.data.result.rows);

      if (response.status === 200) {
        // navigate('/dashboard/default');
        setData(response.data.result.rows);
        setFilteredItems(response.data.result.rows);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleQtyChange = (index, newQty) => {
    const updatedItems = [...filteredItems];
    updatedItems[index].qty = newQty; // Update qty in filteredItems
    setFilteredItems(updatedItems);

    // Reflect changes in the original itemsList
    const originalIndex = itemsList.findIndex((item) => item._id === updatedItems[index]._id);
    if (originalIndex !== -1) {
      const updatedItemsList = [...itemsList];
      updatedItemsList[originalIndex].qty = newQty;
      setItemsList(updatedItemsList);
    }
  };

  // Handle Amount change
  const handleAmountChange = (index, newAmount) => {
    const updatedItems = [...filteredItems];
    updatedItems[index].mrp = newAmount; // Update amount in filteredItems
    setFilteredItems(updatedItems);

    // Reflect changes in the original itemsList
    const originalIndex = itemsList.findIndex((item) => item._id === updatedItems[index]._id);
    if (originalIndex !== -1) {
      const updatedItemsList = [...itemsList];
      updatedItemsList[originalIndex].mrp = newAmount;
      setItemsList(updatedItemsList);
    }
  };

  const masterData = async () => {
    try {
      const response = await axios.get('http://localhost:4500/v1/sales/invoice/MasterData');

      if (response.status === 200) {
        setItemsList(response?.data?.result?.item);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const update = async (item, id) => {
    try {
      const response = await axios.put(`http://localhost:4500/v1/sales/item/${id}`, item);
      if (response.status === 200) {
        console.log(`Item updated successfully!`);
      }
    } catch (error) {
      console.log('Error updating item:', error);
    }
  };
  useEffect(() => {
    getAll();
    masterData();
  }, []);

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
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedCategory} // Controlled component
                onChange={handleCategoryChange}
              >
                <option value="">Select Category</option>
                {itemsList.map((item, index) => {
                  return (
                    <option key={index} value={item?.category}>
                      {item?.category}
                    </option>
                  );
                })}
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
                {filteredItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row" className="text-start">
                        {item?.name}
                      </td>
                      <td scope="row" className="text-start">
                        {item?.category}
                      </td>
                      <td scope="row" className="text-start">
                        {item?.pack}
                      </td>
                      <td scope="row"> {item?.batchNo}</td>
                      <td scope="row">{item?.shelf}</td>
                      <td scope="row">{item?.expiryDate}</td>
                      <td scope="row">
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            disabled={item.qty <= 1} // Disable "-" if qty is 1
                            className="btn btn-primary btn-sm btn-outline-none py-0 border-0"
                            onClick={() => handleQtyChange(index, item.qty - 1)}
                          >
                            -
                          </button>
                          <input className="form-control w-25 mx-2" type="number" readOnly value={item.qty} />
                          <button
                            className="btn btn-primary btn-sm btn-outline-none py-0 border-0"
                            onClick={() => handleQtyChange(index, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td scope="row">
                        <div className="row justify-content-center">
                          <input
                            className="form-control text-center w-50"
                            onChange={(e) => handleAmountChange(index, parseFloat(e.target.value))}
                            type="number"
                            value={item.mrp}
                          />
                        </div>
                      </td>
                      <td scope="row" className="text-center">
                        <button className="btn action-btn btn-sm mx-2">
                          <Tooltip placement="top" title="Change" onClick={() => update(item,item._id)}>
                            <FormOutlined />
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
};

export default Inventory;

import * as React from 'react';
import {Box, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

export default function ProductTable({setEditMode}) {
    const [productData, setProductData] = useState('')
    const getProduct = async () => {
        const url = "http://localhost:9999/api/products"
        const res = await axios.get(url)
        setProductData(res.data)
      }

      const deleteProduct = async (productId) => {
        const url = "http://localhost:9999/api/delete-product"
        const res = await axios.delete(url, { params: { productId: productId } })
        if(res.data.status === 'ok') {
            toast.success('Product Deleted successfully')
            getProduct()
        }
      }

      useEffect(() => {
        getProduct()
      },[])

      const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Product Name',
          width: 160,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'Description',
          width: 160,
          editable: true,
        },
        {
          field: 'price',
          headerName: 'price',
          type: 'number',
          width: 160,
          editable: true,
        },
        {
          field: "Edit Product",
          width: 160,
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => {
                    setEditMode(cellValues.row);
                }}
              >
                Edit
              </Button>
            );
          }
        },
        {
          field: "Delete Product",
          width: 160,
          renderCell: (cellValues) => {
            return (
              <Button
                variant="contained"
                color="primary"
                style={{backgroundColor: '#c94e4e'}}
                onClick={(event) => {
                    deleteProduct(cellValues.row._id);
                }}
              >
                Delete
              </Button>
            );
          }
        },
      ];
    
  return (
    <Box sx={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={[...productData]}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={(row) => row._id}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AddProduct from './addProduct';
import ProductTable from './ProductTable';
import EditProduct from './EditProduct';

const ProductManagment =({ddData})=> {
  const [value, setValue] = useState('1');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit =(data)=> {
    setEditMode(true)
    setEditData(data)
  }

  console.log('editData', editData)

  return (
    <>
    {!editMode ?
      (
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Product Table" value="1" />
            <Tab label="Add Product" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><ProductTable setEditMode={handleEdit}/></TabPanel>
        <TabPanel value="2">
          <AddProduct/>
        </TabPanel>
      </TabContext>
    </Box>
      ) : 
      <EditProduct setEditMode={setEditMode} editData={editData}/>
    }
    </>
  );
}

export default ProductManagment;

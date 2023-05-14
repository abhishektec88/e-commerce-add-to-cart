// import { Upload } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from 'react-toastify';

import './style.scss'
import { useState } from "react";

const EditProduct = ({setEditMode, editData}) => {
    const [fileState, setFileState] = useState({
        file: null,
        base64URL: ""
    })
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            ...editData
        }
      });
    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };


    const handleFileInputChange = e => {
        let { file } = fileState

        file = e.target.files[0];

        getBase64(file)
            .then(result => {
                file["base64"] = result;
                setFileState({
                    base64URL: result,
                    file
                });
            })
            .catch(err => {
                console.log(err);
            });

        setFileState({
            file: e.target.files[0]
        });
    };

    const onSubmit = async (data) => {
        const url = `http://localhost:9999/api/edit-product`
        const {categories, description,name,price,qty} = data
        const res = await axios.put(url, {_id: editData._id, categories, description,name,price,qty , image: fileState.base64URL ? fileState.base64URL : editData.image })
        if(res.data.status === 'ok') {
            toast.success('Product Added successfully')
            setEditMode(false)
        }
    }


    return (
        <>
            <div className="container">
                <div className="card rounded">
                    <h1>Add Product</h1>
                    <div className="rounded image-container">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField variant="standard" label="name" {...register("name")} />
                            <TextField variant="standard" label="price" {...register("price")} />
                            <TextField variant="standard" label="description" {...register("description")} />
                            <TextField variant="standard" label="Quantity" {...register("qty")} />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={[
                                    { label: 'grocery', value: 1 },
                                    { label: 'food', value: 2 }
                                ]}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField variant="standard" {...register("categories")} {...params} />}
                            />
                            <Button variant="contained" component="label" style={{ cursor: 'pointer', marginTop: "40px" }}>
                                Upload Product Image
                                <input onChange={handleFileInputChange} accept="image/*" multiple type="file" />
                            </Button>
                            <button variant="contained" type="submit" style={{ cursor: 'pointer', marginTop: "40px" }}>Add Product</button>
                        </form>
                        <button onClick={() => setEditMode()} variant="contained" className="canceleBtn" type="submit" style={{ cursor: 'pointer', marginTop: "40px" }}>cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;

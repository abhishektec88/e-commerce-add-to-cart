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
    // const onSubmit = data => console.log(data);

    // const imageName = watch("image")?.[0]?.name

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };


    const handleFileInputChange = e => {
        let { file } = fileState

        file = e.target.files[0];

        getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", file);
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
        const url = `http://localhost:9999/api/edit-product/${editData._id}`
        const {categories, description,name,price,qty} = data
        const res = await axios.put(url, {categories, description,name,price,qty , image: fileState.base64URL ? fileState.base64URL : editData.image })
        if(res.data.status === 'ok') {
            toast.success('Product Added successfully')
            setEditMode(false)
        }
        console.log('datasasa', data, editData)
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

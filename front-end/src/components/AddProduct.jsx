import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('userId', userId);
        formData.append('avatar', avatar);

        let result = await fetch('http://localhost:3000/add-product', {
            method: 'post',
            body: formData,
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    };

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    return (
        <div className="product">
            <input
                type="text"
                placeholder="Enter Product Name"
                className="inputBox"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            {error && !name && <span className="invalid-input">Enter Valid Name</span>}

            <input
                type="text"
                placeholder="Enter Product Price"
                className="inputBox"
                value={price}
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
            />
            {error && !price && <span className="invalid-input">Enter Valid Price</span>}

            <input
                type="text"
                placeholder="Enter Product Category"
                className="inputBox"
                value={category}
                onChange={(e) => {
                    setCategory(e.target.value);
                }}
            />
            {error && !category && <span className="invalid-input">Enter Valid Category</span>}

            <input
                type="text"
                placeholder="Enter Product Company"
                className="inputBox"
                value={company}
                onChange={(e) => {
                    setCompany(e.target.value);
                }}
            />
            {error && !company && <span className="invalid-input">Enter Valid Company</span>}

            <label htmlFor="file-input" className="custom-file-upload">
                {avatar ? `Selected Image: ${avatar.name}` : 'Choose Image'}
            </label>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            <button className="signup-btn" onClick={addProduct}>
                Add Product
            </button>
        </div>
    );
};

export default AddProduct;

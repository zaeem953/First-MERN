import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [prevAvatar, setPrevAvatar] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const updateProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('avatar', avatar);
        formData.append('prevAvatar', prevAvatar);

        let result = await fetch(`http://localhost:3000/products/${params.id}`, {
            method: 'PUT',
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

    useEffect(() => {
        getProductDetail();
    }, []);

    const getProductDetail = async () => {
        let result = await fetch(`http://localhost:3000/products/${params.id}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        console.log(result);
        setName(result.name);
        setCategory(result.category);
        setCompany(result.company);
        setPrice(result.price);
        setPrevAvatar(result.avatar);
    };

    return (
        <div className="product">
            <p>Previous Image:</p>
            {prevAvatar && <img src={`http://localhost:3000/${prevAvatar}`} alt="Previous Image" style={{width:"25px"}} className='inputBox'/>}
            
            <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='inputBox'
            />
            
            <input
                type="text"
                placeholder="Enter Product Name"
                className="inputBox"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Product Price"
                className="inputBox"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Product Category"
                className="inputBox"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Product Company"
                className="inputBox"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <button className="signup-btn" onClick={updateProduct}>
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;

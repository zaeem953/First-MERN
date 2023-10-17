import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([]);
//-----------------------------------------------------GET ALL PRODUCTS-----------------------------
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:3000/products")
        result = await result.json();
        setProducts(result);
    }
//----------------------------------------DELETE PRODUCTS-----------------------------------------------
    const deleteProduct=async (id)=>{
        let result = await fetch(`http://localhost:3000/products/${id}`,{
            method:"Delete",
        })
        result = await result.json();
        if(result){
            getProducts();
        }
    }
    return (
        <div className='product-list'>
            <h3>ProductList</h3>

            <ul>
                <li>S .No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Operations</li>
            </ul>
            {
                products.map((item,index) =>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>Update</Link>
                        </li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product_List = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ _id: "", name: "", description: "", price: "", category: "" });

  const productHandler = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/readallproduct');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      console.log(response);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const submitUpdatedProduct = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/update/${id}`, product);
      console.log(response);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = (id, name, description, price, category) => {
    setProduct({
      _id: id,
      name: name,
      description: description,
      price: price,
      category: category,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array to run useEffect only once

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 mt-2">
                <input type="text" className="form-control" name="name" value={product.name} onChange={productHandler} placeholder="Enter Product Name" />
              </div>

              <div className="mb-3 mt-2">
                <input type="text" className="form-control" name="description" value={product.description} onChange={productHandler} placeholder="Enter Product Description" />
              </div>

              <div className="mb-3 mt-2">
                <input type="number" className="form-control" name="price" value={product.price} onChange={productHandler} placeholder="Enter Product Price" />
              </div>

              <div className="mb-3 mt-2">
                <input type="text" className="form-control" name="category" value={product.category} onChange={productHandler} placeholder="Enter Product Category" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={() => submitUpdatedProduct(product._id)} style={{ width: '250px' }} className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1>Product List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <i className="fa-regular fa-pen-to-square me-2" onClick={() => updateProduct(product._id, product.name, product.description, product.price, product.category)} data-bs-toggle="modal" data-bs-target="#exampleModal"></i> 
                  <i className="fa-solid fa-trash-can" onClick={() => deleteHandler(product._id)}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Product_List;

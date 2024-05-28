import React,{useState} from 'react'
import axios from 'axios'

const Product_forms = () => {
    const [Product, setProduct] = useState({name:"",description:"",price:"",category:"" })
    const productHandler =(e) =>{
        const {name , value}= e.target;
        setProduct({...Product,[name]:value})
    }

    const insertproduct = async()=>{
        try{
            const response = await axios.post('http://localhost:5000/addproduct',Product)
            console.log(response.data)
        } catch(error){

        }
    }


  return (
<form onSubmit={insertproduct}>
    <h1 className= 'mt-3'>Add Product </h1>
  <div className="mb-3 mt-2">
    <input type="text" className="form-control" name='name' value={Product.name} onChange={productHandler} placeholder= 'Enter Product Name'/>
  </div>

  <div className="mb-3 mt-2">
    <input type="text" className="form-control" name='description' value={Product.description} onChange={productHandler} placeholder= 'Enter Product Description'/>
  </div> 

  <div className="mb-3 mt-2">
    <input type="number" className="form-control"  name='price' value={Product.price} onChange={productHandler} placeholder= 'Enter Product Price'/>
  </div>

  <div className="mb-3 mt-2">
    <input type="text" className="form-control"  name='category' value={Product.category} onChange={productHandler} placeholder= 'Enter Product Category'/>
  </div>

  <button type="submit"  style={{width:'250px'}} className="btn btn-success">Submit</button>
</form>
  )
}

export default Product_forms

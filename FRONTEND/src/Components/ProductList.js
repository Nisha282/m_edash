import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("https://m-edash.onrender.com/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`https://m-edash.onrender.com/product/${id}`, {
      method: "delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`https://m-edash.onrender.com/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
        
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <div className="tbl">
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            {/* <li>Company</li> */}
            <th>Operation</th>
          </tr>
        </thead>

        {products.length > 0 ? (
          products.map((item, index) => (
            <tbody>
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                {/* <li>{item.company}</li> */}
                <td>
                  <div className="btns">
                    <div className="btns1">
                      <Button
                        variant="danger"
                        onClick={() => deleteProduct(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                    <div  className="btns1">
                      {/* <Button variant="primary"> */}
                        <Link to={"/update/" + item._id}><Button variant="primary">Update</Button></Link>
                      {/* </Button> */}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <h1>No Result Found</h1>
        )}
      </Table>
      </div>
    </div>
  );
};

export default ProductList;

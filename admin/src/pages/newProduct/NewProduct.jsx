import { useState } from "react";
import "./newProduct.css";
import { userRequest } from "../../requestMethod";


export default function NewProduct() {
  const [inputs, setInputs] = useState({
    size: [],
    color: []
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  }

  const handleSize = (e) => {
    setInputs(prev => ({
      ...prev,
      size: e.target.value.split(",").map(s => s.trim())
    }));
  };

  const handleColor = (e) => {
    setInputs(prev => ({
      ...prev,
      color: e.target.value.split(",").map(c => c.trim())
    }));
  };


  const handleClick = async (e) => {
    e.preventDefault();

    if (!file) return alert("Please select an image file.");
    if (!inputs.title || !inputs.desc || !inputs.price || !cat.length) {
      return alert("Please fill out all required fields.");
    }

    setLoading(true);

    try {
      const res = await userRequest.post("/upload/presigned-url", {
        fileName: file.name,
        fileType: file.type,
      });
      const { uploadURL, fileURL } = res.data;

      await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const key = fileURL.split(`${process.env.B2_BUCKET_NAME}/`)[1];

      const product = {
        ...inputs,
        img: key,
        categories: cat,
        inStock: inputs.inStock === "true"
      };

      const productRes = await userRequest.post("/products", product);
      console.log("✅ Product created:", productRes.data);
      alert("Product created successfully!");

    } catch (err) {
      console.error("❌ Upload or product creation failed:", err);
      alert("Something went wrong. Check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            className="addProductItem-img" 
            type="file" 
            id="file" 
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Shirt, Shoe, Jacket" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="description..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="text" placeholder="100" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Shirts, Shoes, Jackets" onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="S, M, L" onChange={handleSize}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="Red, Blue, Green" onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>In Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton" disabled={loading}>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="spinner"></div>
            Creating...
          </div>
        ) : (
          "Create"
        )}
        </button>
      </form>
    </div>
  );
}
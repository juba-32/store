import React, { useRef, useState } from "react";
import "./SinglePro.css";
import { useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
export default function SinglePro({ productid }) {
  const m = useTheme();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const toastCenter = useRef(null);
  const showMessage = (event, ref, severity) => {
    const label = "Successfully Added";
    ref.current.show({ severity: severity, detail: label, life: 3000 });
  };
  useEffect(() => {
    if (productid) {
      axios
        .get(`https://fakestoreapi.in/api/products/${productid}`)
        .then((res) => {
          setProduct(res.data.product);
        });
    }
  }, [productid]);
  const handelCloseProduct = () => {
    setProduct(null);
  };

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <div
    style={{ backgroundColor: m.palette.background.BG, color: m.palette.text.primary }}

      className="product-1"
    >
      <button onClick={handelCloseProduct} className="close-icon">
        <CloseIcon />
      </button>
      <div className="product-content">
        <div className="pro-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div
          className="about-product"
        >
          <div className="pro-title">
            <h3>{product.title}</h3>
          </div>
          <div className="pro info">
            <p>
              <strong>Brand</strong> : {product.brand}
            </p>
            <p>
              <strong>Model</strong> : {product.model}
            </p>
            <p>
              <strong>Color</strong> : {product.color}
            </p>
          </div>
          <div className="pro-desc">
            <h3>about this product</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <div className="btns card flex justify-content-center">
        <Toast className="x" ref={toastCenter} position="center" />
        <Button
          sx={{
            backgroundColor: m.palette.background.btnBG,
            color: m.palette.text.primary,
          }}
          className="addBtn"
          onClick={(e) => {
            dispatch(addToCart(product));
            showMessage(e, toastCenter, "success");
          }}
        >
          Add to Cart
        </Button>
        <Link to="/cart">
          <Button
            sx={{
              backgroundColor: m.palette.background.btnBGC,
              color: m.palette.text.primary,
              "&:hover":{scale:".99"}
            }}
            className="addBtn"
          >
            go to cart
          </Button>
        </Link>
      </div>
    </div>
  );
}

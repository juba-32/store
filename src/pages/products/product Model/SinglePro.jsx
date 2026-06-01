import { useEffect, useState } from "react";
import "./SinglePro.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useTheme, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // تعديل: استخدام useNavigate بدلاً من Navigate كـ Component
import { getUser } from "../../../utils/Helper";

export default function SinglePro({
  open,
  handleClose,
  productid,
  handleAddToCart,
}) {
  const theme = useTheme();
  const navigate = useNavigate(); // دالة التنقل الصحيحة
  const user = getUser();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DETAILS");

  useEffect(() => {
    if (productid) {
      setLoading(true);
      axios
        .get(`https://node-api-projects.vercel.app/products/${productid}`)
        .then((res) => {
          setProduct(res.data);
          // تعيين الصورة الأساسية فور وصول البيانات
          if (res.data?.images && res.data.images.length > 0) {
            setSelectedImg(res.data.images[0]);
          } else if (res.data?.image) {
            setSelectedImg(res.data.image); // حماية في حال كانت الصورة حقل مفرد باسم image
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product details:", err);
          setLoading(false);
        });
    }
  }, [productid]);

  // دالة التعامل مع إضافة المنتج الحقيقي لعربة التسوق بالبيانات المختارة
  const onAddToCartClick = () => {
    if (handleAddToCart && product) {
      handleAddToCart({
        ...product,
        qty: quantity,
      });
    }
  };

  // 1. حالة التحميل المنظمة لمنع الـ Crashes
  if (loading) {
    return (
      <div className="product-loading-container">
        <CircularProgress color="success" />
      </div>
    );
  }

  // 2. حماية في حال عدم العثور على المنتج
  if (!product) {
    return <div className="product-error-container">Product not found.</div>;
  }

  // حساب السعر بعد الخصم (إذا كان الخصم كنسبة مئوية أو قيمة مباشرة)
  // هنا افترضنا أن حقل الـ discount يعبر عن القيمة المخصومة مباشرة بالدولار
  const finalPrice = product.discount ? product.price - product.discount : product.price;

  // تجهيز مصفوفة الصور للعرض الحقيقي
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]; // تراجع في حال وجود حقل واحد فقط للصورة

  return (
    <div
      className="single-product-container"
      style={{
        "--bg": theme.palette.background.default,
        "--card-bg": theme.palette.background.paper,
        "--text": theme.palette.text.primary,
        "--muted-text": theme.palette.text.secondary,
        "--border": theme.palette.divider,
      }}
    >
      {/* الجزء الأيسر: معرض الصور */}
      <div className="product-gallery-section">
        <div className="main-image-box">
          <img src={selectedImg} alt={product.title} />
        </div>
        <div className="thumbnails-wrapper">
          {productImages.map((imgUrl, index) => (
            imgUrl && (
              <div
                key={index}
                className={`thumbnail-card ${selectedImg === imgUrl ? "active-thumb" : ""}`}
                onClick={() => setSelectedImg(imgUrl)}
              >
                <img src={imgUrl} alt={`thumb-${index}`} />
              </div>
            )
          ))}
        </div>
      </div>

      {/* الجزء الأيمن: تفاصيل المنتج والخيارات */}
      <div className="product-info-section">
        
        {/* عرض الـ Category والـ Brand والـ Model كمسار علوي */}
        <div className="product-breadcrumbs">
          <span>{product.category}</span>
          {product.brand && <span> {" > "} {product.brand}</span>}
          {product.model && <span> {" > "} {product.model}</span>}
        </div>

        <h1 className="product-main-title">{product.title}</h1>

        {/* حالة التوفر في المخزن (inStock) */}
        <div className="stock-status-badge">
          {product.inStock ? (
            <span className="status-in">In Stock</span>
          ) : (
            <span className="status-out">Out of Stock</span>
          )}
        </div>

        {/* الأسعار الحقيقية وحساب الخصومات (discount) */}
        <div className="product-price-row">
          <span className="current-price">${finalPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="old-price">${product.price.toFixed(2)}</span>
          )}
          {product.discount > 0 && (
            <span className="discount-badge-text">Save ${product.discount}</span>
          )}
        </div>

        {/* التبويبات المودرن لعرض التفاصيل والوصف الحقيقي */}
        <div className="product-tabs-header">
          {["DETAILS", "SPECIFICATIONS"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "tab-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* محتوى الـ Tabs بناءً على الحقول المتاحة */}
        <div className="tab-content-body">
          {activeTab === "DETAILS" && (
            <div className="details-wrapper">
              <p>{product.description || "No description available for this product."}</p>
            </div>
          )}
          {activeTab === "SPECIFICATIONS" && (
            <div className="specs-wrapper">
              {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
              {product.model && <p><strong>Model:</strong> {product.model}</p>}
              {product.color && <p><strong>Color:</strong> {product.color}</p>}
            </div>
          )}
        </div>

        {/* حقل عرض اللون إذا وُجد كقيمة نصية */}
        {/* {product.color && (
          <div className="option-select-group">
            <span className="option-label">
              Color: <strong>{product.color}</strong>
            </span>
          </div>
        )} */}

        {/* متحكم الكمية الذكي قبل الشراء */}
        <div className="option-select-group" style={{ marginTop: "10px" }}>
          <span className="option-label">Quantity:</span>
          <div className="quantity-counter-box">
            <button onClick={() => setQuantity((p) => (p > 1 ? p - 1 : 1))}>
              <RemoveIcon style={{ fontSize: "16px" }} />
            </button>
            <span className="qty-number-display">{quantity}</span>
            <button onClick={() => setQuantity((p) => p + 1)}>
              <AddIcon style={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>

        {/* أزرار الشراء والتحكم الإجرائية المحدثة */}
        <div className="product-actions-footer-row">
          <button 
            className="buy-now-action-btn"
            onClick={() => {
              onAddToCartClick();
              user ? navigate("/cart") : navigate("/register");
            }}
            disabled={!product.inStock}
          >
            Buy now
          </button>

          <button 
            className="add-to-cart-action-btn" 
            onClick={onAddToCartClick}
            disabled={!product.inStock}
          >
            <ShoppingCartIcon className="cart-btn-icon-ui" />
            Add to cart
          </button>
          
          <button className="fav-circle-action-btn">
            <FavoriteBorderIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
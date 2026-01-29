import { useForm } from "react-hook-form";
import axios from "axios";

export default function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      image: "",
      brand: "",
      model: "",
      price: "",
      discount: "",
      color: "",
      inStock: "true",
      category: "",
      description: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount),
        inStock: data.inStock === "true",
      };

      const res = await axios.post(
        "https://node-api-projects.vercel.app/products",
        payload
      );
      console.log("Success:", res.data);
      alert("Product added successfully!");
      reset(); 
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          margin: "auto",
          gap: "10px",
        }}
      >
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Title"
        />
        {errors.title && <span style={{ color: "red" }}>{errors.title.message}</span>}

        <input
          {...register("image", { required: "Image URL is required" })}
          placeholder="Image URL"
        />
        {errors.image && <span style={{ color: "red" }}>{errors.image.message}</span>}

        <input {...register("brand")} placeholder="Brand" />
        <input {...register("model")} placeholder="Model" />

        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          placeholder="Price"
        />
        {errors.price && <span style={{ color: "red" }}>{errors.price.message}</span>}

        <input type="number" {...register("discount")} placeholder="Discount" />
        <input {...register("color")} placeholder="Color" />

        <select {...register("inStock")}>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <input {...register("category")} placeholder="Category" />
        <input {...register("description")} placeholder="Description" />

        <button
          type="submit"
          style={{
            background: "green",
            padding: "10px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

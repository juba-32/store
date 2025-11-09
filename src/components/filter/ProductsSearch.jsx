import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsSearch({ url, setData, categoryFilter, priceFilter }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();

        if (categoryFilter) params.append("selectCategory", categoryFilter);
        if (priceFilter?.length === 2) {
          params.append("minPrice", priceFilter[0]);
          params.append("maxPrice", priceFilter[1]);
        }
        if (query) params.append("search", query);

        const fullUrl = `${url}?${params.toString()}`;
        const res = await axios.get(fullUrl);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setData([]);
      }
    };

    const timer = setTimeout(fetchProducts, 400); // debounce
    return () => clearTimeout(timer);
  }, [query, categoryFilter, priceFilter, url, setData]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      style={{ padding: "6px 10px", borderRadius: 4, width: "100%", maxWidth: 300 }}
    />
  );
}

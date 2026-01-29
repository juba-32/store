import { useEffect, useState } from "react";
import axios from "axios";
import { queryParams } from "../utils/Helper";

export default function useProducts(
  url,
  categoryFilter,
  priceFilter,
  searchQuery,
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const queryString = queryParams({
          categoryFilter,
          priceFilter,
          searchQuery,
        });

        const fullUrl = `${url}?${queryString}`;
        const response = await axios.get(fullUrl);
        console.log(fullUrl, "fullUrl");
        setData(response.data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url, categoryFilter, priceFilter, searchQuery]);

  return { data, loading };
}

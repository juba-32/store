import UseFetchData from "../reusable component/fetchData/UseFetchData";

export default function Tv() {
  return (
    <UseFetchData
      url={"https://fakestoreapi.in/api/products/category?type=tv"}
    />
  );
}

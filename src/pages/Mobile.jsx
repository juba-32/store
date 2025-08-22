import UseFetchData from "../reusable component/fetchData/UseFetchData";

export default function Mobile() {
  return (
    <UseFetchData
      url={"https://fakestoreapi.in/api/products/category?type=mobile"}
    />
  );
}

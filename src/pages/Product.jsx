import UseFetchData from "../reusable component/fetchData/UseFetchData";

export default function Product() {
  return (
    <div>
      <UseFetchData url={"https://fakestoreapi.com/products"} />
    </div>
  )
}

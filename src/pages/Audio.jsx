import UseFetchData from "../reusable component/fetchData/UseFetchData";


export default function Audio() {
  return (
    <UseFetchData url={"https://fakestoreapi.in/api/products/category?type=audio"}/>
  )
}

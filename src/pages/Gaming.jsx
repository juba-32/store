import UseFetchData from '../reusable component/fetchData/UseFetchData'

export default function Gaming() {
  return (
  <UseFetchData url={"https://fakestoreapi.in/api/products/category?type=gaming"} />
  )
}

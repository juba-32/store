import UseFetchData from "../reusable component/fetchData/UseFetchData";

export default function Product() {
  return (
    <div>
      <UseFetchData url={"https://amb.up.railway.app/products"}  />
    </div>
  );
}

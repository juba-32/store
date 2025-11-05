import UseFetchData from "../reusable component/fetchData/UseFetchData";

export default function Mobile() {
  return (
    <UseFetchData
      url={"https://amb.up.railway.app/products"}
    />
  );
}

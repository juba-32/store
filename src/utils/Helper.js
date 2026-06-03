export const handleMenuOpen = (event, setter) => {
  if (event && setter && typeof setter === "function") {
    setter(event.currentTarget);
  } else {
    console.warn("handleMenuOpen received an invalid setter function:", setter);
  }
};

export const handleMenuClose = (setter) => {
  if (setter && typeof setter === "function") {
    setter(null);
  } else {
    console.warn("handleMenuClose received an invalid setter function:", setter);
  }
};

export const queryParams = ({ categoryFilter, priceFilter, searchQuery }) => {
  const params = new URLSearchParams();

  if (categoryFilter) {
    params.append("selectCategory", categoryFilter);
  }

  if (priceFilter?.length === 2) {
    params.append("minPrice", priceFilter[0]);
    params.append("maxPrice", priceFilter[1]);
  }

  if (searchQuery) {
    params.append("search", searchQuery);
  }

  return params.toString();
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const saveUser = (userWithToken) => {
  localStorage.setItem("user", JSON.stringify(userWithToken));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

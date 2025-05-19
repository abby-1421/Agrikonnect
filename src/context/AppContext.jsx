import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState({});
  const [profiles, setProfiles] = useState({});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("users")) || {};
    const p = JSON.parse(localStorage.getItem("profiles")) || {};
    const prod = JSON.parse(localStorage.getItem("products")) || [];
    setUsers(u);
    setProfiles(p);
    setProducts(prod);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("products", JSON.stringify(products));
  }, [users, profiles, products]);

  const value = {
    role,
    setRole,
    user,
    setUser,
    users,
    setUsers,
    profiles,
    setProfiles,
    products,
    setProducts,
    cart,
    setCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

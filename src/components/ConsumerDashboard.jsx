"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Package,
  Search,
  Leaf,
  Plus,
  Minus,
  X,
  ShoppingBag,
  AlertCircle,
  User,
} from "lucide-react";

function ConsumerDashboard() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [farmerFilter, setFarmerFilter] = useState("all");
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    // Load products and cart from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setProducts(storedProducts);
    setCart(storedCart);

    // Extract unique farmers from products
    const uniqueFarmers = [
      ...new Set(storedProducts.map((product) => product.farmerId)),
    ].map((farmerId) => {
      const product = storedProducts.find((p) => p.farmerId === farmerId);
      return {
        id: farmerId,
        name: product?.farmerName || "Unknown Farmer",
      };
    });

    setFarmers(uniqueFarmers);
  }, []);

  const handleAddToCart = (product) => {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item.productId === product.id);

    let updatedCart;
    if (existingItem) {
      // Update quantity if already in cart
      updatedCart = cart.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item to cart
      const newItem = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price || 0,
        quantity: 1,
        description: product.description,
        farmerId: product.farmerId,
        farmerName: product.farmerName,
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => {
        return total + Number.parseFloat(item.price) * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    const matchesFarmer =
      farmerFilter === "all" || product.farmerId === farmerFilter;

    return matchesSearch && matchesCategory && matchesFarmer;
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "grains", label: "Grains" },
    { value: "dairy", label: "Dairy" },
    { value: "meat", label: "Meat" },
  ];

  return (
    <div className="container mx-auto p-4 mt-16 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Consumer Dashboard
          </h2>
          <p className="text-gray-600">
            Browse and purchase fresh agricultural products
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors relative"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            View Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-auto">
            <select
              value={farmerFilter}
              onChange={(e) => setFarmerFilter(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Farmers</option>
              {farmers.map((farmer) => (
                <option key={farmer.id} value={farmer.id}>
                  {farmer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setIsCartOpen(false)}
            ></div>

            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Shopping Cart
                      </h2>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="ml-3 h-7 flex items-center"
                      >
                        <X className="h-6 w-6 text-gray-400 hover:text-gray-500" />
                      </button>
                    </div>

                    <div className="mt-8">
                      {cart.length > 0 ? (
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart.map((item) => (
                              <li key={item.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
                                  <Leaf className="h-6 w-6 text-green-600" />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">
                                        KSh{" "}
                                        {(item.price * item.quantity).toFixed(
                                          2
                                        )}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                                      {item.description}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                      Farmer: {item.farmerName}
                                    </p>
                                  </div>

                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.id,
                                            item.quantity - 1
                                          )
                                        }
                                        className="p-1 text-gray-600 hover:text-gray-800"
                                      >
                                        <Minus className="h-4 w-4" />
                                      </button>
                                      <span className="px-2">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() =>
                                          handleUpdateQuantity(
                                            item.id,
                                            item.quantity + 1
                                          )
                                        }
                                        className="p-1 text-gray-600 hover:text-gray-800"
                                      >
                                        <Plus className="h-4 w-4" />
                                      </button>
                                    </div>

                                    <button
                                      onClick={() =>
                                        handleRemoveFromCart(item.id)
                                      }
                                      className="font-medium text-red-600 hover:text-red-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <ShoppingCart className="h-12 w-12 mx-auto text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">
                            Your cart is empty
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Start shopping to add items to your cart.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>KSh {calculateTotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                        <p>
                          or{" "}
                          <button
                            onClick={() => setIsCartOpen(false)}
                            className="text-blue-600 font-medium hover:text-blue-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
          <Package className="h-5 w-5 mr-2 text-gray-500" />
          Available Products
        </h3>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id || Math.random()}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-white" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h4>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full mt-1">
                        {product.category || "Vegetables"}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      KSh {product.price || "0.00"}
                    </div>
                  </div>

                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    <span>Farmer: {product.farmerName || "Unknown"}</span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {product.quantity
                        ? `${product.quantity} available`
                        : "Out of stock"}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center py-2 px-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      disabled={!product.quantity}
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No products found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsumerDashboard;

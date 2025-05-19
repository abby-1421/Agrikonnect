"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Package,
  Truck,
  Tag,
  FileText,
  Leaf,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";

function FarmerDashboard() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("vegetables");
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load current user
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    // Load all products
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Filter products to only show this farmer's products
    if (user && user.id) {
      const farmerProducts = allProducts.filter(
        (product) => product.farmerId === user.id
      );
      setProducts(farmerProducts);
    }
  }, []);

  const handleProductPost = () => {
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity
    ) {
      setFormError("Please fill in all required fields");
      return;
    }

    if (!currentUser) {
      setFormError("You must be logged in to post products");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: productName,
      description: productDescription,
      price: productPrice,
      quantity: productQuantity,
      category: productCategory,
      createdAt: new Date().toISOString(),
      // Add farmer information to the product
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerEmail: currentUser.email,
    };

    // Get all existing products (from all farmers)
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedAllProducts = [...allProducts, newProduct];

    // Save all products back to localStorage
    localStorage.setItem("products", JSON.stringify(updatedAllProducts));

    // Update the local state with only this farmer's products
    setProducts([...products, newProduct]);

    // Reset form
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
    setProductCategory("vegetables");
    setFormError("");
    setIsFormOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    // Get all products
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Remove the product from all products
    const updatedAllProducts = allProducts.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("products", JSON.stringify(updatedAllProducts));

    // Update local state
    const updatedFarmerProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedFarmerProducts);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
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
          <h2 className="text-2xl font-bold text-gray-800">Farmer Dashboard</h2>
          <p className="text-gray-600">
            Welcome, {currentUser?.name || "Farmer"}! Manage your agricultural
            products
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center justify-center py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Your Products</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {products.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Orders Received
              </p>
              <h3 className="text-2xl font-bold text-gray-800">0</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Tag className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">KSh 0.00</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      {isFormOpen && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add New Product
            </h3>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>

          {formError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name*
              </label>
              <input
                id="productName"
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="productCategory"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category*
              </label>
              <select
                id="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Price (KSh)*
              </label>
              <input
                id="productPrice"
                type="number"
                placeholder="0.00"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label
                htmlFor="productQuantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Available Quantity*
              </label>
              <input
                id="productQuantity"
                type="number"
                placeholder="0"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description*
            </label>
            <textarea
              id="productDescription"
              placeholder="Describe your product"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsFormOpen(false)}
              className="mr-3 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleProductPost}
              className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-gray-500" />
              Your Products
            </h3>

            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredProducts.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id || Math.random()}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Leaf className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {product.category || "Vegetables"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      KSh {product.price || "0.00"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.quantity || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10">
              <Package className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No products
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new product.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Product
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;

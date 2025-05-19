"use client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Tractor,
  ShoppingCart,
  Leaf,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

function RoleSelection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of agricultural background images
  const backgroundImages = [
    "/agri-konnect-hero.jpg",
    "/agri-konnect-hero2.jpg",
    "/agri-konnect-hero3.jpg",
    "/agri-konnect-hero4.jpg",
    "/agri-konnect-hero5.jpg",
    "/agri-konnect-hero6.jpg",
    "/agri-konnect-hero7.jpg",
    "/agri-konnect-hero8.jpg",
  ];

  // Set up the slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRoleSelect = (role) => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen pt-24 relative py-4 px-4 overflow-hidden">
      {/* Background images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: currentImageIndex === index ? 1 : 0,
            zIndex: currentImageIndex === index ? 0 : -1,
          }}
        />
      ))}

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-[1]"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center h-full justify-between">
        {/* Header */}
        <div className="flex items-center justify-center mb-2 mt-2">
          <div className="bg-white bg-opacity-20 p-2 rounded-full backdrop-blur-sm">
            <Leaf className="h-8 w-8 text-green-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white ml-3">
            AgriKonnect
          </h1>
        </div>

        {/* Description */}
        <div className="bg-black bg-opacity-40 backdrop-blur-sm p-4 rounded-xl mb-4 text-center">
          <p className="text-xl md:text-2xl mb-2 text-white">
            A platform that connects farmers and consumers for seamless
            agricultural product exchange.
          </p>
          <p className="text-base mb-0 text-green-100">
            Whether you're a farmer looking to sell your products or a consumer
            searching for fresh produce, we've got you covered!
          </p>
        </div>

        {/* Role Selection */}
        <div className="w-full max-w-3xl px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleRoleSelect("farmer")}
              className="group bg-green-600 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg transition-all transform hover:scale-102 hover:bg-green-700 duration-300 p-4 text-left flex flex-col h-full border border-green-500"
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Tractor className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold ml-3 text-white">
                  I'm a Farmer
                </h2>
              </div>
              <p className="text-green-100 mb-2 text-base">
                Sell your agricultural products directly to consumers and grow
                your business.
              </p>
              <div className="mt-auto flex items-center text-green-200 group-hover:text-white text-base font-medium">
                Get started{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect("consumer")}
              className="group bg-blue-600 bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg transition-all transform hover:scale-102 hover:bg-blue-700 duration-300 p-4 text-left flex flex-col h-full border border-blue-500"
            >
              <div className="flex items-center mb-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold ml-3 text-white">
                  I'm a Consumer
                </h2>
              </div>
              <p className="text-blue-100 mb-2 text-base">
                Find fresh, locally-grown produce directly from farmers in your
                area.
              </p>
              <div className="mt-auto flex items-center text-blue-200 group-hover:text-white text-base font-medium">
                Get started{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center max-w-2xl bg-black bg-opacity-40 backdrop-blur-sm p-3 rounded-xl mb-2">
          <ChevronDown className="h-5 w-5 mx-auto mb-1 animate-bounce text-white/70" />
          <p className="text-sm text-green-100 mb-1">
            By choosing your role, you gain access to an easy-to-use platform
            that brings together both sides of the agricultural community.
          </p>
          <p className="text-sm text-green-100">
            Ready to get started? Just pick your role and join the future of
            agriculture!
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;

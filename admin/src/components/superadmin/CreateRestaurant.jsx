import React, { useState } from "react";
import axios from "axios";

const CreateRestaurant = () => {
  const [data, setData] = useState({
    restaurantName: "",
    slug: "",
    themeColor: "#ff4d4d",
    adminName: "",
    adminEmail: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("superAdminToken");

      const res = await axios.post(
        "http://localhost:4000/api/superadmin/create-restaurant",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        `Restaurant Created Successfully. Temporary Password: ${res.data.tempPassword}`
      );

      setData({
        restaurantName: "",
        slug: "",
        themeColor: "#ff4d4d",
        adminName: "",
        adminEmail: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating restaurant");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-5">Create New Restaurant</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="restaurantName"
          placeholder="Restaurant Name"
          value={data.restaurantName}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        <input
          name="slug"
          placeholder="Slug (unique id)"
          value={data.slug}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        <input
          name="adminName"
          placeholder="Admin Name"
          value={data.adminName}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        <input
          name="adminEmail"
          placeholder="Admin Email"
          value={data.adminEmail}
          onChange={handleChange}
          className="w-full p-2 border"
          required
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;

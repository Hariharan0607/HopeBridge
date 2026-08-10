import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    role: "donor",

    trustName: "",
    registrationNumber: "",
    category: "",
    description: "",
    address: "",
    beneficiaries: "",
    certificate: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("REGISTER DATA:", form);
      console.log("API URL:", API.defaults.baseURL);

      const response = await API.post("/auth/register", form);

      console.log("REGISTER RESPONSE:", response.data);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {
      console.error("REGISTRATION ERROR:", err);

      if (err.response) {
        console.error("STATUS:", err.response.status);
        console.error("SERVER RESPONSE:", err.response.data);

        alert(
          `Registration failed: ${err.response.status}\n` +
          `${err.response.data?.message || JSON.stringify(err.response.data)}`
        );
      } else if (err.request) {
        console.error("NO RESPONSE FROM SERVER:", err.request);

        alert(
          "Registration failed: No response from server.\n" +
          "Please check the backend URL and Render deployment."
        );
      } else {
        console.error("REQUEST ERROR:", err.message);

        alert(`Registration failed: ${err.message}`);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-5">

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl"
      >

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Register
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border rounded-lg p-3"
            value={form.name}
            onChange={changeHandler}
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            value={form.email}
            onChange={changeHandler}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-lg p-3"
            value={form.password}
            onChange={changeHandler}
            required
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border rounded-lg p-3"
            value={form.phone}
            onChange={changeHandler}
          />

          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border rounded-lg p-3"
            value={form.location}
            onChange={changeHandler}
          />

        </div>

        {/* REGISTER AS */}
        <div className="mt-6">

          <h2 className="font-semibold text-gray-700 mb-3">
            Register As
          </h2>

          <div className="grid grid-cols-2 gap-4">

            {/* DONOR */}
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  role: "donor",
                })
              }
              className={`p-4 rounded-xl border-2 transition ${
                form.role === "donor"
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white border-gray-300"
              }`}
            >
              👤 Donor
            </button>

            {/* TRUST */}
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  role: "trust",
                })
              }
              className={`p-4 rounded-xl border-2 transition ${
                form.role === "trust"
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white border-gray-300"
              }`}
            >
              🏢 Trust
            </button>

          </div>

        </div>

        {/* TRUST FIELDS */}
        {form.role === "trust" && (

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            {/* TRUST NAME */}
            <input
              type="text"
              name="trustName"
              placeholder="Trust Name"
              className="border rounded-lg p-3"
              value={form.trustName}
              onChange={changeHandler}
            />

            {/* REGISTRATION NUMBER */}
            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              className="border rounded-lg p-3"
              value={form.registrationNumber}
              onChange={changeHandler}
            />

            {/* CATEGORY */}
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="border rounded-lg p-3"
              value={form.category}
              onChange={changeHandler}
            />

            {/* BENEFICIARIES */}
            <input
              type="number"
              name="beneficiaries"
              placeholder="Beneficiaries"
              className="border rounded-lg p-3"
              value={form.beneficiaries}
              onChange={changeHandler}
            />

            {/* ADDRESS */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border rounded-lg p-3 md:col-span-2"
              value={form.address}
              onChange={changeHandler}
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              className="border rounded-lg p-3 md:col-span-2"
              value={form.description}
              onChange={changeHandler}
            />

          </div>

        )}

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-4 rounded-xl text-lg font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN */}
        <p className="text-center mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-green-700 font-semibold ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}
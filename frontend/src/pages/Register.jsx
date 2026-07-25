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
    certificate: ""
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

      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message || "Registration Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center py-10">

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl"
      >

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Register
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border rounded-lg p-3"
            value={form.name}
            onChange={changeHandler}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            value={form.email}
            onChange={changeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border rounded-lg p-3"
            value={form.password}
            onChange={changeHandler}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border rounded-lg p-3"
            value={form.phone}
            onChange={changeHandler}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border rounded-lg p-3"
            value={form.location}
            onChange={changeHandler}
          />

          <div className="mt-6">

  <label className="block mb-3 font-semibold text-gray-700">
    Register As
  </label>

  <div className="grid grid-cols-2 gap-4">

    <button
      type="button"
      onClick={() => setForm({ ...form, role: "donor" })}
      className={`p-4 rounded-xl border-2 transition ${
        form.role === "donor"
          ? "bg-green-700 text-white border-green-700"
          : "bg-white border-gray-300"
      }`}
    >
      👤 Donor
    </button>

    <button
      type="button"
      onClick={() => setForm({ ...form, role: "trust" })}
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

        </div>

        {form.role === "trust" && (

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <input
              type="text"
              name="trustName"
              placeholder="Trust Name"
              className="border rounded-lg p-3"
              value={form.trustName}
              onChange={changeHandler}
            />

            <input
              type="text"
              name="registrationNumber"
              placeholder="Registration Number"
              className="border rounded-lg p-3"
              value={form.registrationNumber}
              onChange={changeHandler}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              className="border rounded-lg p-3"
              value={form.category}
              onChange={changeHandler}
            />

            <input
              type="number"
              name="beneficiaries"
              placeholder="Beneficiaries"
              className="border rounded-lg p-3"
              value={form.beneficiaries}
              onChange={changeHandler}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border rounded-lg p-3 md:col-span-2"
              value={form.address}
              onChange={changeHandler}
            />

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

        <button
          type="submit"
          className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg font-semibold"
        >
          {loading ? "Registering..." : "Register"}
        </button>

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
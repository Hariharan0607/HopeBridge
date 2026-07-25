import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      const role = res.data.data.role;

      switch (role) {
  case "donor":
    navigate("/donor-dashboard");
    break;

  case "trust":
    navigate("/trust-dashboard");
    break;

  case "admin":
    navigate("/admin-dashboard");
    break;

  default:
    navigate("/");
}
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">

      <form
        onSubmit={submitHandler}
        className="bg-white w-107.5 shadow-xl rounded-2xl p-10"
      >

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={changeHandler}
          className="w-full border rounded-lg p-4 mb-5 outline-green-700"
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={changeHandler}
          className="w-full border rounded-lg p-4 mb-6 outline-green-700"
          required
        />

        <button
          className="w-full bg-green-700 text-white py-4 rounded-xl font-semibold hover:bg-green-800"
        >
          {loading ? "Please Wait..." : "Login"}
        </button>

        <p className="text-center mt-6">
          Don't have an account?

          <Link
            to="/register"
            className="text-green-700 font-bold ml-2"
          >
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}
// src/pages/Donate.jsx

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import API from "../services/api";

export default function Donate() {
  const [trusts, setTrusts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    trustId: "",
    amount: "",
  });

  useEffect(() => {
    getTrusts();
  }, []);

  const getTrusts = async () => {
    try {
      // If you don't have this API yet,
      // replace with your own trust endpoint.
      const res = await API.get("/trust");

      setTrusts(res.data.data || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Manual Donation

  const donate = async () => {
    try {
      setLoading(true);

      await API.post("/donations", form);

      alert("Donation Successful");

      setForm({
        trustId: "",
        amount: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Donation Failed");
    }

    setLoading(false);
  };

  // Smart Donation

  const smartDonate = async () => {
    try {
      setLoading(true);

      await API.post("/donations/smart", {
        amount: form.amount,
      });

      alert("Smart Donation Successful");

      setForm({
        trustId: "",
        amount: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Donation Failed");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50 py-10">

        <div className="max-w-5xl mx-auto">

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <h1 className="text-4xl font-bold text-green-700 text-center mb-10">
              Donate
            </h1>

            {/* TRUST */}

            <div className="mb-6">

              <label className="font-semibold block mb-2">
                Select Trust
              </label>

              <select
                className="w-full border rounded-xl p-4"
                name="trustId"
                value={form.trustId}
                onChange={changeHandler}
              >
                <option value="">Choose Trust</option>

                {trusts.map((trust) => (
                  <option key={trust._id} value={trust._id}>
                    {trust.trustName}
                  </option>
                ))}
              </select>

            </div>

            {/* AMOUNT */}

            <div className="mb-8">

              <label className="font-semibold block mb-2">

                Donation Amount

              </label>

              <input
                type="number"
                placeholder="Enter Amount"
                name="amount"
                value={form.amount}
                onChange={changeHandler}
                className="w-full border rounded-xl p-4"
              />

            </div>

            {/* QUICK AMOUNTS */}

            <div className="grid grid-cols-4 gap-4 mb-10">

              {[500, 1000, 2500, 5000].map((amt) => (
                <button
                  key={amt}
                  onClick={() =>
                    setForm({
                      ...form,
                      amount: amt,
                    })
                  }
                  className="border rounded-xl py-3 hover:bg-green-700 hover:text-white"
                >
                  ₹{amt}
                </button>
              ))}

            </div>

            {/* BUTTONS */}

            <div className="grid md:grid-cols-2 gap-6">

              <button
                onClick={donate}
                className="bg-green-700 text-white py-4 rounded-xl text-lg font-semibold hover:bg-green-800"
              >
                {loading ? "Processing..." : "Donate"}
              </button>

              <button
                onClick={smartDonate}
                className="bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700"
              >
                Smart Donate 🤖
              </button>

            </div>

            {/* INFORMATION */}

            <div className="mt-12 bg-green-100 rounded-xl p-6">

              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Smart Donation
              </h2>

              <p className="text-gray-700 leading-8">

                Smart Donation automatically allocates your donation
                to the trust with the highest priority score based on

                <br />

                ✔ Urgency

                <br />

                ✔ Number of Beneficiaries

                <br />

                ✔ Funds Needed

                <br />

                ✔ Funds Already Received

              </p>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}
// src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import API from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function AdminDashboard() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get("/dashboard/admin");

      setData(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

if(loading){
    return <LoadingSpinner/>
}

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-green-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <h1 className="text-4xl font-bold text-green-700 mb-10">
            Admin Dashboard
          </h1>

          {/* SUMMARY */}

          <div className="grid md:grid-cols-5 gap-6">

            <Card
              title="Users"
              value={data.totalUsers}
            />

            <Card
              title="Trusts"
              value={data.totalTrusts}
            />

            <Card
              title="Donations"
              value={data.totalDonations}
            />

            <Card
              title="Amount"
              value={`₹${data.totalDonationAmount}`}
            />

            <Card
              title="High Priority"
              value={data.highPriorityRequirements}
            />

          </div>

          {/* QUICK ACTIONS */}

          <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">

              Admin Actions

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

              <button className="bg-green-700 text-white rounded-xl py-4">
                Verify Trusts
              </button>

              <button className="bg-blue-600 text-white rounded-xl py-4">
                View Donations
              </button>

              <button className="bg-orange-500 text-white rounded-xl py-4">
                Requirements
              </button>

              <button className="bg-red-600 text-white rounded-xl py-4">
                Reports
              </button>

            </div>

          </div>

          {/* DONATION OVERVIEW */}

          <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-8">

              Donation Overview

            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <Box
                title="Today's Donation"
                value="₹12,000"
              />

              <Box
                title="Weekly Donation"
                value="₹58,000"
              />

              <Box
                title="Monthly Donation"
                value={`₹${data.totalDonationAmount}`}
              />

            </div>

          </div>

          {/* TRUST STATUS */}

          <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-8">

              Trust Verification

            </h2>

            <table className="w-full">

              <thead className="bg-green-700 text-white">

                <tr>

                  <th className="p-4">Trust</th>

                  <th>Status</th>

                  <th>Priority</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b text-center">

                  <td className="p-4">
                    Hope Trust
                  </td>

                  <td>
                    Pending
                  </td>

                  <td>
                    145
                  </td>

                  <td>

                    <button className="bg-green-700 text-white px-4 py-2 rounded-lg">

                      Verify

                    </button>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* ANALYTICS */}

          <div className="bg-white rounded-2xl shadow-lg mt-10 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-8">

              Analytics

            </h2>

            <div className="h-72 flex justify-center items-center border-2 border-dashed rounded-xl text-gray-500">

              Chart.js Graph will be added here

            </div>

          </div>

        </div>

      </div>

    </>
  );

}

function Card({ title, value }) {

  return (

    <div className="bg-white shadow-lg rounded-xl p-8">

      <h3 className="text-gray-500">

        {title}

      </h3>

      <h1 className="text-4xl font-bold text-green-700 mt-3">

        {value}

      </h1>

    </div>

  );

}

function Box({ title, value }) {

  return (

    <div className="bg-green-50 rounded-xl p-8">

      <h3 className="text-gray-500">

        {title}

      </h3>

      <h1 className="text-3xl font-bold mt-3 text-green-700">

        {value}

      </h1>

    </div>

  );

}
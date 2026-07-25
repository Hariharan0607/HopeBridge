import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/layout/Navbar";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function DonorDashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get("/dashboard/donor");

      setDashboard(res.data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };


if(loading){
    return <LoadingSpinner/>
}

  return (

    <>

      <Navbar />

      <div className="bg-green-50 min-h-screen">

        <div className="max-w-7xl mx-auto py-10 px-6">

          <h1 className="text-4xl font-bold text-green-700 mb-10">

            Donor Dashboard

          </h1>

          {/* CARDS */}

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-gray-500">

                Total Donated

              </h2>

              <h1 className="text-4xl font-bold mt-3 text-green-700">

                ₹{dashboard.totalDonated}

              </h1>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-gray-500">

                Donations Made

              </h2>

              <h1 className="text-4xl font-bold mt-3 text-green-700">

                {dashboard.totalDonations}

              </h1>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-gray-500">

                Verified Trusts

              </h2>

              <h1 className="text-4xl font-bold mt-3 text-green-700">

                {dashboard.verifiedTrusts.length}

              </h1>

            </div>

          </div>

          {/* VERIFIED TRUSTS */}

          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-6">

              Verified Trusts

            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {

                dashboard.verifiedTrusts.map((trust) => (

                  <div
                    key={trust._id}
                    className="bg-white rounded-xl shadow-md p-6"
                  >

                    <h2 className="text-2xl font-bold text-green-700">

                      {trust.trustName}

                    </h2>

                    <p className="mt-3">

                      {trust.category}

                    </p>

                    <p>

                      {trust.address}

                    </p>

                    <button
    onClick={() => window.location.href = "/donate"}
    className="mt-5 bg-green-700 text-white px-5 py-3 rounded-lg w-full"
>
    Donate
</button>

                  </div>

                ))

              }

            </div>

          </div>

          {/* RECENT DONATIONS */}

          <div className="mt-16">

            <h2 className="text-3xl font-bold mb-6">

              Donation History

            </h2>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

              <table className="w-full">

                <thead className="bg-green-700 text-white">

                  <tr>

                    <th className="p-4">

                      Trust

                    </th>

                    <th>

                      Amount

                    </th>

                    <th>

                      Status

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {

                    dashboard.recentDonations.map((item) => (

                      <tr
                        key={item._id}
                        className="text-center border-b"
                      >

                        <td className="p-4">

                          {item.trustId?.trustName}

                        </td>

                        <td>

                          ₹{item.amount}

                        </td>

                        <td className="text-green-700 font-semibold">

                          {item.paymentStatus}

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}
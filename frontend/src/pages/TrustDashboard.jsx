import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import API from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function TrustDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [prediction,setPrediction]=useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchPrediction();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await API.get("/dashboard/trust");

      setDashboard(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };
  const fetchPrediction=async()=>{

try{

const res=await API.get("/predict");

setPrediction(res.data.prediction);

}

catch(err){

console.log(err);

}

}

  if(loading){
    return <LoadingSpinner/>
}

  return (

    <>

      <Navbar />

      <div className="bg-green-50 min-h-screen">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <h1 className="text-4xl font-bold text-green-700 mb-10">

            Trust Dashboard

          </h1>

          {/* SUMMARY */}

          <div className="grid md:grid-cols-4 gap-8">

            <Card
              title="Funds Received"
              value={`₹${dashboard.totalFundsReceived}`}
            />

            <Card
              title="Remaining Funds"
              value={`₹${dashboard.remainingFunds}`}
            />

            <Card
              title="Total Donations"
              value={dashboard.totalDonations}
            />

            <Card
              title="Priority Score"
              value={dashboard.trust.priorityScore}
            />

          </div>

          {/* TRUST DETAILS */}

          <div className="bg-white rounded-2xl shadow-lg mt-12 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">

              Trust Details

            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <Info title="Trust Name" value={dashboard.trust.trustName} />

              <Info title="Category" value={dashboard.trust.category} />

              <Info title="Address" value={dashboard.trust.address} />

              <Info
                title="Beneficiaries"
                value={dashboard.trust.beneficiaries}
              />

              <Info
                title="Verification"
                value={dashboard.trust.verificationStatus}
              />

              <Info
                title="Priority Score"
                value={dashboard.trust.priorityScore}
              />

            </div>

          </div>

          {/* REQUIREMENT */}

          <div className="bg-white rounded-2xl shadow-lg mt-12 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">

              Current Requirement

            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <Info
                title="Funds Needed"
                value={`₹${dashboard.requirement?.fundsNeeded}`}
              />

              <Info
                title="Urgency"
                value={dashboard.requirement?.urgencyLevel}
              />

              <Info
                title="Description"
                value={dashboard.requirement?.description}
              />

            </div>

          </div>

          {/* AI PANEL */}

          <div className="bg-linear-to-r from-green-700 to-green-500 text-white rounded-2xl mt-12 p-10">

            <h2 className="text-3xl font-bold mb-8">

              🤖 AI Prediction

            </h2>

            <div className="grid md:grid-cols-4 gap-6">

              <Prediction
title="Funds Needed"
value={`₹${prediction?.predictedFunds || 0}`}
/>

              <Prediction
title="Food Packs"
value={prediction?.food || 0}
/>

              <Prediction
title="Clothes"
value={prediction?.clothes || 0}
/>

              <Prediction
title="Confidence"
value={prediction?.confidence}
/>

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

      <h1 className="text-4xl font-bold mt-4 text-green-700">

        {value}

      </h1>

    </div>

  );

}

function Info({ title, value }) {

  return (

    <div>

      <h3 className="font-semibold text-gray-500">

        {title}

      </h3>

      <p className="text-xl mt-2">

        {value}

      </p>

    </div>

  );

}

function Prediction({ title, value }) {

  return (

    <div className="bg-white/20 rounded-xl p-6">

      <h3>

        {title}

      </h3>

      <h1 className="text-4xl font-bold mt-4">

        {value}

      </h1>

    </div>

  );

}
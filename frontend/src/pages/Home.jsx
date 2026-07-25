import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  FaDonate,
  FaUsers,
  FaBuilding,
  FaRobot,
  FaChartLine,
  FaShieldAlt,
  FaHandHoldingHeart
} from "react-icons/fa";

export default function Home() {

  return (

    <>

      <Navbar />

      {/* HERO */}

      <section className="bg-green-50">

        <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 items-center gap-12">

          <div>

            <span className="text-green-700 font-semibold">

              SMART DONATION PLATFORM

            </span>

            <h1 className="text-6xl font-extrabold mt-4 leading-tight">

              Connecting

              <br />

              Kindness

              <br />

              with Needs

            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-8">

              HopeBridge connects donors with verified trusts using
              intelligent donation allocation,
              transparent tracking,
              analytics and AI-powered prediction.

            </p>

            <div className="mt-10 flex gap-5">

              <Link
                to="/donate"
                className="bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800"
              >
                Donate Now
              </Link>

              <Link
                to="/register"
                className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-xl hover:bg-green-700 hover:text-white"
              >
                Register Trust
              </Link>

            </div>

          </div>

          <div>

            <img

              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900"

              className="rounded-3xl shadow-2xl"

            />

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto py-20 px-8 grid md:grid-cols-4 gap-8">

        <Card icon={<FaDonate />} title="₹2.5L+" text="Funds Raised" />

        <Card icon={<FaUsers />} title="150+" text="Donors" />

        <Card icon={<FaBuilding />} title="30+" text="Verified Trusts" />

        <Card icon={<FaHandHoldingHeart />} title="1000+" text="Lives Impacted" />

      </section>

      {/* ABOUT */}

      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto text-center px-8">

          <h2 className="text-5xl font-bold text-green-700">

            About HopeBridge

          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-9">

            HopeBridge is a full-stack smart donation platform
            connecting donors,
            trusts,
            and orphanages through transparency,
            priority-based allocation
            and AI-powered demand forecasting.

          </p>

        </div>

      </section>

      {/* FEATURES */}

      <section className="bg-green-50 py-24">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-center text-5xl font-bold text-green-700">

            Why HopeBridge?

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            <Feature icon={<FaShieldAlt />} title="Secure Donation" />

            <Feature icon={<FaChartLine />} title="Priority Queue" />

            <Feature icon={<FaRobot />} title="AI Prediction" />

            <Feature icon={<FaHandHoldingHeart />} title="Transparency" />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-green-700 text-white text-center py-24">

        <h2 className="text-5xl font-bold">

          Every Donation Creates Hope ❤️

        </h2>

        <p className="mt-6 text-xl">

          Join thousands of donors supporting verified trusts.

        </p>

        <Link
          to="/register"
          className="inline-block mt-10 bg-white text-green-700 px-10 py-4 rounded-xl font-bold"
        >
          Get Started
        </Link>

      </section>

      <Footer />

    </>

  );

}

function Card({ icon, title, text }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

      <div className="text-green-700 text-5xl flex justify-center">

        {icon}

      </div>

      <h2 className="text-3xl font-bold mt-5">

        {title}

      </h2>

      <p className="mt-3 text-gray-500">

        {text}

      </p>

    </div>

  );

}

function Feature({ icon, title }) {

  return (

    <div className="bg-white rounded-2xl shadow-xl p-10 hover:-translate-y-2 transition">

      <div className="text-green-700 text-5xl">

        {icon}

      </div>

      <h2 className="mt-6 text-2xl font-bold">

        {title}

      </h2>

      <p className="mt-4 text-gray-600">

        Smart, secure and transparent donation management for a better future.

      </p>

    </div>

  );

}
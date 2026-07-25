import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-20">

      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

        <div>

          <h2 className="text-3xl font-bold">

            HopeBridge

          </h2>

          <p className="mt-4 text-green-100">

            Smart Donation & Trust Management Platform

          </p>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-4">

            Quick Links

          </h3>

          <ul className="space-y-2">

            <li>Home</li>

            <li>Donate</li>

            <li>Register</li>

            <li>Login</li>

          </ul>

        </div>

        <div>

          <h3 className="text-xl font-semibold mb-4">

            Follow

          </h3>

          <div className="flex gap-5 text-2xl">

            <FaGithub />

            <FaLinkedin />

          </div>

        </div>

      </div>

      <div className="border-t border-green-600 py-4 text-center">

        © 2026 HopeBridge. All Rights Reserved.

      </div>

    </footer>
  );
}
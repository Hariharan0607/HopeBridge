import { Link } from "react-router-dom";

export default function NotFound() {

    return (

        <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center">

            <h1 className="text-8xl font-bold text-green-700">

                404

            </h1>

            <p className="text-2xl mt-5 text-gray-600">

                Page Not Found

            </p>

            <Link
                to="/"
                className="mt-8 bg-green-700 text-white px-8 py-3 rounded-xl hover:bg-green-800"
            >

                Back To Home

            </Link>

        </div>

    );

}
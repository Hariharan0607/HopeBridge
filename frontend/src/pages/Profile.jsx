import Navbar from "../components/layout/Navbar";

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <>

            <Navbar />

            <div className="min-h-screen bg-green-50">

                <div className="max-w-4xl mx-auto py-10">

                    <div className="bg-white rounded-2xl shadow-lg p-10">

                        <h1 className="text-4xl font-bold text-green-700 mb-8">

                            My Profile

                        </h1>

                        <div className="grid md:grid-cols-2 gap-6">

                            <ProfileItem
                                title="Name"
                                value={user?.name}
                            />

                            <ProfileItem
                                title="Email"
                                value={user?.email}
                            />

                            <ProfileItem
                                title="Phone"
                                value={user?.phone}
                            />

                            <ProfileItem
                                title="Location"
                                value={user?.location}
                            />

                            <ProfileItem
                                title="Role"
                                value={user?.role}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

function ProfileItem({ title, value }) {

    return (

        <div className="bg-green-50 rounded-xl p-6">

            <h3 className="text-gray-500">

                {title}

            </h3>

            <p className="text-xl font-semibold mt-2">

                {value || "-"}

            </p>

        </div>

    );

}
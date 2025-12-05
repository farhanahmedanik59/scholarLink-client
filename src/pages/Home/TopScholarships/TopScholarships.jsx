import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const TopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: scholarships = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships/top");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-gray-300 py-10">Loading scholarships...</p>;

  if (isError) return <p className="text-center text-red-500 py-10">Failed to load scholarships.</p>;
  return (
    <section className="bg-[#0F1A2C] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Top Scholarships for You</h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">Explore fully funded and partially funded scholarships from top universities worldwide.</p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((sch) => (
            <div
              key={sch._id}
              className="bg-gray-900/60 border border-gray-700
              rounded-2xl p-6 backdrop-blur-xl shadow-lg hover:shadow-xl
              transition duration-300"
            >
              {/* University Image */}
              <img src={sch.universityImage} alt={sch.universityName} className="w-full h-40 object-cover rounded-xl mb-4" />

              {/* Scholarship Name */}
              <h3 className="text-xl font-semibold text-white mb-1">{sch.scholarshipName}</h3>

              {/* University Name + Location */}
              <p className="text-gray-300 text-sm mb-3">
                {sch.universityName} — {sch.universityCity}, {sch.universityCountry}
              </p>

              {/* Degree + Category */}
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-white font-medium">Degree:</span> {sch.degree}
              </p>

              <p className="text-gray-300 text-sm mb-2">
                <span className="text-white font-medium">Category:</span> {sch.scholarshipCategory}
              </p>

              {/* Fees */}
              <p className="text-gray-300 text-sm mb-2">
                <span className="text-white font-medium">Tuition Fees:</span> ${sch.tuitionFees}
              </p>

              <p className="text-gray-300 text-sm mb-4">
                <span className="text-white font-medium">Application Fee:</span> ${sch.applicationFees}
              </p>

              {/* Button */}
              <Link
                to={`/scholarships/${sch._id}`}
                className="block w-full bg-gray-900 py-2 rounded-xl 
                text-white text-center font-medium hover:bg-gray-800 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;

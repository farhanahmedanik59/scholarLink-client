import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaGraduationCap, FaEdit, FaTrash, FaTimes, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", "all"],
    queryFn: async () => {
      const response = await axiosSecure.get("/adminScholarships");
      return response.data;
    },
  });

  const handleUpdateClick = (scholarship) => {
    setSelectedScholarship(scholarship);
    reset({
      scholarshipName: scholarship.scholarshipName || "",
      universityName: scholarship.universityName || "",
      universityImage: scholarship.universityImage || "",
      universityCountry: scholarship.universityCountry || "",
      universityCity: scholarship.universityCity || "",
      universityWorldRank: scholarship.universityWorldRank || "",
      subjectCategory: scholarship.subjectCategory || "Science",
      scholarshipCategory: scholarship.scholarshipCategory || "Full fund",
      degree: scholarship.degree || "Masters",
      tuitionFees: scholarship.tuitionFees || "",
      applicationFees: scholarship.applicationFees || "100",
      serviceCharge: scholarship.serviceCharge || "50",
      applicationDeadline: scholarship.applicationDeadline?.split("T")[0] || "",
    });
    setShowUpdateModal(true);
  };

  const handleDelete = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const onSubmit = async (formData) => {
    try {
      const updatedData = {
        ...formData,
        universityWorldRank: Number(formData.universityWorldRank),
        tuitionFees: Number(formData.tuitionFees),
        applicationFees: Number(formData.applicationFees),
        serviceCharge: Number(formData.serviceCharge),
      };

      await axiosSecure.patch(`/scholarships/${selectedScholarship._id}`, updatedData);
      alert("Updated");
      setShowUpdateModal(false);
      refetch();
    } catch (error) {
      alert("Update failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-red-400">Failed to load</p>
        </div>
      </div>
    );
  }

  const scholarships = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-10 px-4">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
            <FaGraduationCap className="text-white text-3xl" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Manage Scholarships</h1>
          <p className="text-gray-300">Total: {scholarships.length}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl overflow-hidden border border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700/50">
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Scholarship</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">University</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Location</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Fees</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <p className="text-gray-400">No scholarships found</p>
                    </td>
                  </tr>
                ) : (
                  scholarships.map((scholarship) => (
                    <tr key={scholarship._id} className="border-b border-gray-700/30 hover:bg-gray-800/20">
                      <td className="py-4 px-6">
                        <p className="text-white font-medium">{scholarship.scholarshipName}</p>
                        <p className="text-gray-400 text-sm">{scholarship.subjectCategory}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-white">{scholarship.universityName}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-white">
                          {scholarship.universityCity}, {scholarship.universityCountry}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-white">${scholarship.tuitionFees?.toLocaleString()}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateClick(scholarship)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-900/30 to-blue-800/30 text-blue-300 border border-blue-700/30 hover:bg-blue-900/40"
                          >
                            <FaEdit className="inline mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(scholarship._id)}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-300 border border-red-700/30 hover:bg-red-900/40"
                          >
                            <FaTrash className="inline mr-2" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showUpdateModal && selectedScholarship && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50">
              <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                <h2 className="text-2xl font-bold text-white">Update Scholarship</h2>
                <button onClick={() => setShowUpdateModal(false)} className="p-2 text-gray-400 hover:text-white">
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white block mb-2">Scholarship Name</label>
                    <input {...register("scholarshipName")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">University Name</label>
                    <input {...register("universityName")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">Country</label>
                    <input {...register("universityCountry")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">City</label>
                    <input {...register("universityCity")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">World Rank</label>
                    <input type="number" {...register("universityWorldRank")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">Subject Category</label>
                    <select {...register("subjectCategory")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white">
                      <option value="Engineering">Engineering</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Business">Business</option>
                      <option value="Medicine">Medicine</option>
                      <option value="Arts">Arts</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white block mb-2">Funding Type</label>
                    <select {...register("scholarshipCategory")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white">
                      <option value="Full fund">Full fund</option>
                      <option value="Partial fund">Partial fund</option>
                      <option value="Research">Research</option>
                      <option value="Merit-based">Merit-based</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white block mb-2">Degree</label>
                    <select {...register("degree")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white">
                      <option value="Bachelors">Bachelors</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white block mb-2">Tuition Fees ($)</label>
                    <input type="number" {...register("tuitionFees")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">Application Fee ($)</label>
                    <input type="number" {...register("applicationFees")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">Service Charge ($)</label>
                    <input type="number" {...register("serviceCharge")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>

                  <div>
                    <label className="text-white block mb-2">Application Deadline</label>
                    <input type="date" {...register("applicationDeadline")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                  </div>
                </div>

                <div>
                  <label className="text-white block mb-2">University Image URL</label>
                  <input {...register("universityImage")} className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-700/50">
                  <button type="button" onClick={() => setShowUpdateModal(false)} className="px-6 py-2 rounded-lg bg-gray-800/50 text-gray-300 border border-gray-700">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600">
                    <FaSave className="inline mr-2" />
                    Update Scholarship
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageScholarships;

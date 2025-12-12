import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaGraduationCap, FaPaperPlane } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddScholarships = () => {
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const scholarshipData = {
        ...data,
        universityWorldRank: Number(data.universityWorldRank),
        tuitionFees: Number(data.tuitionFees),
        applicationFees: Number(data.applicationFees),
        serviceCharge: Number(data.serviceCharge),
      };

      await axiosSecure.post("/scholarships", scholarshipData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Scholarship Added!",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F1A2C] to-[#1A2B4D] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-4">
            <FaGraduationCap className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Add New Scholarship</h1>
          <p className="text-gray-300">Fill in the details below</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white block mb-2">Scholarship Name *</label>
                <input
                  {...register("scholarshipName", { required: true })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white"
                  placeholder="Global Excellence Scholarship"
                />
                {errors.scholarshipName && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>

              <div>
                <label className="text-white block mb-2">University Name *</label>
                <input {...register("universityName", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" placeholder="Harvard University" />
                {errors.universityName && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>
            </div>

            <div>
              <label className="text-white block mb-2">University Image URL</label>
              <input {...register("universityImage")} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" placeholder="https://example.com/image.jpg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white block mb-2">Country *</label>
                <input {...register("universityCountry", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" placeholder="USA" />
                {errors.universityCountry && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>

              <div>
                <label className="text-white block mb-2">City *</label>
                <input {...register("universityCity", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" placeholder="Cambridge" />
                {errors.universityCity && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white block mb-2">World Rank *</label>
                <input
                  type="number"
                  {...register("universityWorldRank", { required: true, min: 1 })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white"
                  placeholder="2"
                />
                {errors.universityWorldRank && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>

              <div>
                <label className="text-white block mb-2">Subject Category *</label>
                <select {...register("subjectCategory", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white">
                  <option value="">Select</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Business">Business</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                </select>
                {errors.subjectCategory && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white block mb-2">Funding Type *</label>
                <select {...register("scholarshipCategory", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white">
                  <option value="Full fund">Full fund</option>
                  <option value="Partial fund">Partial fund</option>
                  <option value="Research">Research</option>
                  <option value="Merit-based">Merit-based</option>
                </select>
                {errors.scholarshipCategory && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>

              <div>
                <label className="text-white block mb-2">Degree *</label>
                <select {...register("degree", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white">
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Diploma">Diploma</option>
                </select>
                {errors.degree && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white block mb-2">Tuition Fees ($) *</label>
                <input
                  type="number"
                  {...register("tuitionFees", { required: true, min: 0 })}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white"
                  placeholder="50000"
                />
                {errors.tuitionFees && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>

              <div>
                <label className="text-white block mb-2">Application Fee ($)</label>
                <input type="number" {...register("applicationFees", { min: 0 })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" placeholder="100" />
              </div>

              <div>
                <label className="text-white block mb-2">Service Charge ($)</label>
                <input type="number" {...register("serviceCharge", { min: 0 })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" placeholder="50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 ">
              <div>
                <label className="text-white block mb-2">Application Deadline *</label>
                <input type="date" {...register("applicationDeadline", { required: true })} className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white" />
                {errors.applicationDeadline && <p className="text-red-400 text-sm mt-1">Required</p>}
              </div>
            </div>

            <div>
              <label className="text-white block mb-2">Posted By Email *</label>
              <input
                type="email"
                {...register("postedUserEmail", { required: true })}
                value={user.email}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white"
                placeholder="admin@scholarships.com"
              />
              {errors.postedUserEmail && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
              >
                <FaPaperPlane className="w-5 h-5" />
                Add Scholarship
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScholarships;

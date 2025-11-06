"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAccount } from "../store/accountSlice";

export default function AccountForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch(); // ✅ Fixed: Moved before onSubmit

  const onSubmit = (data) => {
    dispatch(addAccount(data));
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4  py-6">
      <div className="w-full max-w-lg bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg overflow-y-auto max-h-[95vh]">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6 text-center">
          Add Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          {/* Account Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Account Name
            </label>
            <input
              {...register("accountName", {
                required: "Account Name is required",
                minLength: {
                  value: 3,
                  message: "Account name must be at least 3 characters",
                },
              })}
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
              placeholder="Enter Account Name"
            />
            {errors.accountName && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.accountName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
              placeholder="Enter Phone Number"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Website */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Website
            </label>
            <input
              type="url"
              {...register("website", {
                required: "Website is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,4}(\/[\w-]*)*\/?$/,
                  message: "Enter a valid website URL",
                },
              })}
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
              placeholder="https://example.com"
            />
            {errors.website && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.website.message}
              </p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Industry
            </label>
            <input
              {...register("industry", {
                required: "Industry is required",
              })}
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
              placeholder="Enter Industry"
            />
            {errors.industry && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.industry.message}
              </p>
            )}
          </div>

          {/* Account Status */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Account Status
            </label>
            <select
              {...register("status", {
                required: "Please select an account status",
              })}
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Remark */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Remark
            </label>
            <textarea
              {...register("remark", {
                required: "Remark is required",
                maxLength: {
                  value: 100,
                  message: "Remark cannot exceed 100 characters",
                },
              })}
              rows="3"
              className="w-full border border-gray-300 text-black rounded-md p-2 text-sm sm:text-base focus:ring-2 focus:ring-sky-400 focus:outline-none resize-none"
              placeholder="Enter Remark"
            ></textarea>
            {errors.remark && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.remark.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-sky-500 text-white  py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-sky-600 transition-all active:scale-95"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
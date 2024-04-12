/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ReactHookFormAdvanced() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm();

  const [data, setData] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const watchIsDeveloper = watch("isDeveloper");

  const onSubmit = (formData) => {
    setData(formData);
    setSuccessMessage("Form submitted successfully!");
  };

  return (
    <div className='w-full flex justify-center items-center bg-gray-900 p-8'>
      <div
        className='w-2/3 shadow-lg rounded-md bg-white p-8 flex flex-col justify-start'
        style={{ height: "700px" }}>
        <h2 className='text-center font-medium text-2xl mb-4'>
          React Hook Form Advanced
        </h2>
        {isSubmitSuccessful && (
          <div
            className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative'
            role='alert'>
            <span className='block sm:inline'>{successMessage}</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-1 flex-col justify-evenly'>
          <input
            className='border-2 outline-none p-2 rounded-md'
            placeholder='Name'
            {...register("name", { required: "Name is required." })}
          />
          {errors.name && (
            <span className='text-red-500'>{errors.name.message}</span>
          )}

          <input
            className='border-2 outline-none p-2 rounded-md'
            placeholder='Email'
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className='text-red-500'>{errors.email.message}</span>
          )}

          <input
            className='border-2 outline-none p-2 rounded-md'
            placeholder='Phone Number'
            {...register("phoneNumber", {
              pattern: { value: /^[0-9]*$/, message: "Invalid phone number" },
            })}
          />
          {errors.phoneNumber && (
            <span className='text-red-500'>{errors.phoneNumber.message}</span>
          )}

          <div>
            <span className='mr-4'>Are you a developer?</span>
            <input type='checkbox' {...register("isDeveloper")} />
          </div>

          {watchIsDeveloper && (
            <div className='flex w-full '>
              <input
                className='flex-1 border-2 outline-none p-2 rounded-md mr-2'
                placeholder='Experience (Years)'
                {...register("exp_years", {
                  pattern: { value: /^[0-9]*$/, message: "Invalid year value" },
                })}
              />
              {errors.name && (
                <span className='text-red-500'>{errors.exp_years.message}</span>
              )}
              <input
                className='flex-1 border-2 outline-none p-2 rounded-md'
                placeholder='Experience (Months)'
                {...register("exp_months", {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Invalid month value",
                  },
                })}
              />
              {errors.name && (
                <span className='text-red-500'>
                  {errors.exp_months.message}
                </span>
              )}
            </div>
          )}

          <button
            className='flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900 text-white hover:bg-gray-800'
            type='submit'>
            <span>Submit</span>
          </button>
        </form>
        <p>
          <strong>Data:</strong> {JSON.stringify(data)}
        </p>
      </div>
    </div>
  );
}

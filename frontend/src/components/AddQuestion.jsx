import React from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function AddQuestion(props) {
  const { isOpen, closeModal, addQuestionUtil } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      questionText: "",
    },
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Soft, dark gray overlay with heavy blur for a premium feel */}
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* Modal panel with clean white background and substantial shadow */}
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all border border-gray-100">
                  
                  <form
                    onSubmit={handleSubmit((data) => addQuestionUtil(data))}
                    className="space-y-8"
                  >
                    {/* Header: Title and Helper with context icon */}
                    <div className="flex items-center space-x-3.5 border-b border-gray-100 pb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        {/* 📊 Icon representing chart/data/feedback context */}
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75c.621 0 1.125.504 1.125 1.125v1.125a1.125 1.125 0 01-1.125 1.125H5.625a1.125 1.125 0 01-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125z" />
                        </svg>
                      </div>
                      <div>
                        <Dialog.Title as="h3" className="text-3xl font-extrabold text-gray-950 tracking-tight">
                          Add Question
                        </Dialog.Title>
                        <p className="text-sm text-gray-600 mt-1">
                          Define a new question for your survey or feedback loop.
                        </p>
                      </div>
                    </div>

                    {/* Question Input Section */}
                    <div className="flex flex-col space-y-2">
                      <label
                        className="text-base font-semibold text-gray-900"
                        htmlFor="description"
                      >
                        Question Description
                      </label>
                      <p className="text-sm text-gray-500 mb-2">
                        Enter the full text of your question here...
                      </p>
                      <textarea
                        className={`w-full p-4.5 text-gray-900 border rounded-xl bg-white focus:outline-none focus:ring-2 transition ${
                          errors.questionText
                            ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-100"
                        }`}
                        id="description"
                        placeholder="e.g., On a scale of 1-10, how likely are you to recommend our service?"
                        rows="6"
                        {...register("questionText", { required: true })}
                      />
                      {errors.questionText && (
                        <p className="mt-2 text-sm text-red-600 font-medium flex items-center space-x-1.5">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                          <span>A question description is required.</span>
                        </p>
                      )}
                    </div>

                    {/* Footer Actions: Primary and Secondary buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
                      >
                        Add Question
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
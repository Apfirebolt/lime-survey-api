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
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form
                    onSubmit={handleSubmit((data) => addQuestionUtil(data))}
                    className="sm:w-3/4 mx-auto my-3"
                  >
                    <p className="text-center font-bold text-2xl my-8 text-gray-700">
                      ADD QUESTION
                    </p>
                    <div className="flex flex-col justify-center">
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="description"
                        >
                          Description of the question you want to add
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="description"
                          type="text"
                          placeholder="Question Description"
                          rows="10"
                          {...register("questionText", { required: true })}
                        ></textarea>
                        {errors.description && (
                          <p className="text-red-500">
                            Description is required.
                          </p>
                        )}
                      </div>

                      <div>
                        <input
                          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                          value="Add Question"
                        />
                        <button
                          type="button"
                          onClick={() => closeModal()}
                          className="shadow mx-3 bg-gray-500 hover:bg-gray-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
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

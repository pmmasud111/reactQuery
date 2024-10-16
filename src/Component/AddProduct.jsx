import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thambnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: (data, variable, context) => {
      // console.log(context);
      queryClient.invalidateQueries(["products"]);
    },
    // onMutate: (variable) => {
    //   return { gretting: "Say Hello" };
    // },
  });

  const submitData = (event) => {
    event.preventDefault();
    const newData = { ...state, id: crypto.randomUUID().toString() };
    console.log(newData);
    mutation.mutate(newData);
  };

  const handleChange = () => {
    const name = event.target.name;
    const value =
      event.target.type === "number"
        ? event.target.valueAsNumber
        : event.target.value;

    setState({
      ...state,
      [name]: value,
    });
  };

  if (mutation.isLoading) return <span>Submiting.......</span>;
  if (mutation.error) return <span>{mutation.error.message}</span>;

  return (
    <div className="w-1/5">
      <h2 className="text-4xl font-bold mt-4 mb-8 text-green-600">
        Add to Cart
      </h2>
      {mutation.isSuccess &&
        toast("Succesfully Added", {
          position: "top-center",
          autoClose: 3000,
          className: "bg-green-500 text-white",
        })}
      <br />
      <label className="text-xl font-bold">Fill up the form</label>
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          className="bg-gray-100 outline-none rounded-md my-2 py-3 px-3 w-4/5"
          type="text"
          name="title"
          value={state.title}
          placeholder="Type product title"
          onChange={handleChange}
        />
        <textarea
          className="bg-gray-100 outline-none rounded-md my-2 py-6 px-3 w-4/5"
          name="description"
          value={state.description}
          placeholder="Type product description"
          onChange={handleChange}
        ></textarea>
        <input
          className="bg-gray-100 outline-none rounded-md my-2 py-3 px-3 w-4/5"
          type="number"
          name="price"
          value={state.price}
          placeholder="product price"
          onChange={handleChange}
        />
        <input
          className="bg-gray-100 outline-none rounded-md my-2 py-3 px-3 w-4/5"
          type="text"
          name="thambnail"
          value={state.thambnail}
          placeholder="Type product thambnail url"
          onChange={handleChange}
        />
      </form>
      <div className="flex w-4/5 justify-between my-2">
        <button
          type="submit"
          onClick={submitData}
          // disabled={mutation.isLoading}
          className="bg-green-600 text-white rounded-lg py-2 px-8 hover:bg-green-700 duration-200"
        >
          Add
        </button>
        <button
          type="reset"
          className="bg-gray-500 text-white rounded-lg py-2 px-4 hover:bg-gray-600 duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProduct;

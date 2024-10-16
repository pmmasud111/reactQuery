import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { DetailContext } from "../Context/Context";

const retrieveProduct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

const ProductDetails = () => {
  const { detailProduct } = useContext(DetailContext);

  function deleteItem(id) {
    console.log("product id", id);
    axios.delete(`http://localhost:3000/products/${id}`);
  }

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", detailProduct],
    queryFn: retrieveProduct,
  });

  if (isLoading)
    if (error)
      // return <div className="w-1/5">Fetching product details........</div>;
      return <div>An error occured : {error.message}</div>;

  return (
    <div className="ml-10 w-1/5">
      <div className="border-4 px-4 rounded-lg py-3">
        <h1 className="text-4xl text-center font-bold my-4 text-green-600">
          Product Details
        </h1>
        <img
          className="mb-4 w-64 h-64 rounded-full"
          src={product?.thumbnail}
          alt={product?.title}
        />
        <p>{product?.title}</p>
        <p>{product?.price}</p>
        <p>{product?.description}</p>
        <p>{product?.rating}</p>
        <div className="flex justify-end">
          <button
            className="bg-red-600 hover:bg-red-700 duration-200 py-2 px-8 rounded-md text-white"
            onClick={() => deleteItem(product?.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

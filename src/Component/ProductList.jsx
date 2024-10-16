import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { DetailContext } from "../Context/Context";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=12`
  );
  return response.data;
};

const ProductList = () => {
  const { setDetailProduct } = useContext(DetailContext);
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
    refetchInterval: 1000,
  });

  // if (isLoading)
  //   return (
  //     <div className="text-center text-4xl mt-60">
  //       Fetching product data.........
  //     </div>
  //   );

  if (error)
    return (
      <div className="text-center text-4xl mt-60">
        An error occured : {error.message}
      </div>
    );

  return (
    <div className=" w-3/5 h-screen overflow-auto px-2">
      <h2 className="text-4xl font-bold my-4 text-green-600">Product List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.data &&
          data?.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 rounded-xl border"
            >
              <img
                className="object-cover w-96 h-64 rounded-t-xl"
                src={product.thumbnail}
                alt={product.title}
              />
              <div className="flex items-center justify-between w-full py-2 px-4">
                <p className="text-xl my-3">{product.title}</p>
                <button
                  className="bg-green-600 text-white rounded-lg py-2 px-8 hover:bg-green-700 duration-200"
                  onClick={() => setDetailProduct(product.id)}
                >
                  Detail
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="flex my-8 gap-2 justify-center text-white">
        {data?.prev && (
          <button
            className="bg-green-600 hover:bg-green-700 duration-200 py-2 px-8 rounded-md"
            onClick={() => setPage(data?.prev)}
          >
            Prev
          </button>
        )}
        {data?.next && (
          <button
            className="bg-green-600 hover:bg-green-700 duration-200 py-2 px-8 rounded-md"
            onClick={() => setPage(data?.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;

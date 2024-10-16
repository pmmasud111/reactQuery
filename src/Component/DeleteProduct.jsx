import axios from "axios";
import React from "react";

const DeleteProduct = ({ product }) => {
  function deleteItem(id) {
    axios.delete(`http://localhost:3000/products/${id}`);
  }

  return (
    <div className="flex justify-end">
      <button
        className="bg-red-600 hover:bg-red-700 duration-200 py-2 px-8 rounded-md text-white"
        onClick={() => deleteItem(product?.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteProduct;

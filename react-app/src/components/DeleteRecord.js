import React from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useDeleteData } from "../api/api-service/useDeleteData";
import { FaTrashAlt } from "react-icons/fa";

function DeleteRecord({ endpoint, refetchItems }) {
  const MySwal = withReactContent(Swal);

  const mutation = useDeleteData({
    endpoint,
    callBackOnSuccess: () => {
      refetchItems && refetchItems();
      MySwal.fire({
        title: "Deleted!",
        text: "Item deleted successfully",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md",
        },
      });
    },
    callBackOnError: (message) => {
      MySwal.fire({
        title: "Failed Deleting!",
        text: message,
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "text-white bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-md",
        },
      });
    },
  });

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#DC2626", // Tailwind red-600
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#059669", // Tailwind green-600
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md",
        cancelButton: "text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate();
      } else {
        MySwal.close();
      }
    });
  };

  return (
    <button
      onClick={showConfirmationAlert}
      className="flex items-center space-x-2 text-red-600 hover:text-red-800 p-2 transition-colors duration-300"
      title="Delete Record"
    >
      <FaTrashAlt className="text-lg" />
    </button>
  );
}

export default DeleteRecord;


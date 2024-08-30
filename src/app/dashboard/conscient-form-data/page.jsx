"use client";
import React, { useState } from "react";
import DefaultPage from "@/components/DefaultPage/DefaultPage";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import EnhancedModal from "@/components/EnhancedModal/EnhancedModal"; 

const data = [
  {
    id: 1,
    childName: "John Doe",
    guardianName: "Jane Doe",
    phoneNumber: "123-456-7890",
    dob: "2010-01-01",
  },
  {
    id: 2,
    childName: "Alice Smith",
    guardianName: "Robert Smith",
    phoneNumber: "987-654-3210",
    dob: "2012-05-15",
  },
  {
    id: 3,
    childName: "Emily Johnson",
    guardianName: "Laura Johnson",
    phoneNumber: "456-789-0123",
    dob: "2011-09-30",
  },
  {
    id: 4,
    childName: "Michael Brown",
    guardianName: "Nancy Brown",
    phoneNumber: "321-654-9870",
    dob: "2009-12-25",
  },
];

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item with ID:", id);
  };

  return (
    <DefaultPage>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">CONSCIENT DATA</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  ID
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Child Name
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Guardian&apos;s Name
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Phone Number
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Date of Birth (DOB)
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.childName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.guardianName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    {item.dob}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleView(item)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        aria-label="View"
                      >
                        <FaEye className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors"
                        aria-label="Edit"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        aria-label="Delete"
                      >
                        <FaTrashAlt className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 border rounded-md transition-colors ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 border-blue-500"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
        <EnhancedModal
          modalOpen={modalOpen}
          selectedItem={selectedItem}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </DefaultPage>
  );
};

export default Page;

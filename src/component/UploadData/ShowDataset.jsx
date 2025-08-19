import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDataset, fetchDatasets } from '../../Redux/Dataset/Action';
import { RiDeleteBin6Line } from "react-icons/ri";

const ShowDataset = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { datasets, loading, error } = useSelector((store) => store.datasetReducer);

  useEffect(() => {
    dispatch(fetchDatasets());
  }, [dispatch]);

  const handleShowClick = (id) => {
    navigate(`/2dchart/${id}`);
  };

  const handleDeleteClick = (id) => {
    dispatch(deleteDataset(id));
  };

  if (datasets.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-10 px-4">
        <img
          src="nothinToShow.png"
          alt="No Data"
          className="w-72 h-auto mb-6 opacity-70 animate-pulse"
        />
        <h2 className="text-2xl font-semibold text-[#00acc1] mb-2">No Data Available</h2>
        <p className="text-center text-md text-gray-400 max-w-md">
          We couldn’t find any datasets to display. Try uploading a file or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-10 px-4">
      <div className="max-w-6xl mx-auto rounded-2xl bg-black/30 backdrop-blur-md shadow-2xl overflow-hidden border border-[#00acc1]/30">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs uppercase bg-[#00acc1]/20 text-[#00acc1] tracking-wider">
              <tr>
                <th className="px-6 py-4">File name</th>
                <th className="px-6 py-4">Graph</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-all duration-200 ${index % 2 === 0
                      ? "bg-white/5 hover:bg-[#00acc1]/10"
                      : "bg-white/10 hover:bg-[#00acc1]/20"
                    }`}
                >
                  <td className="px-6 py-4  text-lg font-medium whitespace-nowrap text-white">
                    {item.datasetName}
                  </td>
                  <td
                    onClick={() => handleShowClick(item._id)}
                    className="px-4 py-4 text-cyan-400 cursor-pointer hover:underline"
                  >
                    Show Chart
                  </td>
                  <td
                    onClick={() => handleDeleteClick(item._id)}
                    className="px-8 py-4 text-red-400 cursor-pointer hover:underline"
                  >
                    <RiDeleteBin6Line className="w-5 h-5" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShowDataset;

import React, { useState, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { GetAllEvents } from "../../utils/api";
import { FiSearch } from "react-icons/fi";
import EventRow, { EventInterface } from "../commons/EventRow";

interface DashBoardPageProps {}

const DashBoardPage: React.FC<DashBoardPageProps> = () => {
  const { data, error, isFetching, isLoading } = useQuery(
    "events",
    GetAllEvents
  );
  const [searchInput, setSearchInput] = useState("");
  const [filterOption, setFilterOption] = useState("all");
  const events = data?.data || [];
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 2;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterOption(e.target.value);
    setCurrentPage(1); // Reset current page when filter changes
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredEvents = events.filter((event: EventInterface) => {
    const searchRegex = new RegExp(searchInput, "i");
    const matchesSearch =
      searchRegex.test(event.category) ||
      searchRegex.test(event.title) ||
      searchRegex.test(event.location) ||
      searchRegex.test(event.date) ||
      searchRegex.test(event.organizer);

    if (filterOption === "all") {
      return matchesSearch;
    } else if (filterOption === "petsAllowed") {
      return matchesSearch && event.petsAllowed;
    }

    return matchesSearch;
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  return (
    <div className="p-6 w-full">
      <div className="flex items-center my-10 flex-1">
        <div className="flex items-center mr-4 flex-1">
          <input
            value={searchInput}
            onChange={handleSearchInputChange}
            type="text"
            placeholder="Search..."
            className="px-3 flex-1 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button className="ml-2 flex-1 text-gray-500 focus:outline-none">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-500">
            Filter:
          </label>
          <div className=" items-center">
            <input
              type="radio"
              value="all"
              checked={filterOption === "all"}
              onChange={handleFilterChange}
              className="mr-1"
            />
            <label
              htmlFor="all"
              className="mr-4 text-sm font-medium text-gray-500"
            >
              All
            </label>
            <input
              type="radio"
              value="petsAllowed"
              checked={filterOption === "petsAllowed"}
              onChange={handleFilterChange}
              className="mr-1"
            />
            <label
              htmlFor="petsAllowed"
              className="text-sm font-medium text-gray-500"
            >
              Pets Allowed
            </label>
          </div>
        </div>
      </div>

      {isFetching ? (
        <p className="text-center">Fetching Events...</p>
      ) : (
        <>
          <table className="min-w-full divide-x divide-y divide-y-reverse divide-gray-200">
            <thead className="bg-white divide-y divide-x">
              <tr>
                <th className="py-4 px-6 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-4 px-6 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-4 px-6 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="py-4 px-6 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-4 px-6 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Organizer
                </th>
                <th className="py-4 px-6 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                  Pets Allowed
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {currentEvents.map((event: EventInterface) => (
                <EventRow key={event.id} event={event} />
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex items-center justify-center mt-10">
            {currentPage > 1 && (
              <button
                className="flex items-center px-3 py-2 mr-2 text-sm font-medium"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <div className="text-sm font-medium text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            {currentPage < totalPages && (
              <button
                className="flex items-center px-3 py-2 ml-2 text-sm font-medium"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoardPage;

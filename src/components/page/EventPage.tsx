// @ts-nocheck
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { GetSingleEvent } from "../../utils/api";
import { FiArrowLeft } from "react-icons/fi";
import { EventInterface } from "./Dashboard";

const EventPage = () => {
  const { eventid } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useQuery("event", () => GetSingleEvent(eventid));
  const event = data?.data as EventInterface;

  return (
    <div>
      {isFetching ? (
        <p className="text-center">Fetching Event Details ....</p>
      ) : (
        <div className="p-10">
          <button
            className="mb-4 py-2 focus:outline-none"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft className="w-8 h-5" />
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    S/N
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    ID
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{event?.id}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Category
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event?.category}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Title
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event?.title}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Description
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event?.description}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Location
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event?.location}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Date
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{event?.date}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Time
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{event?.time}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Pets Allowed
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event?.petsAllowed ? "Yes" : "No"}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    Organizer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {event?.organizer}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;

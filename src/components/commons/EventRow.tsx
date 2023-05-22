import React from "react";
import { useNavigate } from "react-router-dom";

export interface EventRowProps {
  event: {
    id: number;
    category: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    petsAllowed: boolean;
    organizer: string;
  };
}

const EventRow: React.FC<EventRowProps> = ({ event }) => {
  const navigate = useNavigate();
  return (
    <tr key={event.category} onClick={() => navigate(`/event/${event.id}`)}>
      <td className="px-6 py-4 whitespace-nowrap">{event.category}</td>
      <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
      <td className="px-6 py-4 whitespace-nowrap">{event.location}</td>
      <td className="px-6 py-4 whitespace-nowrap">{event.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{event.organizer}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {event.petsAllowed ? (
          <span className="text-green-500">&#10004;</span>
        ) : (
          <span className="text-red-600">&#9633;</span>
        )}
      </td>
    </tr>
  );
};

export default EventRow;

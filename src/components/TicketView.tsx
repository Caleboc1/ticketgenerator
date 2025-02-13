
import { Download } from "lucide-react";

interface TicketViewProps {
  ticketData: {
    name: string;
    email: string;
    avatarUrl: string;
    specialRequest: string;
  };
  onBookAnother: () => void;
}

const TicketView = ({ ticketData, onBookAnother }: TicketViewProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Your Ticket is Booked!</h1>
      <p className="mb-8">Check your email for a copy or you can download</p>

      <div className="max-w-md mx-auto bg-[#001F1E] border-2 border-[#26B6AA] rounded-lg p-6 mb-8">
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-4">Techember Fest '25</h2>
          <p className="text-sm text-gray-400 mb-1">📍 04 Rumens road, Ikoyi, Lagos</p>
          <p className="text-sm text-gray-400 mb-6">📅 March 15, 2025 | 7:00 PM</p>

          {ticketData.avatarUrl && (
            <div className="w-24 h-24 mx-auto mb-6">
              <img
                src={ticketData.avatarUrl}
                alt="Attendee"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs text-gray-400">Enter your name</p>
              <p className="text-[#26B6AA]">{ticketData.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Enter your email</p>
              <p className="text-[#26B6AA]">{ticketData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Ticket Type:</p>
              <p className="text-[#26B6AA]">VIP</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Ticket for:</p>
              <p className="text-[#26B6AA]">1</p>
            </div>
            {ticketData.specialRequest && (
              <div>
                <p className="text-xs text-gray-400">Special request?</p>
                <p className="text-[#26B6AA]">{ticketData.specialRequest}</p>
              </div>
            )}
          </div>

          <div className="border-t border-dashed border-gray-600 pt-4">
            <div className="text-center">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAAyCAYAAAC2MdSdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABYSURBVHgB7dYxDQAgEMDAB/vvGQX4YAkyJ1nB3L33ByCgzgEhggIkCAoQIihAgqAACYICJAgKkCAoQIKgAAmCAiQICpAgKECCoAAJggIkCAqQIChAgqAACR9ZagTwu1C5IwAAAABJRU5ErkJggg=="
                alt="Barcode"
                className="max-w-full h-auto mx-auto"
              />
              <p className="text-xs text-gray-400 mt-2">1 234567 891026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBookAnother}
          className="flex-1 border border-[#0E3534] text-white px-4 py-2 rounded-md hover:bg-[#0E3534]"
        >
          Book Another Ticket
        </button>
        <button
          className="flex-1 bg-[#26B6AA] hover:bg-[#1E8C83] text-white px-4 py-2 rounded-md inline-flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketView;

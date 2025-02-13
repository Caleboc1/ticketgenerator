
import { useState, useCallback, useEffect } from "react";
import { Upload } from "lucide-react";
import TicketView from "../components/TicketView";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatarUrl: "",
    specialRequest: ""
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const requiredFields = ['name', 'email'];
    const filledRequiredFields = requiredFields.filter(field => formData[field]);
    
    if (filledRequiredFields.length === 0) {
      setStep(1);
    } else if (filledRequiredFields.length === 1) {
      setStep(2);
    } else if (filledRequiredFields.length === 2) {
      setStep(3);
    }
  }, [formData]);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ticketapp');
    formData.append('cloud_name', 'dz4zwp8kd');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dz4zwp8kd/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setFormData(prev => ({
          ...prev,
          avatarUrl: data.secure_url
        }));
      } else {
        setUploadError("Failed to upload image");
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError("Error uploading image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setShowTicket(true);
      setStep(3);
    }
  };

  const handleBookAnother = () => {
    setFormData({
      name: "",
      email: "",
      avatarUrl: "",
      specialRequest: ""
    });
    setShowTicket(false);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-[#001F1E] text-white">
      <nav className="border-b border-[#0E3534] bg-[#001F1E]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">CAL-tickets</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#events" className="text-gray-300 hover:text-white">Events</a>
              <a href="#my-tickets" className="text-gray-300 hover:text-white">My Tickets</a>
              <a href="#about" className="text-gray-300 hover:text-white">About Project</a>
              <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100">
                MY TICKETS →
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-lg bg-[#001F1E] p-8 border border-[#0E3534]">
            {!showTicket ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold mb-2">Attendee Details</h1>
                  <div className="h-1 w-24 bg-[#26B6AA]"></div>
                  <p className="text-right text-sm text-gray-400">Step {step}/3</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <p className="mb-4">Upload Profile Photo</p>
                    <label className="block">
                      <div className={`border-2 border-dashed ${formData.avatarUrl ? 'border-green-500' : 'border-[#26B6AA]'} rounded-lg p-8 text-center cursor-pointer hover:border-white transition-colors relative`}>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                        <div className="flex flex-col items-center">
                          {formData.avatarUrl ? (
                            <div className="relative w-24 h-24 mb-2">
                              <img
                                src={formData.avatarUrl}
                                alt="Profile preview"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          ) : (
                            <Upload className="w-8 h-8 mb-2" />
                          )}
                          <p>{isUploading ? "Uploading..." : formData.avatarUrl ? "Change photo" : "Drag & drop or click to upload"}</p>
                        </div>
                      </div>
                      {uploadError && (
                        <p className="mt-2 text-red-500 text-sm">{uploadError}</p>
                      )}
                    </label>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-transparent border border-[#0E3534] rounded-md px-4 py-2 focus:outline-none focus:border-[#26B6AA]"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email *"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-transparent border border-[#0E3534] rounded-md px-4 py-2 focus:outline-none focus:border-[#26B6AA]"
                      required
                    />
                  </div>

                  <div>
                    <p className="mb-2">Special request?</p>
                    <textarea
                      placeholder="Enter your special request here"
                      value={formData.specialRequest}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequest: e.target.value }))}
                      className="w-full bg-transparent border border-[#0E3534] rounded-md px-4 py-2 focus:outline-none focus:border-[#26B6AA] min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="flex-1 border border-[#0E3534] text-white px-4 py-2 rounded-md hover:bg-[#0E3534]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#26B6AA] hover:bg-[#1E8C83] text-white px-4 py-2 rounded-md"
                      disabled={!formData.name || !formData.email}
                    >
                      Get My Free Ticket
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <TicketView ticketData={formData} onBookAnother={handleBookAnother} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

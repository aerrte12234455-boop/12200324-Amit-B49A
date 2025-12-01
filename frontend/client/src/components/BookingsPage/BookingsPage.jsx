import React, { useEffect, useState } from "react";
import { Film, Clock, MapPin, QrCode, ChevronDown, X } from "lucide-react";
import QRCode from "qrcode";

// helper: convert minutes to "2h 20m"
const formatDuration = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}h ${minutes}m`;
};

// helper: format time AM/PM
const fmtTime = (d) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// pricing config
const RECLINER_EXTRA = 200;

// sample bookings array (3 cards)
const sampleBookings = [
  {
    id: "b1",
    title: "Fighter",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/d/df/Fighter_film_teaser.jpg",
    category: "Action",
    durationMins: 140,
    slotTime: new Date(new Date().setHours(19, 30, 0, 0)), // 7:30 PM today
    auditorium: "Audi 3",
    basePrice: 250,
    seats: [
      { id: "E5", type: "recliner" },
      { id: "E6", type: "recliner" },
      { id: "B3", type: "standard" },
    ],
  },
  {
    id: "b2",
    title: "Midnight Chase",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8f7c2b5c6b0d2b7d0b2b4722d7f6bc3c",
    category: "Thriller",
    durationMins: 125,
    slotTime: new Date(new Date().setHours(21, 0, 0, 0)),
    auditorium: "Audi 1",
    basePrice: 220,
    seats: [
      { id: "C4", type: "standard" },
      { id: "C5", type: "standard" },
    ],
  },
  {
    id: "b3",
    title: "Romance in Red",
    poster:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=181b2a6f89c3f37f8d4e2f4a1a47f2aa",
    category: "Romance",
    durationMins: 110,
    slotTime: new Date(new Date().setHours(17, 15, 0, 0)),
    auditorium: "Audi 2",
    basePrice: 200,
    seats: [{ id: "A1", type: "standard" }],
  },
];

export default function BookingsPage() {
  const [expanded, setExpanded] = useState({});
  const [scannedDetails, setScannedDetails] = useState(null);

  const computeTotals = (booking) => {
    let subtotal = 0;
    booking.seats.forEach((s) => {
      subtotal += booking.basePrice + (s.type === "recliner" ? RECLINER_EXTRA : 0);
    });
    const total = subtotal;
    return { subtotal, total, seatCount: booking.seats.length };
  };

  const toggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQrScan = (bookingId) => {
    const b = sampleBookings.find((bk) => bk.id === bookingId);
    if (!b) return;
    setScannedDetails({
      bookingId,
      title: b.title,
      time: fmtTime(b.slotTime),
      auditorium: b.auditorium,
      seats: b.seats.map((s) => s.id),
    });
  };

  const closeModal = () => setScannedDetails(null);

  return (
    <div
      className="min-h-screen bg-black p-6 sm:p-8 text-gray-100"
      style={{ fontFamily: '"Cinzel", serif' }}
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-red-500">
            Your Tickets
          </h1>
          <div className="text-sm text-gray-400">Present QR at entry</div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleBookings.map((b) => {
            const totals = computeTotals(b);
            const isOpen = !!expanded[b.id];

            return (
              <article
                id={`booking-card-${b.id}`}
                key={b.id}
                className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 border border-red-800 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row items-start gap-4">
                  <div className="w-full lg:w-24 h-44 lg:h-36 overflow-hidden rounded-md border border-red-700">
                    <img
                      src={b.poster}
                      alt={b.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-bold text-red-400 flex items-center gap-2">
                          <Film className="w-5 h-5" />
                          <span>{b.title}</span>
                        </h2>
                        <div className="text-xs text-gray-400 mt-1">
                          Booking ID:{" "}
                          <span className="font-mono text-xs text-gray-200">
                            {b.id}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 text-right hidden lg:block">
                        {b.category}
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-300 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-300" />
                        <div>{fmtTime(b.slotTime)}</div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <MapPin className="w-4 h-4 text-red-300" />
                        <div>{b.auditorium}</div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-400">Duration</div>
                    <div className="mt-1 text-sm text-gray-200">
                      {formatDuration(b.durationMins)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Seats ({totals.seatCount})
                  </div>
                  <div className="text-sm text-gray-300 font-semibold">
                    ₹{totals.total.toLocaleString("en-IN")}
                  </div>
                </div>

                <div
                  className={`mt-4 border-t border-red-900/40 pt-3 text-sm text-gray-300 space-y-3 transition-all duration-200 ease-in-out ${
                    isOpen
                      ? "max-h-[1200px] opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <div>
                    <div className="text-sm text-gray-400">
                      Seats ({totals.seatCount})
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {b.seats.map((s) => (
                        <div
                          key={s.id}
                          className="px-3 py-1 rounded-md bg-black/40 border border-red-800 flex items-center gap-2 text-sm"
                        >
                          <div className="font-semibold">{s.id}</div>
                          <div
                            className={`text-xs px-2 py-0.5 rounded ${
                              s.type === "recliner"
                                ? "bg-red-700 text-white"
                                : "bg-gray-800 text-gray-200"
                            }`}
                          >
                            {s.type === "recliner" ? "Recliner" : "Standard"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-gray-300">
                      <div>Seats subtotal</div>
                      <div>₹{totals.subtotal.toLocaleString("en-IN")}</div>
                    </div>
                    <div className="flex items-center justify-between font-semibold text-gray-100 text-lg">
                      <div>Total</div>
                      <div>₹{totals.total.toLocaleString("en-IN")}</div>
                    </div>
                  </div>

                  {/* QR */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <QrCode className="w-4 h-4" />
                      <div>Ticket QR</div>
                    </div>
                    <div className="ml-auto">
                      <img
                        src="public/1.jpg"
                        alt={`${b.title} qr`}
                        className="w-28 h-28 object-contain rounded-md bg-white p-1 cursor-pointer"
                        onClick={() => handleQrScan(b.id)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => toggle(b.id)}
                    aria-expanded={isOpen}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-red-700 bg-black/30 hover:bg-black/40 transition"
                  >
                    <span>{isOpen ? "Hide details" : "View details"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal to show scanned booking details */}
      {scannedDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative max-w-md w-full bg-gray-900 rounded-2xl p-6 border border-red-800 shadow-2xl text-gray-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-red-400">
                  {scannedDetails.title}
                </h3>
                <div className="text-sm text-gray-300">
                  Booking ID:{" "}
                  <span className="font-mono text-sm">
                    {scannedDetails.bookingId}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-300">
                  <div>
                    <strong>Time:</strong> {scannedDetails.time}
                  </div>
                  <div>
                    <strong>Auditorium:</strong> {scannedDetails.auditorium}
                  </div>
                  <div className="mt-2">
                    <strong>Seats:</strong>{" "}
                    {Array.isArray(scannedDetails.seats)
                      ? scannedDetails.seats.join(", ")
                      : scannedDetails.seats}
                  </div>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/30 border border-gray-700"
                aria-label="Close scanned details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

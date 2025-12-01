export default function Card({ title, count, icon }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{count}</p>
      </div>
      <div className="text-4xl text-blue-500">{icon}</div>
    </div>
  );
}

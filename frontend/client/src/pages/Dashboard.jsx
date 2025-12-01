import { useEffect, useState } from "react";
import { FiUsers, FiFilm, FiShoppingCart } from "react-icons/fi";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: "", year: "", genre: "" });
  const [editMovieId, setEditMovieId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    const userSnap = await getDocs(collection(db, "users"));
    setUsers(userSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    const movieSnap = await getDocs(collection(db, "movies"));
    setMovies(movieSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    const bookingSnap = await getDocs(collection(db, "bookings"));
    setBookings(bookingSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add/Edit Movie
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMovieId) {
      const movieRef = doc(db, "movies", editMovieId);
      await updateDoc(movieRef, newMovie);
      setEditMovieId(null);
    } else {
      await addDoc(collection(db, "movies"), newMovie);
    }
    setNewMovie({ title: "", year: "", genre: "" });
    fetchData();
  };

  // Delete Movie
  const handleDelete = async (id) => {
    const movieRef = doc(db, "movies", id);
    await deleteDoc(movieRef);
    fetchData();
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1f1f1f] p-6 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm uppercase">Total Users</h3>
            <p className="text-2xl font-bold mt-2">{users.length}</p>
          </div>
          <FiUsers className="text-red-500" size={28} />
        </div>

        <div className="bg-[#1f1f1f] p-6 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm uppercase">Movies</h3>
            <p className="text-2xl font-bold mt-2">{movies.length}</p>
          </div>
          <FiFilm className="text-red-500" size={28} />
        </div>

        <div className="bg-[#1f1f1f] p-6 rounded-lg flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm uppercase">Bookings</h3>
            <p className="text-2xl font-bold mt-2">{bookings.length}</p>
          </div>
          <FiShoppingCart className="text-red-500" size={28} />
        </div>
      </div>

      {/* Add Movie Form */}
      <div className="max-w-lg bg-[#1a1a1a] p-6 rounded-lg mb-10 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{editMovieId ? "Edit Movie" : "Add Movie"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            className="bg-[#2b2b2b] text-white border-none p-2 rounded focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="text"
            placeholder="Year"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            className="bg-[#2b2b2b] text-white border-none p-2 rounded focus:ring-2 focus:ring-red-600"
            required
          />
          <input
            type="text"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
            className="bg-[#2b2b2b] text-white border-none p-2 rounded focus:ring-2 focus:ring-red-600"
            required
          />
          <button
            type="submit"
            className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            {editMovieId ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      </div>

      {/* Movies List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Movies List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-[#1a1a1a] rounded-lg p-4 shadow-lg">
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="text-gray-400 text-sm">Year: {movie.year}</p>
                <p className="text-gray-400 text-sm">Genre: {movie.genre}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-400 transition"
                    onClick={() => {
                      setEditMovieId(movie.id);
                      setNewMovie({
                        title: movie.title,
                        year: movie.year,
                        genre: movie.genre,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(movie.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function Books() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editPrice, setEditPrice] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://books-api-sltx.onrender.com/api/books', {
      headers: { authorization: token }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBooks(data);
        }
      });
  }, []);

  const handleAdd = () => {
    const token = localStorage.getItem('token');
    fetch('https://books-api-sltx.onrender.com/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ title, author, price })
    })
      .then((res) => res.json())
      .then((newBook) => setBooks([...books, newBook]));

    setTitle('');
    setAuthor('');
    setPrice('');
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    fetch(`https://books-api-sltx.onrender.com/api/books/${id}`, {
      method: 'DELETE',
      headers: { authorization: token }
    }).then(() => setBooks(books.filter((book) => book._id !== id)));
  };

  const handleUpdate = (id) => {
    const token = localStorage.getItem('token');
    fetch(`https://books-api-sltx.onrender.com/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({
        title: editTitle,
        author: editAuthor,
        price: editPrice
      })
    })
      .then((res) => res.json())
      .then((updatedBook) => {
        setBooks(books.map((book) =>
          book._id === id ? updatedBook : book
        ));
        setEditId(null);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📚 Books</h1>

    
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Book</h2>
          <div className="flex flex-col gap-3">
            <input
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-medium"
              onClick={handleAdd}
            >
              Add Book
            </button>
          </div>
        </div>

        {/* Books List */}
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <div key={book._id} className="bg-white p-6 rounded-lg shadow-md">
              {editId === book._id ? (
                <div className="flex flex-col gap-3">
                  <input
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleUpdate(book._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600">Author: {book.author}</p>
                    <p className="text-blue-600 font-medium">₹{book.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                      onClick={() => {
                        setEditId(book._id);
                        setEditTitle(book.title);
                        setEditAuthor(book.author);
                        setEditPrice(book.price);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
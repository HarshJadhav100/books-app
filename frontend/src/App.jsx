import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Register from './pages/Register';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';




function Books() {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }
  },[]);



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
    fetch('http://localhost:5000/api/books',{
      headers:{authorization:token}
    })
    
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)){
          setBooks(data)
        }
      });
      
  }, []);

  const handleAdd = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',authorization:token },
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
    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
      headers: { authorization: token }
    }).then(() => setBooks(books.filter((book) => book._id !== id)));
  };

  const handleUpdate = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json',authorization:token2 },
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
    <div>
      <Navbar />
      <h1>Books</h1>

      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <button onClick={handleAdd}>Add Book</button>
      </div>

      {books.map((book) => (
        <div key={book._id}>
          {editId === book._id ? (
            <div>
              <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} />
              <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
              <button onClick={() => handleUpdate(book._id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ₹{book.price}</p>
              <button onClick={() => {
                setEditId(book._id);
                setEditTitle(book.title);
                setEditAuthor(book.author);
                setEditPrice(book.price);
              }}>Edit</button>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
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

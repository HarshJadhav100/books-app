import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch('https://books-api-sltx.onrender.com/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('name', data.name);
                    navigate('/books');
                } else {
                    setMessage(data.message);
                }
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    📚 Login
                </h1>
                <input
                    className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-blue-500"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:border-blue-500"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={handleLogin}
                >
                    Login
                </button>
                {message && <p className="text-red-500 text-center mt-3">{message}</p>}
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
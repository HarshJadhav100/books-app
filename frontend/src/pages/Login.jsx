import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate();

    const handleLogin=()=>{
        fetch('http://localhost:5000/api/auth/login',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })

        .then((res)=>res.json())
        .then((data)=>{
            if (data.token) {
                localStorage.setItem('token',data.token)
                localStorage.setItem('name',data.name)
                navigate('/books')
                
            } else {
                setMessage(data.message)
                
            }
        });
    };
    return(
        <div>
            <h1>LOGIN</h1>
            <input 
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            placeholder="Password"
            value={password}
            required:true
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
            
            <p>Don't have account,<Link to = '/register'>register here!</Link></p>
           
        </div>

    )

    
}

export default Login;
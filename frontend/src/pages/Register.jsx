import { useState } from "react";
import { Link} from "react-router-dom";

function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');

const handleRegister = () =>{
    fetch('http://localhost:5000/api/auth/register',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({name,email,password})
    })
    .then((res)=>res.json())
    .then((data)=> setMessage(data.message))
};

return(
    <div>
        <h1>REGISTER</h1>
        <input
        placeholder="Name"
        value = {name}
        onChange={(e)=>setName(e.target.value)}
         />
        <input
        placeholder="Email"
        value = {email}
        onChange={(e)=>setEmail(e.target.value)}
         />
        <input
        placeholder="Password"
        value = {password}
        onChange={(e)=>setPassword(e.target.value)}
         />
        <button onClick={handleRegister}>Register</button>
        

        <p>{message}</p>
        <p>Already have account,<Link to='/login'>login here!</Link></p>


    </div>
);


}

export default Register;
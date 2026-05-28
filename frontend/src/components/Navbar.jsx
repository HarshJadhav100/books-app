import { useNavigate } from "react-router-dom";
function Navbar() {

    const navigate = useNavigate();

    const handleLogout = ()=>{

        localStorage.removeItem('token');
        localStorage.removeItem('name'); 
        navigate('/login')
        
        
    }
    const name = localStorage.getItem('name');

    return(
        <nav>
            <h2>
                Books App
            </h2>
            <span>Welcome, {name}!</span>
            <button onClick={handleLogout}>Log Out</button>
        </nav>
    );
}

export default Navbar;

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react';
import "../components/login.css"
import logo from "../assets/logo_cop.png"
import supabase from '../supabaseClient';


const Login = () => {
    const [uniqueId, setUniqueId] = useState("");
    // const [member, setMember] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { value } = e.target;
        setUniqueId(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fetch data from Supabase
        const fetchMember = async () => {
            try {
                const { data, error } = await supabase
                    .from('members')
                    .select('*')
                    .eq('id', uniqueId) // filter by id (or another unique field)
                    .single();    // ensures only one item is returned

                if (error) {
                    alert("Unique ID not found retry.")
                } else {
                    navigate("/edit-member", { state: { uniqueId: uniqueId } })
                }
            } catch (error) {
                console.log(error.message);
            } finally {

            }
        };

        fetchMember()
        // Here you would handle login logic
        // console.log('Login attempt with:', uniqueId);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Brand Header */}
                <div className="brand-header">
                    <div className="logo-container">
                        <img
                            src={logo}
                            alt="Church Logo"
                            className="brand-logo"
                        />
                    </div>
                    <h1 className="brand-name">Glorious (English) Assembly</h1>
                    <p className="brand-tagline">We care for one another.</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="userID">Unique ID</label>
                        <input
                            type="text"
                            id="userID"
                            name="userID"
                            value={uniqueId}
                            onChange={handleChange}
                            placeholder="Enter your Unique ID.."
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">Sign In</button>
                </form>

                <div className="signup-section">
                    <p>Don't have an account? <Link to={"/create-new"}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.username || !form.email || !form.password) {
            toast.error("Sab fields bharo!");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
                form
            );
            toast.success("Registration successful! Ab login karo.");
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "60px auto", padding: "20px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    style={inputStyle}
                />
                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    );
}

const inputStyle = {
    display: "block", width: "100%", padding: "10px",
    marginBottom: "12px", fontSize: "15px", boxSizing: "border-box",
};
const buttonStyle = { padding: "10px 24px", fontSize: "16px", cursor: "pointer" };

export default Register;
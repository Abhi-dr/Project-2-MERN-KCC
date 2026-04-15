import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
        const navigate = useNavigate(); 

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

      async function handleSubmit(e) {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Sab fields bharo!");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
                form
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            toast.success(`Welcome, ${res.data.user.username}!`);
            navigate("/");  // ← login hone par home page pe bhejo

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    // baaki code same rahega...


    return (
        <div style={{ maxWidth: "400px", margin: "60px auto", padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                    {loading ? "Loading..." : "Login"}
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

export default Login;
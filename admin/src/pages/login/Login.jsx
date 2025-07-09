import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Clear previous error
        try {
            const res = await login(dispatch, { username, password });
            if (res?.error) {
                setError("Incorrect login credentials");
            }
        } catch (err) {
            setError("Incorrect login credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="text"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <button
                onClick={handleClick}
                style={{
                    padding: 10,
                    width: 120,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer"
                }}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <div className="spinner"></div>
                        Logging in...
                    </>
                ) : (
                    "Login"
                )}
            </button>

            {error && (
                <p style={{ color: "red", marginTop: 20 }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Login;
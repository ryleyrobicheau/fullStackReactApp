import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
        if (password !== confirmPassword) {
            setError("Passwords Do Not Match");
            return;
        }
        await createUserWithEmailAndPassword(getAuth(), email, password);
        navigate('/articles');
    } catch (error) {
        setError(error.message);
        }
  }


  return (
    <>
      <h1>Create Account</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Your Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Re-Enter Your Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Accrount</button>
      <Link to="/login">Already Have An Account? Log In Here</Link>
    </>
  );
};

export default CreateAccountPage;

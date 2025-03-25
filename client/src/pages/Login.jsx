import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await login(formData);
    console.log("result", result);
    
    if (result.success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="vw-100 vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow" style={{maxWidth: '400px', width: '100%'}}>
        <h2 className="h2 mb-4 text-center">Login</h2>
        {error && (
          <div className="alert alert-danger mb-3">{error}</div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-primary text-decoration-none">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
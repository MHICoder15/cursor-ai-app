import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext.jsx';
import QueryForm from '../components/QueryForm';
import ResponseDisplay from '../components/ResponseDisplay';
import HistoryList from '../components/HistoryList';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': token,
          },
        };

        const res = await axios.get('/api/queries', config);
        setHistory(res.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch history');
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleSubmit = async (prompt) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      };

      const res = await axios.post(
        '/api/generate',
        { prompt },
        config
      );

      setResponse(res.data.data);
      setHistory([res.data.data, ...history]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate response');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': token,
        },
      };

      await axios.delete(`/api/queries/${id}`, config);
      setHistory(history.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete query');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">AI Query App</h1>
        <button
          onClick={logout}
          className="btn btn-danger"
        >
          Logout
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <QueryForm onSubmit={handleSubmit} loading={loading} />
          <ResponseDisplay response={response} loading={loading} error={error} />
        </div>
        <div className="col-md-4">
          <HistoryList history={history} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default Home;
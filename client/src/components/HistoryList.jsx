const HistoryList = ({ history, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Query History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500">No queries yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item) => (
            <li key={item._id} className="border-b pb-3">
              <p className="font-medium truncate">{item.prompt}</p>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(item.createdAt).toLocaleString()}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => onDelete(item._id)}
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryList;
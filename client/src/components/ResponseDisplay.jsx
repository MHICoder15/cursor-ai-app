const ResponseDisplay = ({ response, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500">Your AI-generated response will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Your Query:</h3>
      <p className="mb-4 p-3 bg-gray-100 rounded">{response.prompt}</p>
      <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
      <p className="p-3 bg-gray-100 rounded whitespace-pre-wrap">
        {response.response}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Generated on: {new Date(response.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ResponseDisplay;
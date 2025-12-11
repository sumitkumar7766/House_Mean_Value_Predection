import React, { useEffect, useState } from 'react';


function PredictionPage() {
  const [form, setForm] = useState({
    longitude: '-122.27',
    latitude: '37.83',
    housing_median_age: '49.0',
    total_rooms: '1655.0',
    total_bedrooms: '366.0',
    population: '754.0',
    households: '329.0',
    median_income: '1.375',
    ocean_proximity: 'NEAR BAY'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "ocean_proximity" ? value : value
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:4000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form) // Use the state variable 'form'
      });
      
      const data = await response.json();

      if (response.ok) {
        setResult(data.predicted_median_house_value
);
      } else {
        // Handle server-side errors (e.g., status 400, 500)
        console.error('Error from server:', data.error || 'Unknown error');
        setResult(`Error: ${data.error || 'Request failed'}`);
      }
    } catch (error) {
      // Handle network errors (e.g., server unreachable)
      console.error('Fetch error:', error);
      setResult('Network error: Could not connect to the server.');
    } finally {
      // Ensure loading state is turned off regardless of success or failure
      setLoading(false);
    }
};

const formatLabel = (key) => {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

return (
  <div className="min-vh-100 bg-dark text-white py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          {/* Header Section */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">
              <span className="text-primary">House Price</span> Predictor
            </h1>
            <p className="lead text-white-50">
              Enter property details to get an estimated median house value
            </p>
          </div>

          {/* Main Card */}
          <div className="card bg-secondary border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <div className="row g-4">
                {Object.keys(form).map((key, idx) => {
                  if (key === 'ocean_proximity') {
                    return (
                      <div key={key} className="col-md-6">
                        <label className="form-label text-white fw-semibold mb-2">
                          <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                          </svg>
                          {formatLabel(key)}
                        </label>
                        <select
                          name={key}
                          value={form[key]}
                          onChange={handleChange}
                          className="form-select form-select-lg bg-dark text-white border-primary"
                        >
                          <option value="NEAR BAY">Near Bay</option>
                          <option value="INLAND">Inland</option>
                          <option value="ISLAND">Island</option>
                          <option value="NEAR OCEAN">Near Ocean</option>
                          <option value="<1H OCEAN">&lt;1H Ocean</option>
                        </select>
                      </div>
                    );
                  }
                  return (
                    <div key={key} className="col-md-6">
                      <label className="form-label text-white fw-semibold mb-2">
                        <svg className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                        </svg>
                        {formatLabel(key)}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        className="form-control form-control-lg bg-dark text-white border-primary"
                        placeholder={`Enter ${formatLabel(key).toLowerCase()}`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="mt-5 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow fw-bold text-uppercase"
                  style={{ letterSpacing: '1px', minWidth: '250px' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <svg className="me-2" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                      Predict Price
                    </>
                  )}
                </button>
              </div>

              {/* Result Display */}
              {result && (
                <div className="mt-5 animate-fadeIn">
                  <div className="card bg-primary border-0 rounded-4 shadow-lg">
                    <div className="card-body p-4 text-center">
                      <p className="text-white-50 mb-2 text-uppercase fw-semibold" style={{ letterSpacing: '2px', fontSize: '0.875rem' }}>
                        Predicted Median House Value
                      </p>
                      <h2 className="display-3 fw-bold text-white mb-0">
                        ${Number(result).toLocaleString()}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-4">
            <p className="text-white-50 small mb-0">
              <svg className="me-2" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
              Predictions are estimates based on historical data
            </p>
          </div>
        </div>
      </div>
    </div>

    <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-control:focus,
        .form-select:focus {
          background-color: #212529;
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(13, 110, 253, 0.3);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .card {
          transition: all 0.3s ease;
        }
      `}</style>
  </div>
);
}

export default PredictionPage;
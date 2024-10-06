import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function AvailableColleges() {
  const [inputType, setInputType] = useState('cutoff');
  const [inputValue, setInputValue] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/colleges?cutoff=${inputValue}`);
      setFilteredColleges(response.data);
    } catch (error) {
      setError('Failed to fetch colleges.');
    }

    setLoading(false);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setFilteredColleges((prev) =>
      [...prev].sort((a, b) => (sortOrder === 'asc' ? a.cutoff - b.cutoff : b.cutoff - a.cutoff))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="text-amber-400 hover:text-amber-300 transition-colors">
              EduCounsel
            </Link>
            <span className="text-white ml-2">Available Colleges</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Available Colleges</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="input-type" className="block text-sm font-medium text-gray-700 mb-1">
                Search by:
              </label>
              <select
                id="input-type"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
              >
                <option value="cutoff">Cutoff Mark</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="input-value" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Cutoff Mark:
              </label>
              <input
                type="number"
                id="input-value"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter your cutoff mark"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin mr-2">&#9696;</span>
                ) : (
                  <Search className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Available Colleges</h3>
          {filteredColleges.length > 0 ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Showing {filteredColleges.length} results</p>
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Sort by Cutoff
                  {sortOrder === 'asc' ? <ChevronDown className="ml-1" /> : <ChevronUp className="ml-1" />}
                </button>
              </div>

              <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border-b text-left text-gray-900">College Name</th>
                    <th className="px-4 py-2 border-b text-left text-gray-900">Code</th>
                    <th className="px-4 py-2 border-b text-left text-gray-900">Cutoff</th>
                    <th className="px-4 py-2 border-b text-left text-gray-900">Branch</th>
                    <th className="px-4 py-2 border-b text-left text-gray-900">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColleges.map((college) => (
                    <tr key={college._id}>
                      <td className="px-4 py-2 border-b">{college.name}</td>
                      <td className="px-4 py-2 border-b">{college.code}</td>
                      <td className="px-4 py-2 border-b">{college.cutoff}</td>
                      <td className="px-4 py-2 border-b">{college.branch}</td>
                      <td className="px-4 py-2 border-b">{college.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No colleges available for the given cutoff.</p>
          )}
        </section>
      </main>
    </div>
  );
}

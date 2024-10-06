import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function ChoiceList() {
  const [cutoff, setCutoff] = useState('');
  const [fees, setFees] = useState('');
  const [location, setLocation] = useState('');
  const [careerChoice, setCareerChoice] = useState(''); // New state for career choice
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:5000/api/colleges', {
        params: { cutoff, fees, location, careerChoice }, // Include careerChoice in request
      });
      setFilteredColleges(response.data);
    } catch (error) {
      setError('Failed to fetch colleges.');
    }

    setLoading(false);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedColleges = Array.from(filteredColleges);
    const [movedCollege] = updatedColleges.splice(result.source.index, 1);
    updatedColleges.splice(result.destination.index, 0, movedCollege);

    setFilteredColleges(updatedColleges);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="text-amber-400 hover:text-amber-300 transition-colors">
              EduCounsel
            </Link>
            <span className="text-white ml-2">Choice List</span>
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Find Available Colleges</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="cutoff" className="block text-sm font-medium text-gray-700 mb-1">
                Cutoff Mark:
              </label>
              <input
                type="number"
                id="cutoff"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={cutoff}
                onChange={(e) => setCutoff(e.target.value)}
                placeholder="Enter cutoff mark"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-1">
                Fees:
              </label>
              <input
                type="text"
                id="fees"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="Enter fees"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location:
              </label>
              <input
                type="text"
                id="location"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="careerChoice" className="block text-sm font-medium text-gray-700 mb-1">
                Career Choice:
              </label>
              <select
                id="careerChoice"
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={careerChoice}
                onChange={(e) => setCareerChoice(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Placement">Placement</option>
                <option value="Higher Studies">Higher Studies</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
                {loading && <span className="animate-spin ml-2">&#9696;</span>}
                <Search className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </section>

        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Choice List</h3>
          {filteredColleges.length > 0 ? (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="colleges">
                {(provided) => (
                  <table
                    className="min-w-full bg-white border border-gray-300 rounded-md"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 border-b text-left text-gray-900">College Name</th>
                        <th className="px-4 py-2 border-b text-left text-gray-900">Code</th>
                        <th className="px-4 py-2 border-b text-left text-gray-900">Cutoff</th>
                        <th className="px-4 py-2 border-b text-left text-gray-900">Branch</th>
                        <th className="px-4 py-2 border-b text-left text-gray-900">Location</th>
                        <th className="px-4 py-2 border-b text-left text-gray-900">Fees</th>
                        <th className="px-4 py-2 border-b text-left text-gray-900">Best for</th> {/* New Column */}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredColleges.map((college, index) => (
                        <Draggable key={college._id} draggableId={college._id} index={index}>
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border-b hover:bg-gray-100"
                            >
                              <td className="px-4 py-2">{college.name}</td>
                              <td className="px-4 py-2">{college.code}</td>
                              <td className="px-4 py-2">{college.cutoff}</td>
                              <td className="px-4 py-2">{college.branch}</td>
                              <td className="px-4 py-2">{college.location}</td>
                              <td className="px-4 py-2">{college.fees}</td>
                              <td className="px-4 py-2">
                                {college.bestFor} {/* This field should specify "Placement," "Higher Studies," or "Both" */}
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                    </tbody>
                  </table>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <p className="text-gray-600">No colleges available for the given criteria.</p>
          )}
        </section>
      </main>
    </div>
  );
}

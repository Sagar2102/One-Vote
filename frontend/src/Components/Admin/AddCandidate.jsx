// import React, { useState, useEffect } from 'react'
// import "../../Styles/AddCandidate.css"
// import axios from 'axios'
// import { server } from '../../server'
// import api from '../../axiosInstance'

// function AddCandidate() {
//    const [states, setState] = useState([])
//    const [apiAreas, setArea] = useState([])
//    const [data, setData] = useState({
//       firstName: '',
//       lastName: '',
//       avatar: '',
//       voterId: '',
//       uniqueId: '',
//       town: '',
//       representative: '',
//       candidateType: '',
//       dob: '',
//       promise: '',
//    })
//    async function getAreaDetail() {
//       try {
//          const response = await axios.get(`${server}/api/districts-and-states/district-state`)
//          const areas = response.data.data?.[0]?.apiData?.states
//          setArea(areas)
//       } catch (err) {
//          alert(err.response?.data?.message || err.message || 'An error occured while sending your query')
//       }
//    }

//    useEffect(() => {
//       getAreaDetail()
//    }, [])

//    useEffect(() => {
//       if (apiAreas.length > 0) {
//          getState()
//       }
//    }, [apiAreas])

//    const getState = async () => {
//       try {
//          const res = apiAreas.map((item) => item.state)
//          setState(res)
//       } catch (error) {
//          alert(err.response?.data?.message || err.message || 'An error occured while talking with database')
//       }
//    };

//    const handleChange = (e) => {
//       const { name, value } = e.target
//       if (name === "avatar") {
//          setData({ ...data, avatar: e.target.files[0] });
//       } else {
//          setData({ ...data, [name]: value })
//       }
//    }
//    const handleSubmit = async (e) => {
//       e.preventDefault()
//       try {
//          const token = localStorage.getItem('accessToken')
//          console.log(data, 'this is for mdata')
//          const response = await axios.post(`${server}/candidates/candidate-list`, data, {
//             headers: {
//                Authorization: `Bearer ${token}`,
//                "Content-Type": "multipart/form-data"
//             }
//          })
//          if (!response) console.log(response)
//          console.log(response.data)
//          setData(Object.keys(data).reduce((acc, key) => {
//             acc[key] = '';
//             return acc;
//          }, {}))
//       } catch (err) {
//          console.log(err, err.message)
//       }
//    }
//    return (
//       <form className="flex admin-add-candidate" onSubmit={handleSubmit} >
//          <div className="add-candidate-entries  flex flex-col gap-10  justify-between">
//             <div className="add-candidate-formData flex  justify-between gap-10">
//                <div className="ele firstName  flex-col flex gap-3">
//                   <label htmlFor="firstName" className="text-lg lg:text-xl xl:text-2xl">First Name</label>
//                   <input
//                      className="text-lg lg:text-xl xl:text-2xl"
//                      type="text"
//                      name="firstName"
//                      id="firstName"
//                      required
//                      onChange={handleChange}
//                      value={data.firstName}
//                   />
//                </div>
//                <div className="ele lastname flex flex-col gap-3">
//                   <label htmlFor="lastName" className="text-lg lg:text-xl xl:text-2xl">Last Name</label>
//                   <input
//                      className="text-lg lg:text-xl xl:text-2xl"
//                      type="text"
//                      name="lastName"
//                      id="lastName"
//                      required
//                      onChange={handleChange}
//                      value={data.lastName}
//                   />
//                </div>
//                <div className="ele uniqueId flex flex-col gap-3">
//                   <label htmlFor="uniqueId" className="text-lg lg:text-xl xl:text-2xl">Aadhar card Number</label>
//                   <input
//                      className="text-lg lg:text-xl xl:text-2xl"
//                      type="number"
//                      name="uniqueId"
//                      required
//                      id="uniqueId"
//                      onChange={handleChange}
//                      value={data.uniqueId}

//                   />
//                </div>
//                <div className="ele voterId flex flex-col gap-3">
//                   <label htmlFor="voterId" className="text-lg lg:text-xl xl:text-2xl">Voter Card Id</label>
//                   <input
//                      className="text-lg lg:text-xl xl:text-2xl"
//                      type="text"
//                      name="voterId"
//                      required
//                      id="voterId"
//                      onChange={handleChange}
//                      value={data.voterId}
//                   />
//                </div>
//                <div className="ele representative flex flex-col gap-3">
//                   <label htmlFor="representative" className="text-lg lg:text-xl xl:text-2xl">Representative of </label>
//                   <input
//                      className="text-lg lg:text-xl xl:text-2xl"
//                      type="text"
//                      name="representative"
//                      onChange={handleChange}
//                      required
//                      id="representative"
//                      value={data.representative}
//                   />
//                </div>
//                <div className="ele town flex flex-col gap-3">
//                   <label htmlFor="town" className="text-lg lg:text-xl xl:text-2xl">Lives in</label>
//                   <select name="town" id="town" required className="text-lg lg:text-xl xl:text-2xl" onChange={handleChange} >
//                      <option value="">Select State</option>
//                      {states && states.length > 0 && states.map((ele, index) => (
//                         <option key={index} value={ele.state}>{ele}</option>
//                      ))}
//                   </select>
//                </div>
//                <div className="ele candidateType flex flex-col gap-3">
//                   <label htmlFor="lastName" className="text-lg lg:text-xl xl:text-2xl">Candidate Type</label>
//                   <select required className="text-lg lg:text-xl xl:text-2xl" id="candidateType" name="candidateType" onChange={handleChange}>
//                      <option value="">Select Candidate Type</option>
//                      <option value="new">New</option>
//                      <option value="existing">Existing</option>
//                   </select>
//                </div>
//                <div className="ele dob flex flex-col gap-3">
//                   <label htmlFor="dob" className="text-lg lg:text-xl xl:text-2xl">Date of Birth</label>
//                   <input
//                      className="text-lg lg:text-xl xl:text-2xl"
//                      type="date"
//                      name="dob"
//                      required
//                      id="dob"
//                      onChange={handleChange}
//                      value={data.dob}
//                   />
//                </div>
//                <div className="field ">
//                   <label className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light" htmlFor="avatar">Upload Avatar</label>
//                   <input className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl  font-semibold" id="avatar" name="avatar" type="file" onChange={handleChange} required />
//                </div>
//             </div>
//             <div className="ele promise w-[90%] flex flex-col gap-3">
//                <label htmlFor="promise" className="text-lg lg:text-xl xl:text-2xl">Promises</label>
//                <textarea value={data.promise} placeholder="Enter Promises" name="promise" id="promise" onChange={handleChange} className="textarea text-lg xl:text-xl" required></textarea>
//             </div>
//             <div className="button">
//                <button type="submit" id="button" className="text-2xl 2xl:text-3xl py-4 2xl:py-10 px-10 2xl:px-24"><span>Add Candidate</span></button>
//             </div>
//          </div>
//       </form >
//    )
// }

// export default AddCandidate

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../server';
import api from '../../axiosInstance';
import "../../Styles/AddCandidate.css";

function AddCandidate() {
    const navigate = useNavigate();
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        avatar: '',
        voterId: '',
        uniqueId: '',
        town: '',
        representative: '',
        candidateType: '',
        dob: '',
        promise: '',
        promises: [] // Added to store all promises
    });

    useEffect(() => {
        fetchStates();
    }, []);

    const fetchStates = async () => {
        try {
            const response = await axios.get(`${server}/api/districts-and-states/district-state`);
            const areas = response.data.data?.[0]?.apiData?.states || [];
            setStates(areas.map(item => item.state));
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch states');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handlePromiseAdd = () => {
        if (formData.promise.trim()) {
            setFormData(prev => ({
                ...prev,
                promises: [...prev.promises, prev.promise],
                promise: ''
            }));
        }
    };

    const handlePromiseDelete = (index) => {
        setFormData(prev => ({
            ...prev,
            promises: prev.promises.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const token = localStorage.getItem('accessToken');
            const formDataToSend = new FormData();
            
            // Add all form fields except promises array
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'promises' && value && (typeof value === 'string' || value instanceof File)) {
                    formDataToSend.append(key, value);
                }
            });

            // Add promises array
            formData.promises.forEach(promise => {
                formDataToSend.append('promise[]', promise);
            });

            await axios.post(`${server}/candidates/candidate-list`, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            navigate('/admin/candidates');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add candidate');
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
            <div className="text-[#0099ff] text-xl">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen h-screen bg-[#1a1a1a] text-white overflow-y-auto">
            <div className="container mx-auto p-8 h-full">
                <form className="bg-[#121212] rounded-lg p-8 h-full flex flex-col" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Voter Card ID</label>
                            <input
                                type="text"
                                name="voterId"
                                value={formData.voterId}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Aadhar Card Number</label>
                            <input
                                type="number"
                                name="uniqueId"
                                value={formData.uniqueId}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Representative of</label>
                            <input
                                type="text"
                                name="representative"
                                value={formData.representative}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">State</label>
                            <select
                                name="town"
                                value={formData.town}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            >
                                <option value="">Select State</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Candidate Type</label>
                            <select
                                name="candidateType"
                                value={formData.candidateType}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            >
                                <option value="">Select Type</option>
                                <option value="new">New</option>
                                <option value="existing">Existing</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-300">Upload Avatar</label>
                            <input
                                type="file"
                                name="avatar"
                                onChange={handleChange}
                                required
                                className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-grow flex flex-col">
                        <label className="text-gray-300 mb-2">Promises</label>
                        
                        {/* Promises Input Section */}
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                name="promise"
                                value={formData.promise}
                                onChange={handleChange}
                                placeholder="Enter a promise"
                                className="flex-grow bg-[#2a2a2a] border border-gray-700 rounded-lg p-2 text-white focus:border-[#0099ff] focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={handlePromiseAdd}
                                className="px-4 py-2 bg-[#5800FF] text-white rounded-lg hover:bg-[#4600cc] transition-colors"
                            >
                                Add Promise
                            </button>
                        </div>

                        {/* Promises List Section */}
                        <div className="flex-grow bg-[#2a2a2a] border border-gray-700 rounded-lg p-4 mb-6 overflow-y-auto max-h-[300px]">
                            {formData.promises.length === 0 ? (
                                <p className="text-gray-500">No promises added yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {formData.promises.map((promise, index) => (
                                        <div 
                                            key={index} 
                                            className="flex justify-between items-center bg-[#1a1a1a] p-3 rounded-lg"
                                        >
                                            <span className="text-white">{promise}</span>
                                            <button
                                                type="button"
                                                onClick={() => handlePromiseDelete(index)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#5800FF] text-white rounded-lg hover:bg-[#4600cc] transition-colors"
                        >
                            Add Candidate
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/candidates')}
                            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCandidate;
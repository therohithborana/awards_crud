import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"; // Import the CSS file 
import "../addAward/addAward.css"

const Add = () => {
    const initialAwardState = {
        award_name: "", 
        category: "",
        recipient: "",
        year: "",
        description: ""
    };

    const [award, setAward] = useState(initialAwardState);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setAward({ ...award, [name]: value });
    };

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/create", award);
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/"); // Navigate to the homepage after success
        } catch (error) {
            console.error(error);
            toast.error("Failed to add the award. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <Link to="/">Back</Link>
            <h1>Add New Award</h1>
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="award_name" className="form-label">Award Name</label>
                    <input 
                        type="text"
                        id="award_name"
                        name="award_name"
                        className="form-control"
                        value={award.award_name}
                        onChange={inputHandler}
                        placeholder="Award Name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input 
                        type="text"
                        id="category"
                        name="category"
                        className="form-control"
                        value={award.category}
                        onChange={inputHandler}
                        placeholder="Category"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipient" className="form-label">Recipient</label>
                    <input 
                        type="text"
                        id="recipient"
                        name="recipient"
                        className="form-control"
                        value={award.recipient}
                        onChange={inputHandler}
                        placeholder="Recipient"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input 
                        type="number"
                        id="year"
                        name="year"
                        className="form-control"
                        value={award.year}
                        onChange={inputHandler}
                        placeholder="Year"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                        id="description"
                        name="description"
                        className="form-control"
                        value={award.description}
                        onChange={inputHandler}
                        placeholder="Description"
                        rows="4"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Award</button>
            </form>
        </div>
    );
};

export default Add;

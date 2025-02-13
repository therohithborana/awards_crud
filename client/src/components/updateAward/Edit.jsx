import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const Edit = () => {
  const initialAward = {
    award_name: "",
    category: "",
    recipient: "",
    year: "",
    description: ""
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [award, setAward] = useState(initialAward);

  // Fetch the award data when component mounts
  useEffect(() => {
    const fetchAward = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getone/${id}`);
        setAward(response.data);
      } catch (error) {
        console.error("Error fetching award:", error);
        toast.error("Failed to fetch award data");
      }
    };

    fetchAward();
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setAward({ ...award, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/changemaadu/${id}`, award);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the award. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-secondary mb-3">Back</Link>
          <h3 className="mb-4">Update Award</h3>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="award_name" className="form-label">Award Name</label>
              <input
                type="text"
                value={award.award_name}
                onChange={inputChangeHandler}
                id="award_name"
                name="award_name"
                className="form-control"
                placeholder="Award Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                value={award.category}
                onChange={inputChangeHandler}
                id="category"
                name="category"
                className="form-control"
                placeholder="Category"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="recipient" className="form-label">Recipient</label>
              <input
                type="text"
                value={award.recipient}
                onChange={inputChangeHandler}
                id="recipient"
                name="recipient"
                className="form-control"
                placeholder="Recipient"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label">Year</label>
              <input
                type="number"
                value={award.year}
                onChange={inputChangeHandler}
                id="year"
                name="year"
                className="form-control"
                placeholder="Year"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                value={award.description}
                onChange={inputChangeHandler}
                id="description"
                name="description"
                className="form-control"
                placeholder="Description"
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">UPDATE AWARD</button>
          </form>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src="https://img.freepik.com/premium-vector/awards-ceremony-winners-losers-cartoon-banner_82574-3989.jpg"
            alt="Person holding award"
            className="img-fluid rounded-circle"
            style={{ maxWidth: "80%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;

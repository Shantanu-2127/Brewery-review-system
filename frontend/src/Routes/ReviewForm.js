import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { id } = useParams();

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/home/breweries/${id}/rating`, { id, rating, review });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-info">Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating" className="text-primary">Rating:</label>
          <select
            id="rating"
            className="form-control text-warning"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="review" className="text-success">Description:</label>
          <textarea
            id="review"
            className="form-control text-muted"
            value={review}
            onChange={handleDescriptionChange}
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;

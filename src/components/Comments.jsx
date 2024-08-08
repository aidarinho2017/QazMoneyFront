// Comments.jsx

import React, { useState, useEffect } from 'react';
import api from '../api';

const Comments = ({ jobId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = () => {
        api.get(`/api/jobs/${jobId}/comments/`)
            .then(res => setComments(res.data))
            .catch(err => console.error(err));
    };

    const handleCreateComment = (e) => {
        e.preventDefault();
        // Ensure the job ID is included in the comment data
        const commentData = {
            text,
            job: jobId, // Include the job ID here
        };

        api.post(`/api/jobs/${jobId}/comments/`, commentData)
            .then(res => {
                setText('');
                fetchComments();
            })
            .catch(err => {
                console.error(err);
                alert("Failed to submit comment.");
            });
    };

    const handleDeleteComment = (id) => {
        api.delete(`/api/comments/${id}/`)
            .then(res => fetchComments())
            .catch(err => console.error(err));
    };

    return (
        <div className="comments-container">
            <h3>Comments</h3>
            <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <p>{comment.text}</p>
                        <small>By {comment.author_username} at {new Date(comment.created_at).toLocaleString()}</small>
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form className="comment-form" onSubmit={handleCreateComment}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment"
                    required
                />
                <button type="submit">Comment</button>
            </form>
        </div>
    );
};

export default Comments;



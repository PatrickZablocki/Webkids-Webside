import React, { useState } from 'react';
import postform from './postform.module.css'

function PostForm({ onNewPost }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      setError('Text is required');
      return;
    }

    const formData = new FormData();
    formData.append('text', text);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Network response was not ok');
      }

      const newPost = await response.json();
      onNewPost(newPost);
      setText('');
      setFile(null);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('There was an error creating the post!', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };


  return (
    <form onSubmit={handleSubmit}>
    <textarea
      placeholder="What's on your mind?"
      value={text}
      onChange={(e) => setText(e.target.value)}
      required
    />
    <input
      type="file"
      onChange={handleFileChange}
    />
    {file && (
      <div className={postform.delete} >
        <span>{file.name}</span>
        <button type={postform.deleteButton} onClick={handleRemoveFile}>Delete</button>
      </div>
    )}
    <button className={postform.postButton} type="submit">Post</button>
    {error && <p className={postform.error} >{error}</p>}
  </form>
  );
}

export default PostForm;
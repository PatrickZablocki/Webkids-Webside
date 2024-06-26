import React, { useState } from 'react';
import postform from './postform.module.css'

function PostForm({ onNewPost }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
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
      setFileName('');
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('There was an error creating the post!', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
  };



  return (
    <form className={postform.form} onSubmit={handleSubmit}>
      <textarea
        className={postform.textarea}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
     <div className={postform.button}>
     <div className={postform.fileInputWrapper} >
        <input
          className={postform.fileInput}
          type="file"
          onChange={handleFileChange}
        />
        <button type="button" className={postform.customFileButton} >Add Photo/Video</button>
      </div>
      {fileName && (
        <div className={postform.filePreview} >
          <span>{fileName}</span>
          <button type="button" onClick={handleRemoveFile}>Delete</button>
        </div>
      )}
      <button className={postform.button} type="submit">Post</button>
      {error && <p className={postform.errorMessage} >{error}</p>}
     </div>
    </form>
  );
}

export default PostForm;
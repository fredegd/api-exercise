import React, { useState } from 'react';

const EditPost = ({ postId, onSave }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handleSave = () => {
    onSave(postId, newTitle, newBody);
    setNewTitle('');
    setNewBody('');
  };

  return (
    <div>
      <h3>Edit Post</h3>
      <input
        type="text"
        placeholder="New Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Body"
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditPost;

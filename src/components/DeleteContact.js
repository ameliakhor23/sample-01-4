// deleteContact.js
import React from 'react';

const DeleteContact = ({ deleteContactHandler }) => {
  return (
    <div>
      <button onClick={deleteContactHandler}>Delete</button>
    </div>
  );
};

export default DeleteContact;

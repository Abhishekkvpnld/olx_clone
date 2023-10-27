import React, { createContext, useState } from 'react';

export const PostContext = createContext(null);

export default function Post({ children }) {
  const [PostDetails, setPostDetails] = useState(null);

  return (
    <PostContext.Provider value={{ PostDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
}


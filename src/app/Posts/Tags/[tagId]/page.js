'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import PostsByTag from '@/components/PostsByTag';

const tagMapping = {
  Movies: '-NvOi_YxKJgQmbj5Wyzx',
  Shows: '-NvOi_ZxKLgQmbj6Wyax',
  Books: '-NvOi_XxKFgQmbj4Wygx',
  Music: '-NvOi_ZxKLgQmbj6Wybx',
  Podcasts: '-NvOi_ZxKLgQmbj6Wycx',
};

function PostsByTagPage() {
  const { tagId } = useParams(); // Dynamically get the tag from the URL
  const firebaseTagId = tagMapping[tagId]; // Map to Firebase tagId

  return (
    <div>
      <h1 className="text-center mt-4">{tagId}</h1>
      {firebaseTagId ? <PostsByTag tagId={firebaseTagId} /> : <p>Invalid tag selected.</p>}
    </div>
  );
}

export default PostsByTagPage;

import React, { useEffect } from 'react';

export default function EmptyState() {

  return (
    <div className="text-center text-gray-500 text-lg border border-dashed border-gray-300 p-8 rounded-lg">
      <img
        src="/images/emptyfavorite.jpg"
        alt="empty"
        className="object-contain h-[400px] w-full"
      />
      <p>Nothing in your favorites.</p>
    </div>
  );
}

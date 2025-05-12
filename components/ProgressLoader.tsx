
import { useState } from 'react';

const ProgressLoader = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-4 my-6">
    <div className="bg-black h-4 rounded-full transition-all" style={{ width: `${progress}%` }} />
    <p className="text-center mt-2 text-gray-500">{progress}% completed</p>
  </div>
);

export default ProgressLoader;

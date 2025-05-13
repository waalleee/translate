interface ProgressLoaderProps {
  progress: number;
}

export default function ProgressLoader({ progress }: ProgressLoaderProps) {
  return (
    <div className="mt-6">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-center text-subtle mt-2">{progress}% completed</p>
    </div>
  );
}



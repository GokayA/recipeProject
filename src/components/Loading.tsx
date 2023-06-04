import { FC } from 'react';
import { Skeleton } from './Skeleton';

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => (
        <div
          key={id}
          className="bg-white rounded-lg shadow-md p-6 mb-6 border-green-400 border-b  max-w-96 max-h-full flex flex-col"
        >
          <Skeleton className="w-70 h-60 mb-2"></Skeleton>
          <Skeleton className="text-2xl font-bold mb-2 flex-grow bg-gray-200 ">
            &nbsp;
          </Skeleton>

          <div className="flex flex-wrap">
            <Skeleton className="text-gray-700 text-lg mb-4">
              servings | min prep | min cook
            </Skeleton>
          </div>
          <hr className="my-4" />
          <Skeleton className="text-gray-700 text-lg">By</Skeleton>
        </div>
      ))}
    </div>
  );
};

export default Loading;

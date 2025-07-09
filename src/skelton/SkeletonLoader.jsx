import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = ({ count, height, width }) => (
  <div className='d-flex'>
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <Skeleton key={index} height={height} width={width} style={{ margin: '0.5rem' }} />
      ))}
  </div>
);

export default SkeletonLoader;

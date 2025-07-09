import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LazyWrapper = ({ children, fallback }) => {
  return (
    <Suspense fallback={fallback || <Skeleton count={3} height={100} />}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;

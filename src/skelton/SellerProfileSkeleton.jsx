import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css'; // If using react-loading-skeleton library
import Skeleton from 'react-loading-skeleton';

const SellerProfileSkeleton = () => {
  return (
    <div className='UpdateSellerProfile row g-0'>
      {/* First section skeleton */}
      <div className='col-12 p'>
        <div className='row profile-section gap-2'>
          <div className='col-lg-8 col-md-12'>
            <div className='inner-section'>
              <div className='d-flex align-items-center justify-content-between'>
                <div>
                  <Skeleton height={40} width={200} />
                </div>
              </div>

              <h3><Skeleton width={150} /></h3>
              <p><Skeleton width={300} /></p>

              <div className='othersinfo row justify-content-between g-3 p-2'>
                <div className='col-6'>
                  <Skeleton width={100} height={20} />
                  <div className='row p-2 mt-1'>
                    {Array(3).fill().map((_, index) => (
                      <div key={index} className='col s-content'>
                        <Skeleton height={30} width={100} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className='col-6'>
                  <Skeleton width={100} height={20} />
                  <div className='row p-2 mt-1'>
                    {Array(3).fill().map((_, index) => (
                      <div key={index} className='col s-content'>
                        <Skeleton height={30} width={100} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='d-flex align-items-center justify-content-center'>
              <Skeleton circle={true} height={120} width={120} />
            </div>
          </div>
        </div>
      </div>

      {/* Second section skeleton */}
      <div className='col-12 second-section mt-4 shadow-sm'>
        <div className='row gap-1'>
          <div className='col-6 col-xl-4 col-lg-12 col-md-12'>
            <Skeleton height={200} />
          </div>

          <div className='col video-player'>
            <Skeleton height={300} />
          </div>
        </div>
      </div>

      {/* Additional details skeleton */}
      <div className='col-12 another-details'>
        <div className='another-details-inner d-flex ms-2'>
          <Skeleton width={100} height={30} />
          <Skeleton width={100} height={30} style={{ marginLeft: '10px' }} />
        </div>

        <div className='d-flex mt-2'>
          <Skeleton width={150} height={40} className='wish' />
          <Skeleton width={150} height={40} className='catering' style={{ marginLeft: '10px' }} />
        </div>
      </div>
    </div>
  );
};

export default SellerProfileSkeleton;

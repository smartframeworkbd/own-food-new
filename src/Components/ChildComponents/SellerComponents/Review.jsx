import React from "react";

const Review = () => {
  return (
    <div className='row'>
      <div className='col-12 shadow-sm p-2'>
        <div className='row comments-section'>
          <h4 className='m-1 text-uppercase font-monospace'>User Review</h4>
          <div className='col-12 '>
            <div class='comment'>
              <div class='comment-header'>
                <img
                  class='avatar'
                  src='/Assets/Img/avatar/01.jpg'
                  alt='User 1'
                />
                <div class='comment-meta'>
                  <h3>User 1</h3>
                  <span class='timestamp'>June 10, 2023</span>
                </div>
              </div>
              <div class='comment-content'>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  vitae neque vitae sapien cursus pharetra non sit amet nisi.
                  Sed pellentesque elit in neque auctor, ut rhoncus nulla
                  dapibus.
                </p>
              </div>
              {/* <div class="comment-actions">
        <button class="like-button">Like</button>
        <button class="reply-button">Reply</button>
    </div> */}
            </div>

            <div class='comment'>
              <div class='comment-header'>
                <img
                  class='avatar'
                  src='/Assets/Img/avatar/02.jpg'
                  alt='User 2'
                />
                <div class='comment-meta'>
                  <h3>User 2</h3>
                  <span class='timestamp'>June 11, 2023</span>
                </div>
              </div>
              <div class='comment-content'>
                <p>Thank you for your comment!</p>
              </div>
              {/* <div class="comment-actions">
        <button class="like-button">Like</button>
        <button class="reply-button">Reply</button>
    </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;

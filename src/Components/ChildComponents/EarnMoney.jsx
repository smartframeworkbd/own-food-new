import React from "react";
import { Container } from "react-bootstrap";

const EarnMoney = () => {
  return (
    <>
      <section className='EarnMoney section shadow-lg'>
        <div className='sf_earn_wrapper'>
          <Container>
            <div className='row justify-content-center'>
              <div class='title-area text-center mt-5'>
                <span class='sub-title'></span>
                <h2 class='sec-title'>
                  <span className='sf_init_title '> Earn Money </span>{" "}
                  <span class=' sf_text-theme'>With Us</span>
                </h2>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 sf-container'>
                <div className='bd-step__item text-center p-relative mb-60'>
                  <div className='bd-step__arrow'>
                    {/* <img src={ArrowOne} alt="step-arrow" /> */}
                  </div>
                  <div className='bd-step__icon'>
                    <img
                      src={"Assets/Img/earn_money/restaurant.png"}
                      alt='step-icon'
                    />
                  </div>
                  <div className='bd-step__content '>
                    <h3>Instant Food</h3>
                    <p>Consider how some search engines autocorrect for spen</p>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 sf-container'>
                <div className='bd-step__item text-center p-relative mb-60'>
                  <div className='bd-step__arrow'>
                    {/* <img src={ArrowTwo} alt="step-arrow" /> */}
                  </div>
                  <div className='bd-step__icon'>
                    <img
                      src={"/Assets/Img/earn_money/catering.png"}
                      alt='step-icon'
                    />
                  </div>
                  <div className='bd-step__content'>
                    <h3>Pre-Order</h3>
                    <p>Consider how some search engines autocorrect for spen</p>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 sf-container'>
                <div className='bd-step__item text-center p-relative mb-60'>
                  <div className='bd-step__arrow'>
                    {/* <img src={ArrowOne} alt="step-arrow" /> */}
                  </div>
                  <div className='bd-step__icon'>
                    <img
                      src={"/Assets/Img/earn_money/salad.png"}
                      alt='step-icon'
                    />
                  </div>
                  <div className='bd-step__content'>
                    <h3>Cook and Sell</h3>
                    <p>Consider how some search engines autocorrect for spen</p>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 sf-container'>
                <div className='bd-step__item text-center p-relative mb-60'>
                  <div className='bd-step__icon'>
                    <img
                      src={"/Assets/Img/earn_money/food-delivery.png"}
                      alt='step-icon'
                    />
                  </div>
                  <div className='bd-step__content'>
                    <h3>Catering</h3>
                    <p>Consider how some search engines autocorrect for spen</p>
                  </div>
                </div>
              </div>
              <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6  sf-container'>
                <div className='bd-step__item text-center p-relative mb-60 '>
                  <div className='bd-step__icon'>
                    <img
                      src={"/Assets/Img/earn_money/blogger.png"}
                      alt='step-icon'
                    />
                  </div>
                  <div className='bd-step__content'>
                    <h3>Blog</h3>
                    <p>Consider how some search engines autocorrect for spen</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

 

  

     







    </>
  );
};

export default EarnMoney;

import React from 'react';
import Header from '../Common/Header';
import WhatsAppOTP from '../ChildComponents/WhatsAppOTP';
import Footer from '../Common/Footer';

const WhastsAppOTPComponent = () => {
    return (
        <div>
            {/* <Header/> */}
            <div className='Space__For__Header'></div>
            <WhatsAppOTP/>
            {/* <Footer/> */}

        </div>
    );
};

export default WhastsAppOTPComponent;
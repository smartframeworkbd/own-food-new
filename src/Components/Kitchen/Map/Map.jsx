import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden',marginTop:'10px' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.995080386731!2d90.40439137516584!3d23.784873787134117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7e2f4f6a12f%3A0x1b5b8cf8244ebf7f!2sDhaka!5e0!3m2!1sen!2sbd!4v1718600000000!5m2!1sen!2sbd"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;

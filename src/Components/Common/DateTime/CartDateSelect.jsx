// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const TimeDisplay = ({ max }) => {
//   const [currentTime, setCurrentTime] = useState(moment());
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const skipHour = parseInt(max) || 2;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = moment();
//       setCurrentTime(now);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // Effect to initialize default selected date and time
//   useEffect(() => {
//     const defaultDate = moment().startOf("day");
//     setSelectedDate(defaultDate);
//     setSelectedTime(moment(defaultDate).add(skipHour, "hours"));
//   }, [skipHour]);

//   // Function to handle date change in the DatePicker
//   const handleDateChange = (date) => {
//     const selectedDateMoment = moment(date).startOf("day");
//     setSelectedDate(selectedDateMoment);
//     setSelectedTime(moment(selectedDateMoment).add(skipHour, "hours"));
//   };

//   // Effect to update time slots when selectedDate or skipHour changes
//   useEffect(() => {
//     if (!selectedDate) return;

//     const today = moment().startOf("day");
//     const startOfSelectedDate = selectedDate.clone().startOf("day");
//     const endOfSelectedDate = selectedDate.clone().endOf("day");

//     let startHour = today.isSame(startOfSelectedDate)
//       ? moment().add(skipHour, "hours")
//       : startOfSelectedDate;

//     const slots = [];
//     let time = startHour.clone();

//     while (time.isSameOrBefore(endOfSelectedDate)) {
//       slots.push(time.clone());
//       time.add(1, "hour");
//     }

//     setTimeSlots(slots);
//   }, [selectedDate, skipHour]);

//   // Function to handle time change in the dropdown
//   const handleTimeChange = (e) => {
//     const selectedTimeString = e.target.value;
//     setSelectedTime(moment(selectedTimeString, "YYYY-MM-DD hh:mm A"));
//   };

//   return (
//     <div>
//       <h1>Current Time: {currentTime.format("hh:mm:ss A")}</h1>
//       <h1>
//         Selected Date and Time:{" "}
//         {selectedDate && selectedTime && (
//           <>
//             {selectedDate.format("YYYY-MM-DD")} {selectedTime.format("hh:mm A")}
//           </>
//         )}
//       </h1>

//       <label htmlFor='datePicker'>Select Date:</label>
//       <DatePicker
//         id='datePicker'
//         selected={selectedDate ? selectedDate.toDate() : null}
//         onChange={handleDateChange}
//         minDate={moment().add(skipHour, "hours").toDate()}
//       />
//       <br />
//       <label htmlFor='timeSlots'>Select Order Time:</label>
//       <select
//         id='timeSlots'
//         onChange={handleTimeChange}
//         value={selectedTime ? selectedTime.format("YYYY-MM-DD hh:mm A") : ""}
//       >
//         {timeSlots.map((slot, index) => (
//           <option key={index} value={slot.format("YYYY-MM-DD hh:mm A")}>
//             {slot.format("hh:mm A")}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default TimeDisplay;
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./CartDateSelect.css";
// import axios from "axios";
// const TimeDisplay = ({
//   max,
//   selectedDate,
//   setSelectedDate,
//   selectedTime,
//   setSelectedTime,
// }) => {
//   const [currentTime, setCurrentTime] = useState(moment());
//   const [timeSlots, setTimeSlots] = useState([]);
//   // const [selectedDate, setSelectedDate] = useState(moment().startOf("day"));
//   // const [selectedTime, setSelectedTime] = useState(null);
//   const skipHour = parseInt(max) || 3;
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = moment();
//       setCurrentTime(now);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     setSelectedTime(moment().add(skipHour, "hours"));
//   }, [skipHour]);

//   const handleDateChange = (date) => {
//     setSelectedDate(moment(date).startOf("day"));
//     setSelectedTime(moment(date).startOf("day").add(skipHour, "hours"));
//   };

//   useEffect(() => {
//     if (!selectedDate) return;

//     const today = moment().startOf("day");
//     const startOfSelectedDate = selectedDate.clone().startOf("day");
//     const endOfSelectedDate = selectedDate.clone().endOf("day");

//     let startHour = today.isSame(startOfSelectedDate)
//       ? moment().add(skipHour, "hours")
//       : startOfSelectedDate;

//     const slots = [];
//     let time = startHour.clone();

//     while (time.isSameOrBefore(endOfSelectedDate)) {
//       slots.push(time.clone());
//       time.add(1, "hour");
//     }

//     setTimeSlots(slots);
//   }, [selectedDate, skipHour]);

//   const handleTimeChange = (e) => {
//     const selectedTimeString = e.target.value;
//     setSelectedTime(moment(selectedTimeString, "YYYY-MM-DD hh:mm A"));
//   };

//   return (
//     <div className='CartDateSelect'>
//       <div className='row'>
//         {/* <h1>{new Date(selectedDate + selectedTime)}</h1> */}
//         <div className='col-4'>
//           <label className='' htmlFor='datePicker'>
//             Delivery on
//           </label>
//         </div>
//         <div className='col-4'>
//           <div>
//             <DatePicker
//               className='form-control '
//               id='datePicker'
//               selected={selectedDate ? selectedDate.toDate() : null}
//               onChange={handleDateChange}
//               minDate={moment().add(skipHour, "hours").toDate()}
//               dateFormat='d ,MMMM'
//             />
//           </div>
//         </div>
//         <div className='col-4'>
//           <select
//             id='timeSlots'
//             className='form-control'
//             onChange={handleTimeChange}
//             value={
//               selectedTime ? selectedTime.format("YYYY-MM-DD hh:mm A") : ""
//             }
//           >
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={slot.format("YYYY-MM-DD hh:mm A")}>
//                 {slot.format("hh:mm A")}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <br />
//     </div>
//   );
// };

// export default TimeDisplay;
// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./CartDateSelect.css";

// const TimeDisplay = ({
//   max,
//   selectedDate,
//   setSelectedDate,
//   selectedTime,
//   setSelectedTime,
// }) => {
//   const [currentTime, setCurrentTime] = useState(moment());
//   const [timeSlots, setTimeSlots] = useState([]);
//   const skipHour = parseInt(max) || 3;

//   useEffect(() => {
//     // Update current time every second
//     const interval = setInterval(() => {
//       setCurrentTime(moment());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // Initialize selected time to default skipHour offset
//     setSelectedTime(moment().add(skipHour, "hours"));
//     setSelectedDate(moment().startOf("day"));
//   }, [skipHour, setSelectedDate, setSelectedTime]);

//   const handleDateChange = (date) => {
//     const newSelectedDate = moment(date).startOf("day");
//     setSelectedDate(newSelectedDate);
//     setSelectedTime(newSelectedDate.add(skipHour, "hours"));
//   };

//   useEffect(() => {
//     if (!selectedDate) return;

//     const today = moment().startOf("day");
//     const startOfSelectedDate = selectedDate.clone().startOf("day");
//     const endOfSelectedDate = selectedDate.clone().endOf("day");

//     let startHour = today.isSame(startOfSelectedDate)
//       ? moment().add(skipHour, "hours")
//       : startOfSelectedDate;

//     const slots = [];
//     let time = startHour.clone();

//     while (time.isSameOrBefore(endOfSelectedDate)) {
//       slots.push(time.clone());
//       time.add(1, "hour");
//     }

//     setTimeSlots(slots);

//     // Update selectedTime to first available slot if the selected time is no longer valid
//     if (
//       !selectedTime ||
//       !slots.some((slot) => slot.isSame(selectedTime, "minute"))
//     ) {
//       setSelectedTime(slots[0]);
//     }
//   }, [selectedDate, skipHour, selectedTime, setSelectedTime]);

//   const handleTimeChange = (e) => {
//     const selectedTimeString = e.target.value;
//     setSelectedTime(moment(selectedTimeString, "YYYY-MM-DD hh:mm A"));
//   };

//   return (
//     <div className='CartDateSelect'>
//       <div className='row'>
//         <div className='col-4'>
//           <label htmlFor='datePicker'>Delivery on</label>
//         </div>
//         <div className='col-4'>
//           <DatePicker
//             className='form-control'
//             id='datePicker'
//             selected={selectedDate ? selectedDate.toDate() : null}
//             onChange={handleDateChange}
//             minDate={moment().toDate()}
//             dateFormat='d ,MMMM'
//           />
//         </div>
//         <div className='col-4'>
//           <select
//             id='timeSlots'
//             className='form-control'
//             onChange={handleTimeChange}
//             value={
//               selectedTime ? selectedTime.format("YYYY-MM-DD hh:mm A") : ""
//             }
//           >
//             {timeSlots.map((slot, index) => (
//               <option key={index} value={slot.format("YYYY-MM-DD hh:mm A")}>
//                 {slot.format("hh:mm A")}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default TimeDisplay;
import React, { useState, useEffect } from 'react';
// import { Clock, Calendar } from 'lucide-react';
import { FaCalendar, FaClock } from "react-icons/fa";

const TimeSelector = (

  { max = 1,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime, }
) => {
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedTime, setSelectedTime] = useState(null);
  const [minDateTime, setMinDateTime] = useState(null);

  useEffect(() => {
    const now = new Date();
    const minimumDateTime = new Date(now.getTime() + (max * 60 * 60 * 1000));
    setMinDateTime(minimumDateTime);

    setSelectedDate(minimumDateTime);
    setSelectedTime(minimumDateTime);
  }, [max]);

  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value);
    const currentMinDateTime = new Date(minDateTime);

    if (newDate < currentMinDateTime.setHours(0, 0, 0, 0)) {
      alert(`Please select a date from ${minDateTime.toLocaleDateString()} onwards`);
      return;
    }

    setSelectedDate(newDate);

    if (newDate.toDateString() === minDateTime.toDateString()) {
      const minTime = minDateTime.toTimeString().slice(0, 5);
      if (!selectedTime || selectedTime.toTimeString().slice(0, 5) < minTime) {
        setSelectedTime(minDateTime);
      }
    }
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':');
    const newTime = new Date(selectedDate);
    newTime.setHours(hours, minutes);

    if (newTime < minDateTime) {
      alert(`Please select a time after ${minDateTime.toLocaleTimeString()}`);
      return;
    }

    setSelectedTime(newTime);
  };

  if (!minDateTime) return null;

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = (date) => {
    return date.toTimeString().slice(0, 5);
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="delivery-date" className="form-label d-flex align-items-center">
                <FaCalendar className="me-2" size={18} />
                Delivery Date
              </label>
              <input
                id="delivery-date"
                type="date"
                className="form-control"
                min={formatDate(minDateTime)}
                value={selectedDate ? formatDate(selectedDate) : ''}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="delivery-time" className="form-label d-flex align-items-center">
                <FaClock className="me-2" size={18} />
                Delivery Time
              </label>
              <input
                id="delivery-time"
                type="time"
                className="form-control"
                min={selectedDate?.toDateString() === minDateTime.toDateString() ? formatTime(minDateTime) : '00:00'}
                value={selectedTime ? formatTime(selectedTime) : ''}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>

        {selectedDate && selectedTime && (
          <div className="alert alert-info" role="alert">
            <small>
              Selected Delivery: {selectedDate.toLocaleDateString()} at{' '}
              {selectedTime.toLocaleTimeString()}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;

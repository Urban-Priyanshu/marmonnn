// import { useEffect, useState } from 'react';

//  export const usePageTimer = () => {
//     const [time, setTime] = useState({
//         seconds: 0,
//         minutes: 0,
//         hours: 0
//       });
//   useEffect(() => {
//     let isCancelled = false;

//     const advanceTime = () => {
//       setTimeout(() => {
//         let nSeconds = time.seconds;
//         let nMinutes = time.minutes;
//         let nHours = time.hours;

//         nSeconds++;

//         if (nSeconds > 59) {
//           nMinutes++;
//           nSeconds = 0;
//         }
//         if (nMinutes > 59) {
//           nHours++;
//           nMinutes = 0;
//         }
//         if (nHours > 24) {
//           nHours = 0;
//         }
//         if (!isCancelled) {
//           setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
//         }
//         // !isCancelled &&
//         //
//       }, 1000);
//     };
//     advanceTime();

//     return () => {
     
//       console.log(time , "timfkwncknd")
//       isCancelled = true;
//       localStorage.setItem('componentTime', JSON.stringify(time));
    
     
      
//     };
//   }, [time]);
 
//   return 

  
// }


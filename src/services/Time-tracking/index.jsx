
  export const advanceTime = (time , isCancelled, setTime , page) => {
      
        setTimeout(() => {
          let nSeconds = time.seconds;
         
  
          nSeconds++;
  
          if (!isCancelled) {
            
            setTime({ seconds: nSeconds , page });
            
          }
         
        }, 1000);
        
      };
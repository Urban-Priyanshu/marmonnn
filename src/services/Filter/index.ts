export function handleFilter (event, type, filteredData, setFilteredData,
  setPage,
  paginationData) {


    // 
    let obj = { ...filteredData };
    if(setPage){

      setPage(1)
    }


    if(paginationData){
      paginationData(1)

    }
    

    // if (type === 'clear') {
    //     obj = {
    //         role: obj.role.filter((d) => d != event.target.name),
    //         status: obj.status.filter((d) => d != event.target.name)
    //       };
        
    //   }

    if (type === 'role') {
      if (event.target.checked === true) {
        obj = { ...obj, role: [...obj.role, event.target.name] };
      } else {
        obj = {
          ...obj,
          role: obj.role.filter((d) => d != event.target.name)
        };
      }
    }
    if (type === 'status') {
      if (event.target.checked === true) {
        obj = { ...obj, status: [...obj.status, event.target.name] };
      } else {
        obj = {
          ...obj,
          status: obj.status.filter((d) => d != event.target.name)
        };
      }
    }
    

    if (type === 'jobType') {
      if (event.target.checked === true) {
        obj = { ...obj, jobType: [...obj.jobType, event.target.name] };
      } else {
        obj = {
          ...obj,
          jobType: obj.jobType.filter((d) => d != event.target.name)
        };
      }
    }

    if (type === 'fromDate') {
        obj = { ...obj, date: {...obj.date,from: new Date(`${event.target.value}`)}}};
    
    

    if (type === 'toDate') {
      obj = { ...obj, date: {...obj.date, to: new Date(`${event.target.value}`)}}};

      
    if (type === 'date') {
      const previous = new Date(event.selection.startDate.getTime());
      const next =new Date(event.selection.endDate.getTime())
      previous.setDate(event.selection.startDate.getDate() - 1);
      next.setDate(event.selection.endDate.getDate() + 1);
    
      
      obj = { ...obj, date: {...obj.date, from: previous, to:next}}};
      
      
  

    return setFilteredData({ ...obj });
  };


 


  export function  getFilteredData(tableData, filteredData, role) {

    if (tableData && role === 'superAdmin') {


        return tableData.filter((d) => {
            if (
              filteredData.role.some((data) => d.roles.includes(data)) &&
              filteredData.status.includes(d.status) 
            ) {
              
              return d;
            }
            if (
              filteredData.status.length === 0 &&
              filteredData.role.some((data) => d.roles.includes(data))
            ) {
              
              return d;
            }
            if (
              filteredData.status.includes(d.status) &&
              filteredData.role.length === 0
            ) {
              
              return d;
            }
      
            if (filteredData.role.length === 0 && filteredData.status.length === 0) {
              
              return d;
            }
          });
    }

    if (tableData && role === 'systemAdmin') {
    
        return tableData?.filter((d) => {
            if (
              filteredData.status.includes(d.status)
            ) {
              return d;
            }
            if (
              filteredData.status.length === 0 
            ) {
              return d;
            }
          });
    }
    if (tableData && role === 'BulkOrdersystemAdmin') {
      
    
      return tableData?.fileData?.filter((d) => {
          if (
            filteredData.status.includes(d.status)
          ) {
            return d;
          }
          if (
            filteredData.status.length === 0 
          ) {
            return d;
          }
        });
  }
  if (tableData && role === 'ForecastSystemAdmin') {
    
    return tableData?.fileData?.filter((d) => {
        if (
          filteredData.status.includes(d.status)
        ) {
          return d;
        }
        if (
          filteredData.status.length === 0 
        ) {
          return d;
        }
      });
}


    if (tableData && role === 'modalTable') {
    
      return tableData?.fileData?.filter((d) => {
          if (filteredData.status.some((data) => {
            if(data === 'Invalid format') {
              return d?.status?.some((res)=> {
             
              return  res?.includes(data) })
            }
            if(data === 'Empty' || data === 'Blank') {
              return d?.status?.some((res)=> {
            
              return  res?.includes(data) })
            }
            return d.status.includes(data)
            }) 
          ) {
            return d;
          }
          
          if (
            filteredData.status.length === 0 
          ) {
            return d;
          }
        });
  }

    if (tableData && role === 'internalUser') {
      return tableData.filter((d) => {
          if (
            filteredData.role.some((data) => d.roles.includes(data))
          ) {
            return d;
          }
          if (
            filteredData.role.length === 0
          ) {
            return d;
          }
        });
  }

  

    if (tableData && role === 'externalUser') {
      

      
      return tableData.filter((d) => {
          
          var newDate =  new Date(d.lastLogin.split(' ')[0])
          
  
          if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
          filteredData.status.includes(d.status) && 
          filteredData.jobType.includes(d.type)  ){
  
          if (!isNaN(newDate.getTime())) {
              return d
              }
           }

           if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
           filteredData.jobType.includes(d.type) &&
           filteredData.status.length === 0  ){
   
           if (!isNaN(newDate.getTime())) {
               return d
               }
            }

            if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
            filteredData.status.includes(d.status)  &&
            filteredData.jobType.length === 0 ){
    
            if (!isNaN(newDate.getTime())) {
                return d
                }
             }

             if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
             filteredData.status.length === 0 &&
             filteredData.jobType.length === 0){
     
             if (!isNaN(newDate.getTime())) {
                 return d
                 }
              }

              if(!filteredData.date.from  && !filteredData.date.to && 
              filteredData.status.length === 0 &&
              filteredData.jobType.length === 0){
      
                  return d
               }

               if(!filteredData.date.from  && !filteredData.date.to && 
                filteredData.status.includes(d.status) && 
          filteredData.jobType.includes(d.type)  ){
        
                    return d
                 }

                 if(!filteredData.date.from  && !filteredData.date.to && 
                  filteredData.status.includes(d.status)  &&
                  filteredData.jobType.length === 0 ){
          
                      return d
                   }

                   if(!filteredData.date.from  && !filteredData.date.to && 
                    filteredData.status.length === 0 &&
                    filteredData.jobType.includes(d.type)  ){
            
                        return d
                     }

             

      
    });




      // return tableData.filter((d) => {
      //     if (
      //       filteredData.status.includes(d.status) && 
      //       filteredData.jobType.includes(d.type) 
      //     ) {
      //       return d;
      //     }
      //     if (
      //       filteredData.jobType.includes(d.type) &&
      //       filteredData.status.length === 0 
      //     ) {
      //       return d;
      //     }
      //     if (
      //       filteredData.status.includes(d.status)  &&
      //       filteredData.jobType.length === 0
      //     ) {
      //       return d;
      //     }
      //     if (
      //       filteredData.status.length === 0 &&
      //       filteredData.jobType.length === 0
      //     ) {
      //       return d;
      //     }
     
      //   });
  }
  

  if (tableData && role === 'config') {

      
    return tableData.filter((d) => {
        
      var newDate =  new Date(d.uploadDate.split(' ')[0])
        

        if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
        filteredData.status.includes(d.status) && 
        filteredData.jobType.includes(d.type)  ){

        if (!isNaN(newDate.getTime())) {
            return d
            }
         }

         if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
         filteredData.jobType.includes(d.type) &&
         filteredData.status.length === 0  ){
 
         if (!isNaN(newDate.getTime())) {
             return d
             }
          }

          if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
          filteredData.status.includes(d.status)  &&
          filteredData.jobType.length === 0 ){
  
          if (!isNaN(newDate.getTime())) {
              return d
              }
           }

           if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
           filteredData.status.length === 0 &&
           filteredData.jobType.length === 0){
   
           if (!isNaN(newDate.getTime())) {
               return d
               }
            }

            if(!filteredData.date.from  && !filteredData.date.to && 
            filteredData.status.length === 0 &&
            filteredData.jobType.length === 0){
    
                return d
             }

             if(!filteredData.date.from  && !filteredData.date.to && 
              filteredData.status.includes(d.status) && 
        filteredData.jobType.includes(d.type)  ){
      
                  return d
               }

               if(!filteredData.date.from  && !filteredData.date.to && 
                filteredData.status.includes(d.status)  &&
                filteredData.jobType.length === 0 ){
        
                    return d
                 }

                 if(!filteredData.date.from  && !filteredData.date.to && 
                  filteredData.status.length === 0 &&
                  filteredData.jobType.includes(d.type)  ){
          
                      return d
                   }

           

    
  });

  

  


    // return tableData.filter((d) => {
    //     if (
    //       filteredData.status.includes(d.status) && 
    //       filteredData.jobType.includes(d.type) 
    //     ) {
    //       return d;
    //     }
    //     if (
    //       filteredData.jobType.includes(d.type) &&
    //       filteredData.status.length === 0 
    //     ) {
    //       return d;
    //     }
    //     if (
    //       filteredData.status.includes(d.status)  &&
    //       filteredData.jobType.length === 0
    //     ) {
    //       return d;
    //     }
    //     if (
    //       filteredData.status.length === 0 &&
    //       filteredData.jobType.length === 0
    //     ) {
    //       return d;
    //     }
   
    //   });
}

if (tableData && role === 'createdDate') {
      

      
  return tableData.filter((d) => {
      
    var newDate =  new Date(d.createdDate.split(' ')[0])
      

      if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
      filteredData.status.includes(d.status) && 
      filteredData.jobType.includes(d.type)  ){

      if (!isNaN(newDate.getTime())) {
          return d
          }
       }

       if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
       filteredData.jobType.includes(d.type) &&
       filteredData.status.length === 0  ){

       if (!isNaN(newDate.getTime())) {
           return d
           }
        }

        if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
        filteredData.status.includes(d.status)  &&
        filteredData.jobType.length === 0 ){

        if (!isNaN(newDate.getTime())) {
            return d
            }
         }

         if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
         filteredData.status.length === 0 &&
         filteredData.jobType.length === 0){
 
         if (!isNaN(newDate.getTime())) {
             return d
             }
          }

          if(!filteredData.date.from  && !filteredData.date.to && 
          filteredData.status.length === 0 &&
          filteredData.jobType.length === 0){
  
              return d
           }

           if(!filteredData.date.from  && !filteredData.date.to && 
            filteredData.status.includes(d.status) && 
      filteredData.jobType.includes(d.type)  ){
    
                return d
             }

             if(!filteredData.date.from  && !filteredData.date.to && 
              filteredData.status.includes(d.status)  &&
              filteredData.jobType.length === 0 ){
      
                  return d
               }

               if(!filteredData.date.from  && !filteredData.date.to && 
                filteredData.status.length === 0 &&
                filteredData.jobType.includes(d.type)  ){
        
                    return d
                 }

         

  
});






  // return tableData.filter((d) => {
  //     if (
  //       filteredData.status.includes(d.status) && 
  //       filteredData.jobType.includes(d.type) 
  //     ) {
  //       return d;
  //     }
  //     if (
  //       filteredData.jobType.includes(d.type) &&
  //       filteredData.status.length === 0 
  //     ) {
  //       return d;
  //     }
  //     if (
  //       filteredData.status.includes(d.status)  &&
  //       filteredData.jobType.length === 0
  //     ) {
  //       return d;
  //     }
  //     if (
  //       filteredData.status.length === 0 &&
  //       filteredData.jobType.length === 0
  //     ) {
  //       return d;
  //     }
 
  //   });
}

if (tableData && role === 'openOrders') {
      

      
  return tableData.filter((d) => {
      
    if(d?.dueDate != null){
      var newDate =  new Date(d?.dueDate.split(' ')[0])
      if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
        filteredData.status.includes(d.status) && 
        filteredData.jobType.includes(d.type)  ){
  
        if (!isNaN(newDate.getTime())) {
            return d
            }
         }
  
         if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
         filteredData.jobType.includes(d.type) &&
         filteredData.status.length === 0  ){
  
         if (!isNaN(newDate.getTime())) {
             return d
             }
          }
  
          if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
          filteredData.status.includes(d.status)  &&
          filteredData.jobType.length === 0 ){
  
          if (!isNaN(newDate.getTime())) {
              return d
              }
           }
  
           if(filteredData.date.from < newDate && filteredData.date.to > newDate && 
           filteredData.status.length === 0 &&
           filteredData.jobType.length === 0){
   
           if (!isNaN(newDate.getTime())) {
               return d
               }
            }
  
            if(!filteredData.date.from  && !filteredData.date.to && 
            filteredData.status.length === 0 &&
            filteredData.jobType.length === 0){
    
                return d
             }
  
             if(!filteredData.date.from  && !filteredData.date.to && 
              filteredData.status.includes(d.status) && 
        filteredData.jobType.includes(d.type)  ){
      
                  return d
               }
  
               if(!filteredData.date.from  && !filteredData.date.to && 
                filteredData.status.includes(d.status)  &&
                filteredData.jobType.length === 0 ){
        
                    return d
                 }
  
                 if(!filteredData.date.from  && !filteredData.date.to && 
                  filteredData.status.length === 0 &&
                  filteredData.jobType.includes(d.type)  ){
          
                      return d
                   }
  
    }else {
      
      return d
    }
      

    
         

  
});




  // return tableData.filter((d) => {
  //     if (
  //       filteredData.status.includes(d.status) && 
  //       filteredData.jobType.includes(d.type) 
  //     ) {
  //       return d;
  //     }
  //     if (
  //       filteredData.jobType.includes(d.type) &&
  //       filteredData.status.length === 0 
  //     ) {
  //       return d;
  //     }
  //     if (
  //       filteredData.status.includes(d.status)  &&
  //       filteredData.jobType.length === 0
  //     ) {
  //       return d;
  //     }
  //     if (
  //       filteredData.status.length === 0 &&
  //       filteredData.jobType.length === 0
  //     ) {
  //       return d;
  //     }
 
  //   });
}
 
  };





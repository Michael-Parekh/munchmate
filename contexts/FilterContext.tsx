import React, { createContext, useState, useEffect } from 'react';
import DateObject from "react-date-object";

interface FilterContextProps {
  filterObj: {
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
  };
  setFilterObj: React.Dispatch<React.SetStateAction<{
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
  }>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

const FilterContextProvider = ({ children } : {children : any}) => {

  const incrementStartTime = (startTime : Date) => {
    let endDate = new Date(startTime);
    endDate.setHours(startTime.getHours() + 4);
    return endDate;
  }

  const [filterObj, setFilterObj] = useState({
    startDate : new Date(),
    endDate : (new Date()),
    startTime : new Date(),
    endTime : (incrementStartTime(new Date()))
  });

  useEffect(() => {
    console.log(filterObj);
  }, [])

  return (
    <FilterContext.Provider value={{ filterObj, setFilterObj }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };

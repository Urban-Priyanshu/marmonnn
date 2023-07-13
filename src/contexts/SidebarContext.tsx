import { FC, useState, createContext } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from 'src/redux/constants/action-types';
type SidebarContext = {
  sidebarToggle: any;
  Active: Number;
  toggleSidebar: () => void;
  setActive: any;

  closeSidebar: (Number) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const dispatch = useDispatch();
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [Active, setActive] = useState<Number>(1);

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const closeSidebar = (num) => {
    setSidebarToggle(false);

    dispatch({
      type: ActionTypes.GET_MENU_ACTIVE,
      payload: num
    });
    setActive(num);
  };

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, Active, setActive, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

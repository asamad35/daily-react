import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainList } from "./redux/mainList/mainListActions";

const Sidebar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainList());
  }, [dispatch]);

  const state = useSelector((state) => state);

  return (
    <div className="bg-[#F2F3F5] inline-block py-12 px-8 rounded-[2.5rem] rounded-r-none">
      {/* board name */}
      <div className="inline-flex justify-center items-center gap-4 bg-white py-4 px-6 rounded-2xl">
        <div className="bg-[#2E4ACD] text-white text-2xl p-4 w-[40px] h-[40px] flex justify-center items-center rounded-full">
          A
        </div>
        <h1 className="text-xl font-semibold">Kanban Board</h1>
      </div>
      {/* project list */}
      <ul className="mt-8">
        {state.mainList
          .map((listCollection) => listCollection.title)
          .map((title, index) => (
            <li
              key={index}
              className="flex justify-start items-center gap-4 font-semibold bg-white cursor-pointer py-4 px-6 rounded-lg"
            >
              <i className="fa-solid fa-play"></i>
              <p className="">{title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;

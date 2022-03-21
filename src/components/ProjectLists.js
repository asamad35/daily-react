import React, { useEffect } from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { getMainList } from "./redux/mainList/mainListActions";
import { addListLocally } from "./redux/listActions";
import { handleDragDrop } from "./redux/cardActions";
const ProjectLists = () => {
  const dispatch = useDispatch();

  // dispatching
  useEffect(() => {
    dispatch(getMainList());
  }, []);

  // getting redux store state
  let mainList = useSelector((state) => state.mainList);
  const lists = mainList[0]?.listCollection;
  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    const listSourceId = source.droppableId;
    const listDestinationId = destination.droppableId;
    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;
    const cardId = draggableId;

    // console.log(
    //   listSourceId,
    //   listDestinationId,
    //   cardSourceIndex,
    //   cardDestinationIndex,
    //   cardId
    // );

    if (!destination) {
      return;
    }
    dispatch(
      handleDragDrop(
        listSourceId,
        listDestinationId,
        cardSourceIndex,
        cardDestinationIndex,
        cardId
      )
    );
  };
  return (
    <div className="ml-16">
      {/* main heading */}
      <h1 className="text-5xl font-semibold mt-14 mb-4">Daily Task</h1>
      <p className="font-medium mb-8">
        Use{" "}
        <span className="bg-white rounded-sm px-2 mx-1 inline-flex items-center justify-center  ">
          + Task
        </span>{" "}
        button to add more tasks.
      </p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8 ">
          {lists?.map((list, index) => {
            return (
              <List
                list={list}
                listID={list.id}
                index={index}
                key={index}
                cards={list.cards}
              />
            );
          })}
          {/* add new list */}
          <div
            id={lists?.id}
            onClick={(e) => {
              dispatch(addListLocally(e));
            }}
            className="h-[40px] w-[300px] bg-white mb-8 cursor-pointer rounded-lg flex items-center justify-center text-{2}xl "
          >
            <i className="fa-solid fa-plus mr-4"></i>List
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectLists;

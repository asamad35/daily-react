import React, { useEffect } from "react";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { getMainList } from "./redux/mainList/mainListActions";
import { addListLocally } from "./redux/listActions";
import { handleDragDrop } from "./redux/cardActions";
// import { boardId } from "./redux/mainList/mainListReducer";
const ProjectLists = ({ boardId }) => {
  const dispatch = useDispatch();

  // dispatching
  useEffect(() => {
    dispatch(getMainList());
  }, []);
  useEffect(() => {}, [boardId]);
  // getting redux store state
  let mainList = useSelector((state) => state.mainList);
  const lists = mainList[boardId]?.listCollection;
  const handleDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    const listSourceId = source.droppableId;
    const listDestinationId = destination.droppableId;
    const cardSourceIndex = source.index;
    const cardDestinationIndex = destination.index;
    const cardId = draggableId;

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
      <h1 className="text-5xl font-semibold mt-14 mb-8">
        {mainList[boardId]?.title}
      </h1>

      <p className="font-medium mb-8">
        Use{" "}
        <span className="bg-[#F2F3F5] w-[60px] rounded-md border-[#2E4ACD] border-2 border-dashed  px-2 mx-1 inline-flex items-center justify-center  ">
          +
        </span>{" "}
        button to add more tasks. Firebase takes a moment to save your work.
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
            className="h-[40px] w-[300px] border-2 border-[#2E4ACD] border-dashed mb-8 cursor-pointer rounded-lg flex items-center justify-center text-{2}xl "
          >
            <i className="fa-solid fa-plus text-[#2E4ACD]  mr-4"></i>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectLists;

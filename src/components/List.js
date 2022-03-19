import React, { useRef } from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { removeList, addCard } from "./firebase";
import { updateListHeading } from "./firebase";

const List = ({ listID, index, cards, list }) => {
  const heading = useRef(null);
  return (
    <Droppable droppableId={String(listID)} index={index}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className=" w-[300px]"
        >
          {/* heading */}
          <div className="flex justify-between items-center p-2 rounded-lg mb-8 cursor-pointer bg-[#fff]">
            <p
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  e.target.blur();
                  updateListHeading(e, heading.current.innerText);
                }
              }}
              onBlur={(e) => updateListHeading(e, heading.current.innerText)}
              ref={heading}
              id={listID}
              contentEditable="true"
              suppressContentEditableWarning
              className={`font-bold pl-2 py-1 px-2`}
            >
              {list.heading}
            </p>
            <div className="flex items-center gap-4">
              <i
                id={listID}
                onClick={(e) => removeList(e)}
                className="fa-solid fa-trash"
              ></i>
              <p className="bg-black text-white px-2 rounded-md">
                {list.cards.length}
              </p>
            </div>
          </div>
          {/* cards */}
          {cards.map((card, index) => (
            <Card
              listID={listID}
              cardID={card.id}
              index={index}
              cardDetail={card}
              key={index}
            />
          ))}
          {provided.placeholder}
          {/* add new card */}
          <div
            id={listID}
            onClick={(e) => addCard(e)}
            className="h-[50px] bg-white mb-8 cursor-pointer rounded-lg flex items-center justify-center text-{2}xl "
          >
            <i className="fa-solid fa-plus mr-4"></i>Task
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default List;

import React, { useState } from "react";
import ironman from "../images/ironman.jpg";
import hulk from "../images/hulk.jpg";
import batman from "../images/batman.jpg";
import PopUp from "./popUp";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { removeCardLocally } from "./redux/cardActions";

const Card = ({ cardID, index, cardDetail, listID, list }) => {
  const disptach = useDispatch();
  const [isPopupOpen, setPopup] = useState(false);

  const character =
    cardDetail.assignee === "ironman"
      ? ironman
      : cardDetail.assignee === "batman"
      ? batman
      : cardDetail.assignee === "hulk"
      ? hulk
      : ironman;
  return (
    <>
      <Draggable
        draggableId={String(cardID)}
        index={index}
        listTitle={list.title}
      >
        {(provided) => (
          <div
            className=" mb-6 relative "
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="bg-white rounded-lg cursor-pointer">
              {/* heading */}
              <div className="flex items-center">
                <h1
                  onClick={() => {
                    setPopup(!isPopupOpen);
                  }}
                  className="font-medium p-4 basis-[90%] "
                >
                  {cardDetail.heading}
                </h1>
                <i
                  id={listID}
                  cardid={cardID}
                  onClick={(e) => disptach(removeCardLocally(e))}
                  className="fa-solid fa-trash basis-[10%]"
                ></i>
              </div>
              {/* photo */}
              <div
                onClick={() => {
                  setPopup(!isPopupOpen);
                }}
                className="px-4 pb-4"
              >
                <div className="pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[30px] h-[30px] flex rounded-full overflow-hidden"
                      src={character}
                      alt={cardDetail.character}
                    />
                    <p>{cardDetail.character || "ironman"}</p>
                  </div>
                </div>
                {/* tags */}
                <span className="text-white text-sm  mr-4 bg-orange-400 py-1 px-2 rounded-md ">
                  <i className="fa-regular fa-clock pr-2"></i>
                  {cardDetail.month} {cardDetail.date}
                </span>
                <span className=" text-white text-sm  mr-2 py-1 px-2 rounded-md bg-red-500">
                  <i className="fa-solid fa-fire-flame-curved pr-2"></i>
                  {cardDetail.priority}
                </span>
              </div>
            </div>

            {/* popup */}
            <PopUp
              listid={listID}
              cardid={cardID}
              isPopupOpen={isPopupOpen}
              setPopup={setPopup}
              cardDetail={cardDetail}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;

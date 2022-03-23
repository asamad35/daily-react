import Sidebar from "./components/Sidebar";
import ProjectLists from "./components/ProjectLists";
import { useState } from "react";

function App() {
  const [boardId, setBoardId] = useState(0);
  return (
    <div className="bg-[#DCE0E8]">
      <div className="App flex py-12 px-28">
        <Sidebar boardId={boardId} setBoardIndex={setBoardId} />
        <div className=" bg-white flex-1 rounded-[2.5rem] pr-16 rounded-l-none">
          <ProjectLists boardId={boardId} setBoardId={setBoardId} />
        </div>
      </div>
    </div>
  );
}

export default App;

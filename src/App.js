import Sidebar from "./components/Sidebar";
import ProjectLists from "./components/ProjectLists";

function App() {
  return (
    <div className="bg-[#DCE0E8]">
      <div className="App flex py-12 px-28">
        <Sidebar />
        <div className=" bg-blue-200 flex-1 rounded-[2.5rem] pr-16 rounded-l-none">
          <ProjectLists />
        </div>
      </div>
    </div>
  );
}

export default App;

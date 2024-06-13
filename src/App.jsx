import "./App.css";
import Selector from "./components/Selector";
import Graph from "./components/Graph";

function App() {
  return (
    <>
      <h1 className="text-5xl font-bold justify-center flex my-28">
        FRANKFURTER API
      </h1>
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-10">
        <div>
          <Selector />
        </div>
        <div>
          <Graph />
        </div>
      </div>
    </>
  );
}

export default App;

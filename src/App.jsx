import "./App.css";
import { useState } from "react";
import Selector from "./components/Selector";
import Graph from "./components/Graph";

function App() {
  const [primaryCurrency, setPrimaryCurrency] = useState("EUR");
  const [secondaryCurrency, setSecondaryCurrency] = useState("USD");

  return (
    <>
      <h1 className="text-5xl font-bold justify-center flex my-28">
        FRANKFURTER API
      </h1>
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-10">
        <div>
          <Selector
            primaryCurrency={primaryCurrency}
            setPrimaryCurrency={setPrimaryCurrency}
            secondaryCurrency={secondaryCurrency}
            setSecondaryCurrency={setSecondaryCurrency}
          />
        </div>
        <div>
          <Graph
            primaryCurrency={primaryCurrency}
            secondaryCurrency={secondaryCurrency}
          />
        </div>
      </div>
    </>
  );
}

export default App;

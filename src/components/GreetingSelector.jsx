import React, { useState } from "react";
import GreetingGenerator1 from "./GreetingGenerator1";
import GreetingGenerator2 from "./GreetingGenerator2";

const GreetingSelector = () => {
  const [selected, setSelected] = useState("1");

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>🎨 Choose Eid Greeting Version</h1>

      {/* Selector UI */}
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{
          fontSize: "1rem",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "30px",
        }}
      >
        <option value="1">Greeting Style 1</option>
        <option value="2">Greeting Style 2</option>
      </select>

      {/* Render the selected GreetingGenerator */}
      {selected === "1" && <GreetingGenerator1 />}
      {selected === "2" && <GreetingGenerator2 />}
    </div>
  );
};

export default GreetingSelector;

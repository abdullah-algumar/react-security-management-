import React from "react";
import DutyTimeList from "./components/DutyTimeList";
import SecurityGuardList from "./components/SecurityGuardList";
import DutyTime from "./components/DutyTime";

function App() {
  return (
    <div className="App">
      <h1>Güvenlik Görevlileri ve Görev Zamanları</h1>
      {/* <div className="section">
        <SecurityGuardList />
      </div>
      <div className="section">
        <DutyTime />
      </div> */}
      <div className="section">
        <DutyTimeList />
      </div>
    </div>
  );
}

export default App;

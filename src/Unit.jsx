import React, { useEffect, useState } from "react";
import Lessons from "./Lessons";

function Unit({ unitId }) {
  const [unitData, setUnitData] = useState(null);
  const [lessonsData, setLessonsData] = useState(null);

  useEffect(() => {
    async function fetchUnitData() {
      // For the scope of this task, hard-code unitId:
      const response = await fetch("http://localhost:3001/units/1");
      // Todo: some basic error-handling if the fetch fails? (e.g. useState
      // for the branch below where unitData is falsy; "Loading..." could be
      // the default, and this message could be changed if fetch not OK.

      const json = await response.json();

      setUnitData(json);
    }

    fetchUnitData();
  }, []);

  // Don't necessarily need a separate useEffect for this, given the limited
  // scope of this task
  useEffect(() => {
    async function fetchLessonsData() {
      const response = await fetch("http://localhost:3001/units/1/lessons");
      // Todo: error-handling? (As above.)
      const json = await response.json();
      setLessonsData(json);
    }
    fetchLessonsData();
  }, []);

  // Only render when unitData has been successfully fetched:
  if (unitData) {
    const subjectCapitalised =
      unitData.unitInfo.subject.substr(0, 1).toUpperCase() +
      unitData.unitInfo.subject.substr(1);

    return (
      <>
        <h1>{unitData.title}</h1>
        <h2>{unitData.unitInfo.keyStage}</h2>
        <h2>{subjectCapitalised}</h2>
        {lessonsData && <Lessons lessonsData={lessonsData} />}
      </>
    );
  } else {
    // Todo: check implications for screenreaders here. Necessary to add a
    // hint so this isn't read out/is only read out if there's a big delay?
    return <h1>Loading...</h1>;
  }
}

export default Unit;

import React, { useEffect, useState } from "react";

function Unit({ unitId }) {
  const [unitData, setUnitData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // For the scope of this task, hard-code unitId:
      const response = await fetch("http://localhost:3001/units/1");
      // Todo: some basic error-handling if the fetch fails? (e.g. useState
      // for the branch below where unitData is falsy; "Loading..." could be
      // the default, and this message could be changed if fetch not OK.

      const json = await response.json();

      setUnitData(json);
    }

    fetchData();
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
      </>
    );
  } else {
    // Todo: check implications for screenreaders here. Necessary to add a
    // hint so this isn't read out/is only read out if there's a big delay?
    return <h1>Loading...</h1>;
  }
}

export default Unit;

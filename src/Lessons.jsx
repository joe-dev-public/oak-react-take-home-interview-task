import React from "react";
import "./Lessons.css";

function Lessons({ lessonsData }) {
  return (
    <>
      <h3>Number of lessons: {lessonsData.length}</h3>
      <ul className="lessons-list">
        {lessonsData.map((lesson, lessonIndex) => (
          <li key={lessonIndex}>
            <h4>{lesson.title}</h4>
            {lesson.learningObjectives.length !== 0 ? (
              <ul className="objectives-list">
                {lesson.learningObjectives.map(
                  (learningObjective, learningObjectiveIndex) => (
                    <li key={learningObjectiveIndex}>{learningObjective}</li>
                  )
                )}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Lessons;

import React from "react";
import QuestionWiseContent from "../components/QuestionWiseContent";
import PollWiseContent from "../components/PollWiseContent";
import MainLayout from "../components/MainLayout";

function YourParentComponent({ type }) {
  return (
    <MainLayout>
      {type === "Q&A" ? <QuestionWiseContent /> : null}
      {type === "Poll" ? <PollWiseContent /> : null}
    </MainLayout>
  );
}

export default YourParentComponent;

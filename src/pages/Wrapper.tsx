import React from "react";
import { CourseContainer } from "../components/CourseContainer";

window.kilt = {};
export default function Wrapper() {
  return (
    <div>
      <CourseContainer />
    </div>
  );
}

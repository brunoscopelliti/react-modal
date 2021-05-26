import React from "react";
import PropTypes from "prop-types";

import Paragraphs from "./paragraphs";

const Page = ({ children }) => {
  return (
    <>
      <h1>Lorem ipsum</h1>
      {children}
      <Paragraphs />
    </>
  );
};

Page.propTypes = {
  children: PropTypes.element,
};

export default Page;

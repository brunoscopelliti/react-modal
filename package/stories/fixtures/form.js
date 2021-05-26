import React, { useState } from "react";
import PropTypes from "prop-types";

const delay =
  (time) => {
    return new Promise(
      (resolve) => {
        setTimeout(resolve, time);
      }
    );
  };

const Form = ({ close }) => {
  const [loading, setLoading] = useState(false);
  const onSubmit =
    (event) => {
      event.preventDefault();
      setLoading(true);
      delay(2500).finally(close);
    };

  return (
    <form action="#" method="post" onSubmit={onSubmit}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="#">
        Nam luctus</a>, enim in interdum condimentum, nisl diam iaculis lorem, vel volutpat
        mi leo sit amet lectus.
      </p>
      <div>
        <label>
          Name:
          <input type="text" placeholder="Name" />
        </label>
      </div>
      <button type="submit" disabled={loading}>Submit</button>
    </form>
  );
};

Form.propTypes = {
  close: PropTypes.func.isRequired,
};

export default Form;

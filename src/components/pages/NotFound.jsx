import React from "react";

const Note = {
  fontSize: '1.4em',
  textAlign: center,
  color: grey
};

const NotFound = () => {
  return (
    <div className="centered">
        <small className={Note}>Page not Found !</small>
    </div>
  );
};

export default NotFound;

import React from "react";

const Image = ({src,...rest}) => {
  src =
  // If the src already includes "https://", use it as is
    src && src.includes("https://")
      ? src
      : "http://localhost:8080/uploads/" + src;
  return <img {...rest} src={src} alt={""} />;
};

export default Image;

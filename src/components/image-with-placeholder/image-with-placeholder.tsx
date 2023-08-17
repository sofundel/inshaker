import { useState } from "react";
import { Box } from "@mui/material";
import { useEffect } from "react";

const IS_LOADING_DEFAULT = true;

function ImageWithPlaceholder(props: {
  imgUrl: string;
  placeholderStyle: {};
  imageStyle: {};
}) {
  const { imgUrl, placeholderStyle, imageStyle } = props;

  const [isLoading, setIsLoading] = useState(IS_LOADING_DEFAULT);

  useEffect(() => {
    setIsLoading(true);
  }, [imgUrl]);

  return (
    <>
      {isLoading ? (
        <Box
          component="img"
          sx={placeholderStyle}
          src={"../src/styles/images/waiting.gif"}
        />
      ) : null}

      <Box
        component="img"
        sx={isLoading ? { display: "none" } : imageStyle}
        src={imgUrl}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}

export { ImageWithPlaceholder };

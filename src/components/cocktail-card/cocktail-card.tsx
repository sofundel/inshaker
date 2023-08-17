import { Card, CardContent, Box, Typography } from "@mui/material";
import { ICocktailCardData } from "../../ts/types-and-interfaces";
import { Link } from "react-router-dom";
import { ImageWithPlaceholder } from "../image-with-placeholder/image-with-placeholder";

function CocktailCard(props: ICocktailCardData) {
  const { id, name, imgUrl } = props;

  return (
    <Card sx={{ width: "20rem", height: "27rem", borderRadius: "0.5rem" }}>
      <Link to={`/cocktails/${id}`}>
        <Box sx={{ height: "20rem", width: "100%" }}>
          <ImageWithPlaceholder
            imgUrl={imgUrl}
            placeholderStyle={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            imageStyle={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Link>
      <CardContent>
        <Link
          to={`/cocktails/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export { CocktailCard };

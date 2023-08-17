import {
  Box,
  StyledEngineProvider,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getCocktailDetails,
  selectCocktailDetails,
} from "../../store/slices/cocktails/cocktail-details-slice";
import { AppDispatch } from "../../ts/types-and-interfaces";
import "./cocktail-details-page.css";
import { ImageWithPlaceholder } from "../../components/image-with-placeholder/image-with-placeholder";

function CocktailDetailsPage() {
  const { cocktail_id } = useParams();
  const id = Number(cocktail_id);

  const cocktailDetails = useSelector(selectCocktailDetails);
  const {
    isCocktailDetailsLoading,
    cocktailDetailsData: {
      name,
      alcoholic,
      imgUrl,
      composition,
      glass,
      recipe,
    },
  } = cocktailDetails;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCocktailDetails(id));
  }, []);

  function createData(name: string, count: string) {
    return { name, count };
  }

  let rows: { name: string; count: string }[] = [];
  composition.forEach((item) => {
    rows.push(createData(item.ingredient, item.count));
  });

  if (isCocktailDetailsLoading)
    return (
      <Box className="waiting-box">
        <Box
          className="waiting-img"
          component="img"
          src={"../src/styles/images/waiting-page.gif"}
        />
      </Box>
    );

  return (
    <StyledEngineProvider injectFirst>
      <Paper className="details-box">
        <Typography variant="h4">{name}</Typography>
        <Typography sx={{ fontStyle: "italic" }}>{alcoholic}</Typography>
        <Box className="details-content">
          <Box>
            <ImageWithPlaceholder
              imgUrl={imgUrl}
              placeholderStyle={{
                width: "20rem",
                objectFit: "contain",
              }}
              imageStyle={{
                width: "20rem",
                objectFit: "contain",
              }}
            />
          </Box>
          <Box className="details-text-info">
            <Typography variant="h5">Ingredients</Typography>
            <TableContainer
              component={Paper}
              elevation={5}
              sx={{ width: "100%" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ingredient</TableCell>
                    <TableCell>Measure</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box>
              <Typography variant="h5">Glass</Typography>
              <Typography>{glass}</Typography>
            </Box>
            <Box>
              <Typography variant="h5">Recipe</Typography>
              <Typography>{recipe}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </StyledEngineProvider>
  );
}

export { CocktailDetailsPage };

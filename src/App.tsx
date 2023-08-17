import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { CocktailRandomizerPage } from "./pages/cocktail-randomizer-page/cocktail-randomizer-page";
import { ErrorPage } from "./pages/error-page/error-page";
import { CocktailDetailsPage } from "./pages/cocktail-details-page/cocktail-details-page";
import { AlcoholCalculatorPage } from "./pages/alcohol-calculator-page/alcohol-calculator-page";
import { SearchCocktailPage } from "./pages/search-cocktail-page/search-cocktail-page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainPage />} errorElement={<ErrorPage />}>
      <Route path="/" element={<CocktailRandomizerPage />}></Route>
      <Route path="/search" element={<SearchCocktailPage />}></Route>
      <Route
        path="/alcohol-calculator"
        element={<AlcoholCalculatorPage />}
      ></Route>
      <Route
        path="/cocktails/:cocktail_id"
        element={<CocktailDetailsPage />}
      ></Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

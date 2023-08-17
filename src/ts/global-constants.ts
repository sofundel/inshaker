const SERVER_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

const URL_PATHS = {
  RANDOM_COCKTAIL: "random.php",
  COCKTAIL_DETAILS: "lookup.php?i=",
  SEARCH_BY_NAME: "search.php?s=",
  SEARCH_BY_INGREDIENT: "filter.php?i=",
};

const REQUEST_STATUSES = {
  200: 200,
};

const STORAGE_KEY = "inshakerUserData";

export { SERVER_URL, URL_PATHS, REQUEST_STATUSES, STORAGE_KEY };

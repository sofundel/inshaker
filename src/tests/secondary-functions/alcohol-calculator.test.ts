import { expect, test } from "@jest/globals";

const alcoholCalculator = require("../../pages/alcohol-calculator-page/alcohol-calculator");

test.each([
  [
    {
      sex: "female",
      weight: "55",
      drinks: [{ id: 0, name: "Drink1", alcoholPercent: 40, volume: 100 }],
      expected: "0.96",
    },
    {
      sex: "male",
      weight: "90.5",
      drinks: [
        { id: 0, name: "Drink1", alcoholPercent: 40, volume: 200 },
        { id: 1, name: "Drink2", alcoholPercent: 4, volume: 1000 },
        { id: 2, name: "Drink3", alcoholPercent: 0, volume: 700 },
      ],
      expected: "1.50",
    },
  ],
])("calculate alcohol concentration", ({ sex, weight, drinks, expected }) => {
  expect(alcoholCalculator.calculateConcentration(sex, weight, drinks)).toBe(
    expected,
  );
});

test.each([
  [
    {
      sex: "female",
      concentration: 0.96,
      expected: "10.67",
    },
    {
      sex: "male",
      concentration: 1.5,
      expected: "12.00",
    },
  ],
])("calculate alcohol elimination time", ({ sex, concentration, expected }) => {
  expect(alcoholCalculator.calculateEliminationTime(sex, concentration)).toBe(
    expected,
  );
});

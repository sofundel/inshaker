import { expect, test } from "@jest/globals";

const inputChecks = require("../../ts/utils/input-checks");

test.each([
  ["aa58", /58/, /[^58]/],
  ["0799", /0799/, /[^0799]/],
  ["1p-7", /17/, /[^17]/],
  ["-0", /0/, /[^0]/],
  ["-w  9", /9/, /[^9]/],
  ["hello, world", /^(?=\s*$)/, /./],
  ["   88", /88/, /[^88]/],
])(
  "Remove everything from the string except the numbers 0-9",
  (initial, expected, noExpected) => {
    expect(inputChecks.allowOnlyNumbers(initial)).toMatch(expected);
    expect(inputChecks.allowOnlyNumbers(initial)).not.toMatch(noExpected);
  },
);

import { SEX } from "../../store/slices/user-slice";

const ETHANOL_DENSITY = 790;
const ML_TO_L = 0.001;
const PERSENT_TO_PORTION = 0.01;
const SEX_FACTORS = {
  MALE: 0.7,
  FEMALE: 0.6,
};
const SEX_ELIMINATION_RATE = {
  MALE: 0.125,
  FEMALE: 0.09,
};

function calculateConcentration(
  sex: string,
  weight: string | number,
  drinks: {
    id: number;
    name: string;
    alcoholPercent: number | string;
    volume: number | string;
  }[],
) {
  let ethanolContent: number = 0;
  drinks.forEach((item) => {
    ethanolContent +=
      Number(item.volume) *
      ML_TO_L *
      Number(item.alcoholPercent) *
      PERSENT_TO_PORTION *
      ETHANOL_DENSITY;
  });

  const factor = sex === SEX.MALE ? SEX_FACTORS.MALE : SEX_FACTORS.FEMALE;
  const concentration = ethanolContent / factor / Number(weight);
  return concentration.toFixed(2);
}

function calculateEliminationTime(sex: string, concentration: number) {
  const eliminationRate =
    sex === SEX.MALE ? SEX_ELIMINATION_RATE.MALE : SEX_ELIMINATION_RATE.FEMALE;
  const eliminationTime = concentration / eliminationRate;
  return eliminationTime.toFixed(2);
}

export { calculateConcentration, calculateEliminationTime };

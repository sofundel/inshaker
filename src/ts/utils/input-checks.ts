function allowOnlyNumbers(input: string) {
  return input.replace(/[^0-9]/g, "");
}

export { allowOnlyNumbers };

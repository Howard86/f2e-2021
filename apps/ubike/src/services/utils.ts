const parseCoordinate = (value: number, fixed: number) =>
  Number.parseFloat(value.toFixed(fixed));

export default parseCoordinate;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapValueToLabel = (value: string, options: any[]) => {
  const category = options.find((opt) => opt.value === value);
  return category ? category.label : value;
};

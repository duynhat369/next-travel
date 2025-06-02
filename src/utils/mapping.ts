export const mapValueToLabel = (value: string, options: any[]) => {
  const category = options.find((opt) => opt.value === value);
  return category ? category.label : value;
};

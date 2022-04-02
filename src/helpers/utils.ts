export const handleErrorMessage = (fieldError: any) => {
  if (!fieldError) return "";

  return fieldError.message.key.replace(/{{[a-z]*}}/, Object.values(fieldError.message.values));
};

export const getResourcePathType = (resourceType: string) => {
  let resourcePath;
  if (resourceType === "article") {
    resourcePath = "articles";
  }
  if (resourceType === "selfReflectionExercise") {
    resourcePath = "self-reflections";
  }
  return resourcePath;
};

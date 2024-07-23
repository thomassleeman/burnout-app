import { SchemaTypeDefinition } from "sanity";
import { articleType } from "./articleSchema";
import { authorType } from "./authorSchema";
import { categoryType } from "./categorySchema";
import { courseType } from "./courseSchema";
import { burnoutStoryType } from "./burnoutStorySchema";
import { selfReflectionExerciseType } from "./selfReflectionExerciseSchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    articleType,
    authorType,
    categoryType,
    courseType,
    burnoutStoryType,
    selfReflectionExerciseType,
  ],
};

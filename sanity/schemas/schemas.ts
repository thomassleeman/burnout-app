import { SchemaTypeDefinition } from "sanity";
import { articleType } from "./articleSchema";
import { authorType } from "./authorSchema";
import { categoryType } from "./categorySchema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, authorType, categoryType],
};

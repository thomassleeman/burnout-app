import { NumberInputProps, useFormValue } from "sanity";
import { Stack, Text } from "@sanity/ui";

function calculateReadingTime(text: string) {
  const wordsPerMinute = 200; // Average case.
  if (typeof text === "string") {
    let textLength = text.split(" ").length; // Split by words
    if (textLength > 0) {
      let value = Math.ceil(textLength / wordsPerMinute);
      return value;
    }
  }
  return 0;
}

export default function ReadingTimeInput(props: NumberInputProps) {
  const content = (useFormValue(["content"]) || []) as Array<{
    _type: string;
    children: Array<{ text: string }>;
  }>;

  let readingTime = 0;

  if (content.length > 0) {
    const text = content
      ?.filter((item) => item._type === "block")
      .map((block) => block.children.map((child) => child.text).join(" "));

    readingTime = calculateReadingTime(text?.join(" ") || "");
  }

  return (
    <Stack space={3}>
      <Text size={1}>{`${readingTime} ${
        readingTime > 1 ? "mins" : "min"
      }`}</Text>
    </Stack>
  );
}

/*
This file defines a React component `ReadingTimeInput` that calculates and displays the estimated reading time for a block of text in a Sanity document form. 

The `calculateReadingTime` function takes a string of text, splits it into words, and calculates the reading time based on an average reading speed of 200 words per minute.

The `ReadingTimeInput` component uses the `useFormValue` hook from Sanity to get the value of the 'content' field, which is assumed to be an array of block objects. Each block object is expected to have a `_type` property of 'block' and a `children` property that is an array of objects with a `text` property.

The component filters out the block objects from the 'content' field, joins the text of their children into a single string, and passes this string to `calculateReadingTime` to calculate the reading time.

The calculated reading time is then displayed in a `Text` component from Sanity UI.
*/

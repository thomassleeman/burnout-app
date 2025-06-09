export function serialiseData<T>(data: T): T {
  // First stringify then parse to create a deep clone
  const parsed = JSON.parse(JSON.stringify(data));

  // Process the parsed data to normalize timestamp formats
  return normalizeTimestamps(parsed);
}

function normalizeTimestamps(obj: any): any {
  if (!obj) return obj;

  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeTimestamps(item));
  }

  // Check if this object looks like a serialized timestamp
  if (obj._seconds !== undefined && obj._nanoseconds !== undefined) {
    // Convert underscored properties to non-underscored
    return {
      seconds: obj._seconds,
      nanoseconds: obj._nanoseconds,
    };
  }

  // Process all properties of regular objects
  const result: { [key: string]: any } = {};
  for (const key in obj) {
    result[key] = normalizeTimestamps(obj[key]);
  }

  return result;
}

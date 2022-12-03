export const encodedQueryString = (obj: Map<string, Set<string>>) => {
  return obj.size
    ? Array.from(obj.keys())
        .map((key) => {
          const values = obj.get(key);
          if (values)
            return `${key}=${encodeURIComponent(Array.from(values).join(","))}`;
        })
        .join("&")
    : "/";
};
export const decodedQueryString = (query: string) => {
  return query !== "/"
    ? (/^[/#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params: Map<string, Set<string>>, param) => {
          let [key, value] = param.split("=");
          const valueToArray = decodeURIComponent(
            value.replace(/\+/g, " ")
          ).split(",");
          params.set(key, new Set(valueToArray));
          return params;
        }, new Map())
    : new Map();
};

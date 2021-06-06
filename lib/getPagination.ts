const getPagination = (list: string[], slug: string) => {
  const len = list.length;
  const idx = list.findIndex((s) => s === slug);
  // if it's the last post
  if (idx === len - 1) {
      return {
          previousPost: list[idx - 1],
          nextPost: list[0]
      };
  }
  return {
      previousPost: list[idx - 1],
      nextPost: list[idx + 1]
  };
};

export default getPagination;
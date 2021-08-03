const getObjectDepth = (o) =>
  Object (o) === o ? 1 + Math .max (-1, ... Object .values(o) .map (getObjectDepth)) : 0

export default  getObjectDepth
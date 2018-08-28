const dateTimeInScope = function(content1, content2) {
  return (content1.beginDate > content2.endDate || content1.endDate < content2.beginDate) ||
         (content1.beginTime > content2.endTime || content1.endTime < content2.beginTime);
};
export function validateDateTime(contents) {
  if (contents.length <= 1) return true;
  const Len = contents.length;
  for (let i = 0; i < Len; i++) {
    const content1 = contents[i];
    for (let j = i + 1; j < Len; j++) {
      const content2 = contents[j];
      const bol = dateTimeInScope(content1, content2);
      if (bol && i < Len - 2) {
        continue;
      }
      return bol;
    }
  }
}

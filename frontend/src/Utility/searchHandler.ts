/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterContent = (content: any[], searchTerm: string) => {
  const filteredContent = content.filter((item) => {
    if (item.title) {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (item.name) {
      return item.name.toLocaleLowerCase().includes(searchTerm.toLowerCase());
    }
  });
  const uniqueContent = filteredContent.filter(
    (item: { id: any }, index: any, self: any[]) =>
      index === self.findIndex((i: { id: any }) => i.id === item.id)
  );
  return uniqueContent;
};

export const adaptRoot = async (rawData: any) => {
  rawData.forEach((item: any) => {
    console.log(item);
    let basicInfo: any = {};
    basicInfo.name = item.name;
    basicInfo.type = item.category;
    basicInfo.route = item.slug;
  });
};

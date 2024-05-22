export const adaptRoot = async (rawData: any) => {
  const root: any = [];
  rawData.forEach((item: any) => {
    console.log(item);

    let basicInfo: any = {};
    basicInfo.name = item.name;
    basicInfo.type = item.category;
    basicInfo.route = item.slug;

    if (item.category === 'folder') {
      basicInfo.content = [];
      item.projects.forEach((project: any) => {
        basicInfo.content.push(adaptProject(project));
      });
    }
    root.push(basicInfo);
  });
  return root;
};

export const adaptProject = (rawData: any) => {
  const project: any = {};

  project.name = rawData.name;
  project.date = rawData.publishedAt;
  project.icon = rawData.image;
  project.type = 'project';

  project.techStack = rawData.technologies.map((tech: any) => tech.name);
  project.deployment = ['Vercel']; // This seems to be a static value
  project.url = rawData.url;

  return project;
};

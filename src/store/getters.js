const getters = {
  globalWebsiteConfig: state => state.app.globalWebsiteConfig,
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  device: state => state.app.device,
  name: state => state.user.name,
  account: state => state.user.account,
  roles: state => state.user.roles
};
export default getters;

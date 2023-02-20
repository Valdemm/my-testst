const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-Vl_F2d0GlZegCvRIka4ls4KWLTUh_x_s6Mfv_IaoFzA",
  });

  return contentfulClient
    .getSpace("zxgvhb8ntcoj")
    .then((space) => space.getEnvironment("master"));
};

module.exports = {
  TEMPLATE_PATH: `${process.env.FILES_ROOT_FOLDER}/templates/index.html`,
  TEMPLATE_FILES: {
    '/style.css': {
      type: 'text/css',
      path: `${process.env.FILES_ROOT_FOLDER}/templates/style.css`,
    },
    '/favicon.png': {
      type: 'image/png',
      path: `${process.env.FILES_ROOT_FOLDER}/templates/favicon.png`,
    },
    '/favicon.ico': {
      type: 'image/png',
      path: `${process.env.FILES_ROOT_FOLDER}/templates/favicon.png`,
    },
  },
};

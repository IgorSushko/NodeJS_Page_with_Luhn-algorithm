module.exports = {
  TEMPLATE_PATH: `${process.env.FILES_ROOT_FOLDER}/TestTask/templates/index.html`,
  TEMPLATE_FILES: {
    '/style.css': {
      type: 'text/css',
      path: `${process.env.FILES_ROOT_FOLDER}/TestTask/templates/style.css`,
    },
    '/favicon.png': {
      type: 'image/png',
      path: `${process.env.FILES_ROOT_FOLDER}/TestTask/templates/favicon.png`,
    },
    '/favicon.ico': {
      type: 'image/png',
      path: `${process.env.FILES_ROOT_FOLDER}/TestTask/templates/favicon.png`,
    },
  },
};

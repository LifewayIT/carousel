/* eslint-disable no-console */
const versionExists = require('version-exists');

const version = process.env.npm_package_version;

versionExists(process.env.npm_package_name, version)
  .then(exists => {
    if(exists) {
      console.error(`Package version ${version} already exists.`);
      process.exit(-1);
    } else {
      console.info(`${version} does not exist for package`);
      process.exit(0);
    }
  })
  .then(error => {
    console.error(error);
    process.exit(-1);
  });

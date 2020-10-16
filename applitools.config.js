
const desktopViewport = { width: 1200, height: 600 };

const appName = process.env.npm_package_name;

const getBranchName = () => {
  if (!process.env.CI) {
    return 'local';
  } else if (process.env.CIRCLE_PR_NUMBER) {
    return `pr(${process.env.CIRCLE_PR_NUMBER})`;
  } else {
    return 'master';
  }
};

const getBatchName = () => {
  const branchName = getBranchName();

  if (process.env.CIRCLE_BUILD_NUM) {
    return `${appName}.${branchName}.${process.env.CIRCLE_BUILD_NUM}`;
  } else {
    return `${appName}.${branchName}`;
  }
};

module.exports = {
  viewportSize: desktopViewport,
  browser: [
    { ...desktopViewport, name: 'chrome' },
    { ...desktopViewport, name: 'firefox' },
    { ...desktopViewport, name: 'safari' },
    { ...desktopViewport, name: 'edgechromium' },
    { deviceName: 'Pixel 3' },
    { iosDeviceInfo: { deviceName: 'iPhone X' } },
  ],
  appName,
  batchName: getBatchName(),
  xmlFilePath: './reports/visual'
};

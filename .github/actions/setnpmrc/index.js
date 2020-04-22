const fs = require('fs');

async function run() {
  try {
    const PRIVATE_REGISTRY_TOKEN = process.env.PRIVATE_REGISTRY_TOKEN;
    const contents = `@adaptabletools:registry=https://registry.adaptabletools.com
//registry.adaptabletools.com/:_authToken=${PRIVATE_REGISTRY_TOKEN}
package-lock=false`;

    fs.writeFile(
      '.npmrc',

      contents,
      error => {
        if (error) {
          core.setFailed(error.message);
        }
      }
    );
  } catch (ex) {
    core.setFailed(ex.message);
  }
}

run();

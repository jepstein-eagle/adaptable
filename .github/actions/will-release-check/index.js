const core = require('@actions/core');
const fs = require('fs');

const { context } = require('@actions/github');

async function run() {
  try {
    const { sha, payload } = context;
    const commit = payload.commits.filter(commit =>
      commit.message.toLowerCase().includes('release version')
    )[0];

    let commandToExecute;

    if (commit && commit.message) {
      const message = commit.message.toLowerCase();

      if (message.includes('canary')) {
        commandToExecute = 'npm run canaryrelease';
      } else if (message.includes('patch')) {
        commandToExecute = 'npm run release:patch';
      } else if (message.includes('minor')) {
        commandToExecute = 'npm run release:minor';
      } else if (message.includes('major')) {
        commandToExecute = 'npm run release:major';
      }

      if (commandToExecute) {
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
            } else {
              core.exportVariable('WILL_RELEASE_CMD', commandToExecute);
              core.exportVariable('WILL_RELEASE', 'true');

              core.info('set env var WILL_RELEASE_CMD = ' + commandToExecute);
              core.info('DONE writing .npmrc');
            }
          }
        );
        return;
      }
    }

    feedback = !commandToExecute
      ? `ambigous release commit message: should have the format "release version <canary|patch|minor|major>"`
      : 'no release will happen';

    core.info(feedback);
    core.exportVariable('CHECK_COMMIT_FEEDBACK', feedback);
    core.exportVariable('WILL_RELEASE', 'false');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

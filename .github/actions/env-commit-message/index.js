const core = require('@actions/core');
const { context } = require('@actions/github');

async function run() {
  try {
    const { payload } = context;
    const message = payload.commits.map(commit => commit.message).join('. ');

    core.exportVariable('COMMIT_MESSAGE', message);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

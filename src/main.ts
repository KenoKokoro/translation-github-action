const core = require('@actions/core');
const glob = require('@actions/glob');
const github = require('@actions/github');

async function run() {
  try {
    const source_language = core.getInput('source_language');
    const source_files = core.getInput('source_file_paths');
    const globber = await glob.create(source_files, {followSymbolicLinks: core.getInput('follow_symbolic_links')});
    const files = await globber.glob();
    console.log(github.context.repo);
    console.log(files);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();

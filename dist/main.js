"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const core = require('@actions/core');
const glob = require('@actions/glob');
const github = require('@actions/github');
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const source_language = core.getInput('source_language');
            const source_files = core.getInput('source_file_paths');
            const globber = yield glob.create(source_files, { followSymbolicLinks: core.getInput('follow_symbolic_links') });
            const files = yield globber.glob();
            console.log(github.context.repo);
            console.log(files);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();

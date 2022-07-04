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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_files_from_strings = exports.path = exports.find_language_code_from_file_path = void 0;
const mkdirp = require('mkdirp');
const fs = require('fs');
const isEqual = require('lodash.isequal');
const find_language_code_from_file_path = (path, all_languages) => {
    for (const language of all_languages) {
        if (path.includes(`/${language}/`)) {
            return language;
        }
    }
    throw Error(`Unable to match ${path} with any of the languages: ${all_languages}`);
};
exports.find_language_code_from_file_path = find_language_code_from_file_path;
exports.path = require('path');
const create_files_from_strings = (files_to_strings_map = {}) => __awaiter(void 0, void 0, void 0, function* () {
    for (const key in files_to_strings_map) {
        const object = files_to_strings_map[key];
        yield mkdirp(object.folder_path);
        if (fs.existsSync(object.absolute_path)) {
            yield fs.readFile(object.absolute_path, 'utf8', (error, data) => {
                if (error) {
                    throw error;
                }
                const file_content = JSON.parse(data);
                if (isEqual(file_content, object.strings)) {
                    console.log(`File ${object.absolute_path} seems to be in sync`);
                    return;
                }
                fs.writeFile(object.absolute_path, JSON.stringify(object.strings), 'utf8', (error) => {
                    if (error) {
                        throw error;
                    }
                    console.log(`File ${object.absolute_path} updated successfully`);
                });
            });
        }
        else {
            yield fs.writeFile(object.absolute_path, JSON.stringify(object.strings), 'utf8', (error) => {
                if (error) {
                    throw error;
                }
                console.log(`File ${object.absolute_path} created successfully`);
            });
        }
    }
});
exports.create_files_from_strings = create_files_from_strings;

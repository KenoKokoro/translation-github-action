const mkdirp = require('mkdirp');
const fs = require('fs');
const isEqual = require('lodash.isequal');

export const find_language_code_from_file_path = (path: string, all_languages: string[]): string => {
  for (const language of all_languages) {
    if (path.includes(`/${language}/`)) {
      return language;
    }
  }

  throw Error(`Unable to match ${path} with any of the languages: ${all_languages}`);
}

export const path = require('path');

export const create_files_from_strings = async (files_to_strings_map = {}): Promise<string[]> => {
  const modified_files: string[] = [];

  for (const key in files_to_strings_map) {
    const object = files_to_strings_map[key];
    await mkdirp(object.folder_path);
    const encoding = 'utf8';

    if (fs.existsSync(object.absolute_path)) {
      const existing_content = fs.readFileSync(object.absolute_path, encoding);
      const file_content = JSON.parse(existing_content);
      if (isEqual(file_content, object.strings)) {
        console.log(`File ${object.absolute_path} seems to be in sync`);
        continue;
      }

      fs.writeFileSync(object.absolute_path, JSON.stringify(object.strings, null, 4), encoding);
      console.log(`File ${object.absolute_path} updated successfully`);
      modified_files.push(object.absolute_path);
    } else {
      fs.writeFileSync(object.absolute_path, JSON.stringify(object.strings, null, 4), encoding);
      console.log(`File ${object.absolute_path} created successfully`);
      modified_files.push(object.absolute_path);
    }
  }

  return modified_files;
}
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

export const create_files_from_strings = async (files_to_strings_map = {}) => {
  for (const key in files_to_strings_map) {
    const object = files_to_strings_map[key];
    await mkdirp(object.folder_path);
    if (fs.existsSync(object.absolute_path)) {
      await fs.readFile(object.absolute_path, 'utf8', (error, data) => {
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
    } else {
      await fs.writeFile(object.absolute_path, JSON.stringify(object.strings), 'utf8', (error) => {
        if (error) {
          throw error;
        }

        console.log(`File ${object.absolute_path} created successfully`);
      })
    }
  }
}
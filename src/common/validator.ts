const core = require('@actions/core');
core.setSecret('access_token');

export interface RequestDto {
  action: string
  source_root_folder: string
  source_language: string
  target_languages: string[]
  translation_paths: string[]
  all_languages: string[]
  follow_symlinks: boolean
}

export interface ApiClientConstructor {
  access_token: string
  base_url: string
  team_name: string
  string_library_id: string
}

const validate_action = (): string => {
  const action = validate_not_empty(core.getInput('easytranslate_action'), 'easytranslate_action');
  if (['pull', 'push'].includes(action) === false) {
    throw Error(`Invalid value ${action} given for easytranslate_action`);
  }

  return action;
}

const validate_source_root = (): string => {
  return validate_not_empty(core.getInput('source_root_folder'), 'source_root_folder');
}

const validate_source_language = (): string => {
  return validate_not_empty(core.getInput('source_language'), 'source_language');
}

const validate_target_languages = (): string[] => {
  return validate_not_empty(core.getInput('target_languages'), 'target_languages').split(',');
}

const validate_translation_paths = (): Array<string> => {
  return validate_not_empty(core.getInput('translation_file_paths'), 'translation_file_paths').split(',');
}

export const validateApiConstructor = (): ApiClientConstructor => {
  const access_token = validate_not_empty(core.getInput('access_token'), 'access_token');
  const base_url = validate_not_empty(core.getInput('base_api_url'), 'base_api_url');
  const team_name = validate_not_empty(core.getInput('team_name'), 'team_name');
  const string_library_id = validate_not_empty(core.getInput('string_library_id'), 'string_library_id');

  return {
    access_token,
    base_url: base_url,
    team_name: team_name,
    string_library_id: string_library_id
  }
}

const validate_not_empty = (input: any, key: string): any => {
  if (input.length === 0) {
    throw Error(`${key} is required`);
  }

  return input;
}

export const validateRequest = (): RequestDto => {
  const source_language = validate_source_language();
  const target_languages = validate_target_languages();

  return {
    action: validate_action(),
    source_root_folder: validate_source_root(),
    source_language: source_language,
    target_languages: target_languages,
    translation_paths: validate_translation_paths(),
    all_languages: target_languages.concat(source_language),
    follow_symlinks: true
  }
}

export enum APP_THEMES {
  LIGHT = 'light',
  DARK = 'dark',
}

export const DEFAULT_APP_THEME = APP_THEMES.DARK;

export enum ROUTES {
  ROOT = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  SETTINGS = '/settings',
  SIMPLE_DIFF = '/simpleDifference',
  DEEP_ANALYZE = '/deepAnalyze',
  HISTORY = '/history',
}

export const DEFAULT_REDIRECT_ROUTE = ROUTES.SIMPLE_DIFF;

export enum SESSION_STORAGE {
  APP_THEME = 'DIPLOMA_V2_APP_THEME',
  APP_SIMPLE_DIFF_TEXT1 = 'DIPLOMA_V2_APP_SIMPLE_DIFF_TEXT1',
  APP_SIMPLE_DIFF_TEXT2 = 'DIPLOMA_V2_APP_SIMPLE_DIFF_TEXT2',
}

export const POSSIBLE_FILE_TYPES: { [key: string]: string[] } = {
  'JavaScript': ['.js', '.jsx'],
  'TypeScript': ['.ts', '.tsx'],
};

export interface ComparisonResult {
  compatibility: number;
}

export interface CookieTokenDataI {
	email: string;
	id: string;
	iat: number;
	exp: number;
}

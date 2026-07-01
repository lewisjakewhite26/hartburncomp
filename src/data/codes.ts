/** Valid task codes for iPad code-entry (theatre only — does not unlock anything). */
export const TASK_CODES = ['5374', '7859', '1991'] as const;

export type TaskCode = (typeof TASK_CODES)[number];

export const CODE_LENGTH = 4;

export function isValidTaskCode(code: string): code is TaskCode {
  return TASK_CODES.includes(code as TaskCode);
}

export const WRONG_ATTEMPT_LIMIT = 3;
export const LOCKOUT_SECONDS = 30;

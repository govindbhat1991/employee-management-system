export const isDate = (value: string | Date): boolean => new Date(value) instanceof Date;

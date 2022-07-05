/**
 * @param classGroup should be a object with classname as key and value should boolean
 * eg:
 * { 'filled' : !isEmpty }
 */
export const getStyleClass = (classGroup: Record<string, boolean>): string => {
    return Object.entries(classGroup)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(' ');
};

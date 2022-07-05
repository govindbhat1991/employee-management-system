import { DateRange } from '@resume-managment-tool/api-interfaces';
import { isDate } from './date';

export const getMonthAndYear = (value: string | Date) => {
    if (!isDate(value)) {
        return;
    }
    const dateObj = new Date(value);
    return `${dateObj.getMonth() + 1}/${dateObj.getUTCFullYear()}`;
};

export const getDayMonthAndYear = (value: string | Date) => {
    if (!isDate(value)) {
        return;
    }
    const dateObj = new Date(value);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getUTCFullYear()}`;
};

export const getDateRange = (dateRange: any) => {
    if (!dateRange) {
        return null;
    }
    const { from, to } = dateRange;
    return {
        from: new Date(from).toISOString(),
        to: new Date(to).toISOString(),
    };
};

export const toDatePickerValue = (value: Date | string) => {
    if (!value) {
        return;
    }
    const date = new Date(value);
    const val = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')
        .find(() => Boolean) as string;
    return val;
};

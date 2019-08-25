export const withLeadingZeroes = (str: string | number): string => {
    return ('00' + String(str)).slice(-2);
};

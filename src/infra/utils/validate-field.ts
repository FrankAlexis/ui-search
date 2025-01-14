export const validateStringField = (value: unknown, name: string) => {
    const cleaned = String(value).trim();
    if (cleaned.length === 0) {
        return `${name} is incorrect`;
    }
    if (cleaned.length < 2) {
        return `${name} is too short`;
    }
    if (cleaned.length > 50) {
        return `${name} is too long`;
    }
    return true;
};
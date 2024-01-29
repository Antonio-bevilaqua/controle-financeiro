export const userNameMask = (value) => {
    return value.replace(/[^0-9a-zA-Z_-]/g, "");
}

export const nameMask = (value) => {
    return value.replace(/[^a-zA-Z ]/g, "");
}
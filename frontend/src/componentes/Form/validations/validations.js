export const ValidName = (val) => {
    if (!ValidRequired(val)) return false;
    const regex = /^[a-zA-Z ]+$/;
    const isValid = regex.test(val) && val.length >= 3 && val.length < 100;
    return isValid;
}

export const ValidNewUser = (val) => {
    if (!ValidRequired(val)) return false;
    const regex = /^[a-zA-Z0-9]+$/;
    const isValid = regex.test(val) && val.length >= 3 && val.length < 16;
    return isValid;
}

export const ValidNewEmail = (val) => {
    if (!ValidRequired(val)) return false;
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val).toLowerCase())
        ? true
        : false;
}

export const ValidNewPassword = (val) => {
    if (!ValidRequired(val)) return false;
    const regex = /^[a-zA-Z0-9]+$/;
    const isValid = regex.test(val) && val.length >= 8 && val.length < 16;
    return isValid;
}

export const ValidConfirmNewPassword = (val, name) => {
    if (!ValidRequired(val)) return false;
    let inputName = name.replace("_confirmation", "");
    const confirmElement = document.querySelector('input[name="' + inputName + '"]');
    if (!confirmElement) return false;

    if (confirmElement.value !== val) return false;

    return true;
}

export const ValidRequired = (val) => {
    return (val.trim() !== "");
}
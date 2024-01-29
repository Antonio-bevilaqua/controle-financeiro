import { nameMask, userNameMask } from "../../../Form/masks/masks";
import { ValidConfirmNewPassword, ValidName, ValidNewEmail, ValidNewPassword, ValidNewUser } from "../../../Form/validations/validations";


export const formData = [
    {
        name: "name",
        validation: ValidName,
        mask: nameMask,
        value: "",
        errorMessage: "name",
    },
    {
        name: "username",
        validation: ValidNewUser,
        mask: userNameMask,
        value: "",
        errorMessage: "usuario",
    },
    {
        name: "email",
        validation: ValidNewEmail,
        value: "",
        errorMessage: "email",
    },
    {
        name: "password",
        validation: ValidNewPassword,
        value: "",
        errorMessage: "password",
    },
    {
        name: "password_confirmation",
        validation: ValidConfirmNewPassword,
        value: "",
        errorMessage: "confirm_password",
    }
]
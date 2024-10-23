import "./LoginPage.css";

import { AllValid } from "../../lib/components/inputs/validators/ValidateFormControls";
import AppTitle from "../../lib/components/app-title/AppTitle";
import AuthContext from "../../lib/authentication/AuthContext";
import AuthService from "../../lib/authentication/AuthService";
import { AxiosError } from "axios";
import BaseLayout from "../../lib/components/layouts/BaseLayout";
import Button from "../../lib/components/buttons/Button";
import CustomInput from "../../lib/components/inputs/CustomInput";
import { useContext } from "react";
import { useFormControl } from "../../lib/components/inputs/form/FormControl";
import { useNavigate } from "react-router-dom";
import { useServiceCall } from "../../lib/utils/ServiceCall";
import { validateRequiredField } from "../../lib/components/inputs/validators/ValidateRequiredField";

export default function LoginPage() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const usernameFormControl = useFormControl<string>({
        validators: [validateRequiredField()],
    });
    const passwordFormControl = useFormControl<string>({
        validators: [validateRequiredField()],
    });

    const loginService = useServiceCall(AuthService.Login);

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (
            !AllValid(
                usernameFormControl.validate(),
                passwordFormControl.validate()
            )
        )
            return;

        await loginService
            .invoke(
                usernameFormControl.value ?? "",
                passwordFormControl.value ?? ""
            )
            .then((data) => {
                const token: string = data.token;

                if (authContext) {
                    authContext.login(token);
                    navigate("/");
                }
            })
            .catch((error) => {
                if (error instanceof AxiosError) {
                    passwordFormControl.setErrorMessages([
                        error.response?.data.message,
                    ]);
                    console.error("Login failed", error);
                }
            });
    };

    const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <BaseLayout>
            <div className="login-content">
                <form className="login-form">
                    <div className="login-input">
                        <CustomInput
                            placeholder="Username"
                            formControl={usernameFormControl}
                        />
                    </div>
                    <div className="login-input">
                        <CustomInput
                            type="password"
                            placeholder="Password"
                            formControl={passwordFormControl}
                        />
                    </div>

                    <div className="login-page-buttons ">
                        <Button
                            onClick={handleCancel}
                            label="Cancel"
                            type="secondary"
                        />
                        <div className="login-button">
                            <Button onClick={handleLogin} label="Login" />
                        </div>
                    </div>
                </form>
                <div className="login-title">
                    <AppTitle />
                </div>
            </div>
        </BaseLayout>
    );
}

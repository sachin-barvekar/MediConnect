import React, { useEffect, useMemo, useState } from "react";
import { WINGROW_LOGO, LOGINREGISTERBG } from "../../assets/images";
import { ROUTE_PATH } from "../../constant/urlConstant";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import { Button } from "primereact/button";
import { MSG91_AUTH_KEY, TEMPLATE_ID_LOGIN } from "../../constant/msg91";
import MzAutoComplete from "../../common/MzForm/MzAutoComplete";
import MzPhoneInput from "../../common/MzForm/MzPhoneInput";
import { useTranslation } from "react-i18next";
import MzOptInput from "../../common/MzForm/MzOptInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const LoginComponent = (props) => {
  const {
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    isVerify,
    reSendVerificationCode,
    isLoading,
  } = props.loginProps;

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    trigger,
  } = useForm({
    defaultValues: useMemo(
      () => ({
        type: "",
        mobile: "",
        otp: "",
      }),
      []
    ),
  });

  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const Navigate = useNavigate();
  const [, setOTPSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      setStep(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isVerify && isLoggedIn) {
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        Navigate(redirectPath);
        localStorage.removeItem("redirectAfterLogin");
      } else {
        Navigate("/");
      }
      toast.success("Login Successfully");
      window.location.reload();
    }
  }, [isVerify, Navigate, isLoggedIn]);

  const onSubmit = async (data) => {
    if (isLoggedIn) {
      const payload = {
        otp: data.otp,
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        authkey: MSG91_AUTH_KEY,
      };
      try {
        await verifyCode(payload);
      } catch (error) {
        console.error("Verification failed:", error);
      }
    }
  };

  const handleResendOtp = () => {
    if (isLoggedIn) {
      const payload = {
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        authkey: MSG91_AUTH_KEY,
        retrytype: "text",
      };
      reSendVerificationCode(payload);
      setOtpSent(true);
      setCountdown(30);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setOtpSent(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleNextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      const payload = {
        phone: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        role: getValues(FORM_FIELDS_NAME.ROLE.name),
      };
      try {
        await login(payload);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const otpPayload = {
        mobile: `+${getValues(FORM_FIELDS_NAME.PHONE_NUMBER.name)}`,
        template_id: TEMPLATE_ID_LOGIN,
        authkey: MSG91_AUTH_KEY,
      };
      sendVerificationCode(otpPayload);
      setOTPSent(true);
      setStep(1);
    }
  }, [isLoggedIn, step, sendVerificationCode, setOTPSent]);

  const handlePrevStep = () => {
    logout();
    setStep(0);
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  return (
    <div className="grid grid-nogutter surface-0  text-800">
      <div className="col-12 md:col-6 overflow-hidden hidden md:block lg:block">
        <img
          src={LOGINREGISTERBG}
          alt="WINGROW_SLIDE_THREE"
          className="md:ml-auto block h-full w-full"
          style={{
            clipPath: "polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)",
          }}
        />
      </div>
      <div className="col-12 md:col-6 md:p-6 text-center flex align-items-center justify-content-center">
        <section>
          <div className="flex flex-column align-items-center justify-content-center p-2">
            <div
              style={{
                borderRadius: "56px",
                padding: "1rem",
                background:
                  "linear-gradient(90deg, rgba(191, 130, 138, 0.6) 30%, rgba(183, 39, 34, 0.8) 70%)",
              }}
            >
              <div
                className="w-full text-center surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
                style={{ borderRadius: "53px" }}
              >
                <h1 className="text-900 font-bold text-xl md:text-1xl mb-2">
                  Welcome to MediConnect
                </h1>
                <div className="text-600 mb-2">Login here</div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-5 p-fluid w-full"
                >
                  {step === 0 && (
                    <div>
                      <div>
                        <MzAutoComplete
                          control={control}
                          name={FORM_FIELDS_NAME.ROLE.name}
                          label={FORM_FIELDS_NAME.ROLE.label}
                          optionLabel={FORM_FIELDS_NAME.ROLE.optionLabel}
                          optionValue={FORM_FIELDS_NAME.ROLE.optionValue}
                          placeholder={FORM_FIELDS_NAME.ROLE.placeholder}
                          rules={FORM_FIELDS_NAME.ROLE.rules}
                          isError={!!errors[FORM_FIELDS_NAME.ROLE.name]}
                          errorMsg={getFormErrorMessage(
                            FORM_FIELDS_NAME.ROLE.name
                          )}
                          suggestions={FORM_FIELDS_NAME.ROLE.options}
                          dropdown
                        />
                      </div>
                      <MzPhoneInput
                        control={control}
                        name={FORM_FIELDS_NAME.PHONE_NUMBER.name}
                        label={FORM_FIELDS_NAME.PHONE_NUMBER.label}
                        placeholder={FORM_FIELDS_NAME.PHONE_NUMBER.placeholder}
                        rules={FORM_FIELDS_NAME.PHONE_NUMBER.rules}
                        isError={errors[FORM_FIELDS_NAME.PHONE_NUMBER.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.PHONE_NUMBER.name
                        )}
                        country="in"
                      />
                      <Button
                        label="fetch"
                        disabled={isLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNextStep();
                        }}
                        className="mt-3 border-round-sm"
                        style={{ backgroundColor: "#D49BA2", border: "none" }}
                      />
                      <div className="mt-4">
                        Don't have account?
                        <Link
                          className="text-black"
                          to={Navigate(ROUTE_PATH.BASE.REGISTER)}
                        >
                          {" "}
                          Click here
                        </Link>
                      </div>
                    </div>
                  )}
                  {step === 1 && (
                    <>
                      <MzOptInput
                        control={control}
                        name={FORM_FIELDS_NAME.OTP.name}
                        label={FORM_FIELDS_NAME.OTP.label}
                        placeholder={FORM_FIELDS_NAME.OTP.placeholder}
                        type={FORM_FIELDS_NAME.OTP.type}
                        isError={errors[FORM_FIELDS_NAME.OTP.name]}
                        errorMsg={getFormErrorMessage(
                          FORM_FIELDS_NAME.OTP.name
                        )}
                        length={4}
                        rules={FORM_FIELDS_NAME.OTP.rules}
                        integerOnly={true}
                        wrapperClass={"p-float-label"}
                      />
                      <Button
                        label={
                          otpSent ? `Resend OTP in ${countdown}s` : "Resend OTP"
                        }
                        className="border-none text-black bg-transparent outline-none hover:underline"
                        onClick={handleResendOtp}
                        disabled={otpSent}
                      />
                      <div className="flex justify-content-between gap-2 w-full">
                        <div className="mb-3 w-full">
                          <Button
                            label="Back"
                            className="mt-3 border-round-sm"
                            onClick={handlePrevStep}
                            severity="danger"
                          />
                        </div>
                        <div className="mb-3 w-full">
                          <Button
                            disabled={isLoading}
                            label="submit"
                            type="submit"
                            className="mt-3 border-round-sm"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
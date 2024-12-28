//@ts-check
import { Controller, useController } from "react-hook-form";
import ImageWithBasePath from "../../../img/imagewithbasebath";
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

const PasswordField = ({
  readOnly = false,
  control,
  rightImage = "",
  name,
  label,
  colSpan = 6,
  onChange = (e, field) => field.onChange(e),
  withCheckbox = false,
  isChecked = false,
  setIsChecked = (e) => e,
  ...props
}) => {
  const { fieldState } = useController({ name, control });
  const errorMessage = fieldState.error?.message;

  const togglePassword = (e) => {
    const input = e.target.previousElementSibling;
    if (input.type === "password") {
      input.type = "text";
      e.target.classList.remove("fa-eye-slash");
      e.target.classList.add("fa-eye");
    } else {
      input.type = "password";
      e.target.classList.remove("fa-eye");
      e.target.classList.add("fa-eye-slash");
    }
  };

  return (
    <>
      <div className={`col-lg-${colSpan}`}>
        <div className="mb-3">
          <label className="form-label">
            {withCheckbox && (
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                id="checkebox-md"
              />
            )}
            {label}
          </label>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <div>
                <div className={"form-addons pass-group"}>
                  <input
                    disabled={(!isChecked && withCheckbox) || readOnly}
                    {...field}
                    className="form-control relative"
                    onChange={(e) => {
                      onChange(e, field);
                    }}
                    {...props}
                  />

                  <span
                    onClick={togglePassword}
                    className="fas toggle-password fa-eye-slash"
                  />

                  {rightImage && (
                    <ImageWithBasePath
                      src={rightImage}
                      alt="img"
                      className="img"
                    />
                  )}
                </div>

                <div>
                  {errorMessage ? (
                    <p className="error-color ">{errorMessage}</p>
                  ) : null}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default PasswordField;

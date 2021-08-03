import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    let foundError = false
    const { email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
      foundError = true
    }
    
    if (password.trim() == "") {
      newErrors = {
        ...newErrors,
        password: "is required",
      };
      foundError = true
    }
    
    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
      foundError = true
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
        foundError = true
      }
    }

    setErrors(newErrors);
    return foundError
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const foundError = validateInput(userPayload);
    try {
      if (!foundError) {
        fetch("/api/v1/users", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }).then((resp) => {
          if (resp.ok) {
            resp.json().then((user) => {
              setShouldRedirect(true);
            });
          } else {
            const errorMessage = `${resp.status} (${resp.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
        });
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  };

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/home";
  }

  return (
    <div className="grid-container" onSubmit={onSubmit}>
      <h1>Register</h1>
      <form>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <input type="submit" className="button" value="Register" />
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

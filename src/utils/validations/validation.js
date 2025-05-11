export const passwordFieldValidation = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Password is required!"));
  }

  if (value.length < 6) {
    return Promise.reject(
      new Error("Password should be at least 6 characters long")
    );
  }

  if (!/(?=.*[A-Z])/.test(value)) {
    return Promise.reject(
      new Error("Password should contain at least one capital letter")
    );
  }

  if (!/(?=.*\d)/.test(value)) {
    return Promise.reject(
      new Error("Password should contain at least one number")
    );
  }

  return Promise.resolve();
};

export const changePasswordFieldValidation = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Password is required!"));
  }

  if (value.length < 6) {
    return Promise.reject(new Error("Password is invalid!"));
  }

  if (!/(?=.*[A-Z])/.test(value)) {
    return Promise.reject(new Error("Password is invalid!"));
  }

  if (!/(?=.*\d)/.test(value)) {
    return Promise.reject(new Error("Password is invalid!"));
  }

  return Promise.resolve();
};

export const emailFieldValidation = (_, value) => {
  if (!value) {
    return Promise.reject(new Error("Email is required!"));
  }

  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)) {
    return Promise.reject(new Error("Email is invalid!"));
  }

  return Promise.resolve();
};

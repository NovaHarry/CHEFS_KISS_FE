export const validateRegisteration = (email, password, userName) => {
  if (email.length === 0 || password.length === 0 || userName.length === 0)
    return "Fields should not be empty";

  const validateEmailId =
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  const validatePassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!validateEmailId) return "Email Id is not valid.";

  if (!validatePassword)
    return "Password must include lowercase letters, capital letter (First letter), digits, and special characters (@, #, &, etc.)";

  return null;
};

export const validateLogin = (email, password) => {
  if (email.length === 0 || password.length === 0)
    return "Fields should not be empty";

  const validateEmailId =
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

  const validatePassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!validateEmailId) return "Email Id is not valid.";

  if (!validatePassword)
    return "Password must include lowercase letters, capital letter (First letter), digits, and special characters (@, #, &, etc.)";

  return null;
};

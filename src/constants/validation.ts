export const validationRegex = {
  password: /^(?=.*[A-Z])(?=.*\d)/,
  userName: /^[a-zA-Z0-9_-]+$/,
};

export const validationText = {
  required: 'This field is required',
  email: 'Must be a valid email',
  userName: 'Please use only letters, numbers, underscores (_), or hyphens (-)',
  password: 'Must contain one uppercase letter and one number',
};

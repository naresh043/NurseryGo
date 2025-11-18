export const getCredentials = (email, password) => {
  return { email: email.value, password: password.value };
};

export const getTestData = () => {
  return { email: "deekshith123@freshbuy.com", password: "deekshith123" };
};
// 이메일 형식이 올바른지 확인
export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

// 비밀번호 6자 이상인지 확인
export const validatePassword = (password: string) => {
  return password.length >= 6;
};

// 비밀번호 동일 여부 확인
export const validatePasswordConfirm = (password: string, passwordConfirm: string) => {
  return password === passwordConfirm;
};

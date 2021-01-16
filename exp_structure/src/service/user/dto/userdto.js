export const userDto = (user) => {
  return {
    id: user.id,
    email: user.email,
    nickname: user.nickname,
  };
};

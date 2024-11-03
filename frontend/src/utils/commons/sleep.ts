export const sleep = async (ms: number = 1000) => {
  await new Promise((res) => {
    setTimeout(() => res(""), ms);
  });
};

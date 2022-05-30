const aFn = () => {
  const desc: string = 'moduleA fn';
  return new Promise((resolve, reject) => {
    console.log(desc);
    resolve(`promise - ${desc}`);
  });
};
export const aConst = '这里是moduleA';

export default aFn;

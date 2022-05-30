import aFn from '@vino/module-a';

const bFn = () => {
  const desc: string = 'moduleB fn';
  aFn().then(console.log);
  console.log(desc);
};

bFn();
export default bFn;

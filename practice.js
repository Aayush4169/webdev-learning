function hello(fn) {
  return function () {
    fn();
  };
}

const print = () => console.log("helloo");

const good = print();
console.log(good);
// console.log(good());

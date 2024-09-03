// Classical loop function
const sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Of course recursion
const sum_to_n_b = function (n) {
  if (n < 2) {
    return n;
  }

  return n + sum_to_n_a(n - 1);
};

// Arithmetic formula - the easiest one and the fastest
const sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};

// Just interesting variant with array, but reduce has the same classical loop under the hood, so let it be optional variant
const sum_to_n_d = function (n) {
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

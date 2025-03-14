import { bindReactiveState } from "./reactivity";

export function setupCounter() {
  const countMap = bindReactiveState({
    name: "countMap",
    defaultValue: {},
  });

  const increase = ({ productId }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] += 1;
    return countMap[productId];
  };

  const decrease = ({ productId }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    }
    countMap[productId] -= 1;
    return countMap[productId];
  };

  const getTotalCount = () => {
    return Object.values(countMap).reduce((acc, num) => acc + num, 0);
  };

  const getCountByProductId = ({ productId }) => {
    return countMap[productId] || 0;
  };

  return {
    increase,
    decrease,
    getTotalCount,
    getCountByProductId,
  };
}

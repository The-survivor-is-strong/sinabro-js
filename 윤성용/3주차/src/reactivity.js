export function bindReactiveState({ name, defaultValue }) {
  if (typeof defaultValue !== "object" || defaultValue === null) {
    throw new Error("bindReactiveState supports only object as default value.");
  }

  const handler = {
    set(target, key, value) {
      if (typeof value === "object" && value !== null) {
        console.warn("bindReactiveState does not support nested objects.");
        return false;
      }

      if (target[key] !== value) {
        const elements = document.querySelectorAll(
          `[data-subscribe-to='${name}'][data-subscription-path='${key}']`,
        );
        elements.forEach((element) => {
          if (element.tagName === "INPUT") {
            element.value = value;
          } else {
            element.innerHTML = value;
          }
        });

        target[key] = value;
      }

      return true;
    },
  };

  const state = new Proxy(defaultValue, handler);

  return state;
}

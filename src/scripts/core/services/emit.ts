export const emit = (type, detail) => {
  // Create a new event
  let event = new CustomEvent(type, {
    bubbles: true,
    cancelable: true,
    detail: detail,
  });

  console.log(`Emitting event: ${type}`, event);

  // Dispatch the event
  return self.dispatchEvent(event);
};

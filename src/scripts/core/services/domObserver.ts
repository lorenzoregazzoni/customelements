import { emit } from './emit.ts';

export const domObserver = (targetNode) => {
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      emit('dom:mutation', mutation);
      // if (mutation.type === "childList") {
      //   console.log("A child node has been added or removed.", mutation);
      // } else if (mutation.type === "subtree") {
      //   console.log("A subtree has been modified.", mutation);
      // } else if (mutation.type === "attributes") {
      //   console.log(`The ${mutation.attributeName} attribute was modified.`, mutation);
      // }
    }
  });

  // Start observing the target node for configured mutations
  observer.observe(targetNode, { attributes: true, childList: true, subtree: true });

  return observer;
};

// Later, you can stop observing
// observer.disconnect();

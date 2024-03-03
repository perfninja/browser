import { getConfig } from './config';
import { queue } from './queue';

let isEventsAttached = false;

export const sendLog = () => {
  const { endpoint } = getConfig();

  if (endpoint) {
    const req = new XMLHttpRequest();
    req.open('POST', endpoint, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(queue));

    queue.splice(0, queue.length);
  }
};

export const attachEvents = () => {
  if (isEventsAttached) {
    return;
  }

  setTimeout(() => {
    sendLog();
    isEventsAttached = false;
  }, 500);

  isEventsAttached = true;
};

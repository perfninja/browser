import { queue } from './queue';

let isEventsAttached = false;

export const sendLog = () => {
  const url = process.env.LOG_ENDPOINT_URL;

  if (url) {
    const req = new XMLHttpRequest();
    req.open('POST', url, true);
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

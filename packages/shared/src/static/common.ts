const diskThresholdPercent = 0.85;
const memoryHeapThreshold = 1024 ** 3;
const memoryRSSThreshold = 1024 ** 3;
const localhostUrl = 'http://127.0.0.1';

const SHARED = {
    health: { diskThresholdPercent, memoryHeapThreshold, memoryRSSThreshold },
    localhostUrl
};

export { SHARED };

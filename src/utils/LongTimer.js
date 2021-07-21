import { Platform, InteractionManager } from "react-native";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;

function LongTimers() {
  if (Platform.OS === "android") {
    const timeFix = {};

    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();

      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timeFix[id]) {
            return;
          }
          delete timeFix[id];
          fn(...args);
        });

        return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timeFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time;
        const id = `_ltl_${Object.keys(timeFix).length}`;
        runTask(id, fn, ttl, args);
        return id;
      }
      return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id) => {
      if (typeof id === "string" && id.startsWith("_ltl_")) {
        _clearTimeout(timeFix[id]);
        delete timeFix[id];
        return;
      }
      _clearTimeout(id);
    };
  }
}

export default LongTimers;

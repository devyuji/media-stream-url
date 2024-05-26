import { writable } from "svelte/store";

interface videoProps {
  source: string;
  isEmpty: boolean;
}

function createVideoUrl() {
  const { subscribe, set, update } = writable<videoProps>({
    source: "",
    isEmpty: true,
  });

  function clear() {
    set({
      source: "",
      isEmpty: false,
    });
  }

  function newUrl(url: string) {
    update((_) => {
      return {
        source: url,
        isEmpty: false,
      };
    });
  }

  return { subscribe, clear, newUrl };
}

export const video = createVideoUrl();

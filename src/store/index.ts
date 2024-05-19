import { writable } from "svelte/store";

interface videoProps {
  status: "loading" | "error" | "playing" | "not-ready";
  source: string;
}

function createVideoUrl() {
  const { subscribe, set, update } = writable<videoProps>({
    status: "not-ready",
    source: "",
  });

  function clear() {
    set({
      status: "not-ready",
      source: "",
    });
  }

  function newUrl(url: string) {
    update((_) => {
      return {
        status: "loading",
        source: url,
      };
    });
  }

  return { subscribe, clear, newUrl, set };
}

export const video = createVideoUrl();

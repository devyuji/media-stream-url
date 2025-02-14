<script lang="ts">
  import Backdrop from "./backdrop.svelte";
  import setting from "../state/settings.svelte";
  import { fade, fly } from "svelte/transition";

  interface Props {
    onClose: () => void;
  }

  let { onClose }: Props = $props();
</script>

<Backdrop>
  <div
    tabindex="0"
    transition:fly={{ duration: 250, y: 10 }}
    onclick={(e) => e.stopPropagation()}
    class="p-6 rounded-lg bg-gray-950 sm:w-120 w-9/10 grid gap-6"
  >
    <div class="flex justify-end">
      <button
        aria-label="close setting page"
        onclick={onClose}
        class="text-gray-400 hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><line x1="18" y1="6" x2="6" y2="18"></line><line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
          ></line></svg
        >
      </button>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <p>Use Browser Player</p>

        <label class="switch">
          <input
            type="checkbox"
            bind:checked={setting.state.useNativePlayer}
            onchange={() => {
              localStorage.setItem("settings", JSON.stringify(setting.state));
            }}
          />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</Backdrop>

<style>
  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 24px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 7px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--color-yellow-500);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>

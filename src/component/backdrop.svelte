<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  $effect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  });
</script>

<div
  class="fixed top-0 right-0 left-0 size-full bg-black/20 grid place-items-center z-20"
>
  {@render children()}
</div>

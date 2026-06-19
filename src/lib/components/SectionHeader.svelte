<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    title,
    description,
    children,
  }: {
    title: string
    description?: string
    children?: Snippet
  } = $props()
</script>

<div class="mb-4 flex flex-col gap-1">
  <div class="flex items-baseline gap-3">
    <h2 class="text-base font-semibold text-foreground">{title}</h2>
    {#if children}
      <div class="text-xs text-subtle">{@render children()}</div>
    {/if}
  </div>
  {#if description}
    <p class="max-w-2xl text-sm text-muted">{description}</p>
  {/if}
</div>

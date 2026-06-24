<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import { variantArt } from '$lib/droidArt'
  import type { Variant } from '$lib/types'
  import type { DroidViewMode } from '$lib/viewMode.svelte'

  let {
    name,
    variant,
    mode,
    sublabel = '',
  }: {
    name: string
    variant: Variant
    mode: DroidViewMode
    sublabel?: string
  } = $props()

  // Portrait edge length per mode. 'list' isn't used here but is included so the
  // prop type stays simple for callers passing the shared view mode.
  const sizes: Record<DroidViewMode, number> = {
    list: 48,
    small: 48,
    medium: 80,
    large: 120,
  }

  const px = $derived(sizes[mode])
  const art = $derived(variantArt(name, variant))
  const horizontal = $derived(mode === 'small' || mode === 'list')
  const iconSize = $derived(Math.round(px * 0.5))
</script>

{#if horizontal}
  <div
    class="flex items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1"
  >
    <div
      class="relative flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-slate-500/10 to-transparent"
      style="width: {px}px; height: {px}px;"
    >
      {#if art}
        <img
          src={art}
          alt={name}
          loading="lazy"
          class="size-full object-contain p-0.5"
        />
      {:else}
        <Icon name="droids" size={iconSize} class="text-subtle/40" />
      {/if}
    </div>
    <div class="min-w-0">
      <p class="truncate text-sm font-medium text-foreground">{name}</p>
      {#if sublabel}
        <p class="truncate text-xs text-subtle">{sublabel}</p>
      {/if}
    </div>
  </div>
{:else}
  <div
    class="flex flex-col items-center gap-1 text-center"
    style="width: {px + 28}px;"
  >
    <div
      class="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-500/10 to-transparent"
      style="width: {px}px; height: {px}px;"
    >
      {#if art}
        <img
          src={art}
          alt={name}
          loading="lazy"
          class="size-full object-contain p-1"
        />
      {:else}
        <Icon name="droids" size={iconSize} class="text-subtle/40" />
      {/if}
    </div>
    <p
      class="line-clamp-2 text-xs leading-tight font-medium text-foreground"
      title={name}
    >
      {name}
    </p>
    {#if sublabel}
      <p class="text-[11px] leading-tight text-subtle">{sublabel}</p>
    {/if}
  </div>
{/if}

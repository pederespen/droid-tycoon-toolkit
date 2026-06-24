<script lang="ts">
  import Icon, { type IconName } from '$lib/components/Icon.svelte'
  import {
    droidView,
    setDroidView,
    type DroidViewMode,
  } from '$lib/viewMode.svelte'

  // Icon size scales with each option to hint at the resulting portrait size,
  // mirroring the small/medium/large icon choices in a file explorer.
  const options: {
    mode: DroidViewMode
    icon: IconName
    iconSize: number
    label: string
  }[] = [
    { mode: 'list', icon: 'list', iconSize: 16, label: 'List (text only)' },
    { mode: 'small', icon: 'image', iconSize: 13, label: 'Small images' },
    { mode: 'medium', icon: 'image', iconSize: 16, label: 'Medium images' },
    { mode: 'large', icon: 'image', iconSize: 19, label: 'Large images' },
  ]
</script>

<div
  class="flex items-center rounded-lg border border-border bg-elevated p-0.5"
  role="group"
  aria-label="Display mode"
>
  {#each options as opt (opt.mode)}
    <button
      type="button"
      onclick={() => setDroidView(opt.mode)}
      aria-pressed={droidView.mode === opt.mode}
      title={opt.label}
      aria-label={opt.label}
      class="flex size-7 cursor-pointer items-center justify-center rounded-md transition-colors {droidView.mode ===
      opt.mode
        ? 'bg-accent text-white'
        : 'text-subtle hover:text-foreground'}"
    >
      <Icon name={opt.icon} size={opt.iconSize} />
    </button>
  {/each}
</div>

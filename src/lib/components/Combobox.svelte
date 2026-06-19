<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  let {
    options,
    value = $bindable(''),
    placeholder = 'Select…',
    searchPlaceholder = 'Search…',
    label,
  }: {
    options: string[]
    value?: string
    placeholder?: string
    searchPlaceholder?: string
    label?: string
  } = $props()

  let open = $state(false)
  let query = $state('')
  let activeIndex = $state(0)
  let root = $state<HTMLDivElement>()
  let searchInput = $state<HTMLInputElement>()

  const filtered = $derived(
    query.trim() === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.trim().toLowerCase()),
        ),
  )

  const openMenu = () => {
    open = true
    query = ''
    activeIndex = Math.max(
      0,
      options.findIndex((option) => option === value),
    )
    requestAnimationFrame(() => searchInput?.focus())
  }

  const closeMenu = () => {
    open = false
    query = ''
  }

  const select = (option: string) => {
    value = option
    closeMenu()
  }

  const toggle = () => {
    if (open) closeMenu()
    else openMenu()
  }

  const onKeydown = (event: KeyboardEvent) => {
    if (!open) {
      if (
        event.key === 'Enter' ||
        event.key === 'ArrowDown' ||
        event.key === ' '
      ) {
        event.preventDefault()
        openMenu()
      }
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      activeIndex = Math.min(activeIndex + 1, filtered.length - 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      activeIndex = Math.max(activeIndex - 1, 0)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (filtered[activeIndex]) select(filtered[activeIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
    }
  }

  $effect(() => {
    // Keep the highlighted option valid as the filter narrows.
    void query
    activeIndex = 0
  })

  $effect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (root && !root.contains(event.target as Node)) closeMenu()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  })
</script>

<div bind:this={root} class="relative">
  <button
    type="button"
    onclick={toggle}
    onkeydown={onKeydown}
    aria-haspopup="listbox"
    aria-expanded={open}
    aria-label={label}
    class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-elevated px-3 py-2 text-left text-sm transition-colors hover:border-accent/50 focus:border-accent focus:outline-none {open
      ? 'border-accent'
      : 'border-border'}"
  >
    <span class={value ? 'text-foreground' : 'text-subtle'}>
      {value || placeholder}
    </span>
    <Icon
      name="chevron-down"
      size={16}
      class="shrink-0 text-subtle transition-transform {open
        ? 'rotate-180'
        : ''}"
    />
  </button>

  {#if open}
    <div
      class="absolute z-30 mt-1 w-full overflow-hidden rounded-lg border border-border bg-surface shadow-lg"
    >
      <div class="border-b border-border p-2">
        <div
          class="flex items-center gap-2 rounded-md bg-elevated px-2.5 py-1.5"
        >
          <Icon name="search" size={15} class="shrink-0 text-subtle" />
          <input
            bind:this={searchInput}
            bind:value={query}
            onkeydown={onKeydown}
            type="text"
            placeholder={searchPlaceholder}
            class="w-full bg-transparent text-sm text-foreground placeholder:text-subtle focus:outline-none"
          />
        </div>
      </div>

      <ul role="listbox" class="max-h-60 overflow-y-auto p-1">
        {#each filtered as option, index (option)}
          <li role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={option === value}
              onclick={() => select(option)}
              onpointermove={() => (activeIndex = index)}
              class="flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors {index ===
              activeIndex
                ? 'bg-elevated text-foreground'
                : 'text-muted'}"
            >
              <span>{option}</span>
              {#if option === value}
                <Icon name="check" size={15} class="shrink-0 text-accent" />
              {/if}
            </button>
          </li>
        {:else}
          <li class="px-2.5 py-3 text-center text-sm text-subtle">
            No droids found
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

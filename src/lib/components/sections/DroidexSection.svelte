<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { droids } from '$lib/droidsData'
  import { droidex, slotsFor, totalSlots } from '$lib/droidex.svelte'
  import { droidArt } from '$lib/droidArt'
  import { rarityTone } from '$lib/display'
  import { loadState, saveState } from '$lib/persist'
  import type { CollectionSlot, DroidCategory, DroidType } from '$lib/types'

  // Visual treatment for each collectible slot. `dot` is the fill used once a
  // slot is collected; uncollected slots render as a hollow ring.
  const slotMeta: Record<CollectionSlot, { dot: string }> = {
    Basic: { dot: 'bg-slate-400' },
    Gold: { dot: 'bg-amber-400' },
    Diamond: { dot: 'bg-cyan-400' },
    Rainbow: { dot: 'bg-gradient-to-br from-fuchsia-400 to-violet-400' },
    Beskar: { dot: 'bg-zinc-500' },
    Flawless: { dot: 'flawless-shine' },
  }

  const slotOrder: CollectionSlot[] = [
    'Basic',
    'Gold',
    'Diamond',
    'Rainbow',
    'Beskar',
    'Flawless',
  ]

  // Floating "bubble" sparkles shown on Flawless-collected cards. Varied size,
  // horizontal position, drift, speed and delay give an organic rising effect.
  const flawlessBubbles = [
    { size: 5, left: 12, drift: 6, duration: 4.2, delay: 0 },
    { size: 9, left: 24, drift: -8, duration: 5.6, delay: 1.4 },
    { size: 3, left: 38, drift: 4, duration: 3.6, delay: 0.6 },
    { size: 7, left: 50, drift: -5, duration: 5.0, delay: 2.2 },
    { size: 4, left: 62, drift: 7, duration: 4.0, delay: 0.9 },
    { size: 11, left: 73, drift: -6, duration: 6.2, delay: 3.0 },
    { size: 5, left: 84, drift: 5, duration: 4.6, delay: 1.8 },
    { size: 8, left: 92, drift: -4, duration: 5.4, delay: 0.3 },
    { size: 3, left: 6, drift: 8, duration: 3.8, delay: 2.6 },
    { size: 6, left: 56, drift: -7, duration: 5.2, delay: 3.6 },
  ]

  // Subtle rarity tint behind each droid's placeholder art.
  const rarityTint: Record<DroidCategory, string> = {
    Common: 'from-slate-500/15',
    Rare: 'from-blue-500/20',
    Epic: 'from-purple-500/20',
    Legendary: 'from-amber-500/20',
    Iconic: 'from-cyan-500/20',
  }

  const rarities: DroidCategory[] = [
    'Common',
    'Rare',
    'Epic',
    'Legendary',
    'Iconic',
  ]
  const types: DroidType[] = ['Worker', 'Astromech', 'Battle']

  const allRaritiesOn = () =>
    Object.fromEntries(rarities.map((r) => [r, true])) as Record<
      string,
      boolean
    >
  const allTypesOn = () =>
    Object.fromEntries(types.map((t) => [t, true])) as Record<string, boolean>

  // Restore previously saved filters, merged over defaults so any rarities or
  // types added later still default to visible.
  const FILTER_KEY = 'droidex-filters-v1'
  const saved = loadState<{
    search?: string
    status?: 'all' | 'missing' | 'complete'
    rarityOn?: Record<string, boolean>
    typeOn?: Record<string, boolean>
  }>(FILTER_KEY, {})

  let search = $state(saved.search ?? '')
  let status = $state<'all' | 'missing' | 'complete'>(saved.status ?? 'all')
  let rarityOn = $state<Record<string, boolean>>({
    ...allRaritiesOn(),
    ...saved.rarityOn,
  })
  let typeOn = $state<Record<string, boolean>>({
    ...allTypesOn(),
    ...saved.typeOn,
  })

  $effect(() => {
    saveState(FILTER_KEY, { search, status, rarityOn, typeOn })
  })

  const toggleRarity = (r: DroidCategory) => {
    rarityOn = { ...rarityOn, [r]: !rarityOn[r] }
  }
  const toggleType = (t: DroidType) => {
    typeOn = { ...typeOn, [t]: !typeOn[t] }
  }

  const filtered = $derived(
    droids.filter((droid) => {
      if (!rarityOn[droid.category]) return false
      if (!typeOn[droid.type]) return false
      if (search && !droid.name.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      const total = slotsFor(droid).length
      const have = Math.min(droidex.count(droid.name), total)
      if (status === 'complete' && have < total) return false
      if (status === 'missing' && have >= total) return false
      return true
    }),
  )

  // Overall collection progress across the whole roster (not just filtered).
  const collected = $derived(
    droids.reduce(
      (sum, droid) =>
        sum + Math.min(droidex.count(droid.name), slotsFor(droid).length),
      0,
    ),
  )
  const percent = $derived(Math.round((collected / totalSlots) * 100))

  const resetFilters = () => {
    search = ''
    status = 'all'
    rarityOn = allRaritiesOn()
    typeOn = allTypesOn()
  }

  const clearCollection = () => {
    if (
      confirm(
        'Clear your entire Droidex? This removes every collected mark and cannot be undone.',
      )
    ) {
      droidex.clear()
    }
  }

  // Download the current collection as a JSON backup file.
  const exportCollection = () => {
    const blob = new Blob([JSON.stringify(droidex.exportData(), null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `droidex-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  let fileInput = $state<HTMLInputElement>()

  // Read a chosen JSON backup and replace the current collection.
  const importCollection = async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement
    const file = input.files?.[0]
    input.value = '' // allow re-importing the same file later
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      const count = droidex.importData(data)
      alert(`Imported ${count} droid${count === 1 ? '' : 's'}.`)
    } catch (err) {
      alert(
        err instanceof Error && err.message.includes('valid')
          ? err.message
          : "Couldn't read that file. Make sure it's a Droidex export.",
      )
    }
  }
</script>

<SectionHeader
  title="Droidex"
  description="Track every droid you've built across all variants. Tap a slot to mark it collected — your progress is saved on this device, and each portrait upgrades to the best variant you own."
>
  {droids.length} droids · {totalSlots} collectibles
</SectionHeader>

<!-- Progress + controls -->
<div
  class="mb-5 flex flex-col gap-4 rounded-xl border border-border bg-surface p-4"
>
  <div class="flex items-center gap-3">
    <div class="flex-1">
      <div class="mb-1.5 flex items-baseline justify-between text-xs">
        <span class="font-medium text-foreground">Collection progress</span>
        <span class="text-subtle">
          {collected} / {totalSlots} · {percent}%
        </span>
      </div>
      <div class="h-2 overflow-hidden rounded-full bg-elevated">
        <div
          class="h-full rounded-full bg-accent transition-all"
          style="width: {percent}%"
        ></div>
      </div>
    </div>
  </div>

  <!-- Search + filter status + collection actions -->
  <div class="flex flex-wrap items-center gap-2">
    <div class="relative min-w-44 flex-1">
      <span
        class="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-subtle"
      >
        <Icon name="search" size={15} />
      </span>
      <input
        type="text"
        bind:value={search}
        placeholder="Search droids…"
        class="w-full rounded-lg border border-border bg-elevated py-1.5 pr-3 pl-8 text-sm text-foreground placeholder:text-subtle focus:border-accent focus:outline-none"
      />
    </div>

    <div
      class="flex rounded-lg border border-border bg-elevated p-0.5 text-xs font-medium"
    >
      {#each [{ key: 'all', label: 'All' }, { key: 'missing', label: 'Missing' }, { key: 'complete', label: 'Complete' }] as opt (opt.key)}
        <button
          type="button"
          onclick={() => (status = opt.key as typeof status)}
          class="cursor-pointer rounded-md px-2.5 py-1 transition-colors {status ===
          opt.key
            ? 'bg-accent text-white'
            : 'text-subtle hover:text-foreground'}"
        >
          {opt.label}
        </button>
      {/each}
    </div>

    <!-- Backup / reset actions, grouped to the right -->
    <div class="ml-auto flex items-center gap-1.5">
      <button
        type="button"
        onclick={exportCollection}
        title="Download your collection as a JSON file"
        class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-subtle transition-colors hover:border-accent/40 hover:text-accent"
      >
        <Icon name="download" size={14} />
        Export
      </button>
      <button
        type="button"
        onclick={() => fileInput?.click()}
        title="Restore a collection from a JSON file"
        class="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-subtle transition-colors hover:border-accent/40 hover:text-accent"
      >
        <Icon name="upload" size={14} />
        Import
      </button>
      <span class="mx-0.5 h-5 w-px bg-border"></span>
      <button
        type="button"
        onclick={clearCollection}
        title="Clear your entire collection"
        class="cursor-pointer rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-subtle transition-colors hover:border-rose-500/40 hover:text-rose-500"
      >
        Reset
      </button>
      <input
        bind:this={fileInput}
        type="file"
        accept="application/json,.json"
        onchange={importCollection}
        class="hidden"
      />
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
    <div class="flex flex-wrap items-center gap-1.5">
      {#each rarities as rarity (rarity)}
        <button
          type="button"
          onclick={() => toggleRarity(rarity)}
          aria-pressed={rarityOn[rarity]}
          class="cursor-pointer rounded-lg border px-2 py-0.5 text-xs font-medium transition-colors {rarityOn[
            rarity
          ]
            ? 'border-accent/40 bg-accent/10 text-accent'
            : 'border-border bg-surface text-subtle'}"
        >
          {rarity}
        </button>
      {/each}
    </div>
    <div class="flex flex-wrap items-center gap-1.5">
      {#each types as type (type)}
        <button
          type="button"
          onclick={() => toggleType(type)}
          aria-pressed={typeOn[type]}
          class="cursor-pointer rounded-lg border px-2 py-0.5 text-xs font-medium transition-colors {typeOn[
            type
          ]
            ? 'border-accent/40 bg-accent/10 text-accent'
            : 'border-border bg-surface text-subtle'}"
        >
          {type}
        </button>
      {/each}
    </div>
  </div>

  <!-- Slot legend -->
  <div
    class="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border pt-3 text-xs text-subtle"
  >
    {#each slotOrder as slot (slot)}
      <span
        class="flex items-center gap-1.5 {slot === 'Flawless' ? 'ml-auto' : ''}"
      >
        <span
          class="flex size-3.5 items-center justify-center rounded-full {slotMeta[
            slot
          ].dot}"
        >
          {#if slot === 'Flawless'}
            <Icon name="star" size={9} class="text-white" />
          {/if}
        </span>
        {slot}
      </span>
    {/each}
  </div>
</div>

{#if filtered.length === 0}
  <div
    class="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted"
  >
    <span>No droids match your filters.</span>
    <button
      type="button"
      onclick={resetFilters}
      class="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-subtle transition-colors hover:border-accent/40 hover:text-accent"
    >
      Reset filters
    </button>
  </div>
{:else}
  <div
    class="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
  >
    {#each filtered as droid (droid.name)}
      {@const slots = slotsFor(droid)}
      {@const have = Math.min(droidex.count(droid.name), slots.length)}
      {@const complete = have === slots.length}
      {@const flawless = droidex.has(droid.name, 'Flawless')}
      {@const art = droidArt(droid.name, droidex.collection[droid.name] ?? [])}
      <div
        class="group flex flex-col gap-2 rounded-xl border bg-surface p-2.5 transition-colors {complete
          ? 'border-accent/40'
          : 'border-border'}"
      >
        <div
          class="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br to-transparent {rarityTint[
            droid.category
          ]} {flawless ? 'flawless-glow' : ''}"
        >
          {#if art}
            <img
              src={art}
              alt={droid.name}
              loading="lazy"
              class="size-full object-contain p-1 transition-transform duration-300 ease-out group-hover:scale-110 {have ===
              0
                ? 'opacity-40 grayscale'
                : ''}"
            />
          {:else}
            <Icon name="droids" size={30} class="text-subtle/40" />
          {/if}
          {#if flawless}
            <div
              class="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            >
              {#each flawlessBubbles as b, i (i)}
                <span
                  class="flawless-bubble"
                  style="left: {b.left}%; width: {b.size}px; height: {b.size}px; --drift: {b.drift}px; animation-duration: {b.duration}s; animation-delay: {b.delay}s;"
                ></span>
              {/each}
            </div>
          {/if}
          <span
            class="absolute top-1 right-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-semibold {complete
              ? 'text-accent'
              : 'text-subtle'}"
          >
            {have}/{slots.length}
          </span>
          {#if flawless}
            <span
              class="absolute bottom-1 left-1 z-10 flex items-center gap-0.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white uppercase"
            >
              <Icon name="star" size={9} class="text-white" />
              Flawless
            </span>
          {/if}
          {#if complete}
            <span
              class="absolute top-1 left-1 flex size-4 items-center justify-center rounded-full bg-accent text-white"
            >
              <Icon name="check" size={11} />
            </span>
          {/if}
        </div>

        <div class="min-w-0">
          <p
            class="truncate text-xs font-semibold text-foreground"
            title={droid.name}
          >
            {droid.name}
          </p>
          <div class="mt-1 flex items-center gap-1">
            <Badge tone={rarityTone[droid.category]}>{droid.category}</Badge>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-1">
          {#each slots as slot (slot)}
            {@const has = droidex.has(droid.name, slot)}
            <button
              type="button"
              onclick={() => droidex.toggle(droid.name, slot)}
              title={slot}
              aria-label={`${droid.name} ${slot}`}
              aria-pressed={has}
              class="flex size-5 cursor-pointer items-center justify-center rounded-full border transition-colors {slot ===
              'Flawless'
                ? 'ml-auto'
                : ''} {has
                ? `${slotMeta[slot].dot} border-transparent`
                : 'border-border bg-transparent hover:border-accent/50'}"
            >
              {#if slot === 'Flawless'}
                <Icon
                  name="star"
                  size={11}
                  class={has ? 'text-white' : 'text-subtle'}
                />
              {:else if has}
                <Icon name="check" size={11} class="text-white" />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

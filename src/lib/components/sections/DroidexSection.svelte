<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { droids } from '$lib/droidsData'
  import { droidex, slotsFor, totalSlots } from '$lib/droidex.svelte'
  import { droidArt } from '$lib/droidArt'
  import { rarityTone } from '$lib/display'
  import type { CollectionSlot, DroidCategory, DroidType } from '$lib/types'

  // Visual treatment for each collectible slot. `dot` is the fill used once a
  // slot is collected; uncollected slots render as a hollow ring.
  const slotMeta: Record<CollectionSlot, { dot: string }> = {
    Basic: { dot: 'bg-slate-400' },
    Gold: { dot: 'bg-amber-400' },
    Diamond: { dot: 'bg-cyan-400' },
    Rainbow: { dot: 'bg-gradient-to-br from-fuchsia-400 to-violet-400' },
    Beskar: { dot: 'bg-zinc-500' },
    Flawless: { dot: 'bg-emerald-400' },
  }

  const slotOrder: CollectionSlot[] = [
    'Basic',
    'Gold',
    'Diamond',
    'Rainbow',
    'Beskar',
    'Flawless',
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

  let search = $state('')
  let status = $state<'all' | 'missing' | 'complete'>('all')
  let rarityOn = $state<Record<string, boolean>>(
    Object.fromEntries(rarities.map((r) => [r, true])),
  )
  let typeOn = $state<Record<string, boolean>>(
    Object.fromEntries(types.map((t) => [t, true])),
  )

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
    rarityOn = Object.fromEntries(rarities.map((r) => [r, true]))
    typeOn = Object.fromEntries(types.map((t) => [t, true]))
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
    <button
      type="button"
      onclick={clearCollection}
      class="shrink-0 cursor-pointer rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-subtle transition-colors hover:border-rose-500/40 hover:text-rose-500"
    >
      Reset
    </button>
  </div>

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
      <span class="flex items-center gap-1.5">
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
      {@const art = droidArt(droid.name, droidex.collection[droid.name] ?? [])}
      <div
        class="flex flex-col gap-2 rounded-xl border bg-surface p-2.5 transition-colors {complete
          ? 'border-accent/40'
          : 'border-border'}"
      >
        <div
          class="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br to-transparent {rarityTint[
            droid.category
          ]}"
        >
          {#if art}
            <img
              src={art}
              alt={droid.name}
              loading="lazy"
              class="size-full object-contain p-1 transition-all {have === 0
                ? 'opacity-40 grayscale'
                : ''}"
            />
          {:else}
            <Icon name="droids" size={30} class="text-subtle/40" />
          {/if}
          <span
            class="absolute top-1 right-1 rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-semibold {complete
              ? 'text-accent'
              : 'text-subtle'}"
          >
            {have}/{slots.length}
          </span>
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

        <div class="flex flex-wrap gap-1">
          {#each slots as slot (slot)}
            {@const has = droidex.has(droid.name, slot)}
            <button
              type="button"
              onclick={() => droidex.toggle(droid.name, slot)}
              title={slot}
              aria-label={`${droid.name} ${slot}`}
              aria-pressed={has}
              class="flex size-5 cursor-pointer items-center justify-center rounded-full border transition-colors {has
                ? `${slotMeta[slot].dot} border-transparent`
                : 'border-border bg-transparent hover:border-accent/50'}"
            >
              {#if slot === 'Flawless'}
                <Icon
                  name="star"
                  size={11}
                  class={has ? 'text-white' : 'text-subtle'}
                />
              {/if}
            </button>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}

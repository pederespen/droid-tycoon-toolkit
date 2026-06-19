<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import Combobox from '$lib/components/Combobox.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { variantTone } from '$lib/display'
  import { getCycleDroidRequirements, variants } from '$lib/droidUtils'
  import { rebirthSteps } from '$lib/rebirthData'
  import { superRebirthPathCount } from '$lib/novaData'
  import type { Variant } from '$lib/types'

  const minLevel = rebirthSteps[0].from
  const maxLevel = rebirthSteps[rebirthSteps.length - 1].to

  const cycleOptions = Array.from({ length: superRebirthPathCount }, (_, i) =>
    String(i + 1),
  )
  const levelOptions = Array.from({ length: maxLevel - minLevel + 1 }, (_, i) =>
    String(minLevel + i),
  )

  let cycle = $state('')
  let fromLevel = $state(String(minLevel))
  let toLevel = $state(String(maxLevel))
  let search = $state('')

  const from = $derived(Number(fromLevel))
  const to = $derived(Number(toLevel))
  const validRange = $derived(from < to)
  const ready = $derived(cycle !== '' && validRange)

  const requirements = $derived(
    ready
      ? getCycleDroidRequirements(rebirthSteps, Number(cycle), from, to)
      : [],
  )

  const filtered = $derived(
    search.trim() === ''
      ? requirements
      : requirements.filter((item) =>
          item.name.toLowerCase().includes(search.trim().toLowerCase()),
        ),
  )

  // Group by variant, highest variant first, dropping empty groups.
  const groups = $derived(
    [...variants]
      .reverse()
      .map((variant) => ({
        variant,
        items: filtered.filter((item) => item.variant === variant),
      }))
      .filter((group) => group.items.length > 0),
  )

  const reset = () => {
    cycle = ''
    fromLevel = String(minLevel)
    toLevel = String(maxLevel)
    search = ''
  }
</script>

<div class="flex flex-col gap-6">
  <SectionHeader
    title="Cycle Droid Planner"
    description="Pick your Super Rebirth cycle to see every droid you'll need, shown at the highest variant required (a higher variant covers all lower ones). Optionally narrow the rebirth-level range to plan a specific stretch."
  />

  <div class="rounded-xl border border-border bg-surface p-3 sm:p-4">
    <div class="flex flex-wrap items-end gap-3">
      <div class="flex min-w-[10rem] flex-1 flex-col gap-1.5">
        <span class="text-xs font-medium text-subtle">Super Rebirth cycle</span>
        <Combobox
          options={cycleOptions}
          bind:value={cycle}
          placeholder="Select cycle…"
          searchPlaceholder="Search…"
          label="Super Rebirth cycle"
        />
      </div>
      <div class="flex w-24 flex-col gap-1.5">
        <span class="text-xs font-medium text-subtle">From</span>
        <Combobox
          options={levelOptions}
          bind:value={fromLevel}
          placeholder="From…"
          searchPlaceholder="Search…"
          label="From rebirth level"
        />
      </div>
      <div class="flex w-24 flex-col gap-1.5">
        <span class="text-xs font-medium text-subtle">To</span>
        <Combobox
          options={levelOptions}
          bind:value={toLevel}
          placeholder="To…"
          searchPlaceholder="Search…"
          label="To rebirth level"
        />
      </div>
      <div class="flex min-w-[10rem] flex-1 flex-col gap-1.5">
        <span class="text-xs font-medium text-subtle">Search</span>
        <div
          class="flex items-center gap-2 rounded-lg border border-border bg-elevated px-3 py-2"
        >
          <Icon name="search" size={15} class="shrink-0 text-subtle" />
          <input
            bind:value={search}
            type="text"
            placeholder="Search droids…"
            class="w-full bg-transparent text-sm text-foreground placeholder:text-subtle focus:outline-none"
          />
        </div>
      </div>
      {#if cycle !== '' || fromLevel !== String(minLevel) || toLevel !== String(maxLevel) || search !== ''}
        <button
          type="button"
          onclick={reset}
          class="cursor-pointer rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-foreground"
        >
          Reset
        </button>
      {/if}
    </div>
  </div>

  {#if cycle === ''}
    <p class="text-sm text-muted">Select a cycle to see the droid plan.</p>
  {:else if !validRange}
    <p class="text-sm text-muted">
      "From" rebirth must be lower than "To" rebirth.
    </p>
  {:else if requirements.length === 0}
    <p class="text-sm text-muted">No droids required in that range.</p>
  {:else if groups.length === 0}
    <p class="text-sm text-muted">No droids match “{search}”.</p>
  {:else}
    <div class="grid gap-3 lg:grid-cols-2">
      {#each groups as group (group.variant)}
        <div class="rounded-xl border border-border bg-surface p-3 sm:p-4">
          <div class="mb-2.5 flex items-center justify-between">
            <Badge tone={variantTone[group.variant as Variant]}>
              {group.variant}
            </Badge>
            <span class="text-xs text-subtle">{group.items.length}</span>
          </div>
          <div class="flex flex-col divide-y divide-border/60">
            {#each group.items as item (item.variant + item.name)}
              <div
                class="flex items-center justify-between gap-3 py-1.5 text-sm"
              >
                <span class="font-medium text-foreground">{item.name}</span>
                <span
                  class="shrink-0 font-mono text-xs text-subtle"
                  title="Required at rebirth {item.levels.join(', ')}"
                >
                  {item.levels.join(', ')}
                </span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

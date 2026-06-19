<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import Combobox from '$lib/components/Combobox.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { variantTone } from '$lib/display'
  import { findRebirthCycleMatches, getDroidNames } from '$lib/droidUtils'
  import { rebirthSteps } from '$lib/rebirthData'

  const droidOptions = getDroidNames(rebirthSteps)
  const levelOptions = rebirthSteps.map((step) => String(step.from))

  let level = $state('')
  let selected = $state<string[]>(['', '', ''])

  const filled = $derived(selected.filter((name) => name !== ''))
  const ready = $derived(level !== '' && filled.length === 3)

  const matches = $derived(
    ready ? findRebirthCycleMatches(rebirthSteps, Number(level), selected) : [],
  )

  const cycles = $derived(
    [...new Set(matches.map((match) => match.cycle))].sort((a, b) => a - b),
  )

  const hasInput = $derived(level !== '' || filled.length > 0)

  const clear = () => {
    level = ''
    selected = ['', '', '']
  }
</script>

<div class="flex flex-col gap-6">
  <SectionHeader
    title="Super Rebirth Cycle Finder"
    description="Enter your current rebirth level and the three droids the game shows for your next rebirth, and this will tell you which Super Rebirth cycle you're currently on."
  />

  <div class="rounded-xl border border-border bg-surface p-4 sm:p-5">
    <div class="mb-3 max-w-[12rem]">
      <div class="flex flex-col gap-1.5">
        <span class="text-xs font-medium text-subtle"
          >Current rebirth level</span
        >
        <Combobox
          options={levelOptions}
          bind:value={level}
          placeholder="Select level…"
          searchPlaceholder="Search level…"
          label="Current rebirth level"
        />
      </div>
    </div>

    <div class="grid gap-3 sm:grid-cols-3">
      {#each [0, 1, 2] as index (index)}
        <div class="flex flex-col gap-1.5">
          <span class="text-xs font-medium text-subtle">Droid {index + 1}</span>
          <Combobox
            options={droidOptions}
            bind:value={selected[index]}
            placeholder="Select droid…"
            searchPlaceholder="Search droids…"
            label={`Droid ${index + 1}`}
          />
        </div>
      {/each}
    </div>

    {#if hasInput}
      <div class="mt-3 flex justify-end">
        <button
          type="button"
          onclick={clear}
          class="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-foreground"
        >
          Clear
        </button>
      </div>
    {/if}
  </div>

  {#if !ready}
    <p class="text-sm text-muted">
      Select your rebirth level and all three droids to find your cycle.
    </p>
  {:else if matches.length === 0}
    <div class="rounded-xl border border-border bg-surface p-5">
      <p class="text-sm font-medium text-foreground">No match found</p>
      <p class="mt-1 text-sm text-muted">
        No path for rebirth {level} → {Number(level) + 1} uses that exact set of droids.
        Double-check your rebirth level and the droid names against what the game
        is showing you.
      </p>
    </div>
  {:else}
    <div class="rounded-xl border border-border bg-surface p-5">
      <p class="text-sm text-muted">
        {cycles.length === 1
          ? 'You are on'
          : 'These droids appear in more than one cycle:'}
      </p>
      <div class="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {#each cycles as cycle, index (cycle)}
          <span class="text-2xl font-semibold text-accent">
            Super Rebirth Cycle {cycle}
          </span>
          {#if index < cycles.length - 1}
            <span class="text-2xl font-semibold text-subtle">or</span>
          {/if}
        {/each}
      </div>

      <div class="mt-5 flex flex-col gap-3 border-t border-border pt-4">
        <p class="text-xs font-medium text-subtle">
          Matching rebirth{matches.length > 1 ? 's' : ''}
        </p>
        {#each matches as match (`${match.step.from}-${match.cycle}`)}
          <div
            class="flex flex-col gap-2 rounded-lg bg-elevated/60 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-3">
              <Badge tone="violet">Cycle {match.cycle}</Badge>
              <span class="text-sm font-medium text-foreground">
                Rebirth {match.step.from} → {match.step.to}
              </span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              {#each match.requirements as requirement (requirement.variant + requirement.name)}
                <Badge tone={variantTone[requirement.variant]}>
                  {requirement.variant}
                  {requirement.name}
                </Badge>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

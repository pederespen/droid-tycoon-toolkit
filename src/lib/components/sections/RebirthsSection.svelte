<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import DataTable, {
    type Column,
    type Row,
  } from '$lib/components/DataTable.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { rebirthSteps } from '$lib/rebirthData'
  import { variantTone } from '$lib/display'
  import type { RebirthStep, Requirement } from '$lib/types'

  const baseColumns: Column[] = [
    { key: 'rebirth', label: 'Rebirth' },
    { key: 'cost', label: 'Cost', align: 'right' },
    { key: 'unlock', label: 'Unlocks' },
  ]

  const cycleColumns: Column[] = [
    { key: 'cycle0', label: 'Cycle 1' },
    { key: 'cycle1', label: 'Cycle 2' },
    { key: 'cycle2', label: 'Cycle 3' },
    { key: 'cycle3', label: 'Cycle 4' },
  ]

  let visibleCycles = $state<boolean[]>([true, true, true, true])

  const columns = $derived([
    ...baseColumns,
    ...cycleColumns.filter((_, i) => visibleCycles[i]),
  ])

  const toggleCycle = (index: number) => {
    visibleCycles = visibleCycles.map((on, i) => (i === index ? !on : on))
  }

  const rows = rebirthSteps as unknown as Row[]

  const cycleIndex = (key: string) => Number(key.replace('cycle', ''))

  const requirementsFor = (step: RebirthStep, key: string): Requirement[] =>
    step.patterns[cycleIndex(key)] ?? []
</script>

<SectionHeader
  title="Rebirth Requirements"
  description="Droids you must turn in to rebirth. Super Rebirths cycle through the four requirement paths in order (1 → 2 → 3 → 4); cycle 1 is the original path."
>
  {rebirthSteps.length} rebirths
</SectionHeader>

<div class="mb-4 flex flex-wrap items-center gap-2">
  <span class="text-xs font-medium text-subtle">Show cycles:</span>
  {#each cycleColumns as cycle, i (cycle.key)}
    <button
      type="button"
      onclick={() => toggleCycle(i)}
      aria-pressed={visibleCycles[i]}
      class="cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors {visibleCycles[
        i
      ]
        ? 'border-accent/40 bg-accent/10 text-accent'
        : 'border-border bg-surface text-subtle hover:text-muted'}"
    >
      {cycle.label}
    </button>
  {/each}
</div>

<DataTable {columns} {rows} rowKey={(row) => (row as RebirthStep).from}>
  {#snippet cell(row, column)}
    {@const step = row as RebirthStep}
    {#if column.key === 'rebirth'}
      <span class="font-medium text-foreground">{step.from} → {step.to}</span>
    {:else if column.key === 'cost'}
      <span class="text-muted">{step.cost}</span>
    {:else if column.key === 'unlock'}
      {#if step.unlock === 'None'}
        <span class="text-subtle">—</span>
      {:else}
        <span class="text-muted">{step.unlock}</span>
      {/if}
    {:else}
      <div class="flex flex-col items-start gap-1 py-0.5">
        {#each requirementsFor(step, column.key) as req, i (i)}
          <Badge tone={variantTone[req.variant]}>
            {req.variant}
            {req.name}
          </Badge>
        {/each}
      </div>
    {/if}
  {/snippet}
</DataTable>

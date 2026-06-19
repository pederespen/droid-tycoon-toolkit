<script lang="ts">
  import Badge from '$lib/components/Badge.svelte'
  import DataTable, {
    type Column,
    type Row,
  } from '$lib/components/DataTable.svelte'
  import SectionHeader from '$lib/components/SectionHeader.svelte'
  import { novaRebirthRewards, novaUpgrades } from '$lib/novaData'
  import type { NovaShopCategory, NovaUpgrade } from '$lib/types'
  import type { Tone } from '$lib/display'

  const categoryTone: Record<NovaShopCategory, Tone> = {
    Core: 'blue',
    Workshop: 'violet',
    Cosmetics: 'fuchsia',
  }

  const upgradeColumns: Column[] = [
    { key: 'name', label: 'Upgrade' },
    { key: 'category', label: 'Category' },
    { key: 'levels', label: 'Tiers', align: 'right' },
    { key: 'costs', label: 'Crystal cost per tier' },
    { key: 'endless', label: 'Cap' },
  ]

  const upgradeRows = novaUpgrades as unknown as Row[]

  const rewardColumns: Column[] = [
    { key: 'level', label: 'Rebirth' },
    { key: 'crystals', label: 'Nova Crystals', align: 'right' },
    { key: 'creditMult', label: 'Credit Mult', align: 'right' },
    { key: 'xpMult', label: 'XP Mult', align: 'right' },
  ]

  const rewardRows: Row[] = novaRebirthRewards.map((r) => ({
    level: `RB ${r.level}`,
    crystals: r.crystals,
    creditMult: `+${r.creditMult}%`,
    xpMult: `+${r.xpMult}%`,
  }))
</script>

<div class="flex flex-col gap-10">
  <div>
    <SectionHeader
      title="Nova Shop Upgrades"
      description="Permanent upgrades bought with Nova Crystals. Endless upgrades keep scaling beyond the known levels; capped upgrades stop at their last level."
    >
      {novaUpgrades.length} upgrades
    </SectionHeader>
    <DataTable
      columns={upgradeColumns}
      rows={upgradeRows}
      rowKey={(row) => (row as NovaUpgrade).name}
    >
      {#snippet cell(row, column)}
        {@const upgrade = row as NovaUpgrade}
        {#if column.key === 'name'}
          <span class="font-medium text-foreground">{upgrade.name}</span>
        {:else if column.key === 'category'}
          <Badge tone={categoryTone[upgrade.category]}>{upgrade.category}</Badge
          >
        {:else if column.key === 'levels'}
          <span class="text-muted">
            {upgrade.costs.length}{upgrade.endless ? '+' : ''}
          </span>
        {:else if column.key === 'costs'}
          <div class="flex flex-wrap items-center gap-1">
            {#each upgrade.costs as cost, i (i)}
              <span
                class="rounded-md bg-elevated px-1.5 py-0.5 text-xs text-muted ring-1 ring-inset ring-border"
              >
                {cost}
              </span>
            {/each}
            {#if upgrade.endless}
              <span class="px-1 text-xs text-subtle">…</span>
            {/if}
          </div>
        {:else if column.key === 'endless'}
          {#if upgrade.endless}
            <Badge tone="emerald">Endless</Badge>
          {:else}
            <Badge tone="slate">Capped</Badge>
          {/if}
        {/if}
      {/snippet}
    </DataTable>
  </div>

  <div>
    <SectionHeader
      title="Super Rebirth Rewards"
      description="Nova Crystals earned and the credit / XP multipliers granted at each Super Rebirth level."
    />
    <DataTable
      columns={rewardColumns}
      rows={rewardRows}
      rowKey={(row) => row.level as string}
    >
      {#snippet cell(row, column)}
        {#if column.key === 'level'}
          <span class="font-medium text-foreground">{row.level}</span>
        {:else if column.key === 'creditMult'}
          <span class="text-emerald-600 dark:text-emerald-400"
            >{row.creditMult}</span
          >
        {:else if column.key === 'xpMult'}
          <span class="text-blue-600 dark:text-blue-400">{row.xpMult}</span>
        {:else}
          {row[column.key]}
        {/if}
      {/snippet}
    </DataTable>
  </div>
</div>

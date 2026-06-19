<script lang="ts" module>
  export type Column = {
    key: string
    label: string
    align?: 'left' | 'right' | 'center'
  }

  export type ColumnGroup = {
    label: string
    span: number
  }

  export type Row = Record<string, unknown>
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    columns,
    rows,
    groups,
    stickyFirstColumn = false,
    rowKey,
    cell,
  }: {
    columns: Column[]
    rows: Row[]
    groups?: ColumnGroup[]
    stickyFirstColumn?: boolean
    rowKey?: (row: Row, index: number) => string | number
    /** Optional custom cell renderer. Falls back to row[column.key] as text. */
    cell?: Snippet<[Row, Column]>
  } = $props()

  const alignClass = (align: Column['align']) =>
    align === 'right'
      ? 'text-right'
      : align === 'center'
        ? 'text-center'
        : 'text-left'

  // Sticky first column sits above the horizontally-scrolling body, so it needs
  // an opaque background that matches the surface.
  const stickyCell = 'sticky left-0 z-10 bg-surface'
</script>

<div class="overflow-x-auto rounded-xl border border-border bg-surface">
  <table class="w-full border-collapse text-sm">
    <thead>
      {#if groups}
        <tr>
          {#each groups as group, i (i)}
            <th
              colspan={group.span}
              class="border-b border-border px-3 py-2 text-center text-xs font-semibold tracking-wide text-muted {i >
              0
                ? 'border-l border-border'
                : ''}"
            >
              {group.label}
            </th>
          {/each}
        </tr>
      {/if}
      <tr>
        {#each columns as column, i (column.key)}
          <th
            class="border-b border-border bg-elevated px-3 py-2.5 text-xs font-medium tracking-wide whitespace-nowrap text-muted uppercase {alignClass(
              column.align,
            )} {stickyFirstColumn && i === 0
              ? `${stickyCell} bg-elevated`
              : ''}"
          >
            {column.label}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, rowIndex (rowKey ? rowKey(row, rowIndex) : rowIndex)}
        <tr
          class="border-b border-border/60 transition-colors last:border-0 hover:bg-elevated/50"
        >
          {#each columns as column, i (column.key)}
            <td
              class="px-3 py-2 align-middle text-foreground tabular-nums {alignClass(
                column.align,
              )} {stickyFirstColumn && i === 0
                ? `${stickyCell} font-medium`
                : ''}"
            >
              {#if cell}
                {@render cell(row, column)}
              {:else}
                {row[column.key] ?? '—'}
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

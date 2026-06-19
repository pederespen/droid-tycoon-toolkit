<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Tone } from '$lib/display'

  let {
    tone = 'slate',
    children,
  }: {
    tone?: Tone
    children: Snippet
  } = $props()

  const toneClasses: Record<Tone, string> = {
    slate:
      'bg-slate-500/10 text-slate-700 ring-slate-500/20 dark:text-slate-300',
    ghost: 'bg-transparent text-muted ring-border',
    zinc: 'bg-zinc-600/15 text-zinc-700 ring-zinc-600/30 dark:text-zinc-300',
    blue: 'bg-blue-500/10 text-blue-700 ring-blue-500/20 dark:text-blue-300',
    purple:
      'bg-purple-500/10 text-purple-700 ring-purple-500/20 dark:text-purple-300',
    amber:
      'bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300',
    cyan: 'bg-cyan-500/10 text-cyan-700 ring-cyan-500/20 dark:text-cyan-300',
    emerald:
      'bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300',
    violet:
      'bg-violet-500/10 text-violet-700 ring-violet-500/20 dark:text-violet-300',
    rose: 'bg-rose-500/10 text-rose-700 ring-rose-500/20 dark:text-rose-300',
    fuchsia:
      'bg-fuchsia-500/10 text-fuchsia-700 ring-fuchsia-500/20 dark:text-fuchsia-300',
    orange:
      'bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:text-orange-300',
  }
</script>

<span
  class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap {toneClasses[
    tone
  ]}"
>
  {@render children()}
</span>

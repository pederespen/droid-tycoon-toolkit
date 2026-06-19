<script lang="ts">
  import Icon from './lib/components/Icon.svelte'
  import OverviewSection from './lib/components/sections/OverviewSection.svelte'
  import { handleLinkClick, router } from './lib/router.svelte'
  import { sectionByPath, sections } from './lib/sections'
  import { getTheme, toggleTheme, type Theme } from './lib/theme'

  let theme = $state<Theme>(getTheme())

  const COLLAPSE_KEY = 'sidebar-collapsed'
  let collapsed = $state(localStorage.getItem(COLLAPSE_KEY) === 'true')

  const current = $derived(sectionByPath(router.path))
  const isHome = $derived(router.path === '/')

  const onToggleTheme = () => {
    theme = toggleTheme()
  }

  const toggleCollapsed = () => {
    collapsed = !collapsed
    localStorage.setItem(COLLAPSE_KEY, String(collapsed))
  }
</script>

<div class="mx-auto flex min-h-screen w-full max-w-[1500px]">
  <!-- Sidebar (desktop) -->
  <aside
    class="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border py-4 transition-all md:flex {collapsed
      ? 'w-16 px-2'
      : 'w-60 px-3'}"
  >
    <div
      class="flex items-center px-1 {collapsed
        ? 'justify-center'
        : 'justify-between'}"
    >
      {#if !collapsed}
        <a
          href="/"
          onclick={(event) => handleLinkClick(event, '/')}
          class="flex flex-col rounded-lg px-2 py-1 transition-colors hover:bg-elevated/60"
        >
          <span class="text-sm font-semibold text-foreground">Droid Tycoon</span
          >
          <span class="text-xs text-subtle">Toolkit &amp; reference</span>
        </a>
      {/if}
      <button
        type="button"
        onclick={toggleCollapsed}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        class="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated/60 hover:text-foreground"
      >
        <Icon name="panel-left" size={18} />
      </button>
    </div>

    <nav class="mt-4 flex flex-col gap-0.5">
      {#each sections as section (section.id)}
        <a
          href={section.path}
          onclick={(event) => handleLinkClick(event, section.path)}
          title={collapsed ? section.label : undefined}
          class="flex items-center gap-3 rounded-lg text-sm transition-colors {collapsed
            ? 'size-9 justify-center self-center'
            : 'px-3 py-2'} {current?.id === section.id
            ? 'bg-elevated font-medium text-foreground'
            : 'text-muted hover:bg-elevated/60 hover:text-foreground'}"
        >
          <Icon name={section.icon} size={18} />
          {#if !collapsed}<span>{section.label}</span>{/if}
        </a>
      {/each}
    </nav>

    <button
      type="button"
      onclick={onToggleTheme}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      class="mt-auto flex cursor-pointer items-center gap-3 rounded-lg text-sm text-muted transition-colors hover:bg-elevated/60 hover:text-foreground {collapsed
        ? 'size-9 justify-center self-center'
        : 'px-3 py-2'}"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
      {#if !collapsed}
        <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
      {/if}
    </button>
  </aside>

  <div class="flex min-w-0 flex-1 flex-col">
    <!-- Top bar (mobile nav) -->
    <header
      class="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur md:hidden"
    >
      <div class="flex items-center justify-between px-4 py-3">
        <a
          href="/"
          onclick={(event) => handleLinkClick(event, '/')}
          class="text-sm font-semibold text-foreground"
        >
          Droid Tycoon
        </a>
        <button
          type="button"
          onclick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          class="flex size-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-elevated/60 hover:text-foreground"
        >
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
        </button>
      </div>
      <nav class="flex gap-1 overflow-x-auto px-3 pb-2">
        <a
          href="/"
          onclick={(event) => handleLinkClick(event, '/')}
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors {isHome
            ? 'bg-elevated font-medium text-foreground'
            : 'text-muted hover:text-foreground'}"
        >
          <Icon name="home" size={16} />
          Home
        </a>
        {#each sections as section (section.id)}
          <a
            href={section.path}
            onclick={(event) => handleLinkClick(event, section.path)}
            class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors {current?.id ===
            section.id
              ? 'bg-elevated font-medium text-foreground'
              : 'text-muted hover:text-foreground'}"
          >
            <Icon name={section.icon} size={16} />
            {section.label}
          </a>
        {/each}
      </nav>
    </header>

    <main class="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      {#if isHome}
        <OverviewSection />
      {:else if current}
        <current.component />
      {:else}
        <OverviewSection />
      {/if}
    </main>
  </div>
</div>

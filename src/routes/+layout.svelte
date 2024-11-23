<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-screen max-h-screen overflow-y-auto overflow-x-visible">
	<Navbar />
	<main class="p-16 py-8">
		{@render children()}
	</main>
</div>

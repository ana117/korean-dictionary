<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Korean Dictionary</title>
</svelte:head>

<div class="flex h-screen flex-col">
	<Navbar />
	{@render children()}
</div>

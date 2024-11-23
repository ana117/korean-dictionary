<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="h-screen flex flex-col">
	<Navbar />
	{@render children()}
</div>

<script lang="ts">
	type KeyProps = {
		symbol: string;
		altSymbol: string;
		useAltKey: boolean;
		customClass?: string;
		customTextClass?: string;
		keyClick: (symbol: string) => void;
	};

	let { symbol, altSymbol, useAltKey, customClass, customTextClass, keyClick }: KeyProps = $props();
</script>

<button
	class={`m-[0.1rem] flex-auto cursor-pointer border-2 border-foreground py-2 hover:bg-secondary md:m-1 ${customClass}`}
	onclick={() => keyClick(useAltKey ? altSymbol : symbol)}
>
	<span class={`text-lg font-semibold ${customTextClass}`}>
		{useAltKey ? altSymbol : symbol}
	</span>
</button>

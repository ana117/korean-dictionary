<script lang="ts">
	import type { KoreanWord } from '$lib/types';

	export let word: KoreanWord;
	export let isFirst: boolean;

	let dialog: HTMLDialogElement;

	const externalLink = `https://krdict.korean.go.kr/eng/dicSearch/SearchView?nation=eng&nationCode=6&ParaWordNo=${word.code}`;
	const firstElementClass = isFirst ? 'lg:col-span-3 md:col-span-2 sticky top-0 z-10' : '';
</script>

<button
	class="rounded-md bg-accent p-5 shadow-lg hover:scale-105 {firstElementClass}"
	on:click={() => dialog.showModal()}
>
	<p class="fonr-bold text-3xl text-text">
		{word.koreanWord}
	</p>
	<ul>
		{#each word.translations as translation}
			<li>
				{translation.text}
			</li>
		{/each}
	</ul>
</button>

<dialog bind:this={dialog} class="w-5/6 rounded-md bg-background px-8 py-5 md:w-1/2">
	<div class="flex flex-col items-center gap-4">
		<a href={externalLink} target="_blank" rel="noopener noreferrer" class="group relative">
			<h2 class="text-3xl font-bold">
				{word.koreanWord}
			</h2>
			<svg viewBox="0 0 24 24" class="absolute -right-6 top-0 h-4 w-4 group-hover:scale-110">
				<path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
				<path
					d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"
				></path>
			</svg>
		</a>

		<div class="w-full border-y-2 border-foreground/25 py-6">
			<ul>
				{#each word.translations as translation, i}
					<li class="mb-4 text-xl">
						<span class="font-bold">{i + 1}. {translation.text}</span>
						<br />
						<span>{translation.definition}</span>
					</li>
				{/each}
			</ul>
		</div>

		<button
			on:click={() => dialog.close()}
			class="text-xl font-bold underline-offset-4 hover:underline"
		>
			Close
		</button>
	</div>
</dialog>

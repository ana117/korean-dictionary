<script lang="ts">
  export let word: KoreanWord;
  export let isFirst: boolean;

  let dialog: HTMLDialogElement;

  const externalLink = `https://krdict.korean.go.kr/eng/dicSearch/SearchView?nation=eng&nationCode=6&ParaWordNo=${word.code}`;
</script>

<button class="bg-accent opacity-75 hover:opacity-100 p-5 rounded-md shadow-xl hover:scale-105 duration-500" class:lg:col-span-3={isFirst} class:md:col-span-2={isFirst} on:click={() => dialog.showModal()}>
  <p class="text-3xl fonr-bold text-text">
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

<dialog bind:this={dialog} class="bg-background px-8 py-5 rounded-md w-5/6 md:w-1/2">
  <div class="flex flex-col items-center gap-4">
    <a href={externalLink} target="_blank" rel="noopener noreferrer" class="relative group">
      <h2 class="text-3xl font-bold">
        {word.koreanWord}
      </h2>
      <svg viewBox="0 0 24 24" class="absolute -right-6 top-0 w-4 h-4 group-hover:scale-110 duration-500">
        <path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
        <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
      </svg>
    </a>
    
    <div class="border-y-2 border-foreground/25 py-6 w-full">
      <ul>
        {#each word.translations as translation, i}
          <li class="mb-4 text-xl">
            <span class="font-bold">{i+1}. {translation.text}</span>
            <br />
            <span>{translation.definition}</span>
          </li>
        {/each}
      </ul>
    </div>

    <button on:click={() => dialog.close()} class="font-bold text-xl underline-offset-4 hover:underline">
      Close
    </button>
  </div>
</dialog>
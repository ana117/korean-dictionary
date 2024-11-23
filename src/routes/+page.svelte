<script lang="ts">
	import ResultCard from "$lib/components/ResultCard.svelte";
import SearchBar from "$lib/components/SearchBar.svelte";

  const mockResult: KoreanWord[] = [
    {
      code: "1",
      koreanWord: "안녕",
      translations: [
        {
          text: "hello",
          definition: "a greeting",
        },
        {
          text: "hi",
          definition: "a greeting",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑 사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑사랑 사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑 사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑사랑 사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑 사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
    {
      code: "2",
      koreanWord: "사랑사랑 사랑",
      translations: [
        {
          text: "love",
          definition: "a feeling",
        },
      ],
    },
  ];
</script>

<SearchBar />

<div class="grow mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-16">
  {#each mockResult as word, i}
  <ResultCard {word} isFirst={i === 0} />
  {/each}
</div>
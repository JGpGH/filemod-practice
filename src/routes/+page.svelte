<script lang="ts">
  import { onMount } from 'svelte';
  import { generateQuestion, type Question } from '$lib';
  import { fade } from 'svelte/transition';

  let currentQuestion: Question;
  let userAnswer = '';
  let feedback: string | undefined;
  let isSymbolic = true;
  let isDarkMode = true;  // Toggle for dark mode

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('is-dark', isDarkMode);
  }

  function normalizeAnswer(answer: string): string {
    return answer.replace(/^0+/, '').replace(/\s+/g, '').toLowerCase();
  }

  function checkAnswer() {
    const correctAnswer = isSymbolic 
      ? currentQuestion.numericMode.toString() 
      : currentQuestion.symbolicMode;
    const normalizedUserAnswer = normalizeAnswer(userAnswer);
    const normalizedCorrectAnswer = normalizeAnswer(correctAnswer);

    feedback = normalizedUserAnswer === normalizedCorrectAnswer 
      ? 'Correct!' 
      : `Incorrect! The correct answer is ${correctAnswer}`;
  }

  function newQuestion() {
    currentQuestion = generateQuestion();
    isSymbolic = Math.random() > 0.5;
    feedback = undefined;
    userAnswer = '';
  }

  onMount(() => {
    newQuestion();
    document.documentElement.classList.toggle('is-dark', isDarkMode);
    document.documentElement.classList.toggle('is-light', !isDarkMode);
  });
</script>

<main>
  <h1>Linux File Mode Practice</h1>
  <button on:click={toggleTheme} aria-label="Toggle dark mode" class="theme-toggle">
    {#if isDarkMode}
      <!-- Sun Icon for Light Mode -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM12 3a9 9 0 110 18 9 9 0 010-18zm-1.25-2.25h2.5v2.5h-2.5v-2.5zm0 19.5h2.5v2.5h-2.5v-2.5zm9-11.25h2.5v2.5h-2.5v-2.5zm-19.5 0h2.5v2.5h-2.5v-2.5zm15.363 10.086l1.768 1.768-1.768 1.768-1.768-1.768 1.768-1.768zm-13.086 0l1.768 1.768-1.768 1.768-1.768-1.768 1.768-1.768zm15.363-15.363l1.768 1.768-1.768 1.768-1.768-1.768 1.768-1.768zm-13.086 0l1.768 1.768-1.768 1.768-1.768-1.768 1.768-1.768z"/>
      </svg>
    {:else}
      <!-- Moon Icon for Dark Mode -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M21.75 12c0-5.385-4.365-9.75-9.75-9.75a9.687 9.687 0 00-4.35 1.037 9.75 9.75 0 1010.863 10.863c.681-1.351 1.037-2.851 1.037-4.35zM3 12c0-4.97 4.03-9 9-9 .387 0 .768.026 1.144.077a7.5 7.5 0 108.779 8.779c.051.376.077.757.077 1.144 0 4.97-4.03 9-9 9s-9-4.03-9-9z"/>
      </svg>
    {/if}
  </button>

  {#if currentQuestion}
  <div in:fade={{ duration: 300 }}>
    <p>
      {#if isSymbolic}
        Translate the following symbolic mode to numeric: <strong>{currentQuestion.symbolicMode}</strong>
      {:else}
        Translate the following numeric mode to symbolic: <strong>{currentQuestion.numericMode}</strong>
      {/if}
    </p>
  </div>
  {/if}

  <input bind:value={userAnswer} type="text" placeholder="Your answer...">
  <button on:click={checkAnswer}>Check Answer</button>
  <button on:click={newQuestion}>Next Question</button>

  {#if feedback}
  <p in:fade={{ duration: 300 }}>{feedback}</p>
  {/if}
</main>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    transition: background-color 0.3s, color 0.3s;
  }

  :global(.is-dark) {
    background-color: #121212;
    color: #eee;
  }

  :global(.is-dark input), 
  :global(.is-dark button) {
    background-color: #333;
    color: #eee;
    border: 1px solid #444;
  }

  :global(.is-dark button:hover) {
    background-color: #444;
  }

  :global(.is-light) {
    background-color: #d5bd8d;
    color: #333;
  }

  :global(.is-light input),
  :global(.is-light button) {
    background-color: #c8a96b;
    color: #333;
    border: 1px solid #b99d64;
    box-shadow: 0 0 5px #816c41;
  }

  main {
    text-align: center;
    margin-top: 50px;
  }

  input, button {
    padding: 8px;
    font-size: 16px;
    margin: 10px;
  }

  button {
    padding: 10px 20px;
    cursor: pointer;
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .theme-toggle svg {
    fill: currentColor;
  }
</style>
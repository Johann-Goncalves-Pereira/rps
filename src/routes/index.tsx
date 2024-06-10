import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Game from "~/components/game/game";

export default component$(() => {
  return (
    <>
      <section>
        <Game />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Rock, paper, scissor",
  meta: [
    {
      name: "description",
      content: "A page to play Rock, paper, scissor",
    },
  ],
};

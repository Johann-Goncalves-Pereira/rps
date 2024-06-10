import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <>
      <main class="grid place-items-center">
        <section
          class="grid place-items-center gap-8 py-12 text-center"
          aria-labelledby="title"
        >
          <h1 class="text-6xl" id="title">
            Play rock, paper, scissor
          </h1>
          <h2 class="text-5xl">Instructions</h2>
          <p class="text-3xl">
            You will play with computer the computer, when you place your hand
            the computer will play
          </p>
        </section>
        <hr />
        <Slot />
      </main>
    </>
  );
});

import { component$ } from "@builder.io/qwik";

export default component$(({ name, fn$ }: HandProps) => {
  return (
    <>
      <div
        class="relative grid place-content-center transition-transform hover:scale-110 active:brightness-150"
        aria-labelledby={`hand-${name}`}
      >
        <input
          class="absolute inset-0 cursor-pointer opacity-0"
          type="radio"
          name="name"
          onClick$={fn$}
        />
        <label class="p-4 text-9xl" id={`hand-${name}`}>
          {name === "rock" ? "✊" : name === "paper" ? "✋" : "✌️"}
        </label>
      </div>
    </>
  );
});

type HandProps = {
  name: string;
  fn$: any;
};

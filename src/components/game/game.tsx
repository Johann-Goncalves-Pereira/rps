import { component$, $, useStore } from "@builder.io/qwik";
import Hand from "./hand/hand";

export default component$(() => {
  const hands = ["rock", "paper", "scissor"];
  const store = useStore({
    playerHand: "",
    computerHand: "",
    result: "",
  });

  const computerHand = $(() => {
    const random = Math.floor(Math.random() * 3);
    store.computerHand = hands[random];
  });

  const getResult = $(() => {
    if (store.playerHand === store.computerHand) {
      store.result = "Draw";
    } else if (
      (store.playerHand === "rock" && store.computerHand === "scissor") ||
      (store.playerHand === "scissor" && store.computerHand === "paper") ||
      (store.playerHand === "paper" && store.computerHand === "rock")
    ) {
      store.result = "You win";
    } else {
      store.result = "Computer win";
    }
  });

  const emoji = (hand: string) => {
    return hand === "rock" ? "✊" : hand === "paper" ? "✋" : "✌️";
  };

  return (
    <>
      <form class="mx-auto flex w-fit flex-wrap items-center justify-center gap-8">
        {hands.map((hand, i) => (
          <Hand
            name={hand}
            fn$={$(() => {
              store.playerHand = hand;
              computerHand();
              getResult();
            })}
            key={i}
          />
        ))}
      </form>

      <div class="mt-24 grid place-items-center">
        <ul class="mx-auto flex w-fit flex-wrap items-center gap-8 text-5xl">
          <li class="mx-auto flex flex-col items-center gap-6 text-center sm:w-[13ch]">
            Your hand
            <p>{emoji(store.playerHand)}</p>
          </li>
          <li class="mx-auto flex flex-col items-center gap-6 text-center sm:w-[13ch]">
            Computer hand
            <p>{emoji(store.computerHand)}</p>
          </li>
        </ul>

        <p
          class={`text-5xl ${store.result === "You win" ? "text-green-500" : store.result === "Computer win" ? "text-red-500" : ""}`}
        >
          {store.result}
        </p>
      </div>
    </>
  );
});

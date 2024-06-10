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
      <form class="mx-auto flex w-fit gap-8">
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
        <ul class="grid grid-flow-col gap-8 text-5xl">
          <li class="flex w-[13ch] flex-col items-center gap-6">
            Your hand
            <p>{emoji(store.playerHand)}</p>
          </li>
          <li class="flex  w-[13ch] flex-col items-center gap-6">
            Computer hand
            <p>{emoji(store.computerHand)}</p>
          </li>
        </ul>

        <h3
          class={`text-5xl ${store.result === "You win" ? "text-green-500" : store.result === "Computer win" ? "text-red-500" : ""}`}
        >
          {store.result}
        </h3>
      </div>
    </>
  );
});

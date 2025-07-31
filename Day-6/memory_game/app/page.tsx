import { Board } from "./components/Board";

export default function Home() {
  return (
     <main className="flex flex-col gap-6 min-h-screen items-center justify-center p-4">
      <h1 className="font-bold text-3xl">Memory Game</h1>
      <Board/>
    </main>
  );
}

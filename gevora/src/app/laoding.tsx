export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fbf8f1]">
      <div className="flex flex-col items-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0e4d46]">
          <span className="text-2xl font-semibold text-white">G</span>
        </div>

        <h1 className="font-display text-2xl font-semibold text-[#0e4d46]">
          Gevora
        </h1>

        <div className="mt-5 h-1 w-32 overflow-hidden rounded-full bg-[#e5dfd2]">
          <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-[#0e4d46]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
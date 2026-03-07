export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-4">
      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black text-white font-bold text-sm">
            OE
          </div>
          <span className="font-caveat text-lg text-gray-500">orizzonti educativi</span>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Orizzonti Educativi. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}

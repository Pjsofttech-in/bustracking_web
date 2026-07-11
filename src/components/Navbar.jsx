export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold">

        Bus Tracking System

      </h2>

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

          A

        </div>

        <div>

          <h3 className="font-semibold">
            Administrator
          </h3>

        </div>

      </div>

    </header>
  );
}
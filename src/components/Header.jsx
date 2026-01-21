import logo from '../img/john-doe.jpg'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-3 py-2 sm:px-6 sm:py-4 bg-white border-b border-slate-200">
      {/* Left */}
      <div>
        <h1 className="sm:text-2xl text-lg font-semibold text-slate-800">
          Welcome back,
          <span className="ml-1 text-blue-600">John</span>
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-lg font-medium text-slate-700">
            John Doe
          </p>
        </div>

        <img
          src={logo}
          alt="John Doe profile"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500"
        />
      </div>
    </header>
  )
}

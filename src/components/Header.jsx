import logo from '../img/john-doe.jpg'

export default function Header() {
  return (
    <header className="relative px-4 py-4 sm:px-8 sm:py-6 bg-gradient-to-br from-blue-marguerite-600 via-blue-marguerite-500 to-blue-marguerite-700 shadow-lg overflow-hidden">

      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-marguerite-400 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-marguerite-800 rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative flex items-center justify-between">

        <div className="flex-1">
          <h1 className="text-xl sm:text-3xl font-bold text-white drop-shadow-sm">
            Welcome back,
          </h1>
          <p className="text-lg sm:text-2xl font-semibold text-blue-marguerite-100 mt-1">
            John
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-3 py-2 sm:px-4 sm:py-3 border border-white/20 shadow-xl">
          <div className="text-right hidden sm:block">
            <p className="text-base font-semibold text-white">
              John Doe
            </p>
            <p className="text-sm font-medium text-blue-marguerite-100">
              Administrator
            </p>
          </div>
          
          <div className="relative">
            <img
              src={logo}
              alt="John Doe profile"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-4 ring-white/30 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

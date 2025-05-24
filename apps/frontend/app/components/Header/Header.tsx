export function Header() {
  return (
    <header className="bg-red-500 text-white p-4 flex items-center justify-between shadow-md rounded-b-lg">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">PPOB</span>
      </div>
      <button className="bg-white text-red-500 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-200">
        Masuk
      </button>
    </header>
  );
}

export default Header;

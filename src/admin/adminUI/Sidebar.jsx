const Sidebar = ({ activeTab, setActiveTab }) => {
    
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-xl font-bold mb-6">Guess Admin</div>
      <nav>
        <ul>
          <li
            className={`p-2 rounded cursor-pointer mb-2 ${activeTab === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={`p-2 rounded cursor-pointer mb-2 ${activeTab === 'categories' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${activeTab === 'clothes' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            onClick={() => setActiveTab('clothes')}
          >
            Clothes
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
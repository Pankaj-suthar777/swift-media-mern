const ChatUserList = () => {
  return (
    <div>
      <div className="bg-white rounded-md overflow-hidden w-[300px]">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center py-4 px-6">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src="https://randomuser.me/api/portraits/women/72.jpg"
              alt="User avatar"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">Emily Jones</h3>
              <p className="text-gray-600 text-xs">1034 points</p>
            </div>
          </li>
          <li className="flex items-center py-4 px-6">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src="https://randomuser.me/api/portraits/men/40.jpg"
              alt="User avatar"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">David Lee</h3>
              <p className="text-gray-600 text-xs">987 points</p>
            </div>
          </li>
          <li className="flex items-center py-4 px-6">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src="https://randomuser.me/api/portraits/women/54.jpg"
              alt="User avatar"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                Sophia Williams
              </h3>
              <p className="text-gray-600 text-xs">876 points</p>
            </div>
          </li>
          <li className="flex items-center py-4 px-6">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src="https://randomuser.me/api/portraits/men/83.jpg"
              alt="User avatar"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                Michael Chen
              </h3>
              <p className="text-gray-600 text-xs">765 points</p>
            </div>
          </li>
          <li className="flex items-center py-4 px-6">
            <img
              className="w-10 h-10 rounded-full object-cover mr-4"
              src="https://randomuser.me/api/portraits/women/17.jpg"
              alt="User avatar"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">Mia Davis</h3>
              <p className="text-gray-600 text-xs">654 points</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatUserList;

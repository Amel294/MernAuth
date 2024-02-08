
function CustomTable({ username, email }) {
  return (
    <div className="relative px-10 pt-10 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {username}
            </th>
            <td className="px-6 py-4">
              {email}
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;

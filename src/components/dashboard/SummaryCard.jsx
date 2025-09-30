const SummaryCard = ({ icon, title, figure, color }) => {
  return (
    <div className="rounded flex bg-gray-800 shadow-md">
      <div className={`text-3xl flex justify-center items-center ${color} text-white px-4 py-4`}>
        {icon}
      </div>
      <div className="pl-4 py-4">
        <p className="text-lg font-semibold text-gray-200">{title}</p>
        <p className="text-xl font-bold text-white">{figure}</p>
      </div>
    </div>
  );
};

export default SummaryCard;

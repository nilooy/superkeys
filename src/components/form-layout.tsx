export const FormLayout = ({ title, actionItems, children }) => {
  return (
    <div className="w-full m-auto">
      <div className="card w-full bg-gray-900 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-between">
            {title}
            <div className="flex">{actionItems}</div>
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
};

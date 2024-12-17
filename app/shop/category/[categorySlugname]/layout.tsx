const CategoryLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="px-4 py-4">
      <div className="flex item-start w-full  justify-start">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CategoryLayout;

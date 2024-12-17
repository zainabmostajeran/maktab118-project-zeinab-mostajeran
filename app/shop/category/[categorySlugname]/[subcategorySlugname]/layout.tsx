const SubcategoryLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <div>
      <div className="flex item-start w-full justify-start">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default SubcategoryLayout;

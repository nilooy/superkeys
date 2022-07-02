import { ComponentChildren, FunctionComponent } from "preact";

interface IFormLayout {
  title: string | ComponentChildren;
  actionItems: ComponentChildren;
  children: ComponentChildren;
  className?: string;
}

export const FormLayout: FunctionComponent<IFormLayout> = ({
  title,
  actionItems,
  children,
  className = "",
}) => {
  return (
    <div className={`w-full m-auto ${className}`}>
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

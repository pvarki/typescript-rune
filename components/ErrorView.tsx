import { ReactNode } from "react";

interface ErrorViewProps {
  readonly title: string;
  readonly message?: string | ReactNode;
  readonly children?: ReactNode;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ title, message, children }) => {
  return (
    <div className="error-container flex flex-col items-center justify-center mx-2 md:px-[20%] lg:px-[32%]">
      <div className="flex flex-col items-center justify-center rounded-lg w-full max-w-full mb-5 overflow-hidden">
        <div className="flex flex-col items-center justify-center rounded-lg w-full max-w-full mb-5 overflow-hidden">
          <h3 className="text-xl font-bold mt-1 mb-1">{title}</h3>
          {message ? (
            <p className="text-center ml-2 mr-2">{message}</p>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
};

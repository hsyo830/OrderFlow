import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-full px-5 lg:w-250 lg:px-10 xl:w-314">{children}</div>;
};

export default Container;

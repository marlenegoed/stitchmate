import { ReactElement, FC, ReactNode } from "react";
 
// define interface to represent component props
interface Props {
  children: ReactNode;
}
 
const ReminderLayout: FC<Props> = ({ children }): ReactElement => {
  return <>{children}</>;
};
 
export default ReminderLayout;

import { ReactElement, FC, ReactNode } from "react";
interface Props {
  children: ReactNode;
}
 
const ReminderLayout: FC<Props> = ({ children }): ReactElement => {
  return <>{children}</>;
};
 
export default ReminderLayout;


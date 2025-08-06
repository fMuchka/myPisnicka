import type { ListOfControls } from './enums';

export type SideBarProps = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ControlProps = {
  expandedControl: ListOfControls | null;
  setExpandedControl: (newState: ListOfControls | null) => void;
};

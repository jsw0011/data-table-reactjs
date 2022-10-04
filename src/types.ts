export interface Actions {
  key: string;
  label?: string;
  handler: Function;
  className?: string;
  enabled?: ActionEnabled; // function accepts item data
}


export type ActionEnabled = (item: ListItem) => boolean

export interface IndividualActionsProps {
  individualActions?: Array<IndividualActions>;
  obj: ListItem;
  tableCellClass?: string;
  index: number;
}

export interface IndividualActions {
  key: string;
  enabled?: ActionEnabled; // function accepts item data
  label?: string;
  handler: Function;
  className?: string;
}
export interface Column {
  name: string;
  selector: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  omit?: boolean;
}
export interface ListItem {
  [key: string]: any;
}

export interface sortByInterface { name: string; type: string }

export default interface Props {
  columns: Array<Column>;
  list: Array<ListItem>;
  actions?: Array<Actions>;
  individualActions?: Array<IndividualActions>;
  title?: string;
  pagination?: boolean;
  containerClass?: string;
  titleContainerClass?: string;
  titleClass?: string;
  downloadDropDownContainerClass?: string;
  downloadDropDownClass?: string;
  tableClass?: string;
  tableWrapperClass?: string;
  headerRowClass?: string;
  headerCellClass?: string;
  headerIconContainerClass?: string;
  filterInputContainerClass?: string;
  filterInputFieldClass?: string;
  filterInputCrossClass?: string;
  tableBodyClassName?: string;
  tableRowClass?: string;
  tableCellClass?: string;
  actionsClass?: string;
  tableFooterClass?: string;
  pageSizeDropDownContainerClass?: string;
  pageSizeDropDownClass?: string;
  pageNumberContainerClass?: string;
  pageNumberCellClass?: string;
  activePageCellClass?: string;
  showSerialNumber?: boolean;
  showDownloadOption?: boolean;
  showPageStats?: boolean;
  sortBy?: sortByInterface;
  filterBy?: ListItem;
}

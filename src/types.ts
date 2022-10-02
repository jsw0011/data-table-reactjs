export interface Actions {
  key: string;
  label?: string;
  handler: Function;
  className?: string;
  enabled?: ActionEnabled; // function accepts item ID if itemIDselector is passed
}


export type ActionEnabled = (itemID: any) => boolean

export interface IndividualActionsProps {
  individualActions?: Array<IndividualActions>;
  obj: ListItem;
  tableCellClass?: string;
  itemIDselector?: string;
  index: number;
}

export interface IndividualActions {
  key: string;
  enabled?: ActionEnabled; // function accepts item ID if itemIDselector is passed
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
  tableWapperClass?: string;
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
  itemIDselector?: string
}

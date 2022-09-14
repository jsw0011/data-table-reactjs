export interface Actions {
  key: string;
  label?: string;
  handler: Function;
  className?: string;
}
export interface IndividualActions {
  key: string;
  list: Array<ListItem>
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
}

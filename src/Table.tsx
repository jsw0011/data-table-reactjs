/* eslint-disable jsx-a11y/alt-text */
import React, { ChangeEvent, useEffect, useState } from "react";
import Props, { Actions, IndividualActions, IndividualActionsProps, ListItem } from "./types";
import "./table.css";
import { funnelIcon, sortUpIcon, sortDownIcon } from "./icon";
import { export2File, filterList, sortList } from "./tabel.helper";

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import _ from "lodash";

const MenuIcon = () => (
  <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
    fill="currentColor"
  />
  <path
    d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
    fill="currentColor"
  />
  <path
    d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
    fill="currentColor"
  />
</svg>
)

const IndividualActionsComp: React.FunctionComponent<IndividualActionsProps> = (props) => {
  // const [displayActions, setDisplayActions] = useState(false);

  return (
      <div className={"react-data-table-individual-action"}>
      
      {!!props.individualActions?.length &&
      <Menu 
        menuButton={<MenuButton 
        className="react-data-table-menu-button btn btn-link"
        ><MenuIcon />
        </MenuButton>} 
      transition
      >     
            {props.individualActions?.map((individualAction, i) => (
                    <MenuItem
                    className="list-wrap-individual-action"
                    key={i+"event"}
                    onClick={() => individualAction.handler(props.index, props.obj)}
                    >
                      {individualAction.label}
                    </MenuItem>
            ))}
          </Menu>}
      </div>
  )
}

const enabledActionsList = (obj: ListItem, actions?: Array<Actions|IndividualActions>, itemIDselector?: string) => actions ? actions
.map(e => e.enabled === undefined ? true : (
  e.enabled(itemIDselector ? obj[itemIDselector] : null
    )
  )
) 
: []




const Table: React.FunctionComponent<Props> = (props) => {
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState([...props.list]);
  const [listToDisplay, setListToDispaly] = useState([...list]);
  const [sortBy, setSortBy] = useState<{ name: string; type: string }>({
    name: "",
    type: "",
  });
  const [filterBy, setFilterBy] = useState<{ [key: string]: string }>({});
  const [totalEntry, setTotalEntry] = useState(list.length);
  const [totalPageNumber, setTotalPageNumber] = useState(Math.ceil(totalEntry / pageSize));
  const handleDownload = (e: ChangeEvent<HTMLSelectElement>) => {
    export2File(props.columns, list, e.target.value);
  };
  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setTotalPageNumber(Math.ceil(totalEntry / Number(e.target.value)));
    setPageNumber(1);
  };

  const handleSortBy = (key: string) => {
    const updatedList = sortList(list, key, sortBy.type === "asc" ? "dsc" : "asc");
    setList([...updatedList]);
    setSortBy({ name: key, type: sortBy.type === "asc" ? "dsc" : "asc" });
    setPageNumber(1);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterVlue = e.target.value;
    const filerName = e.target.name;
    getFilteredList(filterVlue, filerName);
  };

  const getFilteredList = (filterVlue: string, filerName: string) => {
    let currentFilters = { ...filterBy };
    let listToFilter = filterBy[filerName].length > filterVlue.length ? [...props.list] : list;
    if (!filterVlue) {
      currentFilters[filerName] = "";
      listToFilter = props.list;
    } else {
      currentFilters[filerName] = filterVlue;
    }
    setFilterBy(currentFilters);
    const updatedList = filterList(listToFilter, currentFilters, sortBy);
    setList(updatedList);
    setPageNumber(1);
  };

  const setListInState = (newList: Array<ListItem>) => {
    if (newList.length !== totalEntry) {
      setTotalEntry(newList.length);
      setTotalPageNumber(Math.ceil(newList.length / pageSize));
    }
    setListToDispaly(props.pagination ? newList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize) : newList);
  };

  useEffect(() => {
    // check for changes in input props 
    if (!_.isEqual(props.list, list)) { // TODO: optimize comparison
      setList([...props.list])
    }
  },[props.list]
  )

  useEffect(() => {
    const currentList = [...list];
    setListInState(currentList);
    
  }, [pageNumber, pageSize, list]);

  let startPage = 1;


  return (
    <div className={`react-data-table-component-container ${props.containerClass || ""}`}>
      {(props.showDownloadOption || props.title) && (
        <div className={`react-data-table-title-container ${props.titleContainerClass || ""}`}>
          <div className={`react-data-table-title ${props.titleClass || ""}`}>{props.title ? props.title : ""}</div>
          <div className={`react-data-table-download-dropdown-container ${props.downloadDropDownContainerClass || ""}`}>
            {props.showDownloadOption && (
              <>
                <label className="react-data-table-download-lable" htmlFor="downloadOpt">
                  Export data:
                </label>
                <select
                  className={`react-data-table-download-dropdown ${props.downloadDropDownClass || ""}`}
                  id="downloadOpt"
                  onChange={handleDownload}
                >
                  <option value=""> Select an option </option>
                  <option value=".txt">.txt</option>
                  <option value=".csv">.csv</option>
                </select>
              </>
            )}
          </div>
        </div>
      )}
      <div className={`react-data-table-wrapper ${props.tableWapperClass || ""}`}>
        <table className={`react-data-table ${props.tableClass || ""}`}>
          <thead>
            <tr className={`react-data-table-header ${props.headerRowClass || ""}`}>
              {props.showSerialNumber && (
                <th
                  className={`react-data-table-header-cell ${props.headerCellClass || ""}`}
                  style={{ width: "50px", maxWidth: "50px", minWidth: "50px" }}
                >
                  S.No.
                </th>
              )}
              {props.columns.filter((i)=>!i.omit).map((item, index) => (
                <th
                  key={index}
                  className={`react-data-table-header-cell ${props.headerCellClass || ""}`}
                  style={item.width ? { width: item.width, maxWidth: item.width, minWidth: item.width } : {}}
                >
                  <span>{item.name}</span>
                  <div className={`react-data-table-header-icon ${props.headerIconContainerClass || ""}`}>
                    {item.sortable && (
                      <div className="react-data-table-sort-icon-container">
                        <img
                          src={sortUpIcon}
                          width="12px"
                          height="12px"
                          onClick={() => handleSortBy(item.selector)}
                          style={{
                            opacity: sortBy.name === item.selector && sortBy.type === "asc" ? 1 : 0.5,
                            marginBottom: "-3px",
                          }}
                        />
                        <img
                          src={sortDownIcon}
                          width="12px"
                          height="12px"
                          onClick={() => handleSortBy(item.selector)}
                          style={{
                            opacity: sortBy.name === item.selector && sortBy.type === "dsc" ? 1 : 0.5,
                          }}
                        />
                      </div>
                    )}
                    {item.filterable && (
                      <img
                        src={funnelIcon}
                        width="12px"
                        height="12px"
                        style={{
                          opacity: !filterBy.hasOwnProperty(item.selector) ? 0.5 : 1,
                        }}
                        onClick={() => {
                          const temp = { ...filterBy };
                          if (temp.hasOwnProperty(item.selector)) {
                            delete temp[item.selector];
                          } else {
                            temp[item.selector] = "";
                          }
                          filterBy[item.selector] && getFilteredList("", item.selector);
                          setFilterBy(temp);
                        }}
                      />
                    )}
                  </div>
                  {filterBy.hasOwnProperty(item.selector) && (
                    <div className={`react-data-table-filter-input-container ${props.filterInputContainerClass || ""}`}>
                      <input
                        value={filterBy[item.selector]}
                        name={item.selector}
                        placeholder="filter column"
                        onChange={handleFilterChange}
                        className={`react-data-table-filter-input-field ${props.filterInputFieldClass || ""}`}
                      />
                      <span
                        onClick={() => getFilteredList("", item.selector)}
                        className={`react-data-table-filter-input-clear ${filterBy[item.selector] ? "active-clear" : ""}
                        ${props.filterInputCrossClass || ""}`}
                      >
                        clear
                      </span>
                    </div>
                  )}
                </th>
              ))}
              {(!!props.actions?.length || !!props.individualActions?.length) && (
                <th className={`react-data-table-header-cell ${props.headerCellClass || ""}`}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody className={`react-data-table-body ${props.tableBodyClassName || ""}`}>
            {listToDisplay.map((obj, index) => {
            // prepare actions list
            const enabledActionsBool = enabledActionsList(obj, props.actions, props.itemIDselector)
            const allowedActions = props.actions?.filter((v,i)=> enabledActionsBool[i])
            // prepare individualActions list
            const enabledIndivActionsBool = enabledActionsList(obj, props.individualActions, props.itemIDselector)
            const allowedIndivActions = props.individualActions?.filter((v,i)=> enabledIndivActionsBool[i])

            return (
              <tr key={index} className={`react-data-table-row ${props.tableRowClass || ""}`}>
                {props.showSerialNumber && (
                  <td className={`react-data-table-cell ${props.tableCellClass || ""}`} style={{ width: "50px" }}>
                    {pageNumber > 1 ? (pageNumber - 1) * pageSize + index + 1 : index + 1}
                  </td>
                )}
                {props.columns.filter((i)=>!i.omit).map((item) => (
                  <td
                    className={`react-data-table-cell ${props.tableCellClass || ""}`}
                    key={item.selector + index}
                    style={item.width ? { width: item.width } : {}}
                  >
                    {obj[item.selector]}
                  </td>
                ))}
                  <td className={`react-data-table-action-cell react-data-table-cell ${(!(!!allowedActions?.length || !!allowedIndivActions?.length)) ? "no-action" : ""} ${props.tableCellClass || ""}`}>
                  {(!!allowedActions?.length || !!allowedIndivActions?.length) && (
                    <div className="react-data-table-actions-wrap" >
                      {allowedActions && allowedActions.map((item) => (
                        <div className="react-data-table-action" >
                          <button
                            onClick={() => item.handler(index, obj)}
                            key={item.key}
                            role="button"
                            className={`c-pointer action-button ${item.className || ""} ${props.actionsClass || ""}`}
                          >
                            {item.label}
                          </button>
                        </div>
                      ))}
                      <IndividualActionsComp 
                      obj={obj} // items
                      index={index} 
                      individualActions={allowedIndivActions} 
                      tableCellClass={props.tableCellClass}
                      />
                      </div>
                  )}
                </td>
              </tr>
            )}
            )}
          </tbody>
        </table>
      </div>
      {props.pagination && (
        <div className={`react-data-table-footer ${props.tableFooterClass || ""}`}>
          <div className="react-data-table-footer-info">
            {props.showPageStats && (
            <>
              <h4>Total Entries: {totalEntry}</h4>
              <h4>Total pages: {totalPageNumber}</h4>
            </>
            )}
          </div>
          <div className="react-data-table-footer-link-section">
            <div className={`${props.pageSizeDropDownContainerClass || ""}`}>
              <label htmlFor="pazeSizeOpt">Page size:</label>
              <select
                value={pageSize}
                id="pazeSizeOpt"
                onChange={handlePageSizeChange}
                className={`react-data-table-page-size-dropdown ${props.pageSizeDropDownClass || ""}`}
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className={`react-data-table-footer-link-container ${props.pageNumberContainerClass || ""}`}>
              <span
                className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass || ""}`}
                onClick={() => setPageNumber(1)}
              >
                Start
              </span>
              <span
                className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass || ""}`}
                onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
              >
                Prev
              </span>

              {Array(totalPageNumber)
                .fill(0)
                .map((_, i) => {
                  return (
                    <span
                      className={`react-data-table-footer-link c-pointer ${
                        startPage + i === pageNumber ? `active ${props.activePageCellClass || ""}` : ""
                      }  ${props.pageNumberCellClass || ""}`}
                      onClick={() => setPageNumber(startPage + i)}
                      key={i}
                    >
                      {startPage + i}
                    </span>
                  );
                })}
              <span
                className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass || ""}`}
                onClick={() => pageNumber < totalPageNumber && setPageNumber(pageNumber + 1)}
              >
                Next
              </span>
              <span
                className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass || ""}`}
                onClick={() => setPageNumber(totalPageNumber)}
              >
                Last
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;

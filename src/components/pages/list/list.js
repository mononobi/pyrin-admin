import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MaterialTable from 'material-table';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { getFindMetadata } from '../../../services/metadata';
import { deleteAll, deleteBulk, find } from '../../../services/data';
import { getCreatePage, getListPage, getUpdatePage } from '../../../services/url';
import { BaseComplexPage } from '../base/base';
import { AlertSeverityEnum, ListFieldTypeEnum, TargetEnum } from '../../../core/enumerations';
import { QUERY_STRING } from '../../../core/query_string';
import { getGlobalState, STATE_KEY_HOLDER } from '../../../core/state';
import { formatDate, formatDateTime, formatTime } from '../../../core/datetime';
import './list.css';


const setCheckedRowColor = (data, index, level) => {
    return { backgroundColor: data.tableData.checked ? 'rgba(185,215,232,0.44)' : '' };
}

export class ListComponent extends BaseComplexPage {

    LINK_COLOR = '#12558d';
    TABLE_REF = React.createRef();

    _rowClicked = (event, rowData, toggleDetailPanel) => {
        if (this._isForSelect()) {
            this.props.setSelectedFK(rowData[this.state.metadata.configs.hidden_pk_name]);
        }
    }

    _fetchMetadata()
    {
        return getFindMetadata(this._getInitialRegisterName());
    }

    _componentDidMount() {
        if (!this._isForSelect()) {
            let query = QUERY_STRING.parse(this.props.location.search);
            if (query && query[STATE_KEY_HOLDER]) {
                let message = getGlobalState(query[STATE_KEY_HOLDER]);
                if (message) {
                    this._setToastNotification(message, AlertSeverityEnum.SUCCESS);
                }
            }

            if (query[STATE_KEY_HOLDER] !== undefined) {
                let currentURL = `${this.props.location.pathname}${this.props.location.search}`;
                let originalURL = QUERY_STRING.exclude(currentURL, [STATE_KEY_HOLDER]);
                this.props.history.replace(originalURL, currentURL);
            }
        }
    }

    _renderPK(info, metadata) {
        info.cellStyle = {
            fontWeight: 'bold',
            color: this.LINK_COLOR
        }

        if (metadata.link_pk && !this._isForSelect()) {
            info.render = rowData => {
                let value = rowData[info.field];
                if (info.lookup) {
                    value = info.lookup[value];
                }
                return (
                    <Link component='a' underline='hover' className='link'
                          onClick={() => {
                              this.props.history.push(getUpdatePage(info.pk_register_name, rowData[info.field]));
                          }}>
                        {value}
                    </Link>
                )
            };
        }
    }

    _renderFK(info, metadata) {
        info.cellStyle = {
            color: this.LINK_COLOR
        }

        if (metadata.link_fk && !this._isForSelect()) {
            info.render = rowData => {
                let value = rowData[info.field];
                if (info.lookup) {
                    value = info.lookup[value]
                }
                return (
                    <Link component='a' underline='hover' className='link'
                          onClick={() => {
                              this.props.history.push(getUpdatePage(info.fk_register_name, rowData[info.field]));
                          }}>
                        {value}
                    </Link>
                )
            };
        }
    }

    _renderBoolean(info, metadata) {
        info.render = rowData => {
            let checked = rowData[info.field];
            if (checked) {
                return <CheckCircleIcon color='action' fontSize='small'/>;
            }
            else {
                return <CancelIcon color='disabled' fontSize='small'/>;
            }
        };
    }

    _renderDateTime(info, metadata) {
        info.render = rowData => {
            let value = rowData[info.field];
            return formatDateTime(value, metadata.datetime_format, metadata.locale);
        };
    }

    _renderDate(info, metadata) {
        info.render = rowData => {
            let value = rowData[info.field];
            return formatDate(value, metadata.date_format, metadata.locale);
        };
    }

    _renderTime(info, metadata) {
        info.render = rowData => {
            let value = rowData[info.field];
            return formatTime(value, metadata.time_format, metadata.locale);
        };
    }

    _renderLink(info, metadata) {
        info.render = rowData => {
            let data = rowData[info.field];
            let url = getListPage(data.register_name, null, data.filters);
            if (data.type === 'link') {
                return (
                    <Link component='a' underline='hover' className='link'
                          target={data.new_tab ? TargetEnum.NEW_TAB : TargetEnum.SAME_TAB} href={url}>
                        {data.title}
                    </Link>
                );
            }
            else {
                return (
                    <Button variant={data.button_type} color='default' type='button' size='small'
                            onClick={() => {
                                window.open(url, data.new_tab ? TargetEnum.NEW_TAB : TargetEnum.SAME_TAB);
                            }}>
                        {data.title}
                    </Button>
                );
            }
        };
    }

    _prepareMetadata(metadata) {
        for (let i = 0; i < metadata.datasource_info.length; i++) {
            let info = metadata.datasource_info[i];
            if (!info.hidden) {
                if (info.is_pk) {
                    this._renderPK(info, metadata);
                }
                else if (info.is_fk) {
                    this._renderFK(info, metadata);
                }
                else if (info.type === ListFieldTypeEnum.BOOLEAN) {
                    this._renderBoolean(info, metadata);
                }
                else if (info.type === ListFieldTypeEnum.DATETIME) {
                    this._renderDateTime(info, metadata);
                }
                else if (info.type === ListFieldTypeEnum.DATE) {
                    this._renderDate(info, metadata);
                }
                else if (info.type === ListFieldTypeEnum.TIME) {
                    this._renderTime(info, metadata);
                }
                else if (info.is_link) {
                    this._renderLink(info, metadata);
                }
            }
        }
    }

    _finalRender() {
        return (
            <MaterialTable
                tableRef={this.TABLE_REF}
                options={
                    {
                        debounceInterval: this.state.metadata.search_debounce_interval,
                        search: this.state.metadata.search,
                        searchAutoFocus: this.state.metadata.search,
                        grouping: this.state.metadata.grouping && !this._isForSelect(),
                        columnsButton: (this.state.metadata.column_selection ||
                            this.state.metadata.enable_export) && !this._isForSelect(),
                        exportButton: this.state.metadata.enable_export && !this._isForSelect(),
                        padding: this.state.metadata.table_type,
                        headerSelectionProps: {size: this.state.metadata.table_type === 'default' ? 'medium': 'small'},
                        paging: this.state.metadata.paged,
                        pageSize: this.state.metadata.page_size,
                        pageSizeOptions: this.state.metadata.page_size_options,
                        paginationType: this.state.metadata.pagination_type,
                        paginationPosition: this.state.metadata.pagination_position,
                        draggable: this.state.metadata.column_ordering && !this._isForSelect(),
                        selection: this.state.metadata.has_remove_permission && !this._isForSelect(),
                        emptyRowsWhenPaging: false,
                        rowStyle: setCheckedRowColor
                    }
                }
                title={this._getPluralName()}
                columns={this.state.metadata.datasource_info}
                onRowClick={this._isForSelect() ? this._rowClicked : undefined}
                data={query =>
                    new Promise((resolve, reject) => {
                        let filters = {};
                        if (!this._isForSelect()) {
                            filters = QUERY_STRING.parse(this.props.location.search);
                        }
                        let response = find(this._getRegisterName(), query.page + 1,
                            query.pageSize, query.orderBy, query.orderDirection, query.search, filters);

                        response.then(([json, ok]) => {
                            if (!ok) {
                                this._setToastNotification(json.message || 'Data Fetch Error',
                                    AlertSeverityEnum.ERROR)
                                resolve({
                                    data: [],
                                    page: 0,
                                    totalCount: 0
                                });
                            }
                            else {
                                resolve({
                                    data: json.results,
                                    page: query.page,
                                    totalCount: json.count_total
                                });
                            }
                        })
                    })
                }
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: event => {
                            if (this.TABLE_REF && this.TABLE_REF.current &&
                                this.TABLE_REF.current.state) {
                                this.TABLE_REF.current.onQueryChange(this.TABLE_REF.current.state.query);
                            }
                        }
                    },
                    {
                        icon: 'add',
                        tooltip: `Add ${this._getName()}`,
                        position: 'toolbar',
                        hidden: !this.state.metadata.has_create_permission,
                        isFreeAction: true,
                        onClick: event => {
                            if (!this._isForSelect()) {
                                this.props.history.push(getCreatePage(this._getRegisterName()));
                            }
                            else {
                                this.props.openFKCreateDialog();
                            }
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: `Delete All ${this._getPluralName()}`,
                        position: 'toolbar',
                        hidden: !this.state.metadata.has_remove_all_permission || this._isForSelect(),
                        isFreeAction: true,
                        onClick: event => {
                            this._setConfirmDeleteDialog(`Delete all ${this._getPluralName()}?`,
                                () => {
                                let result = deleteAll(this._getRegisterName());
                                result.then(([json, ok]) => {
                                    if (ok) {
                                        if (this.TABLE_REF && this.TABLE_REF.current &&
                                            this.TABLE_REF.current.state) {
                                            this.TABLE_REF.current.onQueryChange(
                                                this.TABLE_REF.current.state.query);
                                        }
                                        this._setToastNotification(
                                            `All ${this._getPluralName()} have been deleted successfully.`,
                                            AlertSeverityEnum.SUCCESS);
                                    }
                                    else {
                                        this._setToastNotification(json, AlertSeverityEnum.ERROR);
                                    }
                                });
                            });
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: `Delete Selected ${this._getPluralName()}`,
                        position: 'toolbarOnSelect',
                        hidden: !this.state.metadata.has_remove_permission || this._isForSelect(),
                        onClick: (event, rowData) => {
                            let count = rowData.length;
                            let name = count > 1 ? this._getPluralName(): this._getName();
                            this._setConfirmDeleteDialog(`Delete ${count} selected ${name}?`,
                                () => {
                                let pk = [];
                                for (let i=0; i < rowData.length; i++) {
                                    pk.push(rowData[i][this.state.metadata.configs.hidden_pk_name]);
                                }
                                let result = deleteBulk(this._getRegisterName(), pk);
                                result.then(([json, ok]) => {
                                    if (ok) {
                                        if (this.TABLE_REF && this.TABLE_REF.current &&
                                            this.TABLE_REF.current.state) {
                                            this.TABLE_REF.current.onQueryChange(
                                                this.TABLE_REF.current.state.query);
                                        }
                                        let message = count > 1 ? `${count} ${name} have`: `${count} ${name} has`;
                                        this._setToastNotification(
                                            `${message} been deleted successfully.`, AlertSeverityEnum.SUCCESS);
                                    }
                                    else {
                                        this._setToastNotification(json, AlertSeverityEnum.ERROR);
                                    }
                                });
                            });
                        }
                    },
                    {
                        icon: 'edit',
                        iconProps: {fontSize: 'inherit', color: 'action'},
                        tooltip: `View ${this._getName()}`,
                        position: 'row',
                        hidden: !this.state.metadata.has_get_permission || this._isForSelect(),
                        onClick: (event, rowData) => {
                            let url = getUpdatePage(this._getRegisterName(),
                                rowData[this.state.metadata.configs.hidden_pk_name]);
                            this.props.history.push(url);
                        }
                    }
                ]}
                localization={{
                    header: {
                        actions: ''
                    },
                    toolbar: {
                        nRowsSelected: count => {
                            return count > 1 ? `${count} rows selected`: `${count} row selected`;
                        }
                    }
                }}
            />
        )
    }
}

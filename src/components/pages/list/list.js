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
import { getGlobalState, STATE_KEY_HOLDER } from '../../../core/state';
import { formatDate, formatDateTime, formatTime } from '../../../core/datetime';
import { JSTypeEnum } from '../../../validators/enumerations';
import { isJSONSerializable, popKey } from '../../../core/helpers';
import { getMaxHeight } from '../../../core/window';
import { getOrdering } from '../../../core/ordering';
import { addOrderingQueryParam, addQueryParams, getPageKey,
    QUERY_STRING, removeOrderingQueryParam
} from '../../../core/query_string';
import './list.css';


const setCheckedRowColor = (data, index, level) => {
    return { backgroundColor: data.tableData.checked ? 'rgba(185,215,232,0.44)' : '' };
}

export class ListComponent extends BaseComplexPage {

    LINK_COLOR = '#12558d';
    TABLE_REF = React.createRef();

    state = {
        isInitial: true,
        orderByField: null,
        orderDirection: null,
        currentPage: null,
        maxBodyHeight: null
    }

    _rowClicked = (event, rowData, toggleDetailPanel) => {
        if (this._isForSelect()) {
            this.props.setSelectedFK(rowData[this.state.metadata.configs.hidden_pk_name]);
        }
    }

    _isTableStateValid() {
        return !!(this.TABLE_REF && this.TABLE_REF.current &&
            this.TABLE_REF.current.state);
    }

    _fetchMetadata()
    {
        return getFindMetadata(this._getInitialRegisterName());
    }

    _componentDidMount() {
        if (!this._isForSelect()) {
            let query = this._getQueryParams();
            if (query && query[STATE_KEY_HOLDER]) {
                let message = getGlobalState(query[STATE_KEY_HOLDER]);
                if (message) {
                    this._setToastNotification(message, AlertSeverityEnum.SUCCESS);
                }
            }

            if (query[STATE_KEY_HOLDER] !== undefined) {
                let currentURL = this._getCurrentURL();
                let originalURL = QUERY_STRING.exclude(currentURL, [STATE_KEY_HOLDER]);
                this.props.history.replace(originalURL, currentURL);
            }
        }

        this.setState({
            maxBodyHeight: this._getMaxBodyHeight()
        });
    }

    _getBoolean(checked) {
        if (checked) {
            return <CheckCircleIcon color='action' fontSize='small'/>;
        }
        else {
            return <CancelIcon color='disabled' fontSize='small'/>;
        }
    }

    _getJSON(value) {
        try {
            return JSON.stringify(value, null, ' ');
        }
        catch (error) {
            return value;
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
                );
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
                let url = getUpdatePage(info.fk_register_name, rowData[info.field]);
                return (
                    <Link component='a' underline='hover' href={url} target={TargetEnum.NEW_TAB}>
                        {value}
                    </Link>
                );
            };
        }
    }

    _renderBoolean(info, metadata) {
        info.render = rowData => {
            let checked = rowData[info.field];
            return this._getBoolean(checked);
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
        if (this._isForSelect()) {
            info.hidden = true;
        }
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
                    <Button variant={data.button_type} color='default' type='button'
                            size='small' className='link-button'
                            onClick={() => {
                                window.open(url, data.new_tab ? TargetEnum.NEW_TAB : TargetEnum.SAME_TAB);
                            }}>
                        {data.title}
                    </Button>
                );
            }
        };
    }

    _renderJSON(info, metadata) {
        info.type = ListFieldTypeEnum.STRING;
        info.render = rowData => {
            let value = rowData[info.field];
            return this._getJSON(value);
        };
    }

    _renderUnknown(info, metadata) {
        info.render = rowData => {
            let value = rowData[info.field];
            if (typeof value === JSTypeEnum.BOOLEAN) {
                return this._getBoolean(value);
            }
            if (isJSONSerializable(value)) {
                return this._getJSON(value);
            }
            return value;
        };
    }

    _getMaxBodyHeight() {
        return getMaxHeight(0.14, 0.211, this._isForSelect());
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
                else if (info.type === ListFieldTypeEnum.OBJECT) {
                    this._renderJSON(info, metadata);
                }
                else {
                    this._renderUnknown(info, metadata);
                }
            }
        }
    }

    _isOrderByChanged(query) {
        if ((Boolean(query.orderBy) && !Boolean(this.state.orderByField)) ||
            (!Boolean(query.orderBy) && Boolean(this.state.orderByField))) {
            return  true;
        }
        else if (Boolean(query.orderBy) && Boolean(this.state.orderByField)) {
            if (query.orderBy.field !== this.state.orderByField ||
                query.orderDirection !== this.state.orderDirection) {
                return true;
            }
        }
        return false;
    }

    _finalRender() {
        return (
            <MaterialTable
                tableRef={this.TABLE_REF}
                options={
                    {
                        maxBodyHeight: this.state.metadata.max_body_height || this.state.maxBodyHeight,
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
                onOrderChange={(orderBy, orderDirection) => {
                    let currentURL = this._getCurrentURL();
                    if (orderBy >= 0) {
                        let fieldInfo = this.state.metadata.datasource_info[orderBy];
                        let name = getOrdering(fieldInfo.field, orderDirection);
                        let originalURL = addOrderingQueryParam(currentURL, name);
                        this.props.history.replace(originalURL, currentURL);
                    }
                    else {
                        let newURL = removeOrderingQueryParam(currentURL);
                        this.props.history.replace(newURL, currentURL);
                    }
                }}
                data={query =>
                    new Promise((resolve, reject) => {
                        let filters = {};
                        let page = null;
                        let isOrderByChanged = this._isOrderByChanged(query);
                        if (!this._isForSelect()) {
                            filters = QUERY_STRING.parse(this.props.location.search);
                            let pageKey = getPageKey(this.state.metadata.configs);
                            page = popKey(pageKey, filters, null);
                            page = parseInt(page, 10);
                            page = isNaN(page) ? null : page;
                            if (page !== null && page < 1) {
                                page = 1;
                            }

                            if (!page || this.state.isInitial) {
                                page = page || 1;
                                filters[pageKey] = page;
                                let currentURL = this._getCurrentURL();
                                let originalURL = addQueryParams(currentURL, filters);
                                this.state.isInitial = false;
                                this.props.history.replace(originalURL, currentURL);
                            }
                            else if (!isOrderByChanged) {
                                // we should go to the next or previous page.
                                if (query.page === page) {
                                    page = page + 1;
                                }
                                // we should jump to the destination page, normally the end or first pages.
                                else if (query.page !== page - 1) {
                                    page = query.page + 1;
                                }
                                filters[pageKey] = page;
                                let currentURL = this._getCurrentURL();
                                let originalURL = addQueryParams(currentURL, filters);
                                this.props.history.replace(originalURL, currentURL);
                            }
                            query.page = page - 1;
                        }
                        else {
                            if (!isOrderByChanged) {
                                page = query.page + 1;
                                this.state.currentPage = page;
                            }
                            else {
                                page = this.state.currentPage;
                                query.page = page - 1;
                            }
                        }

                        if (isOrderByChanged) {
                            if (!Boolean(query.orderBy)) {
                                this.state.orderByField = null;
                                this.state.orderDirection = null;
                            }
                            else {
                                this.state.orderByField = query.orderBy.field;
                                this.state.orderDirection = query.orderDirection;
                            }
                        }

                        let response = find(this._getRegisterName(), page,
                            query.pageSize, query.orderBy, query.orderDirection,
                            query.search, filters);

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
                                let totalPageCount = Math.ceil(json.count_total / query.pageSize);
                                if (page > totalPageCount) {
                                    resolve({
                                        data: [],
                                        page: 0,
                                        totalCount: json.count_total
                                    });
                                }
                                else {
                                    resolve({
                                        data: json.results,
                                        page: query.page,
                                        totalCount: json.count_total
                                    });
                                }
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
                            if (this._isTableStateValid()) {
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
                                        if (this._isTableStateValid()) {
                                            this.TABLE_REF.current.onQueryChange(this.TABLE_REF.current.state.query);
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
                                        if (this._isTableStateValid()) {
                                            this.TABLE_REF.current.onQueryChange(this.TABLE_REF.current.state.query);
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

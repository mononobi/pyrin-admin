import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MaterialTable, { MTableToolbar } from 'material-table';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { getFindMetadata } from '../../../services/metadata';
import { deleteAll, deleteBulk, find } from '../../../services/data';
import { getCreatePage, getListPage, getUpdatePage } from '../../../services/url';
import { BaseComplexPage } from '../base/base';
import { formatDate, formatDateTime, formatTime } from '../../../core/datetime';
import { JSTypeEnum } from '../../../validators/enumerations';
import { DEBOUNCE } from '../../../core/debounce';
import { isJSONSerializable, isString, popKey } from '../../../core/helpers';
import { getMaxHeight } from '../../../core/window';
import { getOrdering, getOrderingInfo } from '../../../core/ordering';
import { AlertSeverityEnum, HistoryActionEnum, ListFieldTypeEnum,
    OrderingEnum, TargetEnum
} from '../../../core/enumerations';
import { addOrderingQueryParam, addQueryParams, addSearchQueryParam, getOrderingKey, getPageKey,
    getPageSizeKey, getSearchParamKey, removeOrderingQueryParam, removeSearchQueryParam
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
        currentPageSize: null,
        maxBodyHeight: null,
        shouldReloadData: false
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

    _handleBackButton = () => {
        if (this._isTableStateValid()) {
            let filters = this._getQueryParams();
            let orderingKey = getOrderingKey(this.state.metadata.configs);
            if (!filters[orderingKey] && this.TABLE_REF.current.dataManager.orderBy !== -1) {
                this.TABLE_REF.current.dataManager.changeOrder(-1, OrderingEnum.ASCENDING);
            }

            let searchKey = getSearchParamKey(this.state.metadata.configs);
            if (!filters[searchKey] && this.TABLE_REF.current.dataManager.searchText !== '') {
                this.TABLE_REF.current.dataManager.changeSearchText('');
            }

            if (this.state.shouldReloadData) {
                this.state.isInitial = true;
                this.TABLE_REF.current.onQueryChange(this.TABLE_REF.current.state.query);
            }
        }
    }

    _componentDidMount() {
        if (!this._isForSelect()) {
            if (this.props.location.state && this.props.location.state.message) {
                this._setToastNotification(this.props.location.state.message, AlertSeverityEnum.SUCCESS);
            }

            this._backListener = this.props.history.listen(
                (location, action) => {
                    if (action === HistoryActionEnum.POP) {
                        this._handleBackButton();
                    }
                });
        }
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
            let url = getListPage(data.register_name, data.filters);
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

    _getMaxBodyHeight(paged) {
        let reducer = 0.14;
        let forSelectReducer = 0.211;
        if (!paged) {
            reducer = 0.085;
            forSelectReducer = 0.160;
        }
        return getMaxHeight(reducer, forSelectReducer, this._isForSelect());
    }

    _prepareMetadata(metadata) {
        this.state.maxBodyHeight = this._getMaxBodyHeight(metadata.paged);
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

    _isPageSizeChanged(query) {
        return query.pageSize !== this.state.currentPageSize;
    }

    _finalRender() {
        return (
            <MaterialTable
                tableRef={this.TABLE_REF}
                options={
                    {
                        maxBodyHeight: this.state.metadata.max_body_height || this.state.maxBodyHeight,
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
                    if (!this._isForSelect()) {
                        let currentURL = this._getCurrentURL();
                        if (orderBy >= 0) {
                            let fieldInfo = this.state.metadata.datasource_info[orderBy];
                            let name = getOrdering(fieldInfo.field, orderDirection);
                            let newURL = addOrderingQueryParam(currentURL, name);
                            this.props.history.push(newURL);
                        }
                        else {
                            let newURL = removeOrderingQueryParam(currentURL);
                            this.props.history.push(newURL);
                        }
                    }
                }}
                data={query =>
                    new Promise((resolve, reject) => {
                        let filters = {};
                        let page = query.page;
                        let pageSize = query.pageSize;
                        let isOrderByChanged = this._isOrderByChanged(query);
                        let isPageSizeChanged = this._isPageSizeChanged(query);
                        if (!this._isForSelect()) {
                            let currentURL = this._getCurrentURL();
                            filters = this._getQueryParams();
                            if (this.state.isInitial) {
                                let orderingKey = getOrderingKey(this.state.metadata.configs);
                                let ordering = filters[orderingKey];
                                if (isString(ordering)) {
                                    let [field, direction] = getOrderingInfo(ordering);
                                    let index = this.state.metadata.field_names.indexOf(field);
                                    if (index >= 0)
                                    {
                                        query.orderBy = this.state.metadata.datasource_info[index];
                                        query.orderDirection = direction;
                                        this.state.orderByField = field;
                                        this.state.orderDirection = direction;
                                        popKey(orderingKey, filters, null);
                                        if (this._isTableStateValid()) {
                                            this.TABLE_REF.current.dataManager.changeOrder(index, direction);
                                        }
                                    }
                                }
                                else if (!ordering) {
                                    query.orderBy = null;
                                }

                                let searchKey = getSearchParamKey(this.state.metadata.configs);
                                let searchText = popKey(searchKey, filters, null);
                                if(searchText && searchText !== '') {
                                    query.search = searchText;
                                    if (this._isTableStateValid()) {
                                        this.TABLE_REF.current.dataManager.changeSearchText(searchText);
                                    }
                                }
                                else {
                                    query.search = '';
                                }
                            }

                            if (this.state.metadata.paged) {
                                let pageSizeKey = getPageSizeKey(this.state.metadata.configs);
                                pageSize = popKey(pageSizeKey, filters, null);
                                pageSize = parseInt(pageSize, 10);
                                pageSize = isNaN(pageSize) ? null : pageSize;
                                if (pageSize !== null) {
                                    if (pageSize < 1) {
                                        pageSize = this.state.metadata.page_size;
                                    }
                                    else if (pageSize > this.state.metadata.max_page_size) {
                                        pageSize = this.state.metadata.max_page_size;
                                    }
                                }

                                if (!pageSize || this.state.isInitial) {
                                    pageSize = pageSize || this.state.metadata.page_size;
                                    filters[pageSizeKey] = pageSize;
                                    let newURL = addQueryParams(currentURL, filters);
                                    this.props.history.replace(newURL);
                                }
                                else if (isPageSizeChanged) {
                                    pageSize = query.pageSize;
                                    filters[pageSizeKey] = pageSize;
                                    let newURL = addQueryParams(currentURL, filters);
                                    this.props.history.push(newURL);
                                }

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
                                    let newURL = addQueryParams(currentURL, filters);
                                    this.props.history.replace(newURL);
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
                                    let newURL = addQueryParams(currentURL, filters);
                                    this.props.history.push(newURL);
                                }

                                this.state.isInitial = false;
                                query.page = page - 1;
                                if (query.pageSize !== pageSize) {
                                    query.pageSize = pageSize;
                                    if (this._isTableStateValid()) {
                                        this.TABLE_REF.current.dataManager.changePageSize(pageSize);
                                    }
                                }
                            }

                            if (isOrderByChanged) {
                                let orderingKey = getOrderingKey(this.state.metadata.configs);
                                popKey(orderingKey, filters);
                            }
                        }
                        else if (this.state.metadata.paged) {
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

                        if (this.state.metadata.paged && isPageSizeChanged) {
                            this.state.metadata.currentPageSize = query.pageSize;
                        }

                        if (!this.state.metadata.paged) {
                            page = null;
                            pageSize = null;
                        }

                        let response = find(this._getRegisterName(), page,
                            pageSize, query.orderBy, query.orderDirection,
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
                                if (this.state.metadata.paged) {
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
                                else {
                                    resolve({
                                        data: json.results,
                                        page: 0,
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
                        },
                        addRemoveColumns: 'Add or Remove Columns'
                    }
                }}
                components={{
                    Toolbar: props => (
                        <MTableToolbar
                            {...props}
                            onSearchChanged={
                                DEBOUNCE(searchText => {
                                if (!this._isForSelect()) {
                                    let currentURL = this._getCurrentURL();
                                    if (searchText && searchText !== '') {
                                        let newURL = addSearchQueryParam(currentURL, searchText);
                                        this.props.history.push(newURL);
                                    }
                                    else {
                                        let newURL = removeSearchQueryParam(currentURL);
                                        this.props.history.push(newURL);
                                    }
                                }
                                props.onSearchChanged(searchText);}, this.state.metadata.search_debounce_interval)
                            }
                        />)
                }}
            />
        )
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (!this._isForSelect()) {
            this._backListener();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        if (!this._isForSelect()) {
            this.state.shouldReloadData = this.props.location.search !== prevProps.location.search;
        }
    }
}

import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import MaterialTable from 'material-table';
import Link from '@material-ui/core/Link';
import { getFindMetadata } from '../../../services/metadata';
import { deleteAll, deleteBulk, find } from '../../../services/data';
import { getCreatePage, getUpdatePage } from '../../../services/url';
import { BaseComplexPage } from '../base/base';
import { AlertSeverityEnum, TargetEnum } from '../../../core/enumerations';
import './list.css'


export class ListComponent extends BaseComplexPage {

    LINK_COLOR = '#12558d';
    SELECTED_ROW_COLOR = 'rgba(185,215,232,0.44)';
    TABLE_REF = React.createRef();

    _fetchMetadata()
    {
        return getFindMetadata(this.props.match.params.register_name);
    }

    _renderPK(info, metadata) {
        info.cellStyle = {
            fontWeight: 'bold',
            color: this.LINK_COLOR
        }

        if (metadata.link_pk) {
            info.render = rowData => {
                let value = rowData[info.field];
                if (info.lookup) {
                    value = info.lookup[value];
                }
                return (
                    <Link component='a' underline='hover' target={TargetEnum.SAME_TAB}
                          href={getUpdatePage(info.pk_register_name, rowData[info.field])}>
                        {value}
                    </Link>
                )
            }
        }
    }

    _renderFK(info, metadata) {
        info.cellStyle = {
            color: this.LINK_COLOR
        }

        if (metadata.link_fk) {
            info.render = rowData => {
                let value = rowData[info.field];
                if (info.lookup) {
                    value = info.lookup[value]
                }
                return (
                    <Link component='a' underline='hover' target={TargetEnum.SAME_TAB}
                          href={getUpdatePage(info.fk_register_name, rowData[info.field])}>
                        {value}
                    </Link>
                )
            }
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
        }
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
                else if (info.type === 'boolean') {
                    this._renderBoolean(info, metadata);
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
                        grouping: this.state.metadata.grouping,
                        columnsButton: this.state.metadata.column_selection || this.state.metadata.enable_export,
                        exportButton: this.state.metadata.enable_export,
                        padding: this.state.metadata.table_type,
                        headerSelectionProps: {size: this.state.metadata.table_type === 'dense'? 'small': 'medium'},
                        paging: this.state.metadata.paged,
                        pageSize: this.state.metadata.page_size,
                        pageSizeOptions: this.state.metadata.page_size_options,
                        paginationType: this.state.metadata.pagination_type,
                        paginationPosition: this.state.metadata.pagination_position,
                        draggable: this.state.metadata.column_ordering,
                        selection: this.state.metadata.has_remove_permission,
                        emptyRowsWhenPaging: false,
                        // TODO: there is a bug in material table when setting row style.
                        // rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ?
                        //         this.SELECTED_ROW_COLOR : '' })
                    }
                }
                title={this._getPluralName()}
                columns={this.state.metadata.datasource_info}
                data={query =>
                    new Promise((resolve, reject) => {
                        let response = find(this._getRegisterName(), query.page + 1,
                            query.pageSize, query.orderBy, query.orderDirection, query.search);

                        response.then(([json, ok]) => {
                            if (!ok) {
                                reject( json.message || 'Data Fetch Error');
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
                            let url = getCreatePage(this._getRegisterName());
                            window.open(url, TargetEnum.SAME_TAB);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: `Delete All ${this._getPluralName()}`,
                        position: 'toolbar',
                        hidden: !this.state.metadata.has_remove_all_permission,
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
                        },
                    },
                    {
                        icon: 'delete',
                        tooltip: `Delete Selected ${this._getPluralName()}`,
                        position: 'toolbarOnSelect',
                        hidden: !this.state.metadata.has_remove_permission,
                        onClick: (event, rowData) => {
                            let count = rowData.length;
                            let name = count > 1? this._getPluralName(): this._getName();
                            this._setConfirmDeleteDialog(`Delete ${count} selected ${name}?`,
                                () => {
                                let pk = [];
                                for (let i=0; i < rowData.length; i++) {
                                    pk.push(rowData[i][this.state.metadata.pk_name]);
                                }
                                let result = deleteBulk(this._getRegisterName(), pk);
                                result.then(([json, ok]) => {
                                    if (ok) {
                                        if (this.TABLE_REF && this.TABLE_REF.current &&
                                            this.TABLE_REF.current.state) {
                                            this.TABLE_REF.current.onQueryChange(
                                                this.TABLE_REF.current.state.query);
                                        }
                                        let message = count > 1? `${name} have`: `${name} has`;
                                        this._setToastNotification(
                                            `${message} been deleted successfully.`, AlertSeverityEnum.SUCCESS);
                                    }
                                    else {
                                        this._setToastNotification(json, AlertSeverityEnum.ERROR);
                                    }
                                });
                            });
                        },
                    },
                    {
                        icon: 'edit',
                        iconProps: {fontSize: 'inherit', color: 'action'},
                        tooltip: `View ${this._getName()}`,
                        position: 'row',
                        hidden: !this.state.metadata.has_get_permission,
                        onClick: (event, rowData) => {
                            let url = getUpdatePage(this._getRegisterName(),
                                rowData[this.state.metadata.pk_name]);
                            window.open(url, TargetEnum.SAME_TAB);
                        }
                    }
                ]}
                localization={{
                    header: {
                        actions: ''
                    },
                }}
            />
        )
    }
}

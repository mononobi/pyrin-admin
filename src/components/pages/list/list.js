import React from 'react';
import MaterialTable from 'material-table';
import Link from '@material-ui/core/Link';
import { getFindMetadata } from '../../../services/metadata';
import { BaseComponent } from '../../base';
import { getListData } from '../../../services/data';
import { getCreatePage, getUpdatePage } from '../../../services/url';
import './list.css'


export class ListComponent extends BaseComponent {

    LINK_COLOR = '#12558d';
    SELECTED_ROW_COLOR = 'rgba(185,215,232,0.44)';

    _fetchMetadata()
    {
        return getFindMetadata(this.props.match.params.register_name);
    }

    _renderPK(info) {
        info.cellStyle = {
            fontWeight: 'bolder',
            color: this.LINK_COLOR,
        }

        if (this.state.metadata.link_pk) {
            info.render = rowData => {
                let value = rowData[info.field];
                if (info.lookup) {
                    value = info.lookup[value];
                }
                return (
                    <Link component='a' underline='hover'
                          href={getUpdatePage(info.pk_register_name, rowData[info.field])}>
                        {value}
                    </Link>
                )
            }
        }
    }

    _renderFK(info) {
        info.cellStyle = {
            color: this.LINK_COLOR,
        }

        if (this.state.metadata.link_fk) {
            info.render = rowData => {
                let value = rowData[info.field];
                if (info.lookup) {
                    value = info.lookup[value]
                }
                return (
                    <Link component='a' underline='hover'
                          href={getUpdatePage(info.fk_register_name, rowData[info.field])}>
                        {value}
                    </Link>
                )
            }
        }
    }

    _prepareRendering() {
        for (let i = 0; i < this.state.metadata.datasource_info.length; i++) {
            if (!this.state.metadata.datasource_info[i].hidden) {
                if (this.state.metadata.datasource_info[i].is_pk) {
                    this._renderPK(this.state.metadata.datasource_info[i]);
                }
                else if (this.state.metadata.datasource_info[i].is_fk) {
                    this._renderFK(this.state.metadata.datasource_info[i]);
                }
            }
        }
    }

    _render() {
        const tableRef = React.createRef();
        return (
            <MaterialTable
                tableRef={tableRef}
                options={
                    {
                        columnsButton: this.state.metadata.column_selection || this.state.metadata.enable_export,
                        exportButton: this.state.metadata.enable_export,
                        padding: this.state.metadata.table_type,
                        paging: this.state.metadata.paged,
                        pageSize: this.state.metadata.page_size,
                        pageSizeOptions: this.state.metadata.page_size_options,
                        paginationType: this.state.metadata.pagination_type,
                        paginationPosition: this.state.metadata.pagination_position,
                        draggable: this.state.metadata.column_ordering,
                        selection: this.state.metadata.has_remove_permission,
                        emptyRowsWhenPaging: false,
                        rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ?
                                this.SELECTED_ROW_COLOR : '' })
                    }
                }
                title={this.state.metadata.plural_name}
                columns={this.state.metadata.datasource_info}
                data={query =>
                    new Promise((resolve, reject) => {
                        let response = getListData(
                            this.state.metadata.register_name, query.page + 1, query.pageSize
                        )

                        response.then(json => {
                            resolve({
                                data: json.results,
                                page: query.page,
                                totalCount: json.count_total
                            })
                        })
                    })
                }
                actions={[
                    {
                        icon: 'refresh',
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: event => {
                            tableRef.current && tableRef.current.onQueryChange();
                        }
                    },
                    {
                        icon: 'add',
                        tooltip: `Add ${this.state.metadata.name}`,
                        position: 'toolbar',
                        hidden: !this.state.metadata.has_create_permission,
                        isFreeAction: true,
                        onClick: event => {
                            let url = getCreatePage(this.state.metadata.register_name);
                            window.open(url);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: `Delete All ${this.state.metadata.plural_name}`,
                        position: 'toolbar',
                        hidden: !this.state.metadata.has_remove_permission,
                        isFreeAction: true,
                        onClick: event => {
                            alert(`Deleting All Users`);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: `Delete Selected ${this.state.metadata.plural_name}`,
                        position: 'toolbarOnSelect',
                        hidden: !this.state.metadata.has_remove_permission,
                        onClick: (event, rowData) => {
                            alert(`Deleting User ${rowData[0][this.state.metadata.pk_name]}`);
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: `View ${this.state.metadata.name}`,
                        position: 'row',
                        hidden: !this.state.metadata.has_get_permission,
                        onClick: (event, rowData) => {
                            let url = getUpdatePage(this.state.metadata.register_name,
                                rowData[this.state.metadata.pk_name]);
                            window.open(url);
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

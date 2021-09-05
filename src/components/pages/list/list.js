import React from 'react';
import MaterialTable from 'material-table';
import Link from '@material-ui/core/Link';
import { getFindMetadata } from '../../../services/metadata';
import { BaseComponent } from '../../base';
import { getListData } from '../../../services/data';
import {getCreatePage, getUpdatePage} from '../../../services/url';
import './list.css'


export class ListComponent extends BaseComponent {

    _fetchMetadata()
    {
        return getFindMetadata(this.props.match.params.register_name);
    }

    _prepare_rendering() {
        if (!this.state.metadata.has_get_permission) {
            return
        }

        for (let i = 0; i < this.state.metadata.list_datasource_info.length; i++) {
            let field_name = this.state.metadata.list_datasource_info[i].field;
            if (this.state.metadata.pk.includes(field_name)) {
                this.state.metadata.list_datasource_info[i].cellStyle = {
                    fontWeight: 'bolder',
                    color: '#0c4b7e'
                }
                this.state.metadata.list_datasource_info[i].render = rowData => {
                    return (
                        <Link component='a' underline='hover'
                              href={getUpdatePage(this.state.metadata.register_name, rowData[field_name])}>
                            {rowData[field_name]}
                        </Link>
                    )
                }
            }
        }
    }

    _render() {
        return (
            <MaterialTable
                options={
                    {
                        padding: 'dense',
                        paging: this.state.metadata.paged,
                        pageSize: this.state.metadata.page_size,
                        pageSizeOptions: this.state.metadata.page_size_options,
                        paginationType: 'normal',
                        paginationPosition: 'bottom',
                        draggable: false,
                        selection: this.state.metadata.has_remove_permission,
                        emptyRowsWhenPaging: false,
                        rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ?
                                'rgba(185,215,232,0.44)' : '' })
                    }
                }
                title={this.state.metadata.plural_name}
                columns={this.state.metadata.list_datasource_info}
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
                        tooltip: `Delete Selected ${this.state.metadata.plural_name}`,
                        position: 'toolbarOnSelect',
                        hidden: !this.state.metadata.has_remove_permission,
                        onClick: (event, rowData) => {
                            console.log(JSON.stringify(rowData));
                            alert(`Deleting user ${rowData[0].id}`);
                        }
                    }
                ]}
            />
        )
    }
}

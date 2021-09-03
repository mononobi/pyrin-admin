import React from 'react';
import MaterialTable from 'material-table';
import { getFindMetadata } from '../../../services/metadata';
import { BaseComponent } from '../../base';
import { getListData } from '../../../services/data';


export class ListComponent extends BaseComponent {

    _fetchMetadata()
    {
        return getFindMetadata(this.props.match.params.register_name);
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
                        draggable: false
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
            />
        )
    }
}

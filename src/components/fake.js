import React from 'react';
import MaterialTable from "material-table";

export const FakeComponent = ({ pages }) => {
    return (
        <MaterialTable
            columns={[
                {title: "ROW", field: "row"},
                {title: "ID", field: "id"},
                {title: "FULLNAME", field: "fullname"},
                {title: "METHOD", field: "method"},
                {title: "USERNAME", field: "username"}
            ]}
            data={pages}
        />
    );
};

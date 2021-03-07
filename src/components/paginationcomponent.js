import React from 'react';
import { Pagination } from 'antd';


function PaginationComponent(props) {
    return (
        <div>
            <Pagination defaultCurrent={1} total={50} />
        </div>
    );
}

export default PaginationComponent;
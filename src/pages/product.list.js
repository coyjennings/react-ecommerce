import React, { useEffect, useState }  from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import axios from "axios";
import PaginationComponent from '../components/paginationcomponent';

const columns = [
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: text => <a>{text}</a>,
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'Product Name',
        dataIndex: 'productname',
        key: 'productname',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];


function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 6});
    const [loadings, setLoadings] = useState(false);
    const [totals, setTotals] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9080/products/total')
            .then(response => {
                if (response.data) {
                    setTotals(response.data);
                } else {
                    alert('Failed to get Total')
                }
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:9080/products/page/2')
            .then(response => {
                if (response.data) {
                    setProducts(response.data);
                    console.log(response.data);
                } else {
                    alert('Failed to get Total')
                }
            })
    }, [])

    const dataSample = [
        {
            key: '1',
            productname: 'John Brown',
            sku: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            productname: 'Jim Green',
            sku: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            productname: 'Joe Black',
            sku: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const totalNumbers = totals.map((total, i) =>{
        console.log(total.total);
    })

    return (
        <div>
            <Table columns={columns} dataSource={dataSample} />
            {/*{totals[3].total}*/}
        </div>
    );
}

export default ProductList;
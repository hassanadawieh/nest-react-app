import React, { useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useListProducts } from '../../api/api-hooks/products/use-list-products';
import ProductModal from './modals/ProductModal';
import DeleteRecord from '../DeleteRecord';
import { API } from '../../lib/api';
import Button from '../UI/Button';
import Loading from '../Loading';

const ProductsTable = () => {
  const { data: fetchedProducts, refetch , isLoading } = useListProducts();
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync fetched products with local state
  useEffect(() => {
    if (Array.isArray(fetchedProducts)) {
      setProductList(fetchedProducts);
    } else {
      setProductList([]);  // Default to empty array if not valid
    }
  }, [fetchedProducts]);

  // Handle edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Columns definition
  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-3">
            <button
              className="text-blue-600 hover:text-blue-800 text-lg"
              onClick={() => handleEdit(row.original)}
            >
              <FaEdit />
            </button>
            {/* <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleDelete(row.original.id)}
            >
              <FaTrashAlt />
            </button> */}
             <DeleteRecord
              endpoint={API.deleteProduct(row.original.id)}
              refetchItems={refetch}
            />
          </div>
        ),
      },
    ],
    []
  );

  // Use react-table for table state management
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: productList,
  });

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="container mx-auto p-4">
      {/* Add New Product Button */}
      <div className='w-full flex items-center justify-between mb-4'>
        <h1 className='text-primary font-bold text-3xl'>Products Table</h1>
      <Button onClick={() => {
          setSelectedProduct(null);
          setIsModalOpen(true);
        }} 
        className="text-lg" >
            <span className='hidden sm:block'>Add New Product</span>
            <span className='block sm:hidden'>+</span>

        </Button>
      </div>
      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table {...getTableProps()} className="min-w-full table-auto border-collapse">
          <thead className="bg-primary ">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-4 text-left text-sm font-semibold text-white"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-4 text-sm text-gray-700">
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        refetchData={refetch}
      />
    </div>
  );
};

export default ProductsTable;

import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useForm } from 'react-hook-form';
import { apiValidations } from '../../../lib/apiValidations';
import { zodResolver } from '@hookform/resolvers/zod'
import TextField from '../../fields/TextField';
import { useAddProduct } from '../../../api/api-hooks/products/use-add-product';
import { useEditProduct } from '../../../api/api-hooks/products/use-edit-product';
import Button from '../../UI/Button';

const ProductModal = ({ isOpen, onRequestClose, selectedProduct, refetchData }) => {


    //----------------------------------FORM SETUP----------------------------------
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(apiValidations.AddProduct),
        defaultValues: {
          title: "",
          description: "",
        },
      });
      //----------------------------------EFFECTS--------------------------------------
      useEffect(() => {
        if (selectedProduct) {
          console.log(selectedProduct);
          reset({
            title: selectedProduct.title,
            description: selectedProduct.description,
          });
        } else {
          reset({
            title: "",
            description: "",
          });
        }
      }, [selectedProduct]);

        //----------------------------------API CALLS-------------------------------------
  const { mutate: addProduct , isPending:isAddPending } = useAddProduct({
    callBackOnSuccess: () => {
        onRequestClose();
        refetchData();
      reset();
    },
  });

  const { mutate: editProduct, isPending:isEditPending } = useEditProduct({
    id: selectedProduct?.id,
    callBackOnSuccess: () => {
      onRequestClose();
      refetchData();
      reset();
    },
  });

      



  // Handle form submit
  const onSubmit = (data) => {
    // If editing, update the product, else add a new one
    if (selectedProduct) {
      // Update product API call
      editProduct(data);
    } else {
      // Create product API call
      addProduct(data);
    }

    // Reset form and close modal
    reset();
    onRequestClose();
  };

  // Close the modal and reset form
  const handleClose = () => {
    reset();
    onRequestClose();
  };

  return (
    <ReactModal
    isOpen={isOpen}
    onRequestClose={handleClose}
    contentLabel="Add New Product"
    className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg mx-auto z-30"
    overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      {selectedProduct ? 'Edit Product' : 'Add New Product'}
    </h2>
    <form className="grid lg:grid-cols-1" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        control={control}
        name="title"
        label="Title"
        colSpan={1}
      />
      <TextField
        control={control}
        name="description"
        label="Description"
        colSpan={1}
      />
      <Button type="submit">
        {selectedProduct ? 'Save Changes' : 'Save Product'}
      </Button>
    </form>
  </ReactModal>
  );
};

export default ProductModal;

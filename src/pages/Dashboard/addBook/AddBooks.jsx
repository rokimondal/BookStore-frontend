import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, { isLoading, isError }] = useAddBookMutation()
    const [imageFileName, setimageFileName] = useState('')
    const onSubmit = async (data) => {

        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                icon: "success",
            });
            reset();
            setimageFileName('')
            setimageFile(null);
            navigate('/dashboard/manage-books')
        } catch (error) {
            console.error(error);
            if (error.status === 401 || error.status === 403) {
                // Navigate to admin login if unauthorized
                navigate('/admin');
            }
        }

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }
    return (
        <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* Reusable Input Field for IS */}
                <InputField
                    label="Book Number (ISBN)"
                    name="ISBN"
                    placeholder="Enter book number"
                    register={register}
                />

                {/* Reusable Input Field for Title */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                {/* Reusable Textarea for Description */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}

                />

                {/* Reusable Select Field for Category */}
                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                        { value: 'nonFiction', label: 'Non-Fiction' },
                        { value: 'mysteryThriller', label: 'Mystery/Thriller' },
                        { value: 'scienceFiction', label: 'Science Fiction' },
                        { value: 'fantasy', label: 'Fantasy' },
                        { value: 'romance', label: 'Romance' },
                        { value: 'biographyMemoir', label: 'Biography & Memoir' },
                        { value: 'selfHelp', label: 'Self-Help' },
                        { value: 'childrensBooks', label: 'Children’s Books' },
                        { value: 'youngAdult', label: 'Young Adult' },
                        { value: 'historicalFiction', label: 'Historical Fiction' },
                        { value: 'poetry', label: 'Poetry' },
                        { value: 'cookbooks', label: 'Cookbooks' },
                        { value: 'healthWellness', label: 'Health & Wellness' },
                        { value: 'travel', label: 'Travel' },
                        { value: 'graphicNovels', label: 'Graphic Novels/Comics' },
                        { value: 'religionSpirituality', label: 'Religion & Spirituality' },
                        { value: 'scienceNature', label: 'Science & Nature' },
                        { value: 'artsPhotography', label: 'Arts & Photography' }
                    ]}
                    register={register}
                />


                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}

                />

                {/* New Price */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}

                />

                {/* Cover Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {
                        isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
                    }
                </button>
            </form>
        </div>
    )
}

export default AddBook
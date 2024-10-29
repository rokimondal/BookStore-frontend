import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import axios from 'axios';
import { useEffect } from 'react';
import getBaseUrl from '../../../utils/getBaseUrl';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id)
    const { register, handleSubmit, setValue, reset } = useForm();
    const onSubmit = async (data) => {
        const updateBookData = {
            ISBN: data.ISBN,
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || bookData.coverImage,
        };
        try {
            await axios.put(`${getBaseUrl()}/api/books/edit/:${id}`, updateBookData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            Swal.fire({
                title: "Book Updated",
                icon: "success",
            });
            await refetch()
        } catch (error) {
            console.log("Failed to update book.");
            if (error.status === 401 || error.status === 403) {
                // Navigate to admin login if unauthorized
                navigate('/admin');
            }
        }
    }

    useEffect(() => {
        if (bookData) {
            setValue('ISBN', bookData.ISBN);
            setValue('title', bookData.title);
            setValue('description', bookData.description);
            setValue('category', bookData?.category);
            setValue('trending', bookData.trending);
            setValue('oldPrice', bookData.oldPrice);
            setValue('newPrice', bookData.newPrice);
            setValue('coverImage', bookData.coverImage)
        }
    }, [bookData, setValue])
    if (isLoading) return <Loading />
    if (isError) {
        console.log(isError);
        return <div>Error fetching book data</div>
    }
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Book Number (ISBN)"
                    name="ISBN"
                    placeholder="Enter book number"
                    register={register}
                />
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                        { value: 'nonFiction', label: 'Non-Fiction' },
                        { value: 'mystery', label: 'Mystery' },
                        { value: 'scienceFiction', label: 'Science Fiction' },
                        { value: 'fantasy', label: 'Fantasy' },
                        { value: 'romance', label: 'Romance' },
                        { value: 'biography', label: 'Biography' },
                        { value: 'selfHelp', label: 'Self-Help' },
                        { value: 'children', label: 'Children’s Books' },
                        { value: 'youngAdult', label: 'Young Adult' },
                        { value: 'historical', label: 'Historical Fiction' },
                        { value: 'poetry', label: 'Poetry' },
                        { value: 'cookbooks', label: 'Cookbooks' },
                        { value: 'health', label: 'Health & Wellness' },
                        { value: 'travel', label: 'Travel' },
                        { value: 'graphicNovels', label: 'Graphic Novels' },
                        { value: 'religion', label: 'Religion & Spirituality' },
                        { value: 'scienceNature', label: 'Science & Nature' }
                    ]}
                    register={register}
                />


                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
                    Update Book
                </button>
            </form>
        </div>
    )
}

export default UpdateBook
import { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Textarea } from '@/components/ui/textarea';
import { Session } from '@/lib/session';
import { Button } from '../ui/button';
import { createNewRating, getAllRatings } from '@/app/actions/ratings';
import toast from 'react-hot-toast';
import dayjs from 'dayjs'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditRateModal from './EditRateModal';


const CourseRating = ({ session, courseId }: { session: Session; courseId: string | undefined }) => {
    const [ratings, setRatings] = useState<IRating[]>([]);
    const [newRating, setNewRating] = useState(0);
    const [newContent, setNewContent] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [current, setCurrent] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [hasRated, setHasRated] = useState(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [rateId, setRateId] = useState("");
    const [contentUpdate, setContentUpdate] = useState("");
    const [qualityUpdate, setQualityUpdate] = useState(0);

    const handleRatingChange = (rate: number) => {
        setNewRating(rate);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewContent(e.target.value);
    };

    const handleSubmit = async () => {
        // Validate that both rating and content are filled
        if (newRating === 0) {
            setError('Please provide a rating.');
            return;
        }
        if (!newContent.trim()) {
            setError('Please provide some content for your rating.');
            return;
        }
        // Clear any previous error
        setError(null);

        const res = await createNewRating(session, courseId!, newRating, newContent)
        if (res.data) {
            toast.success("Rate success")
        }
        else if (res.error) {
            toast.error("Something went wrong")
            console.log(error)
        }

        fetchAllRatings(1);
        setNewRating(0);
        setNewContent('');
    };

    const fetchAllRatings = async (current: number) => {
        const res = await getAllRatings(session, courseId!, current);
        if (res.data) {
            setRatings(res.data.result);
            //@ts-ignore
            setHasRated(res.data.hasRated);
            if (res.data.meta.total < 11) {
                setHasMore(false);
            }
        }
    }

    const loadMoreRatings = () => {
        fetchAllRatings(current);
        setCurrent((prev) => prev + 1);
    };

    useEffect(() => {
        fetchAllRatings(1);
    }, []);

    return (
        <div className='my-2'>
            {!hasRated && (
                <div className="flex flex-col gap-4">
                    <Rating
                        className="mt-5"
                        onClick={handleRatingChange}
                        allowFraction
                    />
                    <Textarea
                        className='md:w-1/2'
                        placeholder="Write your rate here..."
                        value={newContent}
                        onChange={handleContentChange}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button className='md:w-fit' onClick={handleSubmit}>Submit</Button>
                </div>
            )}
            <div className="mt-5">
                {ratings.map((rating) => (
                    <div key={rating.id} className="p-4 mt-4">
                        <div className='flex gap-4 items-center mb-2'>
                            <Avatar>
                                <AvatarImage src={rating.user.image} />
                                <AvatarFallback className='font-bold text-white bg-black'>
                                    {rating.user.name.slice(0, 1).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <p>{rating.user.name}</p>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <Rating readonly initialValue={rating.quality} />
                            <span>{dayjs(rating.createdAt).format('MM/DD/YYYY')}</span>
                        </div>
                        <p className='mt-2'>{rating.content}</p>
                        {rating.userId === session.user.id && (
                            <div className="flex gap-2">
                                <Button variant={"link"} className='pl-0'
                                    onClick={() => {
                                        setRateId(rating.id)
                                        setContentUpdate(rating.content)
                                        setQualityUpdate(rating.quality)
                                        setOpenEditModal(true)
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button variant={"link"} className='pl-0'>Delete</Button>
                            </div>
                        )}
                    </div>
                ))}

                {hasMore && (
                    <button onClick={loadMoreRatings} className="mt-4 px-4 py-2 bg-blue-500 text-white">
                        Load More
                    </button>
                )}
            </div>
            {openEditModal &&
                <EditRateModal
                    content={contentUpdate}
                    id={rateId}
                    setOpen={setOpenEditModal}
                    quality={qualityUpdate}
                    open={openEditModal}
                    current={current}
                    fetchAllRatings={fetchAllRatings}
                    session={session}
                />
            }
        </div>
    )
}

export default CourseRating
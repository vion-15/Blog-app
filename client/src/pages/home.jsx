import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                `/api/post/getPosts`
            );
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);
    return (
        <div>
            <div className='flex flex-col gap-6 p-10  px-3 max-w-6xl mx-auto '>
                <h1 className='text-3xl font-bold lg:text-6xl pt-10'>
                    Welcome to my Blog
                </h1>
                <p className='text-gray-500 text-xs sm:text-sm'>
                    Welcome to my blog! Explore the worlds of Genshin Impact, Honkai: Star Rail,
                    and Zenless Zone Zero. Discover the latest news, character guides, game
                    updates, tips, and insights to enhance your gaming experience. Whether
                    you're a Traveler, Trailblazer, or Proxy, there's always something new
                    waiting for you. Dive in and enjoy your adventure!
                </p>
            </div>
            <hr className='max-w-6xl mx-auto'/>
            <div className="max-w-6xl mx-auto p-3 py-3 flex flex-col gap-8">
                {posts && posts.length > 0 && (
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold text-center">
                            Recent Posts
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>

                        <Link
                            to="/search"
                            className="text-lg text-teal-500 hover:underline text-center"
                        >
                            View all posts
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

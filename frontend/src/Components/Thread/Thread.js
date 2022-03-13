import React, { useEffect, useState } from 'react';
import Card from '../../Components/Post/Card/Card';
import {useSelector, useDispatch} from 'react-redux';
import { getPosts } from '../../actions/posts/postActions';
import QuoiDeNeuf from '../QuoiDeNeuf/QuoiDeNeuf';
import './Thread.css';


const Thread = () => {
    const [loadPost, setLoadPost] = useState(true); // State pour savoir si le post est charger ou pas init à true
    const posts = useSelector(state => state.postReducer); //Selectionner state dans postReducer
    const dispatch = useDispatch();
    

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
          setLoadPost(true);
        }
    }

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch]);

    return (
        <section className="container-cards">
            <QuoiDeNeuf />
            {/* {posts.map((post) => { return <Card post={post} key={post._id} />})}  */}
            {(posts.length > 0) &&
                posts.map((post) => {
                    return <Card post={post} key={post.id} />;
                })
            }
        </section>
    );
};

export default Thread;

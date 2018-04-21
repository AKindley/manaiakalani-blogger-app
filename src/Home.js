import React, { Component } from 'react';
import Block from './Block';
import InfiniteScroll from 'react-infinite-scroller';
import { MAX_RESULTS_PER_PAGE } from './api/blogger'

export default function Home({ posts, postsCount, loadPostsNext }) {
    console.log(posts);
    const component = posts ? posts.map(block => (
        <Block key={block.id} {...block} />)
    ) : 'Loading';
    
    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadPostsNext}
            hasMore={posts ? posts.length < postsCount : false}
            loader={<div className="loader" key={0}>Loading ...</div>}>
            {component}
        </InfiniteScroll>
    );
}
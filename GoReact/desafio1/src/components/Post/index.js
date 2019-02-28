import React from 'react';
import PropTypes from 'prop-types';
import PostHeader from '../PostHeader';

const Post = ({ post }) => (
  <div className="post">
    <PostHeader header={post.header} />
    <p>{post.post}</p>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({ root: PropTypes.object }).isRequired,
};

export default Post;

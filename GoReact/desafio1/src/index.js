import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Post from './components/Post';

import postsArchive from './posts';
import './index.scss';

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.setState({
      posts: postsArchive,
    });
  }

  getPosts = () => {
    const { posts } = this.state;
    return !!posts && posts.map(post => <Post post={post} key={post.id} />);
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div className="container">
          <div className="posts">{this.getPosts()}</div>
        </div>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('app'));

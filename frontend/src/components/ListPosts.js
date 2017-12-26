import React from 'react';
import {Feed} from 'semantic-ui-react'
import PropTypes from 'prop-types';
import Post from './Post';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/post';


class ListPosts extends React.Component {
    componentDidMount() {
        this.props.fetchPosts();
    }


    render() {
        return (
            <Feed>
                {this.props.posts.map((post) => (
                    <Post key={post.id}
                          post={post}/>
                ))}
            </Feed>
        )
    }
}

ListPosts.propTypes = {};

const mapStateToProps = ({posts}) => {
    return {
        posts: posts.items,
        hasError: posts.hasError,
        isLoading: posts.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (url) => dispatch(fetchPosts())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);

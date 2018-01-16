import React from 'react';
import {Button, Container, Dropdown, Feed, Menu, Modal} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Post from './Post';
import {connect} from 'react-redux';
import {addPost, fetchCategoryPosts, fetchPosts} from '../actions/post';
import PropTypes from 'prop-types';
import EditPostModal from './EditPostModal';


class ListPosts extends React.Component {

    componentDidMount() {
        this.props.fetchPosts(this.props.category);
    }

    componentWillReceiveProps(props) {
        if (this.props.category !== props.category) {
            this.props.fetchPosts(props.category);
        }
    }

    postDeleted = (post) => {
        console.log(post.category);
    };

    handleSubmit = (post) => {
        this.props.addPost(post);
    };


    render() {
        return (
            <div>
                <Menu stackable borderless>
                    <Container text>
                        <Menu.Item header
                                   as={Link}
                                   to='/'>
                            Posts
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Dropdown
                                text='Categories'
                                pointing
                                className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as={Link}
                                        to='/'
                                    >
                                        All
                                    </Dropdown.Item>
                                    {this.props.categories.map((category) => (
                                        <Dropdown.Item
                                            key={`/${category.path}`}
                                            as={Link}
                                            to={`/${category.path}`}
                                        >
                                            {category.name}
                                        </Dropdown.Item>
                                    ))}

                                </Dropdown.Menu>
                            </Dropdown>
                            <Menu.Item>
                                <EditPostModal
                                    component={(<Button>New Post</Button>)}
                                    onSubmit={this.handleSubmit}
                                />
                            </Menu.Item>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Feed>
                    {this.props.posts.map((post) => (
                        <Post key={post.id}
                              onPostDelete={this.postDeleted}
                              post={post}/>
                    ))}
                </Feed>
            </div>
        )
    }
}

ListPosts.propTypes = {
    category: PropTypes.any
};

const mapStateToProps = ({posts, categories}) => {
    return {
        posts: Object.keys(posts.items).map((k) => posts.items[k]),
        hasError: posts.hasError,
        isLoading: posts.isLoading,
        categories: categories.items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (category) => category ? dispatch(fetchCategoryPosts(category)) : dispatch(fetchPosts()),
        addPost: (post) => dispatch(addPost(post))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);

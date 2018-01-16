import React from 'react';
import {Button, Container, Dropdown, Feed, Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import Post from './Post';
import {connect} from 'react-redux';
import {addPost, fetchCategoryPosts, fetchPosts} from '../actions/post';
import PropTypes from 'prop-types';
import EditPostModal from './EditPostModal';
import sortBy from 'lodash/sortBy';
import {changeSortingKey} from '../actions/user-state';


class ListPosts extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.props.fetchPosts(this.props.category);
    }

    componentWillReceiveProps(props) {
        if (this.props.category !== props.category) {
            this.props.fetchPosts(props.category);
        }
    }

    handleSubmit = (post) => {
        this.context.router.history.push("/");
        this.props.addPost(post);
    };

    handleSortItemClick(key) {
        this.props.sortPostBy(key);
    }


    render() {
        const sortingItems = [
            {key: 'timestamp', name: 'Date'},
            {key: 'title', name: 'Title'},
            {key: 'category', name: 'Category'},
            {key: 'voteScore', name: 'Votes'},
        ];

        const sortingItem = sortingItems.filter((item) => item.key === this.props.sortPostsBy)[0];

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
                            <Menu.Item>
                                Sort By
                            </Menu.Item>
                            <Dropdown
                                text={(sortingItem && sortingItem.name) || 'Choose'}
                                pointing
                                className='link item'>
                                <Dropdown.Menu>
                                    {sortingItems.map((sortingItem) => (
                                        <Dropdown.Item key={sortingItem.key}
                                                       onClick={() => this.handleSortItemClick(sortingItem.key)}>
                                            {sortingItem.name}
                                        </Dropdown.Item>
                                    ))}

                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown
                                text={this.props.category || 'All Categories'}
                                pointing
                                className='link item'>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        as={Link}
                                        to='/'
                                    >
                                        All Categories
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
                    {sortBy(this.props.posts
                        .filter((post) => {
                            if (!post || !post.id) return false;

                            if (this.props.category) {
                                return this.props.category === post.category;
                            }
                            return true;
                        }), this.props.sortPostsBy)
                        .map((post) => (
                            <Post key={post.id}
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

const mapStateToProps = ({posts, categories, userState}) => {
    return {
        posts: Object.keys(posts.items).map((k) => posts.items[k]),
        hasError: posts.hasError,
        isLoading: posts.isLoading,
        categories: categories.items,
        sortPostsBy: userState.postsSortingKey
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: (category) => category ? dispatch(fetchCategoryPosts(category)) : dispatch(fetchPosts()),
        addPost: (post) => dispatch(addPost(post)),
        sortPostBy: (key) => dispatch(changeSortingKey(key))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);

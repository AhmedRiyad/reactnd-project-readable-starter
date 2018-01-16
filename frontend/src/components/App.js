import React, {Component} from 'react';
import '../App.css';
import {Container} from 'semantic-ui-react'
import {
    withRouter,
    Route,
    Switch
} from 'react-router-dom';
import ListPosts from './ListPosts';
import PostDetails from './PostDetails';
import Navigation from './Navigation';
import {fetchCategories} from '../actions/category';
import {connect} from 'react-redux';
import NotFound from './NotFound';


class App extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {

        return (

            <div>
                <Container text>
                    <Switch>
                        <Route exact path="/404" component={NotFound}/>
                        <Route
                            exact path="/:category?" render={(props) => (
                            <div>
                                <Navigation/>
                                <ListPosts category={props.match.params.category}/>
                            </div>
                        )}
                        />
                        <Route
                            exact path="/:category/:postId" render={(props) => (
                            <div>
                                <Navigation/>
                                <PostDetails postId={props.match.params.postId}/>
                            </div>
                        )}
                        />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </Container>


            </div>
        )
    }
}


const mapStateToProps = ({categories}) => {
    return {
        categories: categories.items,
        hasError: categories.hasError,
        isLoading: categories.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

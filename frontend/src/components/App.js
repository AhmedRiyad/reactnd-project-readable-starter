import React, {Component} from 'react';
import './App.css';
import {getAll} from './ReadableAPI';
import {Dropdown, Menu} from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import ListPosts from './components/ListPosts';
import PostDetails from './components/PostDetails';
import EditPost from './components/EditPost';


class App extends Component {
    state = {};

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state;

        return (

            <div>
                <Menu stackable>
                    <Menu.Item>
                        Readable
                    </Menu.Item>

                    <Menu.Item
                        name='Home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    >
                        Home
                    </Menu.Item>

                    <Dropdown text='Categories' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>All</Dropdown.Item>
                            <Dropdown.Item>React</Dropdown.Item>
                            <Dropdown.Item>Test</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
                <Router>
                    <Switch>
                        <Route
                            exact path="/posts/new" render={() => (
                            <EditPost/>
                        )}
                        />
                        <Route
                            exact path="/:category?" render={() => (
                            <ListPosts/>
                        )}
                        />
                        <Route
                            exact path="/:category/:postId" render={() => (
                            <PostDetails/>
                        )}
                        />
                        <Route
                            exact path="/:category/:postId/edit" render={() => (
                            <EditPost/>
                        )}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}

getAll();

export default App;

import React from 'react';
import SavedItemList from './saveditemlist';
import {AlertDiv} from 'sources/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addItem, fetchItems} from './searchActionReducer';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            itemsList: [],
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e){
        this.setState({
            search: e.target.text
        });
    }

    componentDidMount() {
        this.props.fetchItems();
    }    
    
    render() {
        if(this.props.search.isFetching) {
            return(
                <AlertDiv type="info" message="Loading list..." />
            );
        } else if(this.props.search.itemsFetchFailed){
            return(
                <AlertDiv type="danger" message={this.props.search.itemsFetchError} />
            );
        } else {
            return(
                <div>
                    <div class="search-bar">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-white">
                                    <i class="la la-search la-lg"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Search" onChange={this.handleSearchChange} />
                        </div>
                    </div>
                    <SavedItemList itemsList={this.props.search.itemsList} />
                </div>            
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            addItem,
            fetchItems,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
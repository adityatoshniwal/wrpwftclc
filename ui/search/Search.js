import React from 'react';
import SavedItemList from './saveditemlist';
import {AlertDiv} from 'sources/components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchActions} from './searchActionReducer';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            isModalOpen : false,
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchChange(e){
        this.props.setSearchText(e.target.value);
    }

    componentDidMount() {
        this.props.fetchItems();
    }    
    
    render() {
        if(this.props.isFetching) {
            return(
                <AlertDiv type="info" message="Loading list..." />
            );
        } else if(this.props.itemsFetchFailed){
            return(
                <AlertDiv type="danger" message={this.props.itemsFetchError} />
            );
        } else {
            return(
                <div>
                    <div class="search-bar bg-light p-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text bg-white">
                                    <i class="la la-search la-lg"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Search" onChange={this.handleSearchChange} value={this.props.searchText} />
                        </div>
                    </div>
                    {/* <SavedItemList itemsList={this.props.itemsList} searchText={this.props.searchText} /> */}
                    <SavedItemList />
                </div>            
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.search,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            ...searchActions,
        }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
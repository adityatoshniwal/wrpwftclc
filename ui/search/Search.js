import React from 'react';
import SavedItemList from './saveditemlist';
import {AlertDiv} from 'sources/components';
import { url_for } from 'sources/utils/url_for';

import {connect} from 'react-redux';
import {tabActions} from 'sources/tabmanager/tabActionReducer';

class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchText : '',
            isFetching: false,
            itemsFetchFailed: false,
            itemsFetchError: '',
            itemsList: [],
            itemsCount: 0,
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    fetchItems() {
        this.setState({
            isFetching: true,
            itemsFetchFailed: false,
        });

        $.ajax(
            url_for('items'),
            {
                method : "GET",
                dataType : "json",
                contentType : "application/json; charset=utf-8",
            }
        ).done((resp) => {
            this.setState({
                isFetching: false,
                itemsFetchFailed: false,
                itemsList: resp.data,
            });
        }).fail((resp) => {
            let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
            this.setState({
                isFetching: false,
                itemsFetchFailed: true,
                itemsFetchError: error,
            });
        });
    }

    handleSearchChange(e) {
        this.setState({
            searchText: e.target.value,
        })
    }

    handleItemClick(e) {
        this.props.openNewTab('item', {item_id: e.currentTarget.getAttribute('data-item-id')});
    }

    componentDidMount() {
        this.fetchItems();
    }
        
    
    render() {
        if(this.state.isFetching) {
            return(
                <AlertDiv type="info" message="Loading list..." />
            );
        } else if(this.state.itemsFetchFailed){
            return(
                <AlertDiv type="danger" message={this.state.itemsFetchError} />
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
                            <input type="text" class="form-control" placeholder="Search" onChange={this.handleSearchChange} value={this.state.searchText} />
                        </div>
                    </div>
                    <SavedItemList itemsList={this.state.itemsList} searchText={this.state.searchText} 
                        handleItemClick={this.handleItemClick}/>
                </div>            
            );
        }
    }
}


const mapDispatchToProps = dispatch => {
    return {
        openNewTab : (...args) => dispatch(tabActions.openNewTab(...args)),
    };
};


export default connect(null, mapDispatchToProps)(Search);
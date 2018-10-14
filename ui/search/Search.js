import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SavedItemList from './saveditemlist';
import {AlertDiv} from 'sources/components';
import { url_for } from 'sources/utils/url_for';
import {modalActions} from 'sources/modal/modalActionReducer';
import {tabActions} from 'sources/tabmanager/tabActionReducer';


function ItemDeleteModal(props) {
    return (
        <span>Are you sure you want to delete - "{props.title}"</span>
    )
}


class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            searchText : '',
            isCmdRunning: false,
            cmdMessage: '',
            cmdFailed: false,
            cmdError: '',
            cmdSuccess: '',
            itemsList: [],
            itemsCount: 0,
        }

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    fetchItems() {
        this.setState({
            isCmdRunning: true,
            cmdFailed: false,
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
                isCmdRunning: false,
                cmdFailed: false,
                itemsList: resp.data,
            });
        }).fail((resp) => {
            let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
            this.setState({
                isCmdRunning: false,
                cmdFailed: true,
                cmdError: error,
            });
        });
    }

    deleteItem(itemId) {
        console.log('Delete item - ',itemId);

        this.setState({
            isCmdRunning: true,
            cmdFailed: false,
        });

        $.ajax(
            url_for('items')+"/"+itemId,
            {
                method : "DELETE",
                dataType : "json",
                contentType : "application/json; charset=utf-8",
            }
        ).done((resp) => {
            this.setState({
                isCmdRunning: false,
                cmdFailed: false,
            });
            this.props.refreshTab('search-tab');
        }).fail((resp) => {
            let error = `Failed with error code ${resp.status} - ${resp.statusText}`;
            this.setState({
                isCmdRunning: false,
                cmdFailed: true,
                cmdError: error,
            });
        });        
    }

    handleSearchChange(e) {
        this.setState({
            searchText: e.target.value,
        })
    }

    handleItemClick(e) {
        this.props.openItemTab(parseInt(e.currentTarget.getAttribute('data-item-id')));
    }

    handleDeleteClick(e) {
        e.stopPropagation();
        let self = this,
            savedItem = $(e.currentTarget).closest('.saveditem-item'),
            itemId = savedItem.attr('data-item-id'),
            itemTitle = savedItem.attr('data-item-title');

        this.props.openModal({
            content:<ItemDeleteModal title={itemTitle}/>,
            onOkClick: (e)=>{
                self.deleteItem(itemId);
            },
        });
    }

    componentDidMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.refresh != this.props.refresh) {
            console.log('do refresh');
            this.fetchItems();
        }
    }
        
    
    render() {
        if(this.state.isCmdRunning) {
            return(
                <AlertDiv type="info" message="Loading list..." />
            );
        } else if(this.state.cmdFailed){
            return(
                <AlertDiv type="danger" message={this.state.cmdError} />
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
                        handleItemClick={this.handleItemClick} handleDeleteClick={this.handleDeleteClick}/>
                </div>
            );
        }
    }
}


const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({
            openItemTab : tabActions.openItemTab,
            refreshTab: tabActions.refreshTab,
            openModal: modalActions.openModal,
        }, dispatch)
    };
};


export default connect(null, mapDispatchToProps)(Search);
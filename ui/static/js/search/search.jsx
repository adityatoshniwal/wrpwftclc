import React from 'react';
import SavedItemList from './saveditemlist';
import { url_for } from 'sources/url_for';

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
        return $.ajax(
            url_for('items'),
            {
                method : "GET",
                dataType : "json",
                contentType : "application/json; charset=utf-8",
            })
            .done((resp) => {
                this.setState({
                    itemsList : resp.data
                });
            });
    }    

    render() {
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
                <SavedItemList itemsList={this.state.itemsList} />
            </div>            
        );
    }
}

export default Search;
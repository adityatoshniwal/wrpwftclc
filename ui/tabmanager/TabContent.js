export default function TabContent(props) {

    return(
        <div className="tab-content py-2" id="container-tab-div">
            {props.tabs.map(function(tab) {
                if(tab.type === 'search') {
                    return(
                        <div className={"tab-pane vertical-scrollbar " + (tab.id === props.activeId ? "show active":"")} id={tab.content_id} role="tabpanel" aria-labelledby={tab.id}>
                            <Search />
                        </div>    
                    );
                }
                else if(tab.type === 'settings') {
                    return(
                        <div className={"tab-pane vertical-scrollbar " + (tab.id === props.activeId ? "show active":"")} id={tab.content_id} role="tabpanel" aria-labelledby={tab.id}>
                            <Settings />
                        </div>    
                    );
                }
                else if(tab.type === 'itemdetails') {
                    return(
                        <div className={"tab-pane vertical-scrollbar " + (tab.id === props.activeId ? "show active":"")} id={tab.content_id} role="tabpanel" aria-labelledby={tab.id}>
                            <ItemDetails />
                        </div>    
                    );
                }
            })}
        </div>
    )
    
}
class AppRouter {
    constructor(args) {
        this.PAGE_STACK = [];
        this.route_map = {};
        _.bindAll(this,'setCaller','start','stop','addRoute','addRoutes');
    }

    start() {
        /* Bind data-route attribute on click to caller of url pattern */
        $("[data-route]").on('click',(e)=>{
            console.log(e.currentTarget);
            this.setCaller(e.currentTarget.getAttribute("data-route"))
        });
        /* Bind data-route attribute on click to caller of url pattern 
         * For future additions. Making function live 
         */
        $(document).on("DOMNodeInserted",(e)=>{
            $(e.target).closest("[data-route]").on('click',(e)=>{
                console.log(e.currentTarget);
                this.setCaller(e.currentTarget.getAttribute("data-route"))
            })
        });
    }

    stop() {
        /* Turn of live mode */
        $(document).off("DOMNodeInserted");
    }

    /* To register a route and its callback function when clicked */
    addRoute(route, callback) {
        this.route_map[route] = callback;
    }

    /* To register a multiple routes and its callback function when clicked */
    addRoutes(routeDict, callback) {
        for(var route in routeDict) {
            this.addRoute(route, routeDict[route]);
        }
    }
    
    setCaller(inputRoute) {
        for (var route in this.route_map) {
            var params = {};
            /* Check for matching regex url */
            var match = inputRoute.match("^"+route.replace(/:[a-z]+/,"[0-9]+")+"$")
            if(match){
                /* Substituting URL pattern with actual values */
                route.split("/").forEach((v, i)=>{
                    if(v[0]===":") {
                        params[v.substr(1)] = inputRoute.split("/")[i]
                    }
                });
                /* Call the callback function with params
                 * Spread operation not supported yet
                 */
                this.route_map[route](inputRoute, params)
                break;
            }
        }
    }
}

export {AppRouter}
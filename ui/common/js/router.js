class AppRouter {
    constructor(args) {
        this.PAGE_STACK = [];
        this.route_map = {};
        _.bindAll(this,'setCaller','start')
    }

    start() {
        $("[data-route]").on('click',(e)=>{
            console.log(e.currentTarget);
            this.setCaller(e.currentTarget.getAttribute("data-route"))
        })
        // For future additions. Making function live
        $(document).on("DOMNodeInserted",(e)=>{
            $(e.target).find("[data-route]").on('click',(e)=>{
                console.log(e.currentTarget);
                this.setCaller(e.currentTarget.getAttribute("data-route"))
            })
        })
    }

    stop() {
        // For future additions. Making function live
        $(document).off("DOMNodeInserted")
    }

    //callback function will be called with URL and params
    addRoute(route, callback) {
        this.route_map[route] = callback
    }

    addRoutes(routeDict, callback) {
        for(var key in routeDict) {
            this.route_map[key] = routeDict[key]
        }
    }
    
    setCaller(inputRoute) {
        for (var key in this.route_map) {
            var params = {};
            var match = inputRoute.match("^"+key.replace(/:[a-z]+/,"[0-9]+")+"$")
            if(match){
                key.split("/").forEach((v, i)=>{
                    if(v[0]===":") {
                        params[v.substr(1)] = inputRoute.split("/")[i]
                    }
                })
                //Call the callback function with params
                //Spread operation not supported yet
                this.route_map[key](inputRoute, params)
            }
        }
    }
}

export {AppRouter}
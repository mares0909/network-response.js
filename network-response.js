function connectionLow(){
    var connectionLow = false,
        // let Modernizr return the prefixed or unprefixed property of the connection object
        connection = Modernizr.prefixed('connection', navigator) || {};
    if( connection.type != null ){
            /*  Number returned by connection.type equals to:
                0, UNKNOWN  : Unknown connection
                1, ETHERNET : Ethernet connection
                2, WIFI     : WiFi connection
                3, CELL_2G  : Cell 2G connection
                4, CELL_3G  : Cell 3G connection
                5, CELL_4G  : Cell 4G connection
                6, CELL     : Cell generic connection
                7, NONE     : No network connection
            */
            /* Connections types that are potentially low and will return true for the test:
                3, CELL_2G  : Cell 2G connection
                4, CELL_3G  : Cell 3G connection
                6, CELL     : Cell generic connection
            */
            connectionLow = (
                // in case the browser returns a number:
                connection.type == 0 ||
                connection.type == 3 ||
                connection.type == 4 ||
                // in case the browser returns the name:
                /(cell[ _][23][g]|cell$|cellular)/i.test(connection.type)
            )
    }
 
    if(connection.metered != null){
        if(connection.metered) connectionLow = true;
    }
 
    if(connection.bandwidth != null){
        if(parseInt(connection.bandwidth) < 1.5) connectionLow = true;
    }
    if(connection.downlinkMax != null){
        if(parseInt(connection.downlinkMax) < 1.5) connectionLow = true;
    }
    return connectionLow;
}
 
if(connectionLow() == true) document.body.addClass("lowconnection");
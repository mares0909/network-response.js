/*if(navigator.connection.type) {
  document.querySelector('body').innerHTML = navigator.connection.type;
}*/  
var txt = '';
Modernizr.addTest('lowbandwidth', function() {
    var perf, start, end;
    var connection = Modernizr.prefixed('connection', navigator) || {};
  
    //polyfill connection.bandwidth with connection.type
    //do not use in operator or ===/!=== here! some browsers have type/bandwidth declared as undefined/null
    if( connection.bandwidth == null && connection.type != null ){
        connection.bandwidth = (
            connection.type == 0 || // connection.UNKNOWN
            connection.type == 3 || // connection.CELL_2G
            connection.type == 4 || // connection.CELL_3G
            /(UNKNOWN)|([23]g)|^(CELL)/i.test(connection.type)) ?
            1 :
            7
        ;
      txt += connection.type;
    //polyfill connection.bandwith with performance object stolen from guardian not tested!!!
    } else if( connection.bandwidth == null && (perf = Modernizr.prefixed('performance', window)) && (perf = perf.timing) &&
        (start = perf.requestStart || perf.fetchStart || perf.navigationStart) &&
        (end = perf.responseEnd) ){
        connection.bandwidth = ((end - start) < 1500) ? 7 : 1;
      txt += 'b';
    //assume no-lowbandwidth
    } else {
        connection.bandwidth = 7;
      txt += 'c';
    }
    if(connection.metered){
        connection.bandwidth /= 3;
      txt += 'd';
    }
    return connection.bandwidth < 2.5;
});

if(Modernizr.lowbandwidth) {
  document.querySelector('body').innerHTML = txt + 'low'
} else {
  document.querySelector('body').innerHTML = txt + 'high'
}
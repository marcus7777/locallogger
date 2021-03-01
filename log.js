  const post = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(arguments))
  }
  var console = (function(oldCons){
    return {
      log: function(){
        oldCons.log.apply(null, arguments)
        post("log", ...arguments)
      },
      info: function () {
        oldCons.info.apply(null, arguments)
        post("info", ...arguments)
      },
      warn: function () {
        oldCons.warn.apply(null, arguments)
        post("warn", ...arguments)
      },
      error: function () {
        oldCons.error.apply(null, arguments)
        post("error", ...arguments)
      }
    }
  }(window.console))

  window.console = console

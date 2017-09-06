const btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
const moment = require('moment');
const es = require('elasticsearch');

let client = new es.Client({
  host: '127.0.0.1:9200',
  // log: 'trace'
});

btSerial.on('found', function(address, name) {
  client.index({
    index: 'index-name',
    type: 'type-name',
    body: {
      id: 'id-name',
      mac: address,
      name: name,
      datetime: moment().format('YYYYMMDD\THHmmss\Z')
    }
  }, function(error, response) {
    // if(error) console.log(error);
  });
});

btSerial.on('finished', function() {
  btSerial.inquire();
});

btSerial.inquire();

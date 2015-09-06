import moment from 'moment';

export default function($scope, roomService, dayService) {
  // Load all the rooms with occupied information if it isn't sunday (API gives an error on sundays)
  var isSunday = moment().day() === 0;

  $scope.hours = dayService.getHourNumbers();

  if (!isSunday) {
    roomService.getFreeRooms().then(function(payload) {
      $scope.rooms = payload;
    });
  }
}
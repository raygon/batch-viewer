var isPlaying = false;
var playInterval;
var playCtr = 0;

$(function(){
  // add all stimuli/components to page
  for (var i = 0; i < stimList.length; i++) {
    VIEW_COCHLEAGRAM_DEMO.renderAndPromise(stimList[i]);
  }

  // bind events (to global interactions)
  // $('.cochleagramHuman').hover(handleCochleagramHover);
  $('#toggleHumanCochleagramsButton').click(toggleHumanCochleagrams);
  $('#toggleFerretCochleagramsButton').click(toggleFerretCochleagrams);
  $('#toggleSpectraButton').click(toggleSpectra);
  $('#toggleSignalsButton').click(toggleSignals);
  $('#playAllButton').click(playAll);
  $('#stopAllButton').click(stopAll);
});

function toggleSpectra() {
  $('.pwelch').toggle();
}

function toggleHumanCochleagrams() {
  $('.cochleagramHuman').toggle();
}

function toggleFerretCochleagrams() {
  $('.cochleagramFerret').toggle();
}

function toggleSignals() {
  $('.signal').toggle();
}

function playAll() {
  if (isPlaying) {
    $('#playAllButton').html('Resume');
    clearInterval(playInterval);
    isPlaying = false;
  }
  else {
    isPlaying = true;
    $('#playAllButton').html('Pause');
    $('#'+stimList[playCtr].id).css('border', '6px solid blue');
    $('#'+stimList[playCtr].id)[0].scrollIntoView();
    $('#'+stimList[playCtr].id).click();

    playInterval = setInterval(function () {
      $('#'+stimList[playCtr].id).css('border', '2px solid black');
      playCtr++;
      $('#'+stimList[playCtr].id).css('border', '6px solid blue');
      $('#'+stimList[playCtr].id)[0].scrollIntoView();
      $('#dialogImg').prop('src', stimList[playCtr].fn_cochleagram_ferret);
      $('#'+stimList[playCtr].id).click();
    }, 500);
  }
}

function stopAll() {
  clearInterval(playInterval);
  $('#'+stimList[playCtr].id).css('border', '2px solid black');
  $('#playAllButton').html('Play All');
  playCtr = 0;
  isPlaying = false;
}

function truncateToNDecimals(val, nDecimals) {
  nDecimals = nDecimals >= 0 ? nDecimals : 0;
  mulFactor = Math.pow(10, nDecimals);
  return Math.round(mulFactor * val) / mulFactor;
}
